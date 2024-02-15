import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import { HighlightText } from '../components/core/Homepage/HighlightText'
import { Button } from '../components/core/Homepage/Button'
import Banner from "../assets/Images/banner.mp4"
import { Codeblocks } from '../components/core/Homepage/Codeblocks'
import { TextAnimation } from '../components/core/Homepage/TextAnimation'
import { TimelineSection } from '../components/core/Homepage/TimelineSection'
import { LearningLTimeline } from '../components/core/Homepage/LearningLTimeline'
import { InstructorSection } from '../components/core/Homepage/InstructorSection'
import { ExploreMore } from '../components/core/Homepage/ExploreMore'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'
export const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative flex flex-col mx-auto min-[1536px]:w-11/12 md:w-10/12 w-11/12 max-w-maxContent items-center text-white'>
            <Link to="/signup">
                <div className='group rounded-full mt-20 p-1 transition-all bg-richblack-800 duration-500 font-bold hover:scale-95 hover:shadow-none mx-auto text-richblack-100 shadow-md shadow-richblack-400/40'>
                    <div className=' rounded-full px-8 py-[6px] gap-2 tracking-tight bg-richblack-800 flex items-center transition-all group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
            <div className='mt-9 text-4xl text-center tracking-wide font-semibold'>
                Empower Your Future With 
                <HighlightText text={" Coding Skills"}/>
            </div>
            <div className='text-center mt-5 tracking-tight text-lg  text-richblack-400 w-[90%]'>
                With our online coding courses, you can learn at your own pace,
                from anywhere in the world, and get access to a wealth of resources,
                including hands-on projects,
                quizzes, and personalized feedback from instructors. 
            </div>
            <div className='flex sm:gap-11 sm:text-base mb-10 text-sm gap-6 mt-12'>
                <Button active={true} linkto={"/signup"}>
                    Learn More
                </Button>
                <Button linkto={"/login"}>
                    Book a Demo 
                </Button>
            </div>
            <div className='mx-3 my-8 shadow-blue-50/25 h-fit object-cover shadow-[-10px_-12px_150px_1px]'>
                <video muted loop autoPlay className='shadow-[25px_20px_0px_0px_rgba(255,255,255)]'>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>
            <div className='lg:flex lg:flex-row  flex flex-col gap-10 items-center lg:justify-between mt-20 lg:w-[105%]'>
                <Codeblocks
                 heading={
                    <div>
                        Unlock your <HighlightText text={" coding potential"}
                        /> with our online courses.
                    </div>
                 }
                desc={
                    "Our courses are designed and taught by industry experts who have years "+ 
                    "of experience in coding and are passionate about sharing their knowledge "+ 
                    "with you."
                }
                btn1={
                    {
                    active:true,
                    link:"/signup",
                    title:
                    <div className='flex items-center gap-3'>
                        Try it yourself <FaArrowRight/>
                    </div>
                    }
                }
                btn2={
                    {
                    active:false,
                    link:"/login",
                    title:
                        <div>
                            Learn More
                        </div>
                    }
                }/>
                <TextAnimation color={'text-yellow-25/90'} gradient={1} codes={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}/>
            </div>


            <div className='lg:flex lg:flex-row-reverse flex flex-col gap-10 items-center mb-32 justify-between mt-40 lg:w-[105%]'>
                <Codeblocks
                 heading={
                    <div>
                        Start <HighlightText text={" coding in seconds"}
                        />
                    </div>
                 }
                desc={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                btn1={
                    {
                    active:true,
                    link:"/signup",
                    title:
                    <div className='flex items-center gap-3'>
                        Continue lesson <FaArrowRight/>
                    </div>
                    }
                }
                btn2={
                    {
                    active:false,
                    link:"/login",
                    title:
                        <div>
                            Learn More
                        </div>
                    }
                }/>
                <TextAnimation color={"text-blue-200"} gradient={2} codes={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}/>
            </div>
            <ExploreMore/>
        </div>
        {/*Section 2*/}
        <div className='bg-pure-greys-5'>
            <div className='md:w-10/12 w-11/12 max-w-maxContent flex flex-col mx-auto items-center'>
                <div className='homepage_bg w-screen h-[200px] sm:h-[360px]'>
                    <div className='flex justify-center gap-5 mt-16 sm:mt-56 max-[400px]:text-xs'>
                        <Button active={true} linkto={"/signup"}>
                            Explore Full Catalog <FaArrowRight/>
                        </Button>
                        <Button active={false} linkto={"/signup"}>
                            Learn More
                        </Button>
                    </div>
                </div>
                <div className='mt-20 w-full'>
                    <div className='flex md:flex-row flex-col gap-7 md:justify-between' >
                        <div className='text-4xl md:w-[50%] font-semibold'>
                            Get the skills you need for a <HighlightText text={"job that is in demand."}></HighlightText>
                        </div>
                        <div className='md:w-[45%] flex gap-10 text-richblack-600 text-md flex-col items-start'>
                            The modern StudyNotion is the dictates its own terms. Today, to
                            be a competitive specialist requires more than professional skills.
                            <Button active={true} linkto={"/signup"}>Learn More</Button>
                        </div>
                    </div>
                </div>
                <TimelineSection/>
                <LearningLTimeline/>
            </div>
        </div>
        <div className='flex flex-col mx-auto w-11/12 sm:w-10/12 mb-10 text-white max-w-maxContent items-center'>
            <InstructorSection/>
                <h1 className="text-center text-4xl font-semibold mt-8">
                Reviews from other learners
                </h1>
             <ReviewSlider />
        </div>
        <Footer/>
    </div>
  )
}
