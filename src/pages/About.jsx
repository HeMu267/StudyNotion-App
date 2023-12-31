import React from 'react'
import { HighlightText } from '../components/core/Homepage/HighlightText'
import aboutus1 from '../assets/Images/aboutus1.webp' 
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import { Gradient2 } from '../components/core/Homepage/Gradient2'
import FoundingStory from '../assets/Images/FoundingStory.png'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import { ContactUs } from '../components/common/ContactUs'
import Footer from '../components/common/Footer'
export const About = () => {
  return (
    <div>
        <div className='w-screen bg-richblack-800 lg:min-h-[35rem]'>
            <div className=' w-10/12 relative lg:min-h-[35rem] min-h-[30rem] mx-auto '>
                <div className='flex flex-col text-center py-10 items-center'>
                    <p className='text-richblack-200 '>
                        About Us
                    </p>
                    <div className='text-4xl text-center mt-4 leading-9 tracking-tighter'>
                        <h1 className='text-center leading-9 tracking-tighter text-richblack-5'>Driving Innovation in Online Education for a</h1>
                        <HighlightText text={"Brighter Future"}></HighlightText>
                    </div>
                    <p className='text-center mt-8 text-richblack-300  text-base leading-6 w-full md:max-w-[810px]'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating
                    a brighter future by offering cutting-edge courses,
                    leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </div>
                <div className='flex justify-center gap-6 w-full max-[475px]:hidden  absolute z-10 bottom-0 translate-y-[25%]'>
                    <img src={aboutus1} className='max-w-[360px] max-h-[300px] w-[31%]'/>
                    <img src={aboutus2} className='max-w-[360px] max-h-[300px] w-[31%]'/>
                    <img src={aboutus3} className='max-w-[360px] max-h-[300px] w-[31%]'/>
                    <div class="rounded-full absolute -z-10 w-[40%] h-[100%] bg-gradient-to-l blur-2xl bottom-0 from-brown-100  to-brown-100 opacity-30"></div>
                </div>
            </div>          
        </div>
        <div className='w-10/12 max-w-maxContent bg-richblack-900 mx-auto'>
            <div className='text-richblack-50 md:text-[36px] text-xl leading-8 font-semibold tracking-normal  text-center py-36'>
            "We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, 
            expertise, and community to create an 
                <HighlightText text={" Unparalleled Educational Experience."}></HighlightText>
                <span>"</span>
            </div>
        </div>
        <div className='w-screen h-[2px] bg-richblack-500'>

        </div>
        <div className='w-10/12 max-w-maxContent bg-richblack-900 mx-auto'>
            <div className='flex my-20 lg:flex-row flex-col gap-16 lg:justify-between items-center'>
                <div className='flex gap-3 flex-col lg:w-[40%]'>
                    <p className='text-[36px] text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]'>Our Founding Story</p>
                    <p className='text-richblack-300 text-[16px]'>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. 
                    It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, 
                    flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className='text-richblack-300 text-[16px]'>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems.
                    We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge 
                    these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
                <img src={FoundingStory} className='lg:w-[50%] w-full max-w-[480px]'></img>
            </div>
            <div className='flex md:flex-row flex-col gap-8 md:justify-between mb-20 md:items-start'>
                <div className='flex gap-3 flex-col w-full  md:w-[40%]'>
                    <p className='text-[36px] text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00] to-[#F9D423]'>Our Vision</p>
                    <p className='text-richblack-300 text-[16px]'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn.
                     Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content,
                     fostering a dynamic and interactive learning experience.
                    </p>
                </div>
                
                <div className='flex gap-3 w-full flex-col md:w-[40%]'>
                    <p className='text-[36px] text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]'>Our Mission</p>
                    <p className='text-richblack-300 text-[16px]'>
                    our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate,
                     and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, 
                    and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
        </div>
        <div className="w-screen bg-richblack-800">
            <div className='w-10/12 p-10 flex gap-3 flex-wrap sm:justify-between justify-center max-w-maxContent mx-auto'>
                <div className='flex flex-col w-[120px] justify-center items-center'>
                    <p className='text-richblack-5 text-[30px] font-semibold'>5K</p>
                    <p className='text-richblack-500'>
                        Active Students
                    </p>
                </div>
                <div className='flex flex-col w-[120px] justify-center items-center'>
                    <p className='text-richblack-5 text-[30px] font-semibold'>10+</p>
                    <p className='text-richblack-500'>
                        Mentors
                    </p>
                </div>
                <div className='flex w-[120px] flex-col justify-center items-center'>
                    <p className='text-richblack-5 text-[30px] font-semibold'>200+</p>
                    <p className='text-richblack-500'>
                        Courses
                    </p>
                </div>
                <div className='flex w-[120px] flex-col justify-center items-center'>
                    <p className='text-richblack-5 text-[30px] font-semibold'>50+</p>
                    <p className='text-richblack-500'>
                        Awards
                    </p>
                </div>
                
            </div>
        </div>
        <div className='w-10/12 max-w-maxContent bg-richblack-900 mx-auto'>
            <LearningGrid/>
            <div className='flex flex-col items-center w-full mt-20'>
                <h1 className='text-richblack-5 text-4xl font-semibold mb-2'>Get in Touch</h1>
                <p className='text-richblack-300 mb-10'>
                    We'd love to hear from you,Please fill out this form.
                </p>
                <div className='md:w-[60%] max-w-[512px]'>
                <ContactUs/>

                </div>
            </div>
        </div>
        <Footer/>
    </div>
    
  )
}
