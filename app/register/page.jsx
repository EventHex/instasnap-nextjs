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

const Register = () => {
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
    e.preventDefault();
    if (isFormValid()) {
   
      setSubmittedData({
        ...formData,
        countryCode: selectedCode,
      });

 
      try {
        const res = await instance.post("auth/login-public", {
          mobile: formData.phone,
          phoneCode: selectedCode,
          fullName: formData.firstName,
          event: event,
        });
        console.log("API response:", res);
        // Handle successful response here
        // For example, you could redirect to another page
      } catch (error) {
        console.error("Error calling API:", error);
        // Handle error here
      }

      // You can add additional logic here
      console.log("Form submitted:", {
        ...formData,
        countryCode: selectedCode,
      });
    }
  };

  // Update the handleSendCode function
  const handleSendCode = () => {
    if (formData.phone) {
      setShowVerification(true);
      setCodeSent(true);
      // Add your send code logic here
      console.log("Sending code to:", formData.phone);
    }
  };

  const SendCode = () => {
    setCodeSentError(true);
  };

  const handleVerify = () => {
    setCodeSentSuccess(true);
  };

  useEffect(() => {
    setIsClient(true);

    // Retrieve the selfie image from sessionStorage
    const storedSelfie = sessionStorage.getItem("userSelfie");
    if (storedSelfie) {
      setUserSelfie(storedSelfie);
    }
    
    // Removed API call from useEffect since it's now in handleSubmit
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
                      {codeSent ? (
                        <div className="  ">
                          <Image
                            width={20}
                            height={20}
                            className=""
                            src={codeSentSuccess ? VerifiedIcon : PenIcon}
                            alt={codeSentSuccess ? "UserIcon" : "PenIcon"}
                          />
                        </div>
                      ) : (
                        "send code"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Verification Input - Only shown after sending code */}
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
                          </span>{" "}
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