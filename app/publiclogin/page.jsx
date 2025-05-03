'use client'

import React, {useState, useEffect} from 'react'
import Banners from '../components/banner'
import { Banner, PenIcon, Profileimg, User, Phone, VerifiedIcon, ErrorIcon } from '../assets'
import { RotateCcw } from 'lucide-react'
import Button from '../components/button'
import Input from '../components/input'
import instance from '../instance'
import { useEvent } from '../context';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

const Page = () => {
  const { setRegistredUser, registredUser } = useEvent();
    const { event } = useEvent();
    const router = useRouter();
    const [userSelfie, setUserSelfie] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [phonenumber, setPhonenumber] = useState("");
    const [username, setUsername] = useState("");
    const [selectedCode, setSelectedCode] = useState("91"); // Default country code (India)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [codeSentSuccess, setCodeSentSuccess] = useState(false);
    const [codeSentError, setCodeSentError] = useState(false);
    const [formData, setFormData] = useState({
        phone: "",
        verificationCode: ""
    });
    
    // Country codes array
    const countryCodes = [
        { country: "India", code: "91" },
        { country: "USA", code: "1" },
        { country: "UK", code: "44" },
        { country: "Canada", code: "1" },
        // Add more country codes as needed
    ];
    
    // Function to handle country code selection
    const handleCountryCodeSelect = (code) => {
        setSelectedCode(code);
        setIsDropdownOpen(false);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === 'phone') {
            setPhonenumber(value);
        }
    };
    
    // Handle send code button
    const handleSendCode = () => {
        if (formData.phone.trim() !== "") {
            setCodeSent(true);
            setShowVerification(true);
            // Here you would typically call an API to send verification code
            // For now, we'll just simulate success
            setCodeSentSuccess(true);
        }
    };
    
    // Handle verification
    const handleVerify = () => {
        // Here you would verify the code with an API
        // For demonstration, we'll just check if any code was entered
        if (formData.verificationCode && formData.verificationCode.trim() !== "") {
            setCodeSentSuccess(true);
            setCodeSentError(false);
        } else {
            setCodeSentError(true);
        }
    };
    
    // Resend verification code
    const SendCode = () => {
        setCodeSent(true);
        // Simulate resending code
        setCodeSentError(true);
    };

    useEffect(() => {
        setIsClient(true);
        // Retrieve the selfie image from sessionStorage
        const storedSelfie = sessionStorage.getItem('userSelfie');
        if (storedSelfie) {
            setUserSelfie(storedSelfie);
        }
    }, []);
      
    const isFormValid = () => {
        return phonenumber.trim() !== "" && username.trim() !== "";
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isFormValid()) {
        try {
          const res = await instance.post("auth/login-public", {
            mobile: phonenumber,
            fullName: username,
            phoneCode: selectedCode,
            event: event,
          });
          console.log("API response:", res);
          
          // Save the registration ID to state and sessionStorage
          const registrationId = res.data.ticketsRegistration._id;
          console.log('Registration ID:', registrationId);
          setRegistredUser(registrationId);
          sessionStorage.setItem('registredUser', registrationId);
          
          if (res.status === 200) {
            router.push('/home');
          }
          // Show success message
        } catch (error) {
          console.error("Error calling API:", error);
        }
      } else {
        // Form validation failed
      }
  };
      
    return (
      <div className=' flex flex-col justify-center items-center'>
        <div>
            <Banners
                profile={userSelfie || Profileimg}
                editIcon={<RotateCcw size={20} />}
                Banner={Banner}
            />

            <div className="flex flex-col p-5">
                <div className="flex flex-col mt-10 w-full gap-5">
                    <div className="flex justify-center items-center">
                        <h1 className="text-[16px] font-[400]">Edit your details</h1>
                    </div>
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
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Enter your number"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={Phone}
                        className="w-full border-[#E2E4E9] text-black border-r-0 py-3 pl-10 pr-4 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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
                    <div>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            icon={User}
                            className="text-black bg-transparent border-1 border-gray-300"
                        />
                    </div>
                </div>
                <Button
                    type="button"
                    className="w-full rounded-xl py-3 text-[16px] font-medium mt-2"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
        </div>
        </div>
    )
}

export default Page