'use client'
import React, { useEffect, useState } from 'react'
import { EventHeader } from '../../components/header'
import { Post1, Post2, Post3 } from '../../assets'
import Image from 'next/image'
import NavFooter from '../../components/navfooter'
import { CloudDownload, Share2, X } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

const DetailsPage = () => {
  const router = useRouter()
  const params = useParams()
  const [selectedPost, setSelectedPost] = useState(null)
  const [otherPosts, setOtherPosts] = useState([])

  const allPosts = [
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
    {
      id: 4,
      image: Post1,
      date: "2024-02-01",
    },
    // ... add all your posts here with dates
  ]

  useEffect(() => {
    if (!params?.id) return;
    
    const current = allPosts.find(post => post.id === Number(params.id))
    const others = allPosts.filter(post => post.id !== Number(params.id))
    
    setSelectedPost(current)
    setOtherPosts(others)
  }, [params?.id])

  // Handle click on other images
  const handleImageClick = (id) => {
    router.push(`/highlight/${id}`)
  }

  // Share functionality
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this photo!',
          text: 'Found this amazing photo on InstaSnap',
          url: window.location.href,
        })
      } else {
        // Fallback copy to clipboard
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  // Download functionality
  const handleDownload = async () => {
    if (!selectedPost) return
    try {
      const response = await fetch(selectedPost.image.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `instasnap-photo-${selectedPost.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading:', error)
    }
  }

  if (!selectedPost) return null

  return (
    <div className="min-h-screen">
      <div className='flex justify-center items-center py-2'>
        <EventHeader />
      </div>

      {/* Selected Image */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image 
            src={selectedPost.image} 
            alt={`Post ${selectedPost.id}`}
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-[14px] font-[500]">{selectedPost.date}</p>
          <div className="flex gap-4">
            <Share2 
              className="cursor-pointer hover:text-blue-500 transition-colors" 
              onClick={handleShare}
            />
            <CloudDownload 
              className="cursor-pointer hover:text-blue-500 transition-colors" 
              onClick={handleDownload}
            />
          </div>
        </div>
      </div>

      {/* Other Images Grid */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">More Photos</h2>
        <div className="grid grid-cols-3 gap-1 mb-[60px]">
          {otherPosts.map((post) => (
            <div 
              key={post.id} 
              className="aspect-square relative cursor-pointer"
              onClick={() => handleImageClick(post.id)}
            >
              <Image 
                src={post.image} 
                alt={`Post ${post.id}`}
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <NavFooter/>
    </div>
  )
}

export default DetailsPage 