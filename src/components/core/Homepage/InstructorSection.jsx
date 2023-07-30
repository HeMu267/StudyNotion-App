import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import { HighlightText } from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import {Button} from '../Homepage/Button'
export const InstructorSection = () => {
  return (
    <div className='flex md:flex-row flex-col w-full mt-20 items-center justify-between'>
        <img src={Instructor} className='md:w-[50%] mb-16 shadow-[-25px_-20px_0px_0px_rgba(255,255,255)]'></img>
        <div className='md:w-[40%] flex flex-col gap-6 items-start'>
            <div className='max-w-[50%] font-bold text-4xl'>
                Become an 
                <HighlightText text={" Instructor"}/>
            </div>
            <div className='text-richblack-300'>
                Instructors from around the world teach millions of students on StudyNotion. 
                We provide the tools and skills to teach what you love.
            </div>
            <Button active={true} linkto={"/signup"}>Start Teaching Today <FaArrowRight></FaArrowRight></Button>
        </div>
    </div>
  )
}
