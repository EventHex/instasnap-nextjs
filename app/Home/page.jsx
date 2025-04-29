import React from "react";
import { Banner, Profileimg } from "../assets";
import Banners from "../components/banner";
import AiInput from "../components/aiInput";
import Image from "next/image";
import Frame from "../assets/image/Frame.svg";
import EventHex from "../assets/icons/Vector (90).svg";
import ShineAI from "../assets/icons/Vector(16).svg";
import Navbar from "../components/navfooter";
const Home = () => {
  return (
    <div className="w-full mb-[70px] ">
      <div className="flex flex-col items-center justify-center">
        <Banners profile={Profileimg} Banner={Banner} />

        <div className="max-w-md mt-16">
          <AiInput
            icon={ShineAI}
            message="Our AI couldn't find any photos of you"
            number={0}
            label="Photos"
          />
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-center">
          {/* Main Div */}
          <div className="w-full max-w-4xl bg-white flex justify-between  items-center py-[8px] px-[20px] boarder-[#E2E4E9] ">
            {/* Text on the Left */}
            <h1 className="text-2xl font-[500px] text-[16px] ">Your Photos</h1>

            {/* Button on the Right */}
            <button className="bg-[#375DFB] text-white font-[500] text-[14px] py-2 px-6 rounded-[8px]">
              Reacheck
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col items-center justify-center p-6 bg-[#F6F8FA] w-full ">
          <p className="text-[#0A0D14] text-[18px] font-[500] text-center">
            Oops! Our AI couldn't find any Hilights for you yet.
          </p>
          <div className="flex items-center justify-center bg-gray-100">
            <Image
              src={Frame}
              alt="Frame"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col items-center w-full max-w-xs">
            <p className="font-[500] text-[14px] text-[#525866] mb-2 text-center">Don't worry! This could be because:</p>
            <ul className="list-disc pl-15 text-[#525866] w-full">
              <li className="font-[400] text-[12px]">Your Photos are Still Processing</li>
              <li className="font-[400] text-[12px]">
                You might be early – new photos are added regularly
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center mt-6">
            <p className="text-[12px] text-[#525866] font-[500] flex items-center">
              Powered By
              <span className="flex items-center ml-2">
                <Image src={EventHex} alt="Frame" className="w-4 h-4 mr-1" />
                EventHex
              </span>
            </p>
          </div>
        </div>
      </div>
      
      <Navbar />
    </div>
  );
};

export default Home;
