import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()
  const [ searchText, setSearchText ] = useState('')

  const handleNavigation = () => {
    if (!searchText) {
      return;
    }
    navigate(`/posts?search=${searchText}`)
  }
  return (
    <div className='w-full flex items-center justify-center text-md relative'>
        <div className='flex items-center justify-center bg-white shadow-md offset-x-2 offset-y-2 blur-4 px-3 py-2 absolute -top-7 rounded-sm md:w-1/2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-bold text-gray-500 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="search" value={searchText} name="search" placeholder='Search blog' className='text-gray-500 focus:outline-none mx-3 w-5/6 text-lg' onChange={(e) => setSearchText(e.target.value)} />
            <button className='bg-lemonGreen py-2 px-4 font-semibold rounded-sm' onClick={handleNavigation}>Submit</button>
        </div>
    </div>

  )
}

export default Search