import React from 'react'
import loginImg from '../assets/Images/login.webp'
import { Template } from '../components/core/Auth/Template'
export const Login = () => {
  return (
    <Template
        heading="Welcome Back"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        formType="Login"
        img={loginImg}
    />
  )
}
