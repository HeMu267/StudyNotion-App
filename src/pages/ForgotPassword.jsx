import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import {forgotPassword} from '../services/operations/authAPI';
export const ForgotPassword = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [emailSent,SetEmailSent]=useState(false);
  const dispatch=useDispatch();
  const handleChange=(event)=>{
    setEmail(event.target.value)
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    dispatch(forgotPassword(email,SetEmailSent))
  }
  return (
    <div className='flex justify-center max-[1560px]:items-center w-screen h-[calc(100vh_-_6rem)]'>
        <form className='flex flex-col gap-4 min-[1560px]:mt-72 max-[500px]:scale-75' onSubmit={handleSubmit} >
          {
            emailSent?
            <h1 className='text-richblack-5 text-[1.875rem] leading-6'>Check Email</h1>:
            <h1 className='text-richblack-5 text-[1.875rem] leading-6'>Reset Your Password</h1>
          }
          {
            emailSent?
          <p className='text-richblack-100 text-[1.125rem] max-w-[400px]'>We have sent the reset email to youremailaccount@gmail.com</p>:
          <p className='text-richblack-100 text-[1.125rem] max-w-[400px]'>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
          }
          {
            !emailSent &&
            <div className='w-full'>
            <label className='w-full'>
              <p className='text-richblack-5 mb-2'>
                Email Address
                <sup className='text-pink-200'>*</sup>
              </p>
            </label>
            <input required onChange={handleChange} type='text' name='email' placeholder='Enter Email Address' className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300'>
            </input>
            </div>
          }
          <button
              type="submit"
              className="mt-3 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
              {
                emailSent?"Resend Email":"Reset Password"
              }
          </button>
          <div onClick={()=>{navigate("/login")}} className='flex cursor-pointer items-center gap-2'>
                    <AiOutlineArrowLeft fill='#F1F2FF'/>
                    <p className='text-richblack-5'>Back to login </p>
          </div>
        </form>
        
    </div>
  )
}
