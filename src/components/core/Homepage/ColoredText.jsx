import React from 'react'

export const ColoredText = ({children,color}) => {
  return (
    <div className={`${color}`}>
        {children}
    </div>
  )
}
