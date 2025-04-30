'use client'
import React, { useState, useEffect } from "react";
import { Banner, Post1, Post2, Post3, Profileimg } from "../assets";
import Banners from "../components/banner";
import AiInput from "../components/aiInput";
import Image from "next/image";
import Frame from "../assets/image/Frame.svg";
import EventHex from "../assets/icons/Vector (90).svg";
import ShineAI from "../assets/icons/Vector(16).svg";
import Navbar from "../components/navfooter";
import { Marquee3D } from "../components/ui/card";
import { CloudDownload, Share2, View, X } from "lucide-react";
import Button from '../components/button'

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading state
  }
  const data = [
    {
      id: 1,
      image: Post1,
      date: "2024-02-01",
    },
    {
      id: 2,
      image: Post2,
      date: "2024-03-02",
    },
    {
      id: 3,
      image: Post3,
      date: "2024-04-05",
    },
  ];  

  // View post function
  const Viewpost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  // Close modal function
  const closeModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  // Share functionality
  const handleShare = async (image) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this photo!',
          text: 'Found this amazing photo on InstaSnap',
          url: image.src || window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const tempInput = document.createElement('input');
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Download functionality
  const handleDownload = async (image) => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `instasnap-photo-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading:', error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 mb-[70px] ">
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
        <div className="flex items-center  justify-center">
          {/* Main Div */}
          <div className="w-full max-w-4xl bg-white flex justify-between items-center py-[8px] px-[20px] boarder-[#E2E4E9] ">
            {/* Text on the Left */}
            <h1 className="text-2xl font-[500px] text-[16px] ">Your Photos</h1>

            {/* Replaced button with Button component */}
            <Button 
              width="w-auto"
              className="bg-[#375DFB] hover:bg-[#2440c4] text-[14px] font-[500] py-2 px-6"
            >
              Recheck
            </Button>
          </div>
        </div>
      </div>
      {data.length !== 0 ? (
       <div className="grid grid-cols-3 gap-1 max-w-4xl mx-auto px-4 mt-4">
       {data.map((item) => (
         <div className="bg-white rounded-lg overflow-hidden" key={item.id}>
           <Image 
             onClick={() => Viewpost(item)} 
             src={item.image} 
             alt="Post" 
             className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
           />
         </div>
       ))}
     </div>
      ) : (
        <div className="">
          <div className="flex flex-col items-center justify-center p-6 bg-[#F6F8FA] w-full">
            <p className="text-[#0A0D14] text-[18px] font-[500] text-center">
              Oops! Our AI couldn't find any Highlights for you yet.
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
      )}
      

{/* <div>
  <Marquee3D />
</div> */}

      {/* Modal */}
      {showModal && selectedPost && (
        <div 
          className="fixed inset-0 flex-col gap-3 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-4xl w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 
                transform transition-all duration-300 hover:rotate-90"
            >
              <X size={24} />
            </button>
            <div className="relative aspect-square w-full bg-white/5 backdrop-blur-sm rounded-lg 
              overflow-hidden shadow-2xl transform transition-all duration-1000">
              <Image
                src={selectedPost.image}
                alt="Selected post"
                className="w-full h-full object-contain transition-all duration-800 
                  hover:scale-105"
                width={1000}
                height={1000}
                priority
              />
            </div>
          </div>
          <div className="w-full max-w-4xl px-4 flex justify-between items-center">
            <div>
              <p className="text-white text-[14px] font-[500]">{selectedPost.date}</p>
            </div>
            <div className="flex items-center gap-5 justify-center">
              <button 
                onClick={() => handleShare(selectedPost.image)}
                className="text-white hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
              >
                <Share2 size={24} />
              </button>
              <button 
                onClick={() => handleDownload(selectedPost.image)}
                className="text-white hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
              >
                <CloudDownload size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};

export default Home;