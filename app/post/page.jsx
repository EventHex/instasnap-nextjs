'use client'

import { Copy, ChevronLeft, Upload, Check } from 'lucide-react';
import React, { useState } from 'react';
import NavigationBar from '../components/navfooter';
import { Post1, Post2, Post3 } from '../assets';
import Button from '../components/button'
import Image from 'next/image';

const SocialShare = () => {
  const [text, setText] = useState("Can't wait to apply what I learned at the KEDDA Dental Expo! 🦷✨ The future of dental technology is bright. 🚀 #KeddaDentalExpo #Learning 🇺🇸 #InternationalDentalTechExpo");
  const [characterCount, setCharacterCount] = useState(169);
  const maxCharacters = 3000;

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setCharacterCount(newText.length);
  };
  const handleGoBack = () => {
    // Using the browser's history API to go back to the previous page
    window.history.back();
  };


  const [photos, setPhotos] = useState([
    { 
      id: 1, 
      src: '/images/post1.jpg',
      selected: true 
    },
    { 
      id: 2, 
      src: '/images/post2.jpg', 
      selected: false 
    },
    { 
      id: 3, 
      src: '/images/post3.jpg', 
      selected: false 
    },
  ]);
  
  const togglePhotoSelection = (id) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, selected: !photo.selected } : photo
    ));
  };
  
  const selectedCount = photos.filter(photo => photo.selected).length;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg">
      <div className="p-4 border-gray-100">
        <div className="flex items-center">
          <Button isBack className="mr-4" variant="chevron" />
          <h1 className="text-xl font-semibold text-center flex-grow">Social Share</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-800 text-[14px] font-medium">Share your thoughts</span>
          <Button 
            variant="ghost" 
            icon={<Copy size={20} strokeWidth={1} />}
            className="text-blue-500"
          >
            Copy
          </Button>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
          <textarea
            value={text}
            onChange={handleTextChange}
            className="w-full bg-transparent outline-none resize-none"
            rows={4}
          ></textarea>
          <div className="text-right text-xs text-gray-500">
            {characterCount}/{maxCharacters}
          </div>
        </div>

        <button className="w-full py-2 border border-gray-200 rounded-lg text-gray-600 flex items-center justify-center">
          <span className="text-amber-400 mr-2">✨</span>
          Rewrite with AI
        </button>
      </div>
      <div>
      <div className="max-w-md mx-auto bg-white rounded-lg ">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-medium text-gray-800">Photos (max 3)</h2>
            <span className="text-sm text-gray-500">
              {selectedCount}/3 selected
            </span>
          </div>
          <button className="flex items-center text-blue-600 font-medium text-sm">
            <Upload size={16} className="mr-1" />
            Download
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image 
                src={photo.src} 
                alt={`Photo ${photo.id}`} 
                width={200}
                height={200}
                className="w-full h-24 object-cover"
                priority
              />
              <button
                className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                  photo.selected ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
                }`}
                onClick={() => togglePhotoSelection(photo.id)}
                disabled={!photo.selected && selectedCount >= 3}
              >
                {photo.selected ? (
                  <Check size={14} />
                ) : (
                  <span className="text-sm">{photo.id}</span>
                )}
              </button>
            </div>
          ))}
        </div>
<div className='flex gap-5 mt-5 flex-col '>
        <Button 
          variant="outline"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          }
        >
          Choose
        </Button>

        <Button 
          variant="default"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          }
        >
          Post via LinkedIn
        </Button>
        </div>
      </div>
    </div>
      </div>
      <div>
        <NavigationBar/>
      </div>
    </div>
  );
};

export default SocialShare;