import React from 'react'
import logo from '../utility/images/LogoBlabRepublic.jpg'

const NotFoundPage = () => {
  return (
    <div className='overflow-hidden'>
        <div className='mt-32 md:mt-52 flex items-center justify-center flex-col'>
            <img src={logo} alt="logo" className='w-1/2 md:w-1/4 md:mb-8'/>
            <h2 className='text-7xl'>404</h2>
            <h3>Page Not Found</h3>
        </div>
    </div>
  )
}

export default NotFoundPage;