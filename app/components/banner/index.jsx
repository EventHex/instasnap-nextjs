import React from 'react'
import Image from 'next/image'

const index = (props) => {
  return (
    <div className="flex flex-col relative max-w-[700px] w-full">
      <div className="rounded-b-[30px] relative aspect-video">
        <Image
          className="rounded-b-[30px] object-fill"
          src={props.Banner}
          alt="Banner image"
          fill
          priority
        />
      </div>
      {props.profile && (
        <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 border-blue-600 border bg-white p-2 rounded-full">
          <div className="relative w-20 h-20 md:w-52 md:h-52">
            <Image
              className="rounded-full object-cover"
              src={props.profile}
              alt="Profile image"
              fill
              sizes="80px"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default index