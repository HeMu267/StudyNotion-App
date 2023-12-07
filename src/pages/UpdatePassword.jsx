import React, { useState } from 'react'
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import {AiOutlineEye} from 'react-icons/ai';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePassword } from '../services/operations/authAPI';
export const UpdatePassword = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation(); 
    const [showPassword,setShowPassword]=useState(false);
    const [showPassword1,setShowPassword1]=useState(false);
    const {loading}=useSelector((state)=>state.auth);
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:"",
    })
    const handlePass=(event)=>{
        if(event.target.getAttribute('name')==="pass1" || event.target.parentNode.getAttribute('name')==="pass1")
        {
          setShowPassword1((prev)=>(
            !prev
          ))
        }
        else if(event.target.getAttribute('name')==="pass2" || event.target.parentNode.getAttribute('name')==="pass2")
        {
          setShowPassword((prev)=>(
            !prev
          ))
        }
    }
    const handleChange=(event)=>{
        setFormData((prev)=>({
          ...prev,
          [event.target.name]:event.target.value,
        }));
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        const token=location.pathname.split("/").at(-1);
        dispatch(updatePassword(formData.password,formData.confirmPassword,token,navigate));
    }
  return (
    <div className='flex justify-center max-[1560px]:items-center w-screen h-[calc(100vh_-_5rem)]'>
    {
      loading?(
        <div className='spinner'></div>
      ):(
        <form className='flex flex-col gap-4 min-[1560px]:mt-72 max-[500px]:scale-75' onSubmit={handleSubmit}>
            <h1 className='text-richblack-5 text-[1.875rem] leading-6'>Choose new password</h1>
            <p className='text-richblack-100 text-[1.125rem] max-w-[400px]'>Almost done. Enter your new password and youre all set.</p>
            <div className='relative'>
                <label>
                  <p className='text-richblack-5 mb-2'>
                    Create Password
                    <sup className='text-pink-200'>*</sup>
                  </p>
                </label>
                <input onChange={handleChange} name='password' placeholder='Enter Password' type={`${showPassword1?"text":"password"}`} required className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full pr-[36px] bg-richblack-700 text-richblack-5 rounded-lg py-3 pl-3 shadow-md shadow-richblack-300'>
                </input>
                {
                  showPassword1?
                  <AiOutlineEye onClick={handlePass} name='pass1' className='absolute z-10 bottom-[12px] right-[10px] cursor-pointer' fill='#AFB2BF' size={23}  />:
                  <AiOutlineEyeInvisible onClick={handlePass} name='pass1' className='absolute z-10 bottom-[12px] right-[10px] cursor-pointer' fill='#AFB2BF' size={23} />
                }
            </div>
            <div className='relative'>
                <label>
                  <p className='text-richblack-5 mb-2'>
                    Confirm Password
                    <sup className='text-pink-200'>*</sup>
                  </p>
                </label>
                
                <input onChange={handleChange} name='confirmPassword' placeholder='Confirm Password' type={`${showPassword?"text":"password"}`} required className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full pr-[36px] bg-richblack-700 text-richblack-5 rounded-lg py-3 pl-3 shadow-md shadow-richblack-300'></input>
                {
                  showPassword?
                  <AiOutlineEye name='pass2' onClick={handlePass} className='absolute z-10 bottom-[12px] right-[10px] cursor-pointer' fill='#AFB2BF' size={23}  />:
                  <AiOutlineEyeInvisible name='pass2' onClick={handlePass} className='absolute z-10 bottom-[12px] right-[10px] cursor-pointer' fill='#AFB2BF' size={23} />

                }
            </div>
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
            <div onClick={()=>{navigate("/login")}} className='flex cursor-pointer items-center gap-2'>
                    <AiOutlineArrowLeft fill='#F1F2FF'/>
                    <p className='text-richblack-5'>Back to login </p>
            </div>
        </form>
      )
    }
        
    </div>
  )
}
