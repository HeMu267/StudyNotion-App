import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Gradient1 } from './Gradient1'
import { Gradient2 } from './Gradient2'

export const TextAnimation = ({codes,color,gradient}) => {
  return (
    <div className='lg:w-[460px] w-full bg-white/[0.01]  bg-gradient-to-r from-[rgba(14,16,45,.24)] to-[rgba(17,30,50,0.38)] h-fit z-20 relative border-2 flex border-richblack-500/40 py-3 '>

        <div className='flex w-[10%] flex-col sm:text-base text-[10px] justify-center items-center text-richblack-500 font-bold '>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className={` w-[90%] flex flex-col sm:text-base text-[10px] text ${color} font-bold font-mono`}>
            <TypeAnimation
                sequence={[codes,5000,""]}
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }
                omitDeletionAnimation={true}
            />
        </div>
        {
            gradient==1 &&
            <Gradient1></Gradient1>   
        }
        {
            gradient==2 &&
            <Gradient2></Gradient2>
        }
    </div>
  )
}
