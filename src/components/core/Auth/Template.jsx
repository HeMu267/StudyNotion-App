import React from 'react'
import { HighlightText } from '../Homepage/HighlightText'
import { SignupForm } from './SignupForm'
import { LoginForm } from './LoginForm'
import frame from '../../../assets/Images/frame.png'
export const Template = ({heading,desc1,desc2,formType,img}) => {
  return (
    <div className='w-screen min-h-[calc(100vh_-_66px)] flex items-center justify-center'>
      <div className='flex w-11/12 md:flex-row flex-col-reverse mt-9 max-w-maxContent items-center md:justify-between gap-8'>
        <div className='flex flex-col max-w-[450px]'>
          <h1 className='text-[1.875rem] mb-4 text-richblack-5 font-semibold leading-8'>{heading}</h1>
          <p className='text-richblack-100 text-[1.225rem] mb-6 leading-6'>
            <span>{desc1}</span> 
            <HighlightText text={desc2}></HighlightText>
          </p>
          {
            formType=="Login"?<LoginForm/>:<SignupForm/>
          }
        </div>
        <div className='max-w-[450px] md:block hidden relative'>
          <img src={img} className='z-10 absolute top-[-15px] left-[-15px] object-contain' />
          <img src={frame}></img>
        </div>
      </div>
    </div>
  )
}
