'use client'

import React, { useState, useEffect } from 'react';
import { HomeIcon, HighlightIcon, ContributeIcon, PostIcon, NotificationIcon } from '../../assets';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EventHexlogo } from '../../assets';
import { motion } from 'framer-motion';

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
    // { id: 'notifications', label: 'Notifications', icon: NotificationIcon, path: '/notification' }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center w-full">
    <div className="max-w-[768px] w-full bg-white border-t border-gray-200">
      <nav className="flex justify-between items-center px-4 py-2">
        {navItems.map((item) => (
          <Link 
            href={item.path} 
            key={item.id}
            className="flex flex-col items-center relative touch-none"
            onClick={() => setActiveTab(item.id)}
          >
            <motion.div 
              className={`p-2 rounded-full ${
                activeTab === item.id 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600'
              }`}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17
              }}
            >
              <Image 
                src={item.icon} 
                alt={item.label} 
                width={20} 
                height={20} 
                className={activeTab === item.id ? 'invert' : ''}
              />
            </motion.div>
            <motion.span 
              className={`text-xs mt-1 ${
                activeTab === item.id 
                  ? 'text-blue-500 font-medium' 
                  : 'text-gray-600'
              }`}
              animate={activeTab === item.id ? { y: [0, -2, 0] } : {}}
              transition={activeTab === item.id ? { 
                duration: 0.3,
                ease: "easeInOut"
              } : {}}
            >
              {item.label}
            </motion.span>
          </Link>
        ))}
      </nav>
      <motion.footer 
        className='w-full bg-white gap-2 flex py-3 justify-center items-center'
        whileHover={{ backgroundColor: "#f9fafb" }}
        transition={{ duration: 0.2 }}
      >
        <h1 className='font-normal text-xs'>Powered By </h1>
        <motion.p 
          className='flex items-center gap-[3px]'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        > 
          <Image src={EventHexlogo} alt="EventHexlogo" width={16} height={16} /> 
          <span className='font-medium text-xs'> EventHex </span> 
        </motion.p>
      </motion.footer>
    </div>
  </div>
  );
};

export default NavigationBar;