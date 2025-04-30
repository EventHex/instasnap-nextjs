import React from 'react'
import { EventHeader } from '../components/header'
import Navbar from '../components/navfooter'
const page = () => {
  return (
    <div className='w-full'>
        <div className='w-full  flex justify-center items-center'>

      <EventHeader name={'contribute'} />
        </div>
        <div className='w-full flex justify-center items-center'>
            <Navbar />
        </div>
    </div>
  )
}

export default page
