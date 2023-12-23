import React from 'react'
import { useEffect, useRef, useState } from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {useSelector } from 'react-redux'
  import { Link ,matchPath,useLocation} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {AiOutlineDashboard} from 'react-icons/ai'
import {HiOutlineLogout} from 'react-icons/hi'
import { NavbarLinks } from '../../../data/navbar-links'
import useClickOutside from '../../../hooks/useOutsideClick'
export const SlidingMenu = ({setMenuPos,hamRef,menuPos,subLinks}) => {
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    const location=useLocation();
    const [profSlide,setProfSlide]=useState(false);
    const [secSlide,setSecSlide]=useState(false);
    const menuRef=useRef(null);
    
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
    useClickOutside([menuRef,hamRef],()=>setMenuPos(false));
  return (
    <div>
                <ul ref={menuRef} className={`flex w-[45%] max-[426px]:w-full min-h-screen flex-col absolute z-40 top-0 right-0 ${menuPos?"translate-x-0 transition-transform duration-[300] ease-out":"translate-x-[100%] transition-transform duration-[300] ease-in"}  bg-richblack-700 pt-8 pb-6 pl-6 pr-6 lg:gap-6 gap-8   text-richblack-25`}>
                    <div className='flex gap-x-4 items-center h-[25%] mt-2 ml-2'>
                    {
                        user && user?.accountType!="Instructor" && (
                            <div className='flex gap-8'>
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart fill='white' size={25}/>
                                {
                                    totalItems>0 &&
                                    <span className='absolute right-0 top-[44%] left-4 rounded-full min-w-[25px] min-h-[25px] text-sm flex items-center justify-center p-[2px] bg-richblack-600 text-yellow-200'>
                                        {totalItems}
                                    </span>
                                }
                            </Link>
                            <div className='flex items-center gap-2 cursor-pointer' onClick={()=>{if(secSlide)
                                {
                                    return
                                }
                                setProfSlide((prev)=>!prev)}}>
                                <img src={`${user.image}`} className='w-[30px] h-[30px] rounded-full'></img>
                                {
                                    !secSlide &&
                                    <AiOutlineArrowLeft className={` ${profSlide?"":"rotate-180"}`}/>
                                    
                                }
                            </div>
                            
                            </div>
                            
                        )
                    }
                    {
                        token===null && (
                        <div className='flex gap-3 mx-auto items-center justify-between text-richblack-200'>
                                <Link to="/login" className='bg-richblack-800 border-[1px] border-richblack-600  text-center rounded-md py-1 px-2 sm:py-2 sm:px-4'>
                                    Log in
                                </Link>
                                <Link to="/signup" className='bg-richblack-800 border-[1px] border-richblack-600 text-center rounded-md py-1 px-2 sm:py-2 sm:px-4'>
                                    Sign up
                                </Link>
                        </div>
                        )
                    }
                    </div>
                        
                    <div className='flex gap-8 flex-col  relative'>
                            <div className='flex gap-8 overflow-auto h-[75vh] flex-col bg-richblack-700 absolute z-30 w-full'>
                            {
                                NavbarLinks.map((links,index)=>{
                                    return (
                                        <li key={index} className='sm:text-xl text-base leading-4'>
                                            {
                                            links.title=="Catalog"?(
                                                <div className='flex items-center gap-1 transition-all duration-200  cursor-pointer' onClick={()=>{setSecSlide((prev)=>!prev);console.log("second slide sliding in")}}>
                                                    {links.title}
                                                    <AiOutlineArrowLeft className={`translate-y-[2px] rotate-180`}/>
                                                </div>
                                            ):(
                                                <Link to={links?.path} className={`${matchRoute(links?.path)?"text-yellow-25":""}`}>{links.title}</Link>
                                            )}
                                        </li>
                                    )
                                })
                            }
                            </div>
                            <div className={`flex gap-8 flex-col h-[75vh] overflow-auto overflow-x-hidden bg-richblack-700 ${secSlide?"translate-x-0 transition-transform duration-[300] ease-out":"translate-x-[120%] transition-transform duration-[300] ease-in"} absolute z-40 w-full`}>
                                {
                                    subLinks.map((elem,index)=>{
                                    return (
                                    <Link key={index} className={`cursor-pointer`}>
                                        {elem.name}
                                    </Link>
                                     )
                                    })
                                }
                            </div>
                            {
                                user && user?.accountType!="Instructor" &&(
                                    <div className={`flex gap-8 flex-col h-[75vh] overflow-auto overflow-x-hidden bg-richblack-700 ${profSlide?"translate-x-0 transition-transform duration-[300] ease-out":"translate-x-[120%] transition-transform duration-[300] ease-in"} absolute z-40 w-full`}>
                                        <div className='flex flex-col gap-8'>
                                           <Link to="/dashboard/my-profile">
                                                <div className='flex gap-4 items-center'>
                                                    <AiOutlineDashboard size={25}/>
                                                    <p className='text-lg'>Dashboard</p>
                                                </div>
                                           </Link>
                                           <Link>
                                                <div className='flex gap-4 items-center'>
                                                    <HiOutlineLogout size={25}/>
                                                    <p className='text-lg'>Logout</p>
                                                </div>
                                           </Link>
                                        </div>
                                    </div>
                                )
                            }
                    </div>
                    <AiOutlineClose className='absolute top-[6px] right-[6px]' onClick={()=>{setMenuPos((prev)=>!prev);console.log("menu bar sliding out");console.log(menuPos)}}/>
                    <AiOutlineArrowLeft onClick={()=>{setSecSlide((prev)=>!prev);console.log("sec slide moving out")}} className={`absolute top-[10px] left-[15px] ${secSlide?"visible":"invisible"} cursor-pointer`}/>
                </ul>
    </div>
  )
}
