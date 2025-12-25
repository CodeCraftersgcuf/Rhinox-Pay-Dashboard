import React from 'react'

interface props {
    children: React.ReactNode;
}

const ItemAlign :React.FC<props> = ({children}) => {
  return (
    <div className='flex items-center gap-4'>
        {children}
    </div>
  )
}

export default ItemAlign