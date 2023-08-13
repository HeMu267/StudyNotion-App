import React from 'react'
import { HighlightText } from '../Homepage/HighlightText';
import { Button } from '../Homepage/Button';

export const LearningGrid = () => {
    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "You will get a certificate that can be used as a certification during job hunting.",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
        },
      ];    
  return (
    <div className='grid w-[300px] lg:w-full mx-auto grid-cols-1 lg:grid-cols-4 mt-20'>
        {
            LearningGridArray.map((card,index)=>{
                return (
                    <div key={index} className={
                        `${index===0 && "lg:col-span-2 bg-transparent"} ${
                            card.order%2===0?"bg-richblack-800":"bg-richblack-700"
                        } ${
                            card.order===3 && "lg:col-start-2"
                        } lg:h-[300px]`
                    }>
                    {
                        card.order<0 ?
                        <div className='flex p-4 flex-col items-start'>
                            <h1 className='text-richblack-5 text-4xl'>{card.heading}</h1>
                            <div className='text-4xl mb-4'><HighlightText text={card.highlightText}></HighlightText></div>
                            <p className='text-base mb-6 text-richblack-300'>{card.description}</p>
                            <Button active={true}>Learn More</Button>
                        </div>:
                        <div className='p-[32px]'>
                            {
                                <div className='gap-[32px] flex flex-col'>
                                    <p className='text-[18px] text-richblack-5 font-semibold leading-7'>{card.heading}</p>
                                    <p className='text-[14px] text-richblack-100'>{card.description}</p>
                                </div>
                            }
                        </div>
                       
                    }
                    </div>
                )
            })
        }
    </div>
  )
}
