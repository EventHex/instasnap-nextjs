'use client'

import { Copy, ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';
import NavigationBar from '../components/navfooter';

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

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg">
      <div className="p-4 border-gray-100">
        <div className="flex items-center">
          <button 
            className="mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors" 
            onClick={handleGoBack}
            aria-label="Go back"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-xl font-semibold text-center flex-grow">Social Share</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-800 text-[14px] font-medium">Share your thoughts</span>
          <button className="text-blue-500 flex gap-1 items-center font-medium">
            <span><Copy size={20} strokeWidth={1} /></span> Copy
          </button>
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
        <NavigationBar/>
      </div>
    </div>
  );
};

export default SocialShare;