import React from "react";
import { Banner } from "../../assets";
import Banners from "../../components/banner";
import VerifyButton from "../../components/button";

const SendOtp = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between w-full">
      <div>
        <Banners Banner={Banner} />
        <div className="flex flex-col items-center justify-center mt-6 w-full">
          <h1 className="font-[500] text-[16px] ">Verify your account</h1>
          <p className="text-[14px] font-[400] text-[#525866] ">
            Enter OTP received on +91 98765433210
          </p>
        </div>
        <div className="flex items-center justify-center gap-[10px] mt-5">
          <input
            className="w-[80px] h-[64px] border border-[#E5E7EB] rounded-md"
            type="number"
          />
          <input
            className="w-[80px] h-[64px] border border-[#E5E7EB] rounded-md"
            type="number"
          />
          <input
            className="w-[80px] h-[64px] border border-[#E5E7EB] rounded-md"
            type="number"
          />
          <input
            className="w-[80px] h-[64px] border border-[#E5E7EB] rounded-md"
            type="number"
          />
        </div>
        <div className="w-full flex  px-[50px]  font-[700] text-[16px] mt-5">
          <VerifyButton  
          className="w-full"
          buttonName="Verify" />
        </div>
        <div className="w-full flex flex-col items-center font-[400] text-[14px] mt-5 text-[#525866]">
          <p>Experiencing issues receiving the code?</p>
          <p className="text-[#0A0D14] font-[500] text-[14px] cursor-pointer hover:underline">
            Resend OTP
          </p>
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

export default SendOtp;
