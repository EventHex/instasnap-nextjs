import React from 'react';
import Navbar from '../components/navfooter';
const NotificationCard = () => {
  return (
    <div className='flex justify-center items-center'>
    <div className="w-full p-5  rounded-xl  overflow-hidden">
        <div className='flex justify-center items-center'>
            <h1 className='text-[15px] font-inter font-[600]'>
                Notification
            </h1>
        </div>
      <div className="space-y-4   mt-5">
        <div className='p-5 rounded-[16px] border-2 border-gray-200 w-full'>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span className="text-xs text-gray-500">16 Nov 2023 | 06:57 PM</span>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900">New Photos Uploaded</h3>
          <p className="text-sm text-gray-600">100 new photos has been uploaded to event highlights</p>
        </div>
        </div>
        
        <div className="pt-2 p-5 rounded-[16px] border-2 border-gray-200 w-full  ">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">16 Nov 2023 | 06:55 PM</span>
          </div>
          
          <div className="mt-1 space-y-1">
            <h3 className="font-medium text-gray-900">Yay! AI found your photo matches</h3>
            <p className="text-sm text-gray-600">Instanapp AI found 10 of your photos</p>
          </div>
        </div>
      </div>
    </div>
    <Navbar/>
    </div>
  );
};

export default NotificationCard;