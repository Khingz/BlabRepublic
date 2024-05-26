import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirm } from '../context/confirmContext';
import ImageViewer from '../components/imageViewer';
import { formatDate } from '../utility/postUtils';
import Spinner from '../components/spinner'
import Card from '../components/card'
import { Pagination } from '../components/pagination';
import { singleUser } from '../services/auth.api';
import { usePost } from '../context/postContext';

const SingleUser = () => {
  const navigate = useNavigate()
  const {id} = useParams();
  const { isImgViewerOpen, handleImgViewerOpen } = useConfirm();
  const [user, setUser] = useState({})
  const {fetchData, posts, isLoading} = usePost()

  const avatar = user && `http://localhost:5000/${user.img}`
  const postArr = posts?.data

  const handlePageChange = (pageNumber) => {
    try {
      getPosts({page: pageNumber, author: user._id})
    } catch (err) {
      console.log(err);
      navigate('*')
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
    const getUser = async (id) => {
        try {
            const userData = await singleUser(id);
            setUser(userData)
            getPosts({author: userData._id})
        } catch (err) {
            console.log(err);
        }
    }
    getUser(id)
  }, [])

  return (
    <div className='mt-44 w-full'>
      <div>
        {user && (
          <div className='w-5/6 md:w-1/2 mx-auto rounded overflow-hidden shadow-md py-12'>
            <div className='w-1/2 h-1/2 mx-auto'>
              <img src={avatar} alt="avatar" className='rounded-t-full' onClick={handleImgViewerOpen}/>
              {isImgViewerOpen && <ImageViewer imageUrl={avatar}/>}
            </div>
            <div className='px-6'>
              <div className='mt-8'>
                <h1 className='text-2xl md:text-4xl mb-4 mt-8 font-light text-gray-800'>Personal Info</h1>
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
                  <h1 className='px-10 mt-10 text-4xl font-semibold text-gray-700'>Post from this User</h1>
                  <div className='border-t border-grey-400 mt-4'></div>
                  {user && (user.role === 'editor' || user.role === 'admin') && posts && posts.data < 1 && (<h1 className='w-full mt-32 text-4xl font-semibold text-center'>You don't have any post yet</h1>)}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-10 px-10'>
                    {user && posts && postArr && postArr.map((card) => (
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

export default SingleUser;