'use client'

import React,{ useState } from 'react';
import { HomeIcon, HighlightIcon, ContributeIcon, PostIcon, NotificationIcon } from '../../assets';
import Image from 'next/image';
import Link from 'next/link';
const NavigationBar = () => {
  const [activeTab, setActiveTab] = useState('highlights');
  
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon,path:'/home' },
    { id: 'highlights', label: 'Highlights', icon: HighlightIcon,path:'/highlight' },
    { id: 'contribute', label: 'Contribute', icon: ContributeIcon,path:'/contribute' },
    { id: 'post', label: 'Post', icon: PostIcon,path:'/post' },
    { id: 'notifications', label: 'Notifications', icon: NotificationIcon,path:'/notifications' }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <nav className="flex justify-between items-center px-4 py-2">
        {navItems.map((item) => (
          <Link href={item.path} key={item.id}>
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
              
            
            </div>
            <span className={`text-xs mt-1 ${
              activeTab === item.id 
                ? 'text-blue-500 font-medium' 
                : 'text-gray-600'
            }`}>
              {item.label}
            </span>
          </button>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavigationBar;