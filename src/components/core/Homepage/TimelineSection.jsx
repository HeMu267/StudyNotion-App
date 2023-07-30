import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineimage from '../../../assets/Images/TimelineImage.png'
import { Gradient2 } from './Gradient2'
const timeline=[

    {
        Logo:logo1,
        heading:"Leadership",
        desc:"Fully committed to the success company"
    },
    {
        Logo:logo2,
        heading:"Responsibility",
        desc:"Students will be our first priority"
    },
    {
        Logo:logo3,
        heading:"Flexibility",
        desc:"The ability to switch is an important skills"
    },
    {
        Logo:logo4,
        heading:"Solve the problem",
        desc:"Code your to a solution"
    },
]
export const TimelineSection = () => {
  return (
    <div className='flex lg:flex-row flex-col gap-20 mt-20 mb-20 items-center lg:justify-between'>
        <div className=' flex flex-col gap-1 max-[425px]:scale-[75%]'>
                {
                    timeline.map((elem,index)=>{
                        return (
                            <div className='flex flex-col w-full'>
                                <div className='flex gap-8 mb-2 items-center' key={index}>
                                    <div className='flex items-center shadow-md object-contain box-border  justify-center bg-white rounded-full w-[50px] h-[50px]'>
                                        <img src={elem.Logo} className='h-fit object-contain w-fit'></img>
                                    </div>
                                    <div className='flex flex-col items-start'>
                                        <div className='text-richblack-900 font-bold  min-[425px]:text-lg tracking-tight'>
                                            {elem.heading}
                                        </div>
                                        <div className='text-richblack-700 text-base min-w-[300px]'>
                                            {elem.desc}
                                        </div>
                                    </div>
                                </div>
                                {
                                    index<timeline.length-1 &&
                                    <div className='border-dashed relative left-[25px] w-[1px] mb-2 border-richblack-300 border-[1px] h-[32px]'>

                                    </div>
                                }
                            </div>
                        )
                    })
                }
        </div>
        <div className='shadow-[25px_20px_0px_0px_rgba(255,255,255)] flex items-center justify-center lg:w-[55%] z-20 relative'>
                <Gradient2>

                </Gradient2>
                <img src={timelineimage} className='z-20 object-cover h-fit'></img>
                <div className='bg-caribbeangreen-700 absolute z-20 lg:w-[80%] flex justify-center max-[1023px]:left-0 lg:flex-row bottom-[100%] translate-y-[100%] flex-col py-5 px-8 gap-4 lg:bottom-0 lg:translate-y-[50%]'>
                    <div className='flex gap-5 items-center justify-between lg:justify-center lg:border-r-[1.5px] border-caribbeangreen-300/40'>
                        <p className='text-3xl font-bold text-pure-greys-5'>10</p>
                        <p className='uppercase text-sm text-caribbeangreen-300 max-w-[70px] lg:mr-8'>years experience</p>
                    </div>
                    <div className='flex gap-5 items-center justify-between  lg:justify-center'>
                        <p className='text-3xl font-bold text-pure-greys-5'>250</p>
                        <p className='uppercase text-sm  text-caribbeangreen-300 max-w-[70px]'>Types of courses</p>
                    </div>
                </div>
        </div>
    </div>
  )
}
