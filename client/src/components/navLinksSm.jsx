import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCustomNav } from '../context/navigationContext';
import { useAuth } from '../context/userContext';
import { toast } from 'react-toastify';

const NavLinksSm = () => {
  const category = ['Health', 'Education', 'Politics', 'Lifestyle'];
  const { setIsOpen, isOpen } = useCustomNav();
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate();

  const avatar = user && `${process.env.REACT_APP_API_BASE_URL}/${user.img}`

  const iconIndex = [
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' /> </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>
  ]

  const handleLogout = async () => {
    await logout();
    setIsOpen(false)
    navigate('/login');
    toast.success('Logged out successfully');
  }

  return (
    // Is Open Icon for small screens
    <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 z-50'>
      <div className='w-full items-center mt-10 border-t-2 border-t-black-100 absolute left-0 p-3 bg-gray-700 text-white z-60 h-full pt-6'>
          <div className='flex items-center justify-between mb-5'>
            {user && (<Link className='flex items-center mr-8' to={'/profile'} onClick={() => setIsOpen(false)}>
                <img src={avatar} alt="alt" className='w-10 h-10 rounded-lg'/>
                <p className='mx-3 text-2xl font-light'>{user.username.toUpperCase()}</p>
            </Link>)}
            {isOpen && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8" onClick={() => setIsOpen(false)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg >}
          </div>
          <div className='border-t'></div>
          <div className='mx-2'>
            {
              category.map((item, index) => {
                return (
                  <div className='flex items-center justify-start gap-2 my-6' key={index}>
                    {iconIndex[index]}
                    <Link onClick={() => setIsOpen(false)} to={{
                      pathname: '/posts',
                      search: `?category=${item}`,
                    }} className='mx-1 font-light text-3xl' key={index}>{item}</Link>
                  </div>         
                )       
              })
            }
        </div>

        {/* Bottom Navigation  */}
        <div className='w-full h-10 bg-gray-700 text-white md:flex md:items-center md:px-6'>
            {
                isLoggedIn ? (
                    <div className='w-full'>
                        <div className='w-full mb-4'>
                            {(user.role === 'editor' || user.role === 'admin') && (
                                <div>
                                    <Link to={'/posts/newpost'} className='block bg-transparent border border-grey-200 hover:bg-grey-500 focus:outline-none  focus:ring-grey-800 text-lg text-center text-white rounded-sm py-2' onClick={() => setIsOpen(false)}>Add Post</Link>
                                </div>
                            )}
                        </div>
                        <div>
                            {(user.role === 'admin') && (
                                <div>
                                    <Link to={'/users'} className='block bg-transparent border border-grey-200 hover:bg-grey-500 focus:outline-none  focus:ring-grey-800 text-lg text-center text-white rounded-sm py-2' onClick={() => setIsOpen(false)}>Users</Link>
                                </div>
                            )}
                        </div>
                        <div className='mt-6'>
                            <button className='w-full bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 text-center text-white rounded-sm py-3' onClick={handleLogout}>Logout</button>   
                        </div>
                    </div>
                ) : (
                    <div className=''>
                        <Link to='/register' className='block border py-3 text-2xl text-center mb-4' onClick={() => setIsOpen(false)} >Register</Link>
                        <Link to='/login' className='block border py-3 text-2xl text-center mb-4' onClick={() => setIsOpen(false)}>Login</Link>
                    </div>
                )
            }
        </div>
    </div>
  </div>
  )
}

export default NavLinksSm;