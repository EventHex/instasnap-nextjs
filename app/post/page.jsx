'use client'

import { Copy } from 'lucide-react';
import React, { useState } from 'react';

const SocialShare = () => {
  const [text, setText] = useState("Can't wait to apply what I learned at the KEDDA Dental Expo! 🦷✨ The future of dental technology is bright. 🚀 #KeddaDentalExpo #Learning 🇺🇸 #InternationalDentalTechExpo");
  const [characterCount, setCharacterCount] = useState(169);
  const maxCharacters = 3000;

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setCharacterCount(newText.length);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg ">
      <div className="p-4  border-gray-100">
        <div className="flex items-center">
          <button className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-center flex-grow">Social Share</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-800 text-sm font-medium">Share your thoughts</span>
          <button className="text-blue-500 flex gap-1 font-medium">
         <span><Copy size={20}   strokeWidth={1} /></span>   Copy
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
    </div>
  );
};

export default SocialShare;