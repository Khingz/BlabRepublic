import React from 'react'
import { useAuth } from '../context/userContext'
import { Link, useNavigate } from 'react-router-dom';
import { useCustomNav } from '../context/navigationContext';
import NavLinksLg from './navLinksLg';
import NavLinksSm from './navLinksSm';
import { toast } from 'react-toastify';
import logo from '../utility/images/LogoBlabRepublic.jpg'


export const NavBar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user, logout, isLoading } = useAuth();
    const { handleToggle, isOpen, isNavMenu } = useCustomNav();

    const avatar = user && user.img

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        toast.success('Logged out successfully');
    }

  return (
    <div className='fixed top-0 w-full z-20 border-b border-gray-700'>
        {/* Top nav */}
        <div className='hidden z-[1] w-full h-10 bg-gray-700 text-white md:flex items-center px-6'>
            {
                !isLoading && isLoggedIn ? (
                    <div className='flex items-center justify-between w-screen p-4'>
                        <div className='flex items-center justify-start gap-2'>
                            {(user.role === 'editor' || user.role === 'admin') && (
                                <div>
                                    <Link to={'/posts/newpost'} className='w-full bg-none border border-white hover:text-black hover:bg-white focus:outline-none  focus:ring-white text-center text-white rounded-sm px-2 py-1'>Add Post</Link>
                                </div>
                            )}
                            {(user.role === 'admin') && (
                                <div>
                                    <Link to={'/users'} className='w-full bg-white text-black hover:bg-transparent hover:border hover:border-white hover:text-white text-center rounded-sm px-2 py-1'>Users</Link>
                                </div>
                            )}
                        </div>
                        <div className='flex items-center'>
                            <Link className='flex items-center mr-8' to={'/profile'}>
                                <img src={avatar} alt="alt" className='w-6 h-6 rounded-lg'/>
                                <p className='mx-3 text-xl font-light'>{user.username.toUpperCase()}</p>
                            </Link>
                            <button className='w-full bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 text-center text-white rounded-sm px-4 py-1' onClick={handleLogout}>Logout</button>   
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-end w-screen px-10'>
                        <Link to='/register' className='mr-5 text-xl'>Register</Link>
                        <Link to='/login' className='text-xl'>Login</Link>
                    </div>
                )
            }
        </div>

        {/* Bottom nav */}
        <div className='bg-white'>
            <div className='flex justify-between w-full p-5'>
                {
                    isNavMenu ? (
                        <NavLinksLg/>
                    ) : (
                        <div className='md:hidden w-full'>
                            <div className='flex justify-between items-center'>
                                <div className='md:hidden'>
                                    {/* Logo  */}
                                    <Link to='/'>
                                        <img src={logo} alt="blabLogo" className='w-12' />
                                    </Link>
                                </div>
                                {/* Toggle buttons ==> Open and close icons  */}
                                {!isOpen && <svg className='w-10 h-10' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={handleToggle}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                </svg>}
                            </div>
                            {isOpen && <NavLinksSm className='block' />}
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}
