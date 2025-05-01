'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Banner, Frame, PenIcon, Profileimg, ShineAI } from '../assets'
import Button from '../components/button'
import Banners from '../components/banner'
import AiInput from '../components/aiInput'
import { RotateCcw } from 'lucide-react'
const page = () => {

    const [userSelfie, setUserSelfie] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [apiImages, setApiImages] = useState([]); // New state for API images

    useEffect(() => {
        setIsClient(true);
        
        // Retrieve the selfie image from sessionStorage
        const storedSelfie = sessionStorage.getItem('userSelfie');
        if (storedSelfie) {
          setUserSelfie(storedSelfie);
        }
    
        // Move the API call here
        const fetchUser = async () => {
          try {
            const storedSelfie = sessionStorage.getItem('userSelfie');
            console.log('Fetching user data with selfie:', storedSelfie ? 'Present' : 'Not present');
            
            // Compress the image if it exists
            let imageToSend = null;
            if (storedSelfie) {
              try {
                imageToSend = await compressImage(storedSelfie, 2);
              } catch (err) {
                console.error('Error compressing image in Home component:', err);
                imageToSend = storedSelfie; // Fallback to original if compression fails
              }
            }
            
            const res = await Instance.post('/mobile/instasnap/match', {
              selfieImage: imageToSend
            });
            
            console.log('API Response:', res.data);
            
            // Check if the API returned images and update state
            if (res.data && res.data.photos && Array.isArray(res.data.photos)) {
              // Map the API response to match our expected format
              const formattedImages = res.data.photos.map((photo, index) => ({
                id: index + 1,
                image: photo.url || photo.imageUrl || photo.image, // Adapt based on your API response structure
                date: photo.date || new Date().toISOString().split('T')[0] // Use date from API or fallback to today
              }));
              setApiImages(formattedImages);
            }
          } catch (error) {
            console.error('Error fetching user match:', error);
          }
        };
        
        fetchUser();
        
        // Cleanup function to prevent memory leaks
        return () => {
          // Cleanup any resources if needed
        };
      }, []);
  return (
    <div className="w-full flex flex-col gap-5 mb-[70px]">
    <div className="flex flex-col items-center justify-center">
      <Banners 
        profile={userSelfie || Profileimg} 
        // editIconimage={PenIcon}
        editIcon={<RotateCcw />}
        Banner={Banner} 
      />

      <div className="max-w-md mt-16">
        <AiInput
          icon={ShineAI}
          message={apiImages.length > 0 ? `Our AI found ${apiImages.length} photos of you` : "Our AI couldn't find any photos of you"}
          number={apiImages.length}
          label="Photos"
        />
      </div>
    </div>
    <div className="">
      <div className="flex items-center justify-center">
        {/* Main Div */}
        <div className="w-full max-w-4xl bg-white flex justify-between items-center py-[8px] px-[20px] boarder-[#E2E4E9]">
          {/* Text on the Left */}
          <h1 className="text-2xl font-[500px] text-[16px]">Your Photos</h1>

          {/* Button component */}
          <Button 
            width="w-auto"
            className="bg-[#375DFB] hover:bg-[#2440c4] text-[14px] font-[500] py-2 px-6"
            onClick={() => window.location.reload()}
          >
            Recheck
          </Button>
        </div>
      </div>
    </div>
  

    {/* <Navbar /> */}
  </div>
  )
}

export default page
