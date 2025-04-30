"use client"
import React, { useState } from "react";
import { Banner } from "../assets";
import Banners from "../components/banner";
import India from "../assets/icons/india.svg";
import DownArrow from "../assets/icons/downarrow.svg";
import Image from "next/image";
import SignInButton from "../components/button";
import { japan, palastine, uk } from "../assets";

const Otp = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    flag: India,
    code: "+91",
    name: "India"
  });

  const countries = [
    { flag: India, code: "+91", name: "India" },
    { flag: japan, code: "+81", name: "Japan" },
    { flag: palastine, code: "+970", name: "Palestine" },
    { flag: uk, code: "+44", name: "UK" }
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  return (
    <div className=" flex flex-col justify-between w-full">
      <div>
        <Banners Banner={Banner} />
        <div className="flex flex-col items-center justify-center mt-6 gap-6 w-full">
          <h1 className="font-[400] text-[24px]">Sign in to your account</h1>
          <div className="flex flex-col gap-5 w-full max-w-md px-4">
            <div className="flex w-full relative">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center gap-2 border border-[#E2E4E9] rounded-l-lg px-4 py-2 text-gray-700 font-[400] text-[14px] bg-white"
              >
                <Image src={selectedCountry.flag} alt={`${selectedCountry.name} Flag`} className="w-5 h-5" />
                {selectedCountry.code}
                <Image 
                  src={DownArrow} 
                  alt="Down Arrow" 
                  className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                />
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#E2E4E9] rounded-lg shadow-lg z-10">
                  {countries.map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectCountry(country)}
                    >
                      <Image src={country.flag} alt={`${country.name} Flag`} className="w-5 h-5" />
                      <span className="font-[400] text-[14px]">{country.name} {country.code}</span>
                    </div>
                  ))}
                </div>
              )}

              <input
                type="tel"
                name="phone"
                placeholder="Enter your mobile number"
                className="flex-1 border border-l-0 border-[#E2E4E9] rounded-r-lg p-4 font-[400] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            <div className="w-full flex justify-center font-[700] text-[16px]">
              <SignInButton buttonName="Sign in" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 text-center font-[400] text-[14px] p-6">
        New user?{" "}
        <a
          href="/signup"
          className="text-blue-600 hover:underline font-[500] text-[14px]"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Otp;