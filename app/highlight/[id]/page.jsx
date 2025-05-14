'use client'
import React, { useState, useEffect } from 'react'
import { EventHeader } from '../../components/header'
import Image from 'next/image'
import NavFooter from '../../components/navfooter'
import { ArrowLeft, CloudDownload, Download, Heart, Share2 } from 'lucide-react'
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
  const [profileImage, setProfileImage] = useState(null)
  const [imageId, setImageId] = useState(null)
  const [downloadError, setDownloadError] = useState(null)
  const [downloadCount, setDownloadCount] = useState(0)
  const [currentImageData, setCurrentImageData] = useState(null)

  useEffect(() => {
    setImageId(params.id);
  }, [params.id]);

  useEffect(() => {
    console.log(imageId, 'image gotted');
  }, [imageId]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const profile = sessionStorage.getItem("profileImage");
        setProfileImage(profile)
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

  useEffect(() => {
    const fetchDownloadData = async () => {
      try {
        setDownloadError(null);
        const response = await instance.put(`/mobile/event-highlight/download?id=${imageId}`);
        console.log(response.data, 'download data');
        if (response.data.success) {
          setDownloadCount(response.data.response.downloadCount || 0);
        }
      } catch (error) {
        console.error("Error fetching download data:", error);
        setDownloadError(error.response?.data?.message || 'Failed to fetch download data');
      }
    };

    fetchDownloadData();
  }, [imageId]);

  const handleBack = () => {
    router.back()
  }

  const handleLikeToggle = () => {
    setIsLiked(prev => !prev)
  }

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
              {profileImage && (
                <Image 
                  src={profileImage} 
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
                <button className="hover:text-green-500 transition-colors">
                  <Share2 size={24} />
                </button>
              </div>
              <button 
                className="hover:text-blue-500 transition-colors"
                onClick={() => fetchDownloadData()}
              >
                <CloudDownload size={24} />
              </button>
            </div>
            {/* {downloadError && (
              <p className="text-red-500 text-sm mt-2">{downloadError}</p>
            )} */}
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