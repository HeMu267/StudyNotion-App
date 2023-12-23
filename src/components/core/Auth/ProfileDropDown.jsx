import React from 'react'
import { logout } from '../../../services/operations/authAPI'
import { Link, useNavigate } from 'react-router-dom'
import {HiOutlineLogout} from 'react-icons/hi'
import {AiOutlineDashboard} from 'react-icons/ai'
import { useDispatch} from 'react-redux'
import { useEffect } from 'react'
import useClickOutside from '../../../hooks/useOutsideClick'
export const ProfileDropDown = ({profileDropDown,profileRef,setProfileDropDown}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useClickOutside([profileRef],()=>{setProfileDropDown(false)})
  return (
    <div className={`bottom-0 right-[-10px] border-[0.5px] ${profileDropDown?"visible":"invisible"} border-richblack-400/30 h-[120px] rounded-lg  w-[150px] bg-richblack-800 translate-y-[calc(100%_+_13px)] z-50  absolute`}>
        <div className='flex flex-col items-center h-full w-full '>
            <Link to="/dashboard/my-profile" >
                <div className='w-[150px] h-[60px] border-b-[1px]  hover:bg-richblack-600 rounded-t-md p-2 flex gap-3 items-center  border-richblack-500'>
                    <AiOutlineDashboard fill='#AFB2BF' size={25}/>
                    <p className='text-richblack-100 text-lg'>Dashboard</p>
                </div>                         
            </Link>
            <div onClick={()=>{dispatch(logout(navigate))}}>
                    <div className='w-[150px] h-[60px] flex gap-3 rounded-b-md hover:bg-richblack-600 p-2 items-center'>
                    <HiOutlineLogout stroke='#AFB2BF' size={25}/>
                    <p className='text-richblack-100 text-lg'>Logout</p>
                </div>                                
            </div>                          
        </div>
    </div>
  )
}
