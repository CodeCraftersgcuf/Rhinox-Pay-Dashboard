import React from 'react'

interface props {
    children: React.ReactNode;
}

const Vertical :React.FC<props> = ({children}) => {
  return (
    <div className='flex items-center justify-between gap-4'>
        {children}
    </div>
  )
}

export default Vertical