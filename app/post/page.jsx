import React from 'react';
import NavigationBar from '../components/navfooter';

const Page = () => {
  return (
    <div className="min-h-screen pb-16"> {/* Add padding at bottom to prevent content from being hidden behind navbar */}
      {/* Your page content goes here */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Your Content</h1>
        <p className="mt-2">Main content of your page goes here</p>
      </div>
      
      {/* NavigationBar component will be fixed at the bottom */}
      <NavigationBar />
    </div>
  );
};

export default Page;