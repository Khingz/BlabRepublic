import React, { useEffect, useState } from 'react'
import UserCard from '../components/userCard'
import { fetchUsersFromServer } from '../services/auth.api'
import { Pagination } from '../components/pagination'
import Spinner from '../components/spinner'

const Users = () => {
  const [searchUser, setSearchUser] = useState('')
  const [usersData, setUsersData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const users = usersData.data;

  const handleSearch = async () => {
    if (searchUser) {
      await getUsers({
        search: searchUser
      })
      setSearchUser('');
    }
  }


  const getUsers = async (query) => {
    try {
      setIsLoading(true)
      const usersList = await fetchUsersFromServer(query);
      console.log(usersList);
      setUsersData(usersList.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  }

  const handlePageChange = async (pageNumber) => {
    try {
      await getUsers({page: pageNumber})
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers({})
  }, [])

  if (isLoading) {
    return (
      <div className='mt-12 md:mt-44 px-4'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='mt-28 md:my-6 px-4'>
      <h2 className='md:text-6xl text-4xl font-light'>{`Users`}</h2>

      {/* Search Section  */}
      <div className='flex items-center justify-center bg-white shadow-md offset-x-2 offset-y-2 blur-4 px-3 py-2 rounded-sm md:w-1/2 mx-auto mt-10'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-bold text-gray-500 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="search" value={searchUser} name="search" placeholder='Search user' className='text-gray-500 focus:outline-none mx-3 w-5/6 text-lg' onChange={(e) => setSearchUser(e.target.value)} />
            <button className='bg-transparent border border-black py-2 px-4 font-light text-xl rounded-sm' onClick={handleSearch}>SEARCH</button>
        </div>

      {/* User List section  */}
      <div className='mt-10'>
        {
          users && (
            <div>
              {
                users.length < 1 ? (
                  <h3 className='text-center font-light text-2xl'>No User found</h3>
                ) : (
                  <div>
                    {
                      users.map(user => (
                        <UserCard key={user._id} id={user._id} firstname={user.firstname} lastname={user.lastname} username={user.username} role={user.role} />
                      ))
                    }
                  </div>
                )
              }
            </div>
          )
        }
      </div>

      {/* Pagination  */}
      {<div className='mb-6'>
        <Pagination currentPage={usersData.page} totalPages={usersData.totalPages} onPageChange={handlePageChange}/>
      </div>}


    </div>
  )
}

export default Users;