import { SearchingGif, ShineAI, Sparkle } from '@/app/assets'
import Image from 'next/image'
import React from 'react'

const Index = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-4 p-4 bg-gradient-to-b shadow-md from-blue-50 to-white'> 
        <div className='flex w-full justify-center gap-4'>
          <Image className=' animate-pulse w-5 h-5' src={ShineAI} alt='logo' width={100} height={100}/>
          <h1>AI Magic in Progress</h1>
        </div>

        <div>
          <p>We're finding your perfect event moments</p>
        </div>

        <div className='w-full flex items-center justify-center'>
          <Image src={SearchingGif} alt='logo' width={100} height={100}/>
        </div>
        
        <div className='flex items-center justify-center'>
          <p className="flex items-center">
            Scanning through snapshots
            <span className="flex ml-1">
              <span className="animate-bounce delay-100 mx-px text-blue-500">.</span>
              <span className="animate-bounce delay-300 mx-px text-blue-500">.</span>
              <span className="animate-bounce delay-500 mx-px text-blue-500">.</span>
            </span>
          </p>
        </div>
      </div>

      {/* Add the animation delays as a style */}
      <style jsx>{`
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  )
}

export default Index
