import React from 'react'
import { useAuth } from '../context/userContext'
import { Link, useNavigate } from 'react-router-dom';
import { useCustomNav } from '../context/navigationContext';
import NavLinksLg from './navLinksLg';
import NavLinksSm from './navLinksSm';
import { toast } from 'react-toastify';

export const NavBar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();
    const { handleToggle, isOpen, isNavMenu } = useCustomNav();

    const avatar = user && `http://localhost:5000/${user.img}`

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        toast.success('Logged out successfully');
    }

  return (
    <div className='fixed top-0 w-full z-20 border-b border-deepPurple'>
        {/* Top nav */}
        <div className='hidden z-[1] w-full h-10 bg-deepPurple text-white md:flex items-center px-6'>
            {
                isLoggedIn ? (
                    <div className='flex items-center justify-between w-screen p-4'>
                        <div className='flex items-center justify-start gap-2'>
                            {(user.role === 'editor' || user.role === 'admin') && (
                                <div>
                                    <Link to={'/posts/newpost'} className='w-full bg-blue-400 hover:bg-blue-500 focus:outline-none  focus:ring-blue-800 text-center text-white rounded-sm px-2 py-1'>Add Post</Link>
                                </div>
                            )}
                            {(user.role === 'admin') && (
                                <div>
                                    <Link to={'/users'} className='w-full bg-green-400 hover:bg-green-500 focus:outline-none  focus:ring-lemonGreen text-center text-white rounded-sm px-2 py-1'>Users</Link>
                                </div>
                            )}
                        </div>
                        <div className='flex items-center'>
                            <Link className='flex items-center mr-8' to={'/profile'}>
                                <img src={avatar} alt="alt" className='w-6 h-6 rounded-lg'/>
                                <p className='mx-3 font-bold'>{user.username.toUpperCase()}</p>
                            </Link>
                            <button className='w-full bg-lemonGreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lemonGreen text-center text-white rounded-sm px-2' onClick={handleLogout}>Logout</button>
                            
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-end w-screen px-10'>
                        <Link to='/register' className='mr-5'>Register</Link>
                        <Link to='/login'>Login</Link>
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
                                    <Link to='/'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                        </svg>
                                    </Link>
                                </div>
                                {/* Toggle buttons ==> Open and close icons  */}
                                {!isOpen && <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={handleToggle}>
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
