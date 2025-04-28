import React from 'react'
import Image from 'next/image'
import { Sparkle } from '../../assets'

const AiInput = ({icon, message, number, label}) => {
  return (
    <div 
      className="relative flex items-center justify-between bg-gradient-to-b from-blue-50 to-white rounded-full border gap-5 border-[#EBF1FF] px-6 py-3 w-full"
    >
      <span className="flex items-center text-gray-700">
        {icon && (
          <Image src={icon} alt="icon" width={18} height={18} className="mr-2" />
        )}
     
        <p className='text-gray-700 text-[12px] font-[400]'>{message}</p>
      </span>
      <div className="flex flex-col items-center">
        <span className="text-pink-600 text-xl font-bold">{number}</span>
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
    </div>
  )
}

export default AiInput