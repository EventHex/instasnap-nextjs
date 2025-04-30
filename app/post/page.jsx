'use client'

import {
  Copy,
  ChevronLeft,
  Upload,
  Check,
  CloudDownload,
  Image as ImageIcon,
  Linkedin,
  X as XIcon
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/navfooter';
import { Post1, Post2, Post3, LinkedIn } from '../assets';
import Button from '../components/button';
import Image from 'next/image';
import { EventHeader} from '../components/header';
// --- Mock Data for Modal --- 
const mockYourPhotos = Array.from({ length: 12 }, (_, i) => ({ 
    id: `my-${i + 1}`, 
    src: `https://picsum.photos/seed/mine${i + 1}/200/200` 
}));
const mockEventHighlights = Array.from({ length: 15 }, (_, i) => ({ 
    id: `hl-${i + 1}`, 
    src: `https://picsum.photos/seed/highlight${i + 1}/200/200` 
}));
// --- End Mock Data ---

const SocialShare = () => {
  const [text, setText] = useState("Can't wait to apply what I learned at the KEDDA Dental Expo! 🦷✨ The future of dental technology is bright. 🚀 #KeddaDentalExpo #Learning 📚 #InternationalDentalTechExpo");
  const [characterCount, setCharacterCount] = useState(text.length);
  const maxCharacters = 3000;

  // State for the main page photo selection (max 3)
  const [photos, setPhotos] = useState([]); // Start empty or with initial selection if needed

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Your Photos'); // 'Your Photos' or 'Event Highlights'
  const [modalSelectedPhotos, setModalSelectedPhotos] = useState({}); // Track selections within the modal {id: src}

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxCharacters) {
      setText(newText);
      setCharacterCount(newText.length);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // --- Main Page Photo Selection --- 
  // (This might be needed if you want to deselect directly on the main page)
  const toggleMainPhotoSelection = (id) => {
    setPhotos(currentPhotos => currentPhotos.filter(p => p.id !== id));
  };
  const selectedCount = photos.length; // Count based on the main photos array

  // --- Modal Logic --- 
  const openModal = () => {
     // Initialize modal selection based on current main page selection
    const initialModalSelection = photos.reduce((acc, photo) => {
      acc[photo.id] = photo.src;
      return acc;
    }, {});
    setModalSelectedPhotos(initialModalSelection);
    setIsModalOpen(true);
    setActiveTab('Your Photos'); // Default tab
  };
  const closeModal = () => setIsModalOpen(false);

  const handleModalPhotoSelect = (id, src) => {
    setModalSelectedPhotos(prev => {
      const newSelection = { ...prev };
      if (newSelection[id]) {
        delete newSelection[id]; // Deselect
      } else {
         // Allow selecting more than 3 in modal, but enforce on Done
        newSelection[id] = src; // Select
      }
      return newSelection;
    });
  };

  const handleModalDone = () => {
    // Convert selected modal photos object back to array, respecting max 3
    const selectedArray = Object.entries(modalSelectedPhotos)
      .map(([id, src]) => ({ id, src }))
      .slice(0, 3); // Enforce max 3 limit here
    setPhotos(selectedArray);
    closeModal();
  };

  const getModalPhotosForTab = () => {
    return activeTab === 'Your Photos' ? mockYourPhotos : mockEventHighlights;
  };
  // --- End Modal Logic --- 

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleDownload = () => {
    console.log('Download initiated for selected photos:', photos.filter(p => p.selected));
  };

  const handlePost = () => {
    console.log('Post via LinkedIn action triggered');
  };

  return (
    <div className="flex flex-col max-w-md mx-auto bg-white h-screen">
      <div className="p-4 flex  items-center border-b border-gray-200 sticky top-0 bg-white z-10">
        <button onClick={handleGoBack} className="p-1 mr-4">
          <ChevronLeft size={24} strokeWidth={2} className="text-gray-700" />
        </button>
        <div className="w-full flex justify-center  ">
          <EventHeader name={"Social Share"}/>
        </div>
        {/* <h1 className="text-lg font-semibold text-center flex-grow text-gray-800">Social Share</h1> */}
      </div>

      <div className="flex-grow overflow-y-auto p-4 pb-[100px]">
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-800 text-sm font-medium">Share your thoughts</span>
            <button onClick={handleCopy} className="flex items-center text-blue-600 text-sm font-medium p-1">
              <Copy size={16} className="mr-1" />
              Copy
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 mb-3">
            <textarea
              value={text}
              onChange={handleTextChange}
              className="w-full bg-transparent outline-none resize-none text-sm text-gray-800 min-h-[80px]"
              maxLength={maxCharacters}
              placeholder="What's on your mind?"
            ></textarea>
            <div className="text-right text-xs text-gray-500 mt-1">
              {characterCount}/{maxCharacters}
            </div>
          </div>

          <button className="w-full py-2.5 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="mr-2">✨</span>
            Rewrite with AI
          </button>
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium text-gray-800">Photos (max 3)</h2>
            <button onClick={handleDownload} className="flex items-center text-blue-600 font-medium text-sm p-1">
              <CloudDownload size={16} className="mr-1" />
              Download
            </button>
          </div>

          <div className={`grid grid-cols-3 gap-2 mb-4 ${selectedCount === 0 ? 'min-h-[80px] bg-gray-100 rounded-lg flex items-center justify-center' : ''}`}>
            {selectedCount === 0 && (
              <p className="text-xs text-gray-500">No photos selected</p>
            )}
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative rounded-lg overflow-hidden border border-gray-200 aspect-square cursor-pointer group"
                onClick={() => toggleMainPhotoSelection(photo.id)}
              >
                <Image
                  src={photo.src}
                  alt={`Selected Photo ${photo.id}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <XIcon size={24} className="text-white"/>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={openModal}
            variant="outline"
            className="w-full text-black mb-3"
            // icon={<ImageIcon size={18} className="mr-2" strokeWidth={1.5} />}
            
          >
            Choose
          </Button>

          <Button
            onClick={handlePost}
            variant="default"
            className="w-full bg-blue-600 hover:bg-blue-700"
            icon={LinkedIn }
            // icon={<Linkedin size={18} className="mr-2" fill="white" strokeWidth={0} />}
          >
            Post via LinkedIn
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/40 animate-fadeIn backdrop-blur-sm" 
            onClick={closeModal}
          />

          <div 
            className="relative z-50 bg-white rounded-t-2xl pt-4 pb-6 max-h-[80vh] flex flex-col animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 pb-2 border-b border-gray-200">
              <button onClick={closeModal} className="p-2 text-gray-500 hover:text-gray-800">
                <XIcon size={20}/>
              </button>
              <h3 className="text-base font-semibold">Choose Photos</h3>
              <button 
                onClick={handleModalDone} 
                className={`text-sm font-semibold p-2 ${Object.keys(modalSelectedPhotos).length > 0 ? 'text-blue-600' : 'text-gray-400 cursor-not-allowed'}`}
                disabled={Object.keys(modalSelectedPhotos).length === 0}
              >
                Done ({Object.keys(modalSelectedPhotos).length})
              </button>
            </div>
            
            <div className="flex border-b border-gray-200 mt-2">
              <button 
                className={`flex-1 py-2 px-4 text-sm font-medium text-center ${activeTab === 'Your Photos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('Your Photos')}
              >
                Your Photos
              </button>
              <button 
                className={`flex-1 py-2 px-4 text-sm font-medium text-center ${activeTab === 'Event Highlights' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('Event Highlights')}
              >
                Event Highlights
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-4 pt-4">
              <div className="grid grid-cols-3 gap-2">
                {getModalPhotosForTab().map((photo) => {
                  const isSelected = !!modalSelectedPhotos[photo.id];
                  return (
                    <div 
                      key={photo.id} 
                      className={`relative rounded-md overflow-hidden aspect-square cursor-pointer border-2 ${isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-transparent'}`}
                      onClick={() => handleModalPhotoSelect(photo.id, photo.src)}
                    >
                      <Image 
                        src={photo.src} 
                        alt={activeTab === 'Your Photos' ? `My photo ${photo.id}` : `Highlight ${photo.id}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 33vw"
                      />
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow">
                          <Check size={12} className="text-white" strokeWidth={3}/>
                        </div>
                      )}
                      {isSelected && <div className="absolute inset-0 bg-white/20"></div>}
                    </div>
                  );
                })}
              </div>
            </div>

          </div> 
        </div>
      )}

      <div className="sticky bottom-0 w-full bg-white z-10 border-t border-gray-100">
        <NavigationBar />
      </div>
    </div>
  );
};


export default SocialShare;