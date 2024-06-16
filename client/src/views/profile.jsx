import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/userContext';
import { useConfirm } from '../context/confirmContext';
import ImageViewer from '../components/imageViewer';
import { formatDate } from '../utility/postUtils';
import Spinner from '../components/spinner'
import Card from '../components/card'
import { Pagination } from '../components/pagination';
import { usePost } from '../context/postContext';

const CurrentUserProfile = () => {
  const { user } = useAuth();
  const {fetchData, posts, isLoading} = usePost()
  const { isImgViewerOpen, handleImgViewerOpen } = useConfirm();

  const avatar = (user && `${process.env.REACT_APP_API_BASE_URL}/${user.img}`)
  const postArr = posts.data

  const handlePageChange = async (pageNumber) => {
    try {
      await getPosts({page: pageNumber, author: user._id})
    } catch (err) {
      console.log(err);
    }
  }

  const getPosts = async (query) => {
    try {
      await fetchData(query)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    user && getPosts({author: user._id})
  }, [])

  
  if (isLoading) {
    <Spinner />
  } 

  return (
    <div className='mt-24 md:mt-44 w-full'>
      <div>
        {user && (
          <div className='w-5/6 md:w-1/2 mx-auto rounded overflow-hidden shadow-md py-12'>
            <div className='w-1/2 h-1/2 mx-auto'>
              <img src={avatar} alt="avatar" className='rounded-t-full' onClick={handleImgViewerOpen}/>
              {isImgViewerOpen && <ImageViewer imageUrl={avatar}/>}
            </div>
            <div className='px-6'>
              <div className='flex justify-between items-center mt-8'>
                <h1 className='text-2xl md:text-4xl mb-4 mt-8 font-light text-gray-800'>Personal Info</h1>
                <Link className='mr-4' to={`/profile/update`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                    </svg>
                </Link>
              </div>
              <div className='border-2 border-black-400 p-4 capitalize'>
                <p className='text-lg md:text-2xl font-light text-gray-700 mb-4'>Firstname: <span className='ml-4 font-semibold text-2xl md:text-4xl'>{user.firstname}</span></p>
                <p className='text-lg  md:text-2xl font-light text-gray-700 mb-4'>Lastname: <span className='ml-4 font-semibold text-2xl md:text-4xl'>{user.lastname}</span></p>
                <p className='text-lg  md:text-2xl font-light text-gray-700 mb-4'>Username: <span className='ml-4 font-semibold text-2xl md:text-4xl'>{user.username}</span></p>
                <p className='text-lg  md:text-2xl font-light text-gray-700 mb-4'>Email: <span className='ml-4 font-semibold text-2xl md:text-4xl lowercase'>{user.email}</span></p>
                <p className='text-lg  md:text-2xl font-light text-gray-700 mb-4'>Role: <span className='ml-4 font-semibold text-2xl md:text-4xl'>{user.role}</span></p>
                <p className='text-lg  md:text-2xl font-light text-gray-700 mb-4'>Date joined: <span className='ml-4 font-semibold text-2xl md:text-4xl'>{formatDate(user.createdAt)}</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {user && (user.role === 'editor' || user.role === 'admin') && (
          <div>
            {
              isLoading ? (<div className='w-full flex items-center justify-center mt-16'>
              <Spinner />
              </div>) : (
                <>
                  <h1 className='px-10 mt-10 text-4xl font-semibold text-gray-700'>Your Post</h1>
                  <div className='border-t border-grey-400 mt-4'></div>
                  {user && (user.role === 'editor' || user.role === 'admin') && posts && posts.data < 1 && (<h1 className='w-full mt-32 text-4xl font-semibold text-center'>You don't have any post yet</h1>)}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-10 px-10'>
                    {posts && postArr.map((card) => (
                      <Card key={card._id} image={card.img} title={card.title} content={card.content} category={card.category} date={card.createdAt} author={card.author} id={card._id} />
                    ))}
                  </div>
                  {!isLoading && <div className='mb-6'>
                    <Pagination currentPage={posts.page} totalPages={posts.totalPages} onPageChange={handlePageChange}/>
                  </div>}
                </>
              )
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrentUserProfile;