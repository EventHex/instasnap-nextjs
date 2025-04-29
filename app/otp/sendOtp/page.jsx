import React from 'react'
import { Banner } from '../../assets'
import Banners from '../../components/banner'

const SendOtp = () => {
  return (
    <div className='min-h-screen flex flex-col justify-between w-full'>
        <div>
            <Banners Banner={Banner} />
            <div  className="flex flex-col items-center justify-center mt-6 gap-6 w-full">
                <h1 className='font-[500] text-[16px] '>Verify your account</h1>
            </div>
        </div>
    </div>
  )
}

export default SendOtp;
