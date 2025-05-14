"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Banner,
  Profileimg,
  Flat,
  Suitcase,
  Gender,
  User,
  PenIcon,
  ErrorIcon,
  VerifiedIcon,
} from "../assets";
import Header from "../components/Header";
import Banners from "../components/banner";
import Input from "../components/input";
import Dropdown from "../components/dropdown";
import Button from "../components/button";
import Image from "next/image";
import instance from "../instance";
import { useEvent } from "../context"; // Import the context hook
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const { event  } = useEvent();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    companyName: "",
    gender: "",
  });

  // New state for storing submitted data
  const [submittedData, setSubmittedData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("91");
  const [userSelfie, setUserSelfie] = useState(null);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [codeSentError, setCodeSentError] = useState(false);
  const [codeSentSuccess, setCodeSentSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupotpbtn, setSignupotpbtn] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  // Dedicated state for button text
  const [buttonText, setButtonText] = useState("send code");

  const countryCodes = [
    { code: "91", country: "India" },
    { code: "1", country: "USA" },
    { code: "44", country: "UK" },
    { code: "86", country: "China" },
    { code: "81", country: "Japan" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryCodeSelect = (code) => {
    setSelectedCode(code);
    setIsDropdownOpen(false);
  };

  const handleGenderSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
    setIsGenderOpen(false);
  };


useEffect(() => {
const profileImage = sessionStorage.getItem('userSelfie');
if(profileImage){
  setUserSelfie(profileImage);
}
}, []);

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.designation.trim() !== "" &&
      formData.companyName.trim() !== "" &&
      formData.gender !== ""
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    if (isFormValid()) {
      setSubmittedData({
        ...formData,
        countryCode: selectedCode,
      });

      try {
        // Get the image from session storage
        const userImage = sessionStorage.getItem("userSelfie");
        console.log("User image from session storage:", userImage ? "exists" : "not found");
        
        // Create FormData object
        const formDataToSend = new FormData();
        formDataToSend.append('mobile', formData.phone);
        formDataToSend.append('phoneCode', selectedCode);
        formDataToSend.append('fullName', formData.firstName);
        formDataToSend.append('event', event);
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('companyName', formData.companyName);
        formDataToSend.append('gender', formData.gender);
        
        // Handle image from session storage
        if (userImage) {
          try {
            console.log("Processing image...");
            // Convert base64 to blob
            const base64Response = await fetch(userImage);
            const blob = await base64Response.blob();
            console.log("Image blob created:", blob.size, "bytes");
            formDataToSend.append('file', blob, 'selfie.jpg');
          } catch (error) {
            console.error('Error processing image:', error);
            alert('Error processing your image. Please try again.');
            return;
          }
        } else {
          console.warn("No user image found in session storage");
        }
        
        console.log("Sending signup request...");
        const res = await instance.post("/auth/signup-mobile-with-country", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log("API response:", res);
        if (res.data.success) {
          setIsLoggedIn(true);
          setShowVerification(true);
          setCodeSent(true);
          // Store eventId and userId in session storage if provided in response
          if (res.data.user) {
            sessionStorage.setItem("eventId", res.data.user.event);
            sessionStorage.setItem("userId", res.data.user._id);
            console.log("Stored eventId and userId in session storage");
          }
        } else {
          console.error("Signup failed:", res.data);
          alert('Signup failed. Please try again.');
        }
      } catch (error) {
        console.error("Error calling API:", error);
        alert('Error during signup. Please try again.');
      }
    }
  };

  // Update the handleSendCode function
  const handleSendCode = async () => {
    if (formData.phone) {
      try {
        // First try to login
        const loginResponse = await instance.post("/auth/login-mobile-with-country", {
          phoneCode: selectedCode,
          mobile: formData.phone,
          event: event
        });

        console.log("Login response:", loginResponse.data);

        if (loginResponse.data.success) {
          setShowVerification(true);
          setCodeSent(true);
          setLoginFailed(false);
          setButtonText(""); // Clear button text when code is sent successfully
        }
        else {
          setLoginFailed(true);
          // Directly check for message in the response
          if (loginResponse.data.message && 
              (loginResponse.data.message.includes("No ticket") || 
               loginResponse.data.message.includes("registrations") || 
               loginResponse.data.message.includes("not found"))) {
            setButtonText("sign up");
            console.log("Changed button text to 'sign up' from unsuccessful login");
            alert('You have no account. Please fill the fields below.');
          }
        }
      } catch (error) {
        console.log("Error caught:", error);
        
        try {
          // Log all possible paths to the error message
          console.log("Error object:", error);
          console.log("Error message:", error.message);
          
          if (error.response) {
            console.log("Error response:", error.response);
            console.log("Error response data:", error.response.data);
            console.log("Error response message:", error.response.data?.message);
            
            // Try to find the error message in different potential locations
            const errorMessage = 
              error.response.data?.message || 
              error.response.data?.error || 
              error.response.statusText || 
              error.message || 
              "";
              
            console.log("Extracted error message:", errorMessage);
            
            // Very loose matching for any indication of "no user found" or similar
            if (errorMessage.toLowerCase().includes("no") && 
                (errorMessage.toLowerCase().includes("ticket") || 
                 errorMessage.toLowerCase().includes("registrations") || 
                 errorMessage.toLowerCase().includes("user") || 
                 errorMessage.toLowerCase().includes("found"))) {
              
              // Directly set the button text
              console.log("Setting button text to 'sign up'");
              setButtonText("sign up");
              alert('You have no account. Please fill the fields below.');
            }
          }
        } catch (e) {
          console.log("Error in error handling:", e);
        }
      }
    }
  };

  const SendCode = async () => {
    try {
      const response = await instance.post("/auth/login-mobile-with-country", {
        phoneCode: selectedCode,
        mobile: formData.phone,
        event: event
      });

      if (response.data.success) {
        setCodeSentError(false);
        alert('Verification code has been resent successfully.');
      }
    } catch (error) {
      console.error("Error resending code:", error);
      setCodeSentError(true);
    }
  };

  const handleVerify = async () => {
    try {
      console.log("handleVerify");
      console.log("Phone:", formData.phone);
      console.log("Verification Code:", formData.verificationCode);
      console.log("Event:", event);
      console.log("Phone Code:", selectedCode);
      
      const response = await instance.post("/auth/verify-otp-with-country", {
        mobile: formData.phone,
        otp: formData.verificationCode,
        event: event,
        phoneCode: selectedCode,
      });
      
      if (response.data.success) {
        setCodeSentSuccess(true);
        console.log("OTP verified successfully:", response.data);
        
        // Store eventId and userId in session storage
        if (response.data.user) {
          sessionStorage.setItem("eventId", response.data.user.event);
          sessionStorage.setItem("userId", response.data.user._id);
          
          // Add a small delay before redirecting to ensure session storage is set
          setTimeout(() => {
            router.push("/home");
          }, 100);
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setCodeSentError(true);
    }
  };

  useEffect(() => {
    setIsClient(true);

    // Retrieve the selfie image from sessionStorage
    const storedSelfie = sessionStorage.getItem("userSelfie");
    if (storedSelfie) {
      setUserSelfie(storedSelfie);
    }
    
  }, []);

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <Banners
        profile={userSelfie || Profileimg}
        editIconimage={PenIcon}
        Banner={Banner}
      />

      <div>
        <div className="pt-12 px-4">
          <div className="text-center mb-8">
            <p className="text-[24px] font-[400] font-inter">
              Verify your mobile number
            </p>
          </div>

          <form
            className="space-y-4 flex flex-col gap-[16px] mb-10"
            onSubmit={handleSubmit}
          >
            {/* Phone Input with Country Code */}
            <div className="flex flex-col gap-5">
              <div className="flex">
                <div className="relative">
                  <button
                    type="button"
                    className="h-full px-3 flex items-center gap-1 rounded-l-lg border border-[#E2E4E9] hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    +{selectedCode}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-[#E2E4E9] rounded-lg shadow-lg z-10">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                          onClick={() => handleCountryCodeSelect(country.code)}
                        >
                          <span>{country.country}</span>
                          <span className="text-gray-500">+{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative flex-1">
                  <div className="relative flex">
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border-[#E2E4E9]  text-black border-r-0 py-3 pl-10 pr-4 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2"></div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendCode}
                      className="px-1 border-[#E2E4E9] border border-l-0 text-[#375DFB] rounded-r-lg flex items-center justify-center"
                    >
                      {/* Debug: Current button text: {buttonText} */}
                      {codeSent ? (
                        <div className="">
                          <Image
                            width={20}
                            height={20}
                            className=""
                            src={codeSentSuccess ? VerifiedIcon : PenIcon}
                            alt={codeSentSuccess ? "UserIcon" : "PenIcon"}
                          />
                        </div>
                      ) : (
                        buttonText // Use the dedicated button text state
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {showVerification && (
                <>
                  <div className="flex flex-col gap-2">
                    <div className="relative flex-1">
                      <div className="relative flex">
                        <div className="relative flex-1">
                          <input
                            type="tel"
                            name="verificationCode"
                            placeholder="Enter verification code"
                            value={formData.verificationCode || ""}
                            onChange={handleChange}
                            className="w-full border-[#E2E4E9] border-r-0 rounded-l-lg py-3 pl-10 pr-4 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2"></div>
                        </div>
                        <button
                          onClick={handleVerify}
                          type="button"
                          className="px-2 py-2 border-[#E2E4E9] bg-[#F6F8FA] border border-l text-[#CDD0D5] hover:bg-[#375DFB] hover:text-white rounded-r-lg"
                        >
                          verify
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      {codeSentError ? (
                        <div className="flex w-full gap-2">
                          <p className="flex justify-start  gap-2">
                            <Image
                              width={20}
                              height={20}
                              className="w-5 h-5"
                              src={ErrorIcon}
                              alt="ErrorIcon"
                            />
                            <p className="text-[#525866] font-inter font-[400] text-[14px]">
                              A new OTP has been sent to your registered number
                            </p>
                          </p>
                        </div>
                      ) : (
                        <p className=" font-inter  text-[#525866] font-[400] text-[14px]">
                          Experiencing issues receiving the code?{" "}
                          <span
                            onClick={SendCode}
                            className="text-[#525866] font-inter font-[400] text-[14px] underline"
                          >
                            Resend code
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              icon={User}
              disabled={!isLoggedIn}
            />

            <Input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              icon={Suitcase}
              disabled={!isLoggedIn}
            />

            <Input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              icon={Flat}
              disabled={!isLoggedIn}
            />

            <Dropdown
              value={formData.gender || ""}
              placeholder="Select Gender"
              icon={Gender}
              options={genderOptions}
              isOpen={isGenderOpen}
              onToggle={() => setIsGenderOpen(!isGenderOpen)}
              onSelect={handleGenderSelect}
              disabled={!isLoggedIn}
            />

            <div className="w-full my-5 flex justify-center">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormValid()}
              >
                Find my photos
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;