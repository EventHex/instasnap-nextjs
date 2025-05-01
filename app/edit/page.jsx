'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Banner, Frame, PenIcon, Profileimg, ShineAI, Phone, User } from '../assets'
import Button from '../components/button'
import Banners from '../components/banner'
import AiInput from '../components/aiInput'
import { RotateCcw } from 'lucide-react'
import Link from 'next/link'
import Input from '../components/input'

const page = () => {

    const [userSelfie, setUserSelfie] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [apiImages, setApiImages] = useState([]); // New state for API images
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');

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
    <div className="w-full flex   flex-col gap-15 mb-[70px]">
    <div className="flex flex-col items-center justify-center">
      <Banners 
        profile={userSelfie || Profileimg} 
        // editIconimage={PenIcon}
        editIcon={<RotateCcw  className='animate-spin' color='#525866' />}
        Banner={Banner} 
      />
    
    </div>
 <div className='flex flex-col items-center justify-center  w-full h-full'>
    <p className='text-center text-[14px] font-[400]'> Didn't like the photo?
        <Link href="/start"> <span  className='text-[#375DFB] underline'> Retake</span></Link></p>

    </div>

    {/* Add phone and username input form here */}
    <div className="flex flex-col p-5">
      <div className='flex flex-col w-full gap-2'>
        <div className='w-full'>
      <Input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={phone}
        
        onChange={e => setPhone(e.target.value)}
        icon={Phone}
        className="text-black  bg-transparent border-1 border-gray-300 "
      />
      </div>
      <div>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        icon={User}
        className="text-black  bg-transparent border-1 border-gray-300 "
      />
      </div>
      </div>
      <Button
        type="button"
        className="w-full rounded-xl py-3 text-[16px] font-medium mt-2"
        onClick={() => {/* handle save logic here */}}
      >
        Save
      </Button>
    </div>

   
    

    {/* <Navbar /> */}
  </div>
  )
}

export default page
