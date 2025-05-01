'use client'
import React from 'react'
import { EventHeader } from '../components/header'
// Keep image imports if used by EventHeader or NavFooter, otherwise remove
// import { Post1, Post2, Post3 } from '../assets' 
import Image from 'next/image'
import NavFooter from '../components/navfooter'
import Link from 'next/link'
import Masonry from 'react-masonry-css'; // Import Masonry

const Page = () => {
  // Generate data with placeholder images of varying heights
  const postData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    // Use a fixed width but random height (e.g., between 200 and 500)
    image: `https://picsum.photos/seed/${i + 1}/300/${Math.floor(Math.random() * 301) + 200}`, 
    date: `2024-0${Math.floor(i / 5) + 1}-${String(i % 28 + 1).padStart(2, '0')}`
  }));

  // Masonry breakpoint columns
  const breakpointColumnsObj = {
    default: 4, // Default to 4 columns
    1100: 3,    // 3 columns for screens >= 1100px
    700: 2,     // 2 columns for screens >= 700px
    500: 2      // 2 columns for screens < 700px (Mobile)
  };

  return (
    // Add padding and flex structure for header/footer
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full max-w-[768px] mx-auto">
        {/* Sticky Header */}
        <div className='sticky top-0 z-10 bg-white shadow-sm w-full'>
          <div className="px-4 w-full mx-auto">
             <EventHeader />
          </div>
        </div> 
        
        {/* Scrollable Content Area with Masonry */}
        <div className="flex-grow p-2 md:p-4 mb-[70px] w-full">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-full gap-2 md:gap-4"
            columnClassName="bg-clip-padding"
          >
            {/* Map over postData to render items */}
            {postData.map((post) => (
              <Link 
                key={post.id} 
                href={`/highlight/${post.id}`}
                className="block relative cursor-pointer group overflow-hidden rounded-lg mb-2 md:mb-4 shadow hover:shadow-md transition-shadow duration-300"
              >
                <Image 
                  src={post.image} 
                  alt={`Highlight ${post.id}`}
                  width={300} 
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
                  sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  priority={post.id <= 8}
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                {/* Date text with improved transition */}
                <p className="absolute bottom-2 left-2 text-white text-xs font-medium opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">{post.date}</p>
              </Link>
            ))}
          </Masonry>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 z-10 w-full">
          <NavFooter/>
        </div>
      </div>
    </div>

  )
}

export default Page