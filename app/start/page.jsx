"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaceIdBase } from '../assets';
import StartButton from '../components/Button';

const Index = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cam, setCam] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to start the camera
  const startCamera = async () => {
    setLoading(true);
    
    try {
      // First set camera state to true - this will show the video element
      setCam(true);
      
      // Small delay to ensure DOM is updated
      setTimeout(async () => {
        try {
          // Stop any existing stream
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
          
          // Get camera access
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          });
          
          streamRef.current = stream;
          
          // Attach stream to video element
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
          // If there's an error, revert to image
          setCam(false);
        } finally {
          setLoading(false);
        }
      }, 300);
    } catch (error) {
      console.error('General error:', error);
      setCam(false);
      setLoading(false);
    }
  };
  
  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[256px] h-[256px] rounded-[50%] overflow-hidden">
        {cam ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <Image 
            src={FaceIdBase} 
            alt="Face ID" 
            width={256}
            height={256}
            priority
            className="w-full h-full object-cover"
          />
        )}
        
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="text-white">Activating camera...</div>
          </div>
        )}
      </div>
      
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
            buttonName={loading ? "Activating Camera..." : cam ? "Take Photo" : "Get Started"}
            className={`bg-[#375DFB] text-white rounded-[10px] flex justify-center items-center py-1 px-1 w-[80%] ${loading ? 'opacity-70' : 'hover:text-black hover:border-[#375DFB] hover:bg-white'} border border-transparent transition-all duration-300`}
            onClick={loading ? () => {} : startCamera}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;