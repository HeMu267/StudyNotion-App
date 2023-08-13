import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from '../../data/countrycode.json'
export const ContactUs = () => {
    const {
        register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}
    }=useForm();
    useEffect(()=>{
        if(isSubmitSuccessful)
        {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful])
    const submitContactForm=async(data)=>{
        try{
            console.log(data)
        }catch(err)
        {
            console.log(err);
        }
    }
  return (
    <form className='flex flex-col gap-4 mb-10 w-full text-richblack-5' onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex gap-4'>
            <div className='w-[50%]'>
                <label>
                    <p>
                    First Name
                    <sup className='text-pink-200'>*</sup>
                    </p>
                </label>
                <input placeholder='Enter your First Name' className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300' type='text' {...register("firstName",{required:true})}></input>
                {errors?.firstName?.type==="required" && <p className='text-yellow-200'>This field is required</p>}
            </div>
            <div className='w-[50%]'>
                <label>
                <p>
                    Last Name
                    <sup className='text-pink-200'>*</sup>
                    </p>
                </label>
                <input placeholder='Enter your Last Name' className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300' type='text' {...register("lastName",{required:true})}></input>
                {errors?.lastName?.type==="required" && <p className='text-yellow-200'>This field is required</p>}
            </div>
        </div>
        <div>
            <label>
                <p>
                    Email Address
                    <sup className='text-pink-200'>*</sup>
                </p>
            </label>
            <input placeholder='Enter your Email' className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300' type='email' {...register("email",{required:true})}></input>
            {errors?.email?.type==="required" && <p className='text-yellow-200'>This field is required</p>}
        </div>
        <div >
            <div className='flex gap-4'>
            <select className=' focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-[30%] bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300' {...register("CountryCode")}>
                {
                    CountryCode.map((code,index)=>{
                        return (
                            <option key={index} value={code.code}>{code.code} - {code.country}</option>
                        )
                    })
                }
            </select>
            <input type='number' className='appearance-none  focus:outline-none w-full focus:shadow-outline focus:ring-richblack-50 bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300' placeholder='0123456789' {...register("phoneNo",{required:true,minLength:{value:8,message:"Invalid Phone number"},maxLength:{value:10,message:"Invalid Phone Number"}})}></input>

            </div>
            {
                errors?.phoneNo && <p className='text-yellow-200'>{errors.phoneNo.message}</p>
            }
        </div>
        <div>
            <label>Message</label>
            <textarea className='appearance-none focus:outline-none focus:shadow-outline focus:ring-richblack-50 w-full bg-richblack-700 text-richblack-5 rounded-lg py-3 px-3 shadow-md shadow-richblack-300' cols="30" rows="7" placeholder='Enter your Message' {...register("message",{required:true})}></textarea>
            {
                errors?.message?.type==="required" && <p className='text-yellow-200'>Please  enter your message</p>
            }
        </div>
        <button type='submit' className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
            Send Message
        </button>
    </form>
  )
}
