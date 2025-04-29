import React from 'react';

const NotificationCard = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span className="text-xs text-gray-500">16 Nov 2023 | 06:57 PM</span>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900">New Photos Uploaded</h3>
          <p className="text-sm text-gray-600">100 new photos has been uploaded to event highlights</p>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-xs text-gray-500">16 Nov 2023 | 06:55 PM</span>
          </div>
          
          <div className="mt-1 space-y-1">
            <h3 className="font-medium text-gray-900">Yay! AI found your photo matches</h3>
            <p className="text-sm text-gray-600">Instanapp AI found 10 of your photos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;