// 'use client'
// import React from 'react'
// import { EventHeader } from '../components/header'
// import { Post1, Post2, Post3 } from '../assets'
// import Image from 'next/image'
// import NavFooter from '../components/navfooter'
// import Link from 'next/link'

// const Page = () => {
//   const postData = [
//     {
//       id: 1,
//       image: Post1,
//       date: "2024-02-01",
//     },
//     {
//       id: 2,
//       image: Post2,
//       date: "2024-03-02",
//     },
//     {
//       id: 3,
//       image: Post3,
//       date: "2024-03-05",
//     },
//     {
//       id: 4,
//       image: Post1,
//     },
//     {
//       id: 5,
//       image: Post2,
//     },{
//       id: 5.5, // Changed from 5 to 5.5 to make it unique
//       image: Post2,
//     },
//     {
//       id: 6,
//       image: Post3,
//     },
//     {
//       id: 7,
//       image: Post1,
//     },
//     {
//       id: 8,
//       image: Post2,
//     },
//     {
//       id: 9,
//       image: Post3,
//     },
//     {
//       id: 10,
//       image: Post1,
//     },
//     {
//       id: 11,
//       image: Post2,
//     },  
//     {
//       id: 12,
//       image: Post3,
//     },
//     {
//       id: 13, 
//       image: Post1,
//     },
//     {
//       id: 14,
//       image: Post2,
//     },
//     {
//       id: 15,
//       image: Post3,
//     },
//     {
//       id: 16,
//       image: Post1,
//     },
//     {
//       id: 17,
//       image: Post2,
//     },
//     {
//       id: 18,
//       image: Post3,
//     },
//     {
//       id: 19,
//       image: Post1,
//     },
//     {
//       id: 20,
//       image: Post2,
//     },
//   ]

//   return (
//     <div className="">
//       <div className='flex justify-center items-center py-2'>
//         <EventHeader  name={'highlight'} />
//       </div> 
      
//       <div className="grid grid-cols-3 mb-[60px] gap-1">
//         {postData.map((post) => (
//           <Link 
//             key={post.id} 
//             href={`/highlight/${post.id}`}
//             className="aspect-square relative cursor-pointer group"
//           >
//             <Image 
//               src={post.image} 
//               alt={`Post ${post.id}`}
//               width={200}
//               height={200}
//               className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
//               priority
//             />
//             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
//           </Link>
//         ))}
//       </div>
//       <NavFooter/>
//     </div>
//   )
// }

// export default Page



'use client'
import React, { useState } from 'react';
import Image from 'next/image'; 
import NavigationBar from '../components/navfooter';
import { EventHeader } from '../components/header';
import { Placeholder, PotraitPlaceholder } from '../assets';
import { CloudDownload, Heart, HeartPlus, Share2 } from 'lucide-react';

const data = [
  {
    id: 1,
    image: Placeholder,
    alt: 'Placeholder',
    username: 'muhammed ajmal',
    profile: Placeholder,
  },
  {
    id: 2,
    image: Placeholder,
    alt: 'PotraitPlaceholder',
    username: 'john doe',
    profile: Placeholder,
  },
  {
    id: 3,
    image: Placeholder,
    alt: 'Placeholder',
    username: 'alex jones',
    profile: Placeholder,
  },
  {
    id: 4,
    image: Placeholder,
    alt: 'PotraitPlaceholder',
    username: 'jane smith',
    profile: Placeholder,
  },
  {
    id: 5,
    image: Placeholder,
    alt: 'Placeholder',
    username: 'kathryn jones',
    profile: Placeholder,
  },
]

const Page = () => {
  // Change to track likes for each item
  const [likedItems, setLikedItems] = useState({});

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

  return (
    <div className=""> 
      <div className="w-full flex justify-center font-inter items-center py-2">
        <EventHeader />
      </div>
      
      <div className="grid grid-cols-1 mb-[80px] gap-4">
       {data.map((item) => (
        <div key={item.id} className="w-full ">
          <div className='w-full px-1 py-2 flex gap-2 items-center'>
            <div className='rounded-full bg-gray-200 w-8 h-8'>
              <Image 
                width={32}
                height={32}
                className='rounded-full w-full h-full object-cover'
                src={item.profile}
                alt={item.alt}
                priority
              />
            </div>
            <div>
              <p>{item.username}</p>
            </div>
          </div>
          
          {/* Image container to prevent stacking */}
          <div className="relative w-full h-auto overflow-hidden">
            <Image 
              width={500}
              height={500}
              src={item.image}
              alt={item.alt}
              className="w-full h-auto"
            />
          </div>
          
          <div className='w-full flex p-2 justify-between items-center'>
            <div className=''>
              {likedItems[item.id] ? (
                <Heart 
                  color='red'  
                  fill='red'   // Added fill to make the heart solid/filled
                  onClick={() => toggleLike(item.id)} 
                  className="cursor-pointer"
                />
              ) : (
                <Heart 
                  onClick={() => toggleLike(item.id)} 
                  className="cursor-pointer"
                />
              )}
            </div>
            <div className='flex gap-2'>
              <Share2 
                onClick={() => handleShare(item.id, item.image.src)} 
                className="cursor-pointer hover:text-blue-600 transition-colors"
              />
              <CloudDownload 
                onClick={() => handleDownload(item.id, item.image.src, item.alt)}
                className="cursor-pointer hover:text-blue-600 transition-colors"
              />
            </div>
          </div>
        </div>
       ))}
      </div>
      
      <NavigationBar />
    </div>
  );
};

export default Page;