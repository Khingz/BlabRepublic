import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../utility/images/LogoBlabRepublic.jpg'

const NavLinksLg = () => {
  const category = ['Health', 'Education', 'Politics', 'Lifestyle'];
  const categoryLeft = category.slice(0, 2);
  const categoryRight = category.slice(-2);

  return (
    <div className='flex justify-center w-full items-center my-2'>
      <div className='mx-2'>
        {
          categoryLeft.map((item, key) => {
            return (
              <Link to={{
                pathname: '/posts',
                search: `?category=${item}`,
              }} className='mx-2 font-light text-3xl' key={key}>{item}</Link>
            )       
          })
        }
      </div>

      <div className='mx-3'>
        {/* Logo Icon */}
        <Link to='/'>
          <img src={logo} alt="blabLogo" className='w-16' />
        </Link>
      </div>

      <div className='mx-2'>
      {
          categoryRight.map((item, key) => {
            return (
              <Link to={{
                pathname: '/posts',
                search: `?category=${item}`,
              }} className='mx-2 font-light text-3xl' key={key}>{item}</Link>
            )       
          })
        }
      </div>
    </div>
  )
}

export default NavLinksLg;