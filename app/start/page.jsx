"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FaceIdBase } from '../assets';
import StartButton from '../components/Button';

const Index = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cam, setCam] = useState(false);

  const startCamera = async () => {
    try {
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCam(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCam(false);
    }
  };
  React.useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {cam ? (
        <div className="rounded-[50%] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-[256px] h-[256px] object-cover"
          />
        </div>
      ) : (
        <div className="w-[256px]">
          <Image 
            src={FaceIdBase} 
            alt="Face ID" 
            width={256}
            height={256}
            priority
          />
        </div>
      )}
      
      <div className="w-[80%] items-center mt-15 gap-20 flex flex-col justify-center text-center">
        <div>
          <h1 className="text-[24px] font-[500] leading-[32px]">
            How to Set Up Selfie
          </h1>
          <p className="font-[400] text-[14px] leading-[20px]">
            First, position your face in the camera frame. <br />
            Then click a photo when your face is detected.
          </p>
        </div>
        
        <div className="w-full justify-center flex">
          <StartButton
            buttonName="Get Started"
            className="bg-[#375DFB] text-white rounded-[10px] flex justify-center items-center py-1 px-1 w-[80%] hover:text-black hover:border-[#375DFB] border border-transparent transition-all hover:bg-white duration-300"
            onClick={startCamera}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;