'use client'
import React from 'react'
import { EventHeader } from '../../components/header'
import { Post1, Post2, Post3 } from '../../assets'
import Image from 'next/image'
import NavFooter from '../../components/navfooter'
import { ArrowLeft, CloudDownload, Heart, Share2, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DetailsPage = ({ params }) => {
  const router = useRouter()

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
      date: "2024-03-05",
    },
    {
      id: 4,
      image: Post1,
      date: "2024-02-01",
    },
    {
      id: 5,
      image: Post2,
      date: "2024-03-02",
    },
    {
      id: 5.5,
      image: Post2,
      date: "2024-03-05",
    },
    {
      id: 6,
      image: Post3,
      date: "2024-02-01",
    },
    {
      id: 7,
      image: Post1,
      date: "2024-03-02",
    },
    {
      id: 8,
      image: Post2,
      date: "2024-03-05",
    },
    {
      id: 9,
      image: Post3,
      date: "2024-02-01",
    },
    {
      id: 10,
      image: Post1,
      date: "2024-03-02",
    },
    {
      id: 11,
      image: Post2,
      date: "2024-03-05",
    },
    {
      id: 12,
      image: Post3,
      date: "2024-02-01",
    },
    {
      id: 13,
      image: Post1,
      date: "2024-03-02",
    },
    {
      id: 14,
      image: Post2,
      date: "2024-03-05",
    },
    {
      id: 15,
      image: Post3,
      date: "2024-02-01",
    },
    {
      id: 16,
      image: Post1,
      date: "2024-03-02",
    },
    {
      id: 17,
      image: Post2,
      date: "2024-03-05",
    },
    {
      id: 18,
      image: Post3,
      date: "2024-02-01",
    },
    {
      id: 19,
      image: Post1,
      date: "2024-03-02",
    },
    {
      id: 20,
      image: Post2,
      date: "2024-03-05",
    }
  ]

  // Find the selected post
  const selectedPost = allPosts.find(post => post.id === Number(params.id))
  const otherPosts = allPosts.filter(post => post.id !== Number(params.id))

  const handleBack = () => {
    router.back()
  }

  if (!selectedPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Image not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className='flex justify-between items-center py-2 px-4 bg-white shadow-sm'>
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <EventHeader />
        <div className="w-8" /> {/* Empty div for flex spacing */}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* User Info */}
          <div className="p-4 flex items-center border-b">
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
              <Image 
                src={selectedPost.image} 
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">User Name</h3>
              <p className="text-xs text-gray-500">{selectedPost.date}</p>
            </div>
          </div>

          {/* Image */}
          <div className="aspect-square relative">
            <Image 
              src={selectedPost.image} 
              alt={`Post ${selectedPost.id}`}
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
              priority
            />
          </div>

          {/* Actions */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="hover:text-red-500 transition-colors">
                  <Heart size={24} />
                </button>
                <button className="hover:text-blue-500 transition-colors">
                  <MessageCircle size={24} />
                </button>
                <button className="hover:text-green-500 transition-colors">
                  <Share2 size={24} />
                </button>
              </div>
              <button className="hover:text-blue-500 transition-colors">
                <CloudDownload size={24} />
              </button>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold">1,234 likes</p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Username</span>{" "}
                Beautiful capture of the moment! 📸✨
              </p>
              <p className="text-xs text-gray-500 mt-2">View all 56 comments</p>
            </div>
          </div>
        </div>

        {/* More Photos Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">More Photos</h2>
          <div className="grid grid-cols-3 gap-4">
            {otherPosts.slice(0, 6).map((post) => (
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