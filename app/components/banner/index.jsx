import React from 'react'
import Image from 'next/image'

const index = (props) => {
  return (
    <div className="flex flex-col relative">
      <div className="rounded-b-[30px] w-full relative aspect-video">
        <Image
          className="rounded-b-[30px] object-cover"
          src={props.Banner}
          alt="Banner image"
          fill
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 border-blue-600 border bg-white p-2 rounded-full">
        <div className="relative w-20 h-20">
          <Image
            className="rounded-full object-cover"
            src={props.profile}
            alt="Profile image"
            fill
            sizes="80px"
          />
        </div>
      </div>
    </div>
  )
}

export default index