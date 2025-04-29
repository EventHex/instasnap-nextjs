'use client'
import React from 'react'
import { EventHeader } from '../components/header'
import { Post1, Post2, Post3 } from '../assets'
import Image from 'next/image'

const Page = () => {
  const postData = [
    {
      id: 1,
      image: Post1,
    },
    {
      id: 2,
      image: Post2,
    },
    {
      id: 3,
      image: Post3,
    },
    {
      id: 4,
      image: Post1,
    },
    {
      id: 5,
      image: Post2,
    },{
      id: 5,
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
    
    
  ]

  return (
    <div className="">
      <div className='flex justify-center items-center py-2'>
      <EventHeader />

      </div>
      
     
      
      <div className="grid grid-cols-3 gap-4">
        {postData.map((post) => (
          <div key={post.id} className="aspect-square relative">
            <Image 
              src={post.image} 
              alt={`Post ${post.id}`}
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-lg"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page