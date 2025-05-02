import React from 'react'
import Image from 'next/image'
import { PenIcon } from '@/app/assets'
import Link from 'next/link'

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
          <div className='absolute bottom-0 top-[80%] transform -translate-x-1/2 rounded-full bg-white  w-10 h-10 '>
           {
            props.editIconimage ? (
              <Link href="/edit">
                <Image src={props.editIconimage} alt="Edit profile" fill className='rounded-full p-2' />
              </Link>
            ) : (
              <Link href="/start" >
              <p className='flex items-center justify-center shadow-md bg-white rounded-full w-10 h-10'>
                {props.editIcon}
              </p>
              </Link>
            )
           }
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default index