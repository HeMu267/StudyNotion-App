import React from 'react'
import { Button } from './Button'

export const Codeblocks = ({heading,desc,btn1,btn2}) => {
  return (
    <div className='flex flex-col lg:w-[43%] w-full'>
        <div className='text-4xl font-semibold'>
            {heading}
        </div>
        <div className='mt-5 text-md text-richblack-200'>
            {desc}
        </div>
        <div className='flex gap-6 max-[380px]:text-xs mt-10'>
            <Button active={btn1.active} linkto={btn1.link}>
                {btn1.title}
            </Button>
            <Button active={btn2.active} linkto={btn2.link}>
                {btn2.title}
            </Button>
        </div>
    </div>
  )
}
