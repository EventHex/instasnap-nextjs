"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Banner, Profileimg, Flat, Suitcase, Gender, User ,PenIcon} from "../assets";
import Header from "../components/Header";
import Banners from "../components/banner";
import Input from "../components/input";
import Dropdown from "../components/dropdown";
import Button from "../components/button";
import Image from "next/image";

const Register = () => {
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
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  // Add new state for showing verification input
  const [showVerification, setShowVerification] = useState(false);
  // Add state to track if code was sent
  const [codeSent, setCodeSent] = useState(false);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Store the submitted data
      setSubmittedData({
        ...formData,
        countryCode: selectedCode,
      });

      // You can add additional logic here (e.g., API calls)
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

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <Banners profile={Profileimg} Banner={Banner} />

      <div className=" ">
        <div className=" pt-12 px-4">
          <div className="text-center mb-8">
            <p className="text-[24px] font-[400]  font-inter">
              Verify your mobile number
            </p>
          </div>

          <form
            className="space-y-4  flex flex-col gap-[16px]  mb-10"
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
                      className="w-full border-[#E2E4E9] border-r-0 py-3 pl-10 pr-4 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2"></div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="px-2 py-2 border-[#E2E4E9] border border-l-0 text-[#375DFB] rounded-r-lg flex items-center justify-center"
                  >
                    {codeSent ? (
                      <Image
                        className=""
                        src={PenIcon}
                        alt="PenIcon"
                      />
                    ) : (
                      'send code'
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
                          value={formData.verificationCode || ''}
                          onChange={handleChange}
                          className="w-full border-[#E2E4E9] border-r-0 rounded-l-lg py-3 pl-10 pr-4 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2"></div>
                      </div>
                      <button
                        type="button"
                        className="px-2 py-2 border-[#E2E4E9] bg-[#F6F8FA] border border-l text-[#CDD0D5] hover:bg-[#375DFB] hover:text-white rounded-r-lg"
                      >
                        verify
                      </button>
                    </div>
                  </div>
                <div className="flex">
                  <p className=" font-inter  text-[#525866] font-[400] text-[14px]">Experiencing issues receiving the code?  <span className="text-[#525866] font-inter font-[400] text-[14px] underline" >Resend code</span> </p>
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
            />

            <Input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              icon={Suitcase}
            />

            <Input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              icon={Flat}
            />

            <Dropdown
              value={formData.gender || ""}
              placeholder="Select Gender"
              icon={Gender}
              options={genderOptions}
              isOpen={isGenderOpen}
              onToggle={() => setIsGenderOpen(!isGenderOpen)}
              onSelect={handleGenderSelect}
            />

            <div className="w-full my-5 flex justify-center">
              <Button type="submit" disabled={!isFormValid()}>
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