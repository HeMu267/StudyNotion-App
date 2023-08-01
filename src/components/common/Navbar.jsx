import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {AiOutlineDown} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'
import {AiOutlineArrowLeft} from 'react-icons/ai'




export const Navbar = ({hamburgerIcons,setHamburgerIcons,menuPos,setMenuPos}) => {
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    const location=useLocation();
    const [subLinks,setSubLinks]=useState([]);
    const [secSlide,setSecSlide]=useState(false);
    const menuRef=useRef(null);
    const hamRef=useRef(null);
    const fetchSubLinks=async()=>{
            try{
                const result=await apiConnector("GET",categories.CATEGORIES_API);
                console.log(result);
                setSubLinks(result.data.allCategories)
            }catch(err){
                console.log(err);
                console.log("Could not fetch category list")
            }
    }
    const [screenWidth,setScreenWidth]=useState(window.innerWidth);
    const ResHam=()=>{
        console.log("window is being resized");
        if(screenWidth>=768)
        {
            console.log("Falsing Hamburger icon width>768px");
            setHamburgerIcons(false);
            setMenuPos(false);
        }
        else{
            console.log("hamburger set to true width<768px");
            setHamburgerIcons(true);
        }
    }
    const updateWidth=()=>{
        setScreenWidth(window.innerWidth);
    }
    const handleOutsideClick=(event)=>{
            console.log(event.target);
            console.log(hamRef.current);
            console.log(menuRef.current);
            console.log(menuRef.current.contains(event.target));
            console.log(event.target.parentNode);
            if(event.target===menuRef.current || menuRef.current.contains(event.target))
            {
                console.log("target was at menu bar");
                return 
            }
            else if(event.target===hamRef.current || hamRef.current.contains(event.target))
            {
                console.log("target was at hamburger");
                return
            }
            setMenuPos(false);
            console.log("menu bar sliding out");
    }
    useEffect(()=>{
        setMenuPos(false)
    },[window.location.pathname])
    useEffect(()=>{
        ResHam()
    },[screenWidth])

    useEffect(()=>{
        document.addEventListener('click',handleOutsideClick);
        return()=>{
            document.removeEventListener('click',handleOutsideClick);
        }
    },[menuRef,hamRef])
    useEffect(()=>{
        fetchSubLinks();
        window.addEventListener('resize',updateWidth);
        return ()=>{
            window.removeEventListener('resize',updateWidth);
        }
    },[])
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
  return (
    <div className='w-screen border-b-[1px] relative border-richblack-700 py-3 px-2'>
        <div className='w-11/12  flex items-center mx-auto justify-between max-w-maxContent'>
            <Link to='/'>
                <img src={logo} width={160} height={32}></img>
            </Link>
            <nav className="hidden md:block">
            {    
                    <ul className='flex lg:gap-6 gap-4 max-[900px]:gap-2  text-richblack-25'>
                    {
                        NavbarLinks.map((links,index)=>{
                            return (
                                <li key={index} className='text-[16px] leading-6'>
                                    {
                                    links.title=="Catalog"?(
                                        <div className='flex items-center gap-1 group transition-all duration-200  cursor-pointer'>
                                            {links.title}
                                            <AiOutlineDown className='translate-y-[2px]'/>
                                            <div className='absolute bottom-0 translate-y-[calc(100%_+_2px)] translate-x-[-50%] invisible opacity-0 z-[100] w-[300px] group-hover:opacity-100 group-hover:visible gap-1 flex rounded-lg py-5 px-5 text-richblack-900 transition-all duration-150 flex-col bg-richblack-25'>
                                                {
                                                    subLinks.map((elem,index)=>{
                                                        return(
                                                            <Link to={elem.link}>
                                                                <div key={index} className='text-lg px-5 py-3 hover:bg-richblack-50 rounded-md'>
                                                                    {elem.name}
                                                                </div>
                                                            </Link>
                                                        )
                                                    })
                                                }
                                                <div className='absolute top-0 translate-y-[-50%] translate-x-[calc(11rem_+_10px)] invisible group-hover:visible transition-all opacity-0 duration-200 select-none  group-hover:opacity-100  bg-richblack-25 h-[20px] w-[20px] rotate-45'>

                                                </div>
                                            </div>
                                        </div>
                                    ):(
                                        <Link to={links?.path} className={`${matchRoute(links?.path)?"text-yellow-25":""}`}>{links.title}</Link>
                                    )}
                                </li>
                            )
                        })
                    }
                    </ul>
            }

            </nav>
            {
                hamburgerIcons &&
                <ul ref={menuRef} className={`flex w-[45%] max-[426px]:w-full min-h-screen flex-col absolute z-40 top-0 right-0 ${menuPos?"translate-x-0 transition-transform duration-[300] ease-out":"translate-x-[100%] transition-transform duration-[300] ease-in"}  bg-richblack-700 pt-8 pb-6 pl-6 pr-6 lg:gap-6 gap-8   text-richblack-25`}>
                    <div className='flex gap-x-4 items-center h-[20%]'>
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
                            <img src={`${user.image}`} className='w-[30px] h-[30px] rounded-full'></img>
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
                                                    <AiOutlineArrowLeft className='translate-y-[2px] rotate-180'/>
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
                    </div>
                    <AiOutlineClose className='absolute top-[6px] right-[6px]' onClick={()=>{setMenuPos((prev)=>!prev);console.log("menu bar sliding out");console.log(menuPos)}}/>
                    <AiOutlineArrowLeft onClick={()=>{setSecSlide((prev)=>!prev);console.log("sec slide moving out")}} className={`absolute top-[10px] left-[15px] ${secSlide?"visible":"invisible"} cursor-pointer`}/>
                </ul>
            }
            
            <div className='md:flex gap-x-4 items-center hidden'>
                {
                    user && user?.accountType!="Instructor" && (
                        <div className='flex gap-8'>
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart fill='white' size={25}  className='cursor-pointer'/>
                            {
                                totalItems>0 &&
                                <span className='absolute right-0 top-[44%] left-4 rounded-full min-w-[25px] min-h-[25px] text-sm flex items-center justify-center p-[2px] bg-richblack-600 text-yellow-200'>
                                    {totalItems}
                                </span>
                            }
                        </Link>
                        <img src={`${user.image}`} className='w-[30px] h-[30px] rounded-full'></img>
                        </div>
                        
                    )
                }
                {
                    token===null && (
                       <div className='flex gap-6 items-center justify-between text-richblack-200'>
                            <Link to="/login" className='bg-richblack-800 border-[1px] border-richblack-600 text-base text-center rounded-md py-2 px-4'>
                                Log in
                            </Link>
                            <Link to="/signup" className='bg-richblack-800 border-[1px] border-richblack-600 text-base text-center rounded-md py-2 px-4'>
                                Sign up
                            </Link>
                       </div>
                    )
                }
            </div>
            <div ref={hamRef} className='md:hidden'>
                <GiHamburgerMenu fill='white' onClick={()=>{setMenuPos((prev)=>!prev);console.log("menu bar sliding in");console.log(menuPos)}} stroke='white' className='md:hidden cursor-pointer'/>

            </div>
        </div>
    </div>
  )
}
