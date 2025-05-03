'use client'
import React, { useState, useEffect, useRef } from "react";
import { Banner, PenIcon, Post1, Post2, Post3, Profileimg } from "../assets";
import Banners from "../components/banner";
import AiInput from "../components/aiInput";
import Image from "next/image";
import Frame from "../assets/image/Frame.svg";
import EventHex from "../assets/icons/Vector (90).svg";
import ShineAI from "../assets/icons/Vector(16).svg";
import Navbar from "../components/navfooter";
import { CloudDownload, Share2, View, X } from "lucide-react";
import Button from '../components/button'
import Masonry from 'react-masonry-css';
import Instance from '../instance'
import { useEvent } from '../context';
import Loader from '../components/loader'

// Add image compression utility without changing any existing functionality
const compressImage = (base64Image, maxSizeMB = 0.5) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      // Create canvas
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Set canvas dimensions (maintain original size but limit very large images)
      if (width > 800 || height > 800) {
        const aspectRatio = width / height;
        if (width > height) {
          width = 800;
          height = width / aspectRatio;
        } else {
          height = 800;
          width = height * aspectRatio;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw image to canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Start with a lower quality to reduce size
      let quality = 0.7;
      let compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      
      // Convert base64 size to bytes (approximate)
      const getBase64SizeInBytes = (base64String) => {
        const base64WithoutHeader = base64String.split(',')[1];
        return (base64WithoutHeader.length * 3) / 4;
      };
      
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      
      // Progressively lower quality until under max size
      while (getBase64SizeInBytes(compressedBase64) > maxSizeBytes && quality > 0.1) {
        quality -= 0.1;
        compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      }
      
      resolve(compressedBase64);
    };
    
    img.onerror = error => {
      reject(error);
    };
    
    img.src = base64Image;
  });
};

// Fixed Marquee3D Component
const Marquee3D = () => {
  // Sample items for the marquee - replace with your actual implementation
  const items = Array.from({ length: 10 }, (_, index) => ({
    id: `marquee-item-${index}`,
    content: `Item ${index + 1}`
  }));

useEffect(() => {
  const fetchUser = async () => {
    try {
      // Get the selfie from sessionStorage
      const storedSelfie = sessionStorage.getItem('userSelfie');
      
      // Compress the image if it exists
      let imageToSend = null;
      if (storedSelfie) {
        try {
          imageToSend = await compressImage(storedSelfie, 2);
        } catch (err) {
          console.error('Error compressing image in Marquee3D:', err);
          imageToSend = storedSelfie; // Fallback to original if compression fails
        }
      }
      
      // Make API request with the compressed selfie
      const res = await Instance.post('/mobile/instasnap/match', {
       
      });
      console.log(res,'data gotted');
    } catch (error) {
      console.error('Error fetching user match:', error);
    }
  };
  
  fetchUser();
}, [])

  return (
    <div className="marquee-container">
      <div className="marquee">
        {items.map((item) => (
          // Added key prop to fix the React warning
          <div key={item.id} className="marquee-item">
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const { event,registredUser } = useEvent();
  console.log('Component mounted with:', { event, registredUser });

  const [isClient, setIsClient] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userSelfie, setUserSelfie] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [apiImages, setApiImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    console.log('useEffect triggered with:', { isClient, event, registredUser });
    setIsClient(true);
    const storedSelfie = sessionStorage.getItem('userSelfie');
    if (storedSelfie) {
      setUserSelfie(storedSelfie);
    }

    // Only make the API call if we have both event and registredUser and we're on the client side
    if (isClient && event && registredUser) {
      const matchImages = async () => {
        console.log(event,registredUser,'event and registredUser');
        setIsLoading(true);
        
        try {
          const formData = new FormData();
          formData.append('eventId', event);
          formData.append('userId', registredUser);
          
          if (userSelfie) {
            // Convert base64 to blob
            const base64Response = await fetch(userSelfie);
            const blob = await base64Response.blob();
            formData.append('file', blob, 'selfie.jpg');
          }
          
          const response = await Instance.post(`/mobile/instasnap/match`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          if (response.data && response.data.FaceMatches) {
            setApiImages(response.data.FaceMatches.map(match => ({
              id: match.imageId,
              image: match.image,
              date: new Date(match.matchDate).toLocaleDateString()
            })));
          }
          console.log('Match API response:', response.data);
        } catch (error) {
          console.error('Error in matchImages:', error);
          // You might want to show an error message to the user here
        } finally {
          setIsLoading(false);
        }
      }

      matchImages();
    } else if (isClient) {
      console.warn('Missing required data for match API:', { event, registredUser });
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      // Cleanup any resources if needed
    };
  }, [event, registredUser, isClient]); 

  if (!isClient) {
    return null; // or a loading state
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {/* <Loader /> */}

        <h1>Loading...</h1>
      </div>
    );
  }

  // View post function (with cleanup)
  const viewPost = (post) => {
    // Reset any previous modal state to prevent race conditions
    if (showModal) {
      setShowModal(false);
      setTimeout(() => {
        setSelectedPost(post);
        setShowModal(true);
      }, 50);
    } else {
      setSelectedPost(post);
      setShowModal(true);
    }
  };

  // Close modal function with cleanup
  const closeModal = () => {
    setShowModal(false);
    // Use a timeout to remove the post after animation completes
    setTimeout(() => {
      setSelectedPost(null);
    }, 300); // Match this with your animation duration
  };

  // Handle image load status
  const handleImageLoad = (id) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  // Handle image loading error
  const handleImageError = (id) => {
    console.error(`Failed to load image ${id}`);
    // You might want to set a placeholder or fallback image here
  };

  // Share functionality with proper error handling
  const handleShare = async (imageUrl) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this photo!',
          text: 'Found this amazing photo on InstaSnap',
          url: imageUrl,
        });
      } else {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = imageUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Image URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      if (error.name !== 'AbortError') {
        // Only show error if it's not just the user canceling
        alert('Failed to share: ' + error.message);
      }
    }
  };

  // Download functionality with proper error handling
  const handleDownload = async (imageUrl) => {
    try {
      // Create a download link without fetching to avoid CORS issues
      const link = document.createElement('a');
      link.href = imageUrl;
      link.setAttribute('download', `instasnap-${Date.now()}.jpg`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading:', error);
      alert('Failed to download image. You may need to right-click and save manually.');
    }
  };

  // Masonry breakpoint columns
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 2
  };

  return (
    <div className="w-full flex flex-col gap-5 mb-[70px]">
      <div className="flex flex-col items-center justify-center">
        <Banners 
          profile={userSelfie || Profileimg} 
          Banner={Banner} 
    
          editIconimage={PenIcon}
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
      {apiImages.length !== 0 ? (
       <Masonry
         breakpointCols={breakpointColumnsObj}
         className="flex w-full max-w-4xl mx-auto px-4 mt-4 gap-1"
         columnClassName="bg-clip-padding"
       >
         {apiImages.map((item) => (
            <div className="bg-white rounded-lg overflow-hidden mb-1" key={item.id}>
            <div className="w-full relative">
              <div className="relative group w-full">
                <Image
                  onClick={() => viewPost(item)}
                  src={item.image}
                  alt={`Post ${item.id}`}
                  className="w-full h-auto cursor-pointer transition-none"
                  width={400}
                  height={400}
                  sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 33vw"
                  onLoad={() => handleImageLoad(item.id)}
                  onError={() => handleImageError(item.id)}
                  priority={true}
                  loading="eager"
                />
                {/* Black overlay that appears on hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-none cursor-pointer"></div>
              </div>
            </div>
          </div>
         ))}
       </Masonry>
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center p-8 bg-[#F6F8FA] rounded-lg">
            <p className="text-[#0A0D14] text-[18px] font-[500] text-center mb-4">
              Oops! Our AI couldn't find any photos of you yet.
            </p>
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 mb-6">
              <Image
                src={Frame}
                alt="No photos found"
                className="w-full h-full object-contain"
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col items-center w-full max-w-xs">
              <p className="font-[500] text-[14px] text-[#525866] mb-4 text-center">Don't worry! This could be because:</p>
              <ul className="list-disc pl-5 text-[#525866] w-full space-y-2">
                <li className="font-[400] text-[12px]">Your photos are still processing</li>
                <li className="font-[400] text-[12px]">
                  You might be early – new photos are added regularly
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center mt-8">
              <p className="text-[12px] text-[#525866] font-[500] flex items-center">
                Powered By
                <span className="flex items-center ml-2">
                  <Image src={EventHex} alt="EventHex" className="w-4 h-4 mr-1" />
                  EventHex
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal with cleanup handling */}
      {showModal && selectedPost && (
        <div
          ref={modalRef}
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
            <div className="relative bg-white/5 backdrop-blur-sm rounded-lg
              overflow-hidden shadow-2xl transform transition-all duration-300"
              style={{ aspectRatio: '1 / 1' }}
            >
              {selectedPost && (
                <div className="w-full h-full flex items-center justify-center">
                  {/* Use regular img tag instead of Next.js Image to avoid layout issues */}
                  <img
                    src={selectedPost.image}
                    alt="Selected post"
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                    loading="eager"
                    onError={(e) => {
                      console.error('Error loading modal image');
                      e.target.src = 'https://via.placeholder.com/400?text=Image+Error';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full max-w-4xl px-4 flex justify-between items-center">
            <div>
              <p className="text-white text-[14px] font-[500]">{selectedPost?.date}</p>
            </div>
            <div className="flex items-center gap-5 justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(selectedPost.image);
                }}
                className="text-white hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
              >
                <Share2 size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(selectedPost.image);
                }}
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
