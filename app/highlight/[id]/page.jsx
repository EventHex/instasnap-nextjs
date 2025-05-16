'use client'
import React, { useState, useEffect } from 'react'
import { EventHeader } from '../../components/header'
import Image from 'next/image'
import NavFooter from '../../components/navfooter'
import { ArrowLeft, Download, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import instance from '../../instance'
import Loader from '../../components/loader'

const DetailsPage = () => {
  const router = useRouter()
  const params = useParams()
  const [postData, setPostData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [userSelfie, setUserSelfie] = useState(null)
  const [imageId, setImageId] = useState(null)
  const [downloadError, setDownloadError] = useState(null)
  const [downloadCount, setDownloadCount] = useState(0)
  const [currentImageData, setCurrentImageData] = useState(null)
  const [shareStatus, setShareStatus] = useState('')

  useEffect(() => {
    setImageId(params.id);
  }, [params.id]);

  useEffect(() => {

    
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const selfie = sessionStorage.getItem("userSelfie");
        console.log("User selfie from session storage:", selfie);
        setUserSelfie(selfie)
        const event = sessionStorage.getItem("eventId");
        const response = await instance(
          `event-highlight?event=${event}&limit=30&skip=0`
        );
        console.log(response.data, 'response data');
        

        if (response.data.success) {
          const formattedData = response.data.response.map((item) => ({
            id: item._id,
            image: `https://event-hex-saas.s3.amazonaws.com/${item.image}`,
            date: new Date(item.createdAt).toLocaleDateString(),
            downloadCount: item.downloadCount || 0
          }));
          setPostData(formattedData);
          
          // Find and set current image data
          const currentImage = response.data.response.find(item => item._id === params.id);
          if (currentImage) {
            setCurrentImageData(currentImage);
            setDownloadCount(currentImage.downloadCount || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching highlights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [params.id]);

  const DownloadImage = async () => {
    try {
      if (!currentPost?.image) {
        console.error('No image URL available');
        return;
      }

      const response = await fetch(currentPost.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `instasnap-highlight-${currentPost.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      setDownloadError('Failed to download image. Please try again.');
    }
  };

  const handleBack = () => {
    router.back()
  }

  const handleLikeToggle = () => {
    setIsLiked(prev => !prev)
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share({
          title: 'Check out this photo!',
          text: 'Found this amazing photo on InstaSnap',
          url: currentPost.image
        });
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(currentPost.image);
        setShareStatus('Link copied to clipboard!');
        // Clear the status message after 2 seconds
        setTimeout(() => setShareStatus(''), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      if (error.name !== 'AbortError') {
        // Only show error if it's not just the user canceling
        setShareStatus('Failed to share. Please try again.');
        setTimeout(() => setShareStatus(''), 2000);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
    )
  }

  const currentPost = postData.find(post => post.id === params.id) || postData[0];

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No post found</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      <div className='flex justify-center items-center bg-white'>
        <EventHeader />
        <div className="w-8" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl overflow-hidden">
          {/* User Info */}
          <div className="p-2 flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
              {userSelfie && (
                <Image 
                  src={userSelfie} 
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">User Name</h3>
              <p className="text-xs text-gray-500">{currentPost.date}</p>
            </div>
          </div>

          {/* Image */}
          <div className="aspect-square relative">
            <Image 
              src={currentPost.image} 
              alt={`Post ${currentPost.id}`}
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
              priority
            />
          </div>

          {/* Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLikeToggle}
                  className="transition-colors"
                >
                  <Download />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="hover:text-green-500 transition-colors"
                >
                  <Share2 size={24} />
                </button>
              </div>
              <button 
                className="hover:text-blue-500 transition-colors"
                onClick={() => DownloadImage()}
              >
                <Download size={24} />
              </button>
            </div>
          
            <div className="flex items-center justify-between mt-2">
              {/* <p className="text-sm">
                <span className="text-gray-600">Downloads: </span>
                <span className="text-black font-medium">{downloadCount}</span>
              </p> */}
              <p className="text-sm">
                <span className="text-gray-600"> Count:</span>
                <span className="text-black font-medium">{postData.length}</span>
              </p>
            </div>
            {shareStatus && (
              <div className="absolute top-16 right-4 bg-gray-800 text-white px-4 py-2 rounded-md text-sm">
                {shareStatus}
              </div>
            )}
          </div>
        </div>

        {/* More Photos Section */}
        <div className="mt-8 mb-[90px]">
          <h2 className="text-xl font-semibold mb-4">More Photos</h2>
          <div className="grid grid-cols-3 gap-4">
            {postData.map((post) => (
              <Link 
                key={post.id} 
                href={`/highlight/${post.id}`}
                className="aspect-square relative cursor-pointer group rounded-xl overflow-hidden"
              >
                <Image 
                  src={post.image} 
                  alt={`Post ${post.id}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <NavFooter/>
    </div>
  )
}

export default DetailsPage 