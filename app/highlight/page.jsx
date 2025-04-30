'use client'
import React from 'react'
import { EventHeader } from '../components/header'
import { Post1, Post2, Post3 } from '../assets'
import Image from 'next/image'
import NavFooter from '../components/navfooter'
import Link from 'next/link'

const Page = () => {
  const postData = [
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
    },
    {
      id: 5,
      image: Post2,
    },{
      id: 5.5, // Changed from 5 to 5.5 to make it unique
      image: Post2,
    },
    {
      id: 6,
      image: Post3,
    },
    {
      id: 7,
      image: Post1,
    },
    {
      id: 8,
      image: Post2,
    },
    {
      id: 9,
      image: Post3,
    },
    {
      id: 10,
      image: Post1,
    },
    {
      id: 11,
      image: Post2,
    },  
    {
      id: 12,
      image: Post3,
    },
    {
      id: 13, 
      image: Post1,
    },
    {
      id: 14,
      image: Post2,
    },
    {
      id: 15,
      image: Post3,
    },
    {
      id: 16,
      image: Post1,
    },
    {
      id: 17,
      image: Post2,
    },
    {
      id: 18,
      image: Post3,
    },
    {
      id: 19,
      image: Post1,
    },
    {
      id: 20,
      image: Post2,
    },
  ]

  return (
    <div className="">
      <div className='flex justify-center items-center py-2'>
        <EventHeader  name={'highlight'} />
      </div> 
      
      <div className="grid grid-cols-3 mb-[60px] gap-1">
        {postData.map((post) => (
          <Link 
            key={post.id} 
            href={`/highlight/${post.id}`}
            className="aspect-square relative cursor-pointer group"
          >
            <Image 
              src={post.image} 
              alt={`Post ${post.id}`}
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </Link>
        ))}
      </div>
      <NavFooter/>
    </div>
  )
}

export default Page