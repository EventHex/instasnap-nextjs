"use client";
import React, { useState, useEffect, useRef } from "react";
import { Banner, EventHex,ShineAI, Frame,PenIcon,  Profileimg } from "../assets";
import Banners from "../components/banner";
import AiInput from "../components/aiInput";
import Image from "next/image";
import Navbar from "../components/navfooter";
import { CloudDownload, Share2, View, X } from "lucide-react";
import Button from "../components/button";
import Masonry from "react-masonry-css";
import Instance from "../instance";
import { useEvent } from "../context";
import Loader from "../components/loader";
import { useDispatch, useSelector } from 'react-redux';
import { setImages, setLoading, setError } from '../redux/slices/imagesSlice';

// Add image compression utility without changing any existing functionality
const compressImage = (base64Image, maxSizeMB = 0.5) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      // Create canvas
      const canvas = document.createElement("canvas");
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
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Start with a lower quality to reduce size
      let quality = 0.7;
      let compressedBase64 = canvas.toDataURL("image/jpeg", quality);

      // Convert base64 size to bytes (approximate)
      const getBase64SizeInBytes = (base64String) => {
        const base64WithoutHeader = base64String.split(",")[1];
        return (base64WithoutHeader.length * 3) / 4;
      };

      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      // Progressively lower quality until under max size
      while (
        getBase64SizeInBytes(compressedBase64) > maxSizeBytes &&
        quality > 0.1
      ) {
        quality -= 0.1;
        compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      }

      resolve(compressedBase64);
    };

    img.onerror = (error) => {
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
    content: `Item ${index + 1}`,
  }));



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
  const [isClient, setIsClient] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userSelfie, setUserSelfie] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [apiImages, setApiImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const { event, registredUser, cachedImages, setCachedImages, lastFetchTime, setLastFetchTime } = useEvent();
  const modalRef = useRef(null);

  // Redux hooks
  const dispatch = useDispatch();
  const { images: apiImagesRedux, isLoading: isLoadingRedux } = useSelector((state) => state.images);

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchFaceMatch = async () => {
    const eventId = sessionStorage.getItem("eventId");
    const userId = sessionStorage.getItem("userId");
    const image = sessionStorage.getItem("userSelfie");
    
    if (!eventId || !userId) {
      console.error("Missing required data:", { eventId, userId });
      alert("Missing required data. Please try again.");
      setIsLoading(false);
      setShowLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setShowLoading(true);
      const formData = new FormData();
      formData.append("eventId", eventId);
      formData.append("userId", userId);

      if (image) {
        // Convert base64 to blob
        const base64Response = await fetch(image);
        const blob = await base64Response.blob();
        formData.append("file", blob, "selfie.jpg");
      }

      const response = await Instance.post(
        `/mobile/instasnap/match`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.FaceMatches) {
        const newImages = response.data.FaceMatches.map((match) => ({
          id: match.imageId,
          image: match.image,
          date: new Date(match.matchDate).toLocaleDateString(),
        }));
        setApiImages(newImages);
        // Store in context and sessionStorage
        setCachedImages(newImages);
        setLastFetchTime(Date.now());
        sessionStorage.setItem('cachedImages', JSON.stringify(newImages));
        sessionStorage.setItem('lastFetchTime', Date.now().toString());
      } else {
        console.error("No FaceMatches found in response:", response.data);
      }
      console.log("Match API response:", response.data);
    } catch (error) {
      console.error("Error in fetchFaceMatch:", error);
      alert("Failed to match images. Please try again.");
    } finally {
      setIsLoading(false);
      setShowLoading(false);
    }
  };

  // Handle API call when event and registredUser are available
  useEffect(() => {
    if (!isClient) return;

    const eventId = sessionStorage.getItem("eventId");
    const userId = sessionStorage.getItem("userId");
    
    if (eventId && userId) {
      // Check if we have cached images and if they're less than 5 minutes old
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
      const now = Date.now();
      
      if (cachedImages && cachedImages.length > 0 && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
        setApiImages(cachedImages);
        setIsLoading(false);
        setShowLoading(false);
      } else {
        fetchFaceMatch();
      }
    } else {
      console.error("Missing eventId or userId in sessionStorage");
      setIsLoading(false);
      setShowLoading(false);
    }
  }, [isClient, event, registredUser]);

  

  // Handle userSelfie from sessionStorage
  useEffect(() => {
    if (isClient) {
      const storedSelfie = sessionStorage.getItem("userSelfie");
      if (storedSelfie) {
        setUserSelfie(storedSelfie);
      }
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  if (showLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // View post function (keeping your existing implementation)
  const viewPost = (post) => {
    console.log("function working");

    // Set the selected post first
    setSelectedPost(post);

    // Then show the modal with a slight delay to ensure state is updated
    setTimeout(() => {
      setShowModal(true);
    }, 10);
  };

  // Fixed closeModal function
  const closeModal = () => {
    setShowModal(false);

    // Use a timeout to remove the post after animation completes
    setTimeout(() => {
      setSelectedPost(null);
    }, 300); // Match this with your animation duration
  };

  // Handle image load status
  const handleImageLoad = (id) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
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
          title: "Check out this photo!",
          text: "Found this amazing photo on InstaSnap",
          url: imageUrl,
        });
      } else {
        // Fallback
        const tempInput = document.createElement("input");
        tempInput.value = imageUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("Image URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      if (error.name !== "AbortError") {
        // Only show error if it's not just the user canceling
        alert("Failed to share: " + error.message);
      }
    }
  };

  // Download functionality with proper error handling
  const handleDownload = async (imageUrl) => {
    try {
      // Create a new XMLHttpRequest to fetch the image
      const xhr = new XMLHttpRequest();
      xhr.open("GET", imageUrl, true);
      xhr.responseType = "blob";

      xhr.onload = function () {
        if (this.status === 200) {
          // Create a blob URL from the response
          const blob = new Blob([this.response]);
          const blobUrl = window.URL.createObjectURL(blob);

          // Create a download link
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = `instasnap-${Date.now()}.jpg`;

          // Append to body, click, and clean up
          document.body.appendChild(link);
          link.click();

          // Clean up
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        } else {
          console.error("Error downloading image:", this.statusText);
          alert("Failed to download image. Please try again later.");
        }
      };

      xhr.onerror = function () {
        console.error("Network error occurred while downloading");
        alert(
          "Network error. Please try again or right-click and save manually."
        );
      };

      // Send the request
      xhr.send();
    } catch (error) {
      console.error("Error downloading:", error);
      alert(
        "Failed to download image. You may need to right-click and save manually."
      );
    }
  };

  // Masonry breakpoint columns
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 2,
  };

  return (
    <div className="w-full flex flex-col gap-5 mb-[70px]">
      <div className="flex flex-col items-center justify-center">
        <Banners
          profile={userSelfie || Profileimg}
          Banner={Banner}
          // Banner={Bannertest}
          editIconimage={PenIcon}
          
        />

        <div className="max-w-md mt-16">
          <AiInput
            icon={ShineAI}
            message={
              apiImages.length > 0
                ? `Our AI found ${apiImages.length} photos of you`
                : "Our AI couldn't find any photos of you"
            }
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
              onClick={fetchFaceMatch}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Recheck"}
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
            <div
              className="bg-white rounded-lg overflow-hidden mb-11"
              key={`masonry-item-${item.id}`}
            >
              <div className="w-full relative">
                <div
                  className="relative group w-full cursor-pointer"
                  onClick={() => {
                    console.log("Image container clicked");
                    viewPost(item);
                  }}
                >
                  {item.image && item.image !== '' ? (
                    <Image
                      src={item.image}
                      alt={`Post ${item.id}`}
                      className="w-full h-auto transition-none"
                      width={400}
                      height={400}
                      sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 33vw"
                      onLoad={() => handleImageLoad(item.id)}
                      onError={() => handleImageError(item.id)}
                      priority={true}
                      loading="eager"
                    />
                  ) : (
                   ''
                  )}
                  {/* Black overlay that appears on hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-none"></div>
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
              <p className="font-[500] text-[14px] text-[#525866] mb-4 text-center">
                Don't worry! This could be because:
              </p>
              <ul className="list-disc pl-5 text-[#525866] w-full space-y-2">
                <li className="font-[400] text-[12px]">
                  Your photos are still processing
                </li>
                <li className="font-[400] text-[12px]">
                  You might be early – new photos are added regularly
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center mt-8">
              <p className="text-[12px] text-[#525866] font-[500] flex items-center">
                Powered By
                <span className="flex items-center ml-2">
                  <Image
                    src={EventHex}
                    alt="EventHex"
                    className="w-4 h-4 mr-1"
                  />
                  EventHex
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal implementation (keeping your existing structure) */}
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
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                closeModal();
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10
                transform transition-all duration-300 hover:rotate-90"
            >
              <X size={24} />
            </button>
            <div
              className="relative bg-white/5 backdrop-blur-sm rounded-lg
              overflow-hidden shadow-2xl transform transition-all duration-300"
              style={{ aspectRatio: "1 / 1" }}
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
                      console.error("Error loading modal image");
                      e.target.src =
                        "https://via.placeholder.com/400?text=Image+Error";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full max-w-4xl px-4 flex justify-between items-center">
            <div>
              <p className="text-white text-[14px] font-[500]">
                {selectedPost?.date}
              </p>
            </div>
            <div className="flex items-center gap-5 justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  handleShare(selectedPost.image);
                }}
                className="text-white hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
              >
                <Share2 size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
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
