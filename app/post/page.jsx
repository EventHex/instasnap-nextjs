"use client";

import { Copy, ChevronLeft, Upload, Check } from "lucide-react";
import React, { useState } from "react";
import NavigationBar from "../components/navfooter";
import { Post1, Post2, Post3 } from "../assets";
import Button from "../components/button";
import Image from "next/image";
import { EventHeader } from "../components/header";

const SocialShare = () => {
  const [text, setText] = useState(
    "Can't wait to apply what I learned at the KEDDA Dental Expo! 🦷✨ The future of dental technology is bright. 🚀 #KeddaDentalExpo #Learning 🇺🇸 #InternationalDentalTechExpo"
  );
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
    { id: 1, src: Post1, selected: true },
    { id: 2, src: Post2, selected: false },
    { id: 3, src: Post3, selected: false },
  ]);

  const togglePhotoSelection = (id) => {
    setPhotos(
      photos.map((photo) =>
        photo.id === id ? { ...photo, selected: !photo.selected } : photo
      )
    );
  };

  const selectedCount = photos.filter((photo) => photo.selected).length;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg">
      <div className="p-4 border-gray-100">
        <div className="flex justify-center items-center">
        <EventHeader  name={'post'} />

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
      <div>
        <div className="max-w-md mx-auto bg-white rounded-lg ">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-medium text-gray-800">
                  Photos (max 3)
                </h2>
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
                <div
                  key={photo.id}
                  className="relative rounded-lg overflow-hidden border border-gray-200"
                >
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
                      photo.selected
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-500"
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
            <div className="flex w-full  gap-5 mt-5 flex-col ">
              <Button
              buttonName={'Choose'}
              className="w-full  text-black  border-2 border-gray-200 "
                variant="outline"
              
              />
           
         

              <Button
              buttonName={'Post via LinkedIn'}
              className="w-full"
                variant="default"
             />
               
         
            </div>
          </div>
        </div>
      </div>
      <div>
        <NavigationBar />
      </div>
    </div>
  );
};

export default SocialShare;
