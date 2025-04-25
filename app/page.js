import Image from "next/image";
import Link from "next/link"; // Added missing import for Link
import Header from "./components/header";
import { Banner, HumanSelfi, Sparkle } from "./assets";
import SnapButton from "./components/button";


export default function Home() {
  return (
    <div className="w-full px-5">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          <Image
            className="rounded-[30px] w-full object-cover"
            src={Banner}
            alt="Banner"
            width={1200}
            height={400}
            priority
          />
        </div>

        <div className="w-full max-w-6xl flex flex-col items-center justify-center mt-2 p-4 rounded-lg">
          <div className="w-full mt-1 flex justify-center">
            <Image
              className="w-full sm:w-[300px] object-cover"
              src={HumanSelfi}
              alt="Selfie"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col justify-center w-full">
            <h1 className="font-normal text-[24px] leading-[32px] text-center mt-4">
              You're just one selfie away from your event photos
            </h1>
            <p className="text-[12px] text-center font-[400] leading-[16px]">
              EventHex AI will use your selfie to find and <br /> deliver your event
              photos instantly
            </p>
            <div className="w-full mt-10 gap-5 justify-center flex-col items-center flex">
              <Link className="w-full flex justify-center" href="/start">
                <SnapButton
                  icon={Sparkle}
                  buttonName="Snap a Selfie"
                  alt="sparkle"
                  className="w-[80%] mt-5 rounded-[10px] border border-blue-600
                    hover:bg-blue-600 hover:text-white flex justify-center items-center py-2 px-4
                    transition-all duration-300 delay-200"
                />
              </Link>
              <div className="w-[90%] mt-1">
                <p className="flex gap-3 text-center justify-center text-[#6C7278] text-[14px]">
                  Already registered with your face?
                  <Link href="/signin">
                    <span className="text-[#4D81E7]">Sign in</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}