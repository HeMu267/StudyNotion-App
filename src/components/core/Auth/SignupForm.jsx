import React, { useState } from 'react'
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import {AiOutlineEye} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendotp } from '../../../services/operations/authAPI';
import {setSignupData} from '../../../slices/authSlice';
export const SignupForm = () => {
  const {signupData}=useSelector((state)=>state.auth);
  const [accountType,setAccountType]=useState("Student");
  const [showPassword,setShowPassword]=useState(false);
  const [showPassword1,setShowPassword1]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [signData,setSignData]=useState(
    {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",
      accountType:""
    }
  );

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
    setSignData((prev)=>({
      ...prev,
      [event.target.name]:event.target.value,
      accountType:accountType
    }));
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    dispatch(sendotp(signData.email,navigate));
    dispatch(setSignupData(signData));
    setSignData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }
  return (
    <div className='flex flex-col mb-9 gap-6 text-white'>
        <div className='flex max-w-[230px] rounded-full p-1 text-lg bg-richblack-700/50 shadow-sm shadow-richblack-300'>
          <button onClick={()=>{setAccountType("Student")}} className={`w-[50%] transition-all ease-in duration-[150ms] rounded-full p-2 ${accountType==="Student"?"bg-richblack-900":""}`}>Student</button>
          <button onClick={()=>{setAccountType("Instructor")}} className={`w-[50%] p-2 transition-all ease-in duration-[150ms] rounded-full ${accountType==="Instructor"?"bg-richblack-900":""}`}>Instructor</button>
        </div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex gap-4'>
            <div>
                <label>
                  <p>
                    First Name
                    <sup className='text-pink-200'>*</sup>
                  </p>
                </label>
                <input onChange={handleChange} name='firstName' placeholder='Enter your First Name' type='text' required className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300'>
                </input>
            </div>
            <div>
                <label>
                  <p>
                    Last Name
                    <sup className='text-pink-200'>*</sup>
                  </p>
                </label>
                <input onChange={handleChange} name='lastName' placeholder='Enter your Last Name' type='text' required className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300'></input>
            </div>
          </div>
          <div>
            <label><p>
              Email Address
              <sup className='text-pink-200'>*</sup>
            </p></label>
            <input onChange={handleChange} name='email' placeholder='Enter Email Address' type='text' required className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300'></input>
          </div>
          <div className='flex gap-4'>
            <div className='relative'>
                <label>
                  <p>
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
                  <p>
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
          </div>
          <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
              Create An Account
          </button>
        </form>
    </div>
  )
}
