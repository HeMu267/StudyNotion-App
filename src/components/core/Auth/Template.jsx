import React from 'react'
import { HighlightText } from '../Homepage/HighlightText'
import { SignupForm } from './SignupForm'
import { LoginForm } from './LoginForm'
import frame from '../../../assets/Images/frame.png'
export const Template = ({heading,desc1,desc2,formType,img}) => {
  return (
    <div className='w-screen h-[calc(100vh_-_66px)] flex items-center justify-center'>
      <div className='flex w-[90%] justify-between gap-2'>
        <div className='flex flex-col w-[40%]'>
          <h1 className='text-[1.875rem] mb-6 text-richblack-5 font-semibold leading-8 max-w-[450px]'>{heading}</h1>
          <p className='text-richblack-100 text-[1.225rem] leading-6'>{desc1}</p>
          <div className='text-[1.225rem] mb-5'>
            <HighlightText text={desc2}></HighlightText>
          </div>
          {
            formType=="Login"?<LoginForm/>:<SignupForm/>
          }
        </div>
        <div className='w-[400px] h-[400px] relative'>
          <img src={img} className='z-10 absolute top-[-15px] left-[-15px] object-contain' />
          <img src={frame}></img>
        </div>
      </div>
    </div>
  )
}
