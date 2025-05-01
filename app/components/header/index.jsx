import React from 'react'
import Image from 'next/image'
import {Logo} from '../../assets' 

const Header = () => {
  return (
    <div className="w-full">
      <div className="flex w-full justify-center gap-2 py-2">
        <Image 
          src={Logo} 
          alt="Logo" 
          width={24} 
          height={24}
        />
        <h1 className="text-xl font-semibold">EventHex</h1>
      </div>
    </div>
  )
}

const EventHeader = ({name}) => {
  return (
    <div>
      <h1 className="text-[14px]  font-inter font-[600]">
       {name}
      </h1>
    </div>
  )
}

// Correct way to export multiple components
export { Header, EventHeader }