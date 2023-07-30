import React from 'react'
import { Link } from 'react-router-dom'

export const Button = ({children,active,linkto}) => {
  return (
        <Link to={linkto}>
            <div className={`rounded-md font-semibold tracking-tight text-md flex items-center gap-2  px-6 py-3
            ${active?"bg-yellow-50 text-richblack-900 shadow-md shadow-yellow-50/40":"bg-richblack-800 text-white/90 shadow-md shadow-richblack-400/40"}
            hover:scale-95 transition-all duration-300 text-center
            `}>
                {children}
            </div>
        </Link>
  )
}
