import React from 'react'
import { HighlightText } from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.svg';
import compare_with_others from '../../../assets/Images/Compare_with_others.svg';
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.svg';
import {Button} from '../Homepage/Button';
export const LearningLTimeline = () => {
  return (
    <div className='flex flex-col mt-10 mb-10 py-2 px-2 items-center justify-center'>
        <div className='flex flex-col text-center gap-6 items-center'>
            <p className='text-4xl font-bold'>
                Your swiss knife for <HighlightText text={"learning any language"}/>
            </p>
            <p className='text-center max-w-[90%] mb-8 text-richblack-700 text-lg'>
            Using spin making learning multiple 
            languages easy. with 20+ languages realistic voice-over,
             progress tracking, custom schedule and more.
            </p>
        </div>
        <div className='flex md:flex-row flex-col items-center justify-center gap-0 md:w-[52%]'>
            <img src={know_your_progress} className='object-contain md:-mr-32'></img>
            <img src={compare_with_others} className='object-contain max-[768px]:-mt-10'></img>
            <img src={plan_your_lesson} className='md:-ml-36 object-contain max-[768px]:-mt-16'></img>
        </div>
        <Button active={true} linkto={"/signup"}>Learn More</Button>
    </div>
  )
}
