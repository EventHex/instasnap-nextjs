'use client'

import React,{ useState } from 'react';
// import { Home, Image, FileText, Share2, Bell } from 'lucide-react';
import { HomeIcon, HighlightIcon, ContributeIcon, PostIcon, NotificationIcon } from '../../assets';
import Image from 'next/image';
const NavigationBar = () => {
  const [activeTab, setActiveTab] = useState('highlights');
  
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'highlights', label: 'Highlights', icon: HighlightIcon },
    { id: 'contribute', label: 'Contribute', icon: ContributeIcon },
    { id: 'post', label: 'Post', icon: PostIcon },
    { id: 'notifications', label: 'Notifications', icon: NotificationIcon }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <nav className="flex justify-between items-center px-4 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className="flex flex-col items-center relative"
            onClick={() => setActiveTab(item.id)}
          >
            <div className={`p-2 rounded-full ${
              activeTab === item.id 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600'
            }`}>
              <Image src={item.icon} alt={item.label} width={20} height={20} />
              
              {/* Notification dot for Bell icon */}
              {item.id === 'notifications' && (
                <div className="absolute top-0 right-0">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              )}
            </div>
            <span className={`text-xs mt-1 ${
              activeTab === item.id 
                ? 'text-blue-500 font-medium' 
                : 'text-gray-600'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationBar;