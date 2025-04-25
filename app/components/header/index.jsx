import React from 'react'
import Image from 'next/image'
import {Logo} from '../../assets' 

const index = () => {
  return (
    <div className=' w-full'>
      <div className=' flex w-full justify-center gap-2 py-2'>
        <Image 
          src={Logo} 
          alt="" 
          width={24} 
          height={24}
        />
        <h1 className=' text-[20px]  font-[600]'>EventHex</h1>
      </div>
    </div>
  )
}

export default index