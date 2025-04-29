import React from "react";
import { Banner } from "../assets";
import Banners from "../components/banner";
import India from "../assets/icons/india.svg";
import DownArrow from "../assets/icons/downarrow.svg";
import Image from "next/image";
import SignInButton from "../components/button";

const Otp = () => {
  return (
    <div className=" flex flex-col justify-between w-full">
      <div>
        <Banners Banner={Banner} />
        <div className="flex flex-col items-center justify-center mt-6 gap-6 w-full">
          <h1 className="font-[400] text-[24px]">Sign in to your account</h1>
          <div className="flex flex-col gap-5 w-full max-w-md px-4">
            <div className="flex w-full">
              <button
                type="button"
                className="flex items-center gap-2 border border-[#E2E4E9] rounded-l-lg px-4 py-2 text-gray-700 font-[400] text-[14px] bg-white"
              >
                <Image src={India} alt="India Flag" className="w-5 h-5" />
                +91
                <Image src={DownArrow} alt="Down Arrow" className="w-4 h-4" />
              </button>

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
