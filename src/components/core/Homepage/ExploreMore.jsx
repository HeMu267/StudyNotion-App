import React, { useState } from 'react'
import { HighlightText } from './HighlightText'
import { HomePageExplore } from '../../../data/homepage-explore'
import {Herioc} from '../../../assets/Logo/Herioc'
import { Hunch } from '../../../assets/Logo/Hunch'
const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];


export const ExploreMore = () => {
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)
    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((elem)=>(elem.tag==value));
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div className='flex flex-col items-center w-full'>
        <div className='text-4xl mb-3 font-bold text-center'>
            Unlock the <HighlightText text={"Power of Code"}/>
        </div>
        <div className='text-lg text-center text-richblack-300'>
            Learn to Build Anything You Can Imagine
        </div>
        <div className='lg:flex mb-4 hidden gap-4 mt-7 p-1 rounded-full bg-richblack-800 shadow-md shadow-richblack-400/40'>{
            tabsName.map((elem,index)=>{
                return(
                    <div key={index} onClick={()=>{setMyCards(elem)}} className={`text-richblack-300 cursor-pointer rounded-full ${currentTab==elem?"bg-richblack-900 text-white":""} text-lg flex items-center justify-center py-2 px-8`}>
                        {
                            elem
                        }
                    </div>
                )
            })
        }
        </div>
        <div className='lg:h-[200px] lg:block hidden'>

        </div>
        <div className='flex sm:w-[105%] w-full flex-wrap my-16 lg:my-0 lg:gap-0 gap-10 items-center justify-center lg:justify-between lg:absolute lg:bottom-0 lg:translate-y-[50%]'>
            {
                courses.map((elem,index)=>{
                    return(
                        <div key={index} onClick={()=>{setCurrentCard(elem.heading)}} className={`flex cursor-pointer w-[360px] lg:w-[30%] h-[300px] flex-col ${elem.heading==currentCard?"bg-white text-richblack-900 shadow-[12px_14px_0px] shadow-yellow-50":"bg-richblack-800 text-richblack-300"} justify-between `}>
                            <div className='p-5 border-b-2 border-dashed border-richblack-500 h-[80%]'>
                                <p className={`${elem.heading==currentCard?"text-richblack-900":"text-white"} text-xl mb-2 font-bold`}>
                                    {elem.heading}
                                </p>
                                <p className={`${elem.heading==currentCard?"text-richblack-500":""} mb-12`}>
                                    {elem.description}
                                </p>
                            </div>
                            <div className={`${elem.heading==currentCard?"text-blue-200":"text-richblack-300"} flex justify-between`}>
                                <div className='flex items-center gap-2 p-4'>
                                    <Herioc color={`${elem.heading==currentCard?"#118AB2":"#585D69"}`}/>
                                    <p>{elem.level}</p>
                                </div>
                                <div className='flex items-center gap-3 p-4'>
                                    <Hunch color={`${elem.heading==currentCard?"#118AB2":"#585D69"}`}/>
                                    <p>{elem.lessionNumber} Lessons</p>
                                </div>
                            </div>
                        </div>  
                    )
                })
            }
        </div>
    </div>
  )
}
