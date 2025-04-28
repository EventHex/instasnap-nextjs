import React from 'react'
import Header from '../components/Header'
import { Banner, Profileimg, ShineAI } from '../assets'
import Banners from '../components/banner'
import AiInput from '../components/aiInput'

const Home = () => {
  return (
    <div className="w-full">
   
      <div className="flex flex-col items-center justify-center">
        <Banners profile={Profileimg} Banner={Banner} />
        
        <div className="max-w-md mt-16">
          <AiInput
            icon={ShineAI}
            message="Our AI couldn't find any photos of you"
            number={0}
            label="Photos"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
