import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='mt-16'>
      <div className='fixed bottom-0 md:h-10 w-full text-white text-sm md:text-lg flex items-center justify-center border-t border-white bg-gray-800'>
        <p className='font-light'>{`All rights reserved ©${year} - BlabReublic`}</p>
      </div>
    </div>
  )
}

export default Footer