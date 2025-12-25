import React from 'react'

interface props {
    children: React.ReactNode;
}

const Horizontal :React.FC<props> = ({children}) => {
  return (
    <div className='space-y-6'>
        {children}
    </div>
  )
}

export default Horizontal