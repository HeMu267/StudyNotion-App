import React, { useState } from 'react'
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import {AiOutlineEye} from 'react-icons/ai';
import { Button } from '../Homepage/Button';
import { Link, useNavigate } from 'react-router-dom';
import { HighlightText } from '../Homepage/HighlightText';
import { useDispatch } from 'react-redux';
import {login} from '../../../services/operations/authAPI';
export const LoginForm = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:"",
  })
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(event)=>{
    setFormData((prevData)=>({
      ...prevData,
      [event.target.name]:event.target.value
      }
    ))
  }
  const handleOnSubmit=(event)=>{
    event.preventDefault();
    console.log("pressing sign in");
    dispatch(login(formData.email,formData.password,navigate))
  }
  return (
    <form onSubmit={handleOnSubmit} className='flex flex-col w-full gap-5'>
      <div>
        <label className='w-full'>
          <p className='text-richblack-5 mb-2'>
            Email Address
            <sup className='text-pink-200'>*</sup>
          </p>
        </label>
        <input required type='text' onChange={handleChange} name='email' placeholder='Enter Email Address' className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300'>
        </input>
      </div>
      <div className='relative'>
        <label className='w-full'>
          <p className='text-richblack-5 mb-2'>
            Password
            <sup className='text-pink-200'>*</sup>
          </p>
        </label>
        <input required type={`${showPassword?"text":"password"}`} onChange={handleChange} name='password' placeholder='Enter Password' className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300'>
        </input>
        {
          showPassword?
          <AiOutlineEye className='absolute bottom-[10px] right-[20px] cursor-pointer' fill='#AFB2BF' size={30} onClick={()=>{setShowPassword((prev)=>!prev)}} />:
          <AiOutlineEyeInvisible className='absolute  bottom-[10px] right-[20px] cursor-pointer' fill='#AFB2BF' size={30} onClick={()=>{setShowPassword((prev)=>!prev)}}/>
        }
        <Link to='resetPassword'>
          <div className='absolute bottom-0 translate-y-[120%]  right-0'>
            <HighlightText text={"Forgot Password"}></HighlightText>
          </div>
        </Link>
      </div>
      <button
        type="submit"
        className="mt-8 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
       
    </form>
  )
}
