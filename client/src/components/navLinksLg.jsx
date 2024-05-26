import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NavLinksLg = () => {
  const category = ['Health', 'Education', 'Politics', 'Lifestyle'];
  const categoryLeft = category.slice(0, 2);
  const categoryRight = category.slice(-2);
  const navigate = useNavigate()

  const handleRoute = () => {
    navigate('/')
  }

  return (
    <div className='flex justify-center w-full items-center'>
      <div className='mx-2'>
        {
          categoryLeft.map((item, key) => {
            return (
              <Link to={{
                pathname: '/posts',
                search: `?category=${item}`,
              }} className='mx-1 font-semibold text-lg' key={key} onClick={handleRoute}>{item}</Link>
            )       
          })
        }
      </div>

      <div className='mx-3'>
        {/* Logo Icon */}
        <Link to='/'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.7" stroke="currentColor" className="w-20 h-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
          </svg>
        </Link>
      </div>

      <div className='mx-2'>
      {
          categoryRight.map((item, key) => {
            return (
              <Link to={{
                pathname: '/posts',
                search: `?category=${item}`,
              }} className='mx-1 font-semibold text-lg' key={key}>{item}</Link>
            )       
          })
        }
      </div>
    </div>
  )
}

export default NavLinksLg;