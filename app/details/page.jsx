'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; 
import NavigationBar from '../components/navfooter';
import { EventHeader } from '../components/header';
import { CloudDownload, Heart, Share2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import instance from '../instance';
import Loader from '../components/loader';

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [likedItems, setLikedItems] = useState({});
  const [highlightData, setHighlightData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHighlight = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const response = await instance(`event-highlight/${id}`);
        if (response.data.success) {
          const data = response.data.response;
          setHighlightData({
            id: data._id,
            image: `https://event-hex-saas.s3.amazonaws.com/${data.image}`,
            date: new Date(data.createdAt).toLocaleDateString(),
            username: data.username || 'User', // Fallback if username not available
            profile: data.profileImage || '/default-profile.png' // Fallback if profile image not available
          });
        }
      } catch (error) {
        console.error('Error fetching highlight:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighlight();
  }, [id]);

  const toggleLike = (id) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Share functionality with id
  const handleShare = async (id, imageUrl) => {
    try {
      console.log(`Sharing item ${id}`);
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this image!',
          text: 'I found this amazing image on InstaSnap',
          url: imageUrl || window.location.href,
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

  // Download functionality with id
  const handleDownload = async (id, imageUrl, alt) => {
    try {
      console.log(`Downloading item ${id}`);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `instasnap-${alt || 'image'}-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!highlightData) {
    return <div className="text-center p-4">Highlight not found</div>;
  }

  return (
    <div className=""> 
      <div className="w-full flex justify-center font-inter items-center py-2">
        <EventHeader />
      </div>
      
      <div className="grid grid-cols-1 mb-[80px] gap-4">
        <div className="w-full">
          <div className='w-full px-1 py-2 flex gap-2 items-center'>
            <div className='rounded-full bg-gray-200 w-8 h-8'>
              <Image 
                width={32}
                height={32}
                className='rounded-full w-full h-full object-cover'
                src={highlightData.profile}
                alt={highlightData.username}
                priority
              />
            </div>
            <div>
              <p>{highlightData.username}</p>
            </div>
          </div>
          
          {/* Image container to prevent stacking */}
          <div className="relative w-full h-auto overflow-hidden">
            <Image 
              width={500}
              height={500}
              src={highlightData.image}
              alt={`Highlight ${highlightData.id}`}
              className="w-full h-auto"
            />
          </div>
          
          <div className='w-full flex p-2 justify-between items-center'>
            <div className=''>
              {likedItems[highlightData.id] ? (
                <Heart 
                  color='red'  
                  fill='red'
                  onClick={() => toggleLike(highlightData.id)} 
                  className="cursor-pointer"
                />
              ) : (
                <Heart 
                  onClick={() => toggleLike(highlightData.id)} 
                  className="cursor-pointer"
                />
              )}
            </div>
            <div className='flex gap-2'>
              <Share2 
                onClick={() => handleShare(highlightData.id, highlightData.image)} 
                className="cursor-pointer hover:text-blue-600 transition-colors"
              />
              <CloudDownload 
                onClick={() => handleDownload(highlightData.id, highlightData.image, `highlight-${highlightData.id}`)}
                className="cursor-pointer hover:text-blue-600 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
      
      <NavigationBar />
    </div>
  );
};

export default Page;