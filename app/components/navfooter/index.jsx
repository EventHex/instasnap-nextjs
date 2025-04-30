'use client'

import React, { useState, useEffect } from 'react';
import { HomeIcon, HighlightIcon, ContributeIcon, PostIcon, NotificationIcon } from '../../assets';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EventHexlogo } from '../../assets';
const NavigationBar = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');
  
  // Update active tab based on current pathname
  useEffect(() => {
    // Create a mapping between path segments and nav item IDs
    const pathToIdMap = {
      'home': 'home',
      'highlight': 'highlights',
      'contribute': 'contribute',
      'post': 'post',
      'notification': 'notifications'
    };
    
    const path = pathname.split('/')[1] || 'home';
    const mappedId = pathToIdMap[path];
    
    if (mappedId) {
      setActiveTab(mappedId);
    }
  }, [pathname]);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, path: '/home' },
    { id: 'highlights', label: 'Highlights', icon: HighlightIcon, path: '/highlight' },
    { id: 'contribute', label: 'Contribute', icon: ContributeIcon, path: '/contribute' },
    { id: 'post', label: 'Post', icon: PostIcon, path: '/post' },
    { id: 'notifications', label: 'Notifications', icon: NotificationIcon, path: '/notification' }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <nav className="flex justify-between items-center px-4 py-2">
        {navItems.map((item) => (
          <Link 
            href={item.path} 
            key={item.id}
            className="flex flex-col items-center relative"
            onClick={() => setActiveTab(item.id)}
          >
            <div className={`p-2 rounded-full ${
              activeTab === item.id 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600'
            }`}>
              <Image 
                src={item.icon} 
                alt={item.label} 
                width={20} 
                height={20} 
                className={activeTab === item.id ? 'invert' : ''}
              />
            </div>
            <span className={`text-xs mt-1 ${
              activeTab === item.id 
                ? 'text-blue-500 font-medium' 
                : 'text-gray-600'
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      <footer className='w-full bg-white gap-2 flex py-3 justify-center items-center'>
        <h1 className='font-[400] fornt-inter  flex justify-center text-[12px]'>Powered By </h1>
       <p className='flex items-center gap-[3px]'> <Image src={EventHexlogo} alt="EventHexlogo" /> <span className='font-[500] text-[12px]'> EventHex </span> </p>
      </footer>
    </div>
  );
};

export default NavigationBar;