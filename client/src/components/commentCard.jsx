import React from 'react'
import LikedCommentBtn from './likedCommentBtn';
import { formatDate } from '../utility/postUtils';
import { useAuth } from '../context/userContext';

const CommentCard = ({comment}) => {
  const { user } = useAuth();
  return (
    <div className='p-4 w-3/4'>
        <div className='flex items-center justify-start gap-2 text-xl'>
          {user ? (
            <p className='font-semibold'>{
              comment?.author?._id && user._id !== comment?.author?._id ? comment?.author?.firstname : 'You'
            }</p>
          ) :(
            <p className='font-semibold'>{
              'Anonymous'
            }</p>
          )}

            <div className='text-xs flex items-center text-gray-400'>&#11044;</div>
            <p>{formatDate(comment?.createdAt)}</p>
        </div>
        <div>
            <p className='text-lg'>{comment?.content}</p>
        </div>
        <div className='flex item-center justify-start mt-2'>
            {
              user ? (
                <LikedCommentBtn commentID={comment._id} likes={comment.likes} userID={user._id}/>
              ) : (
                <div className='flex item-center justify-start mt-2'>
                    <p className='text-xl'>{comment?.likes}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg> 
                </div>
              )
            }

        </div>
        <div className='border-b border-gray-500 w-72 pt-4'></div>
    </div>
  )
}

export default CommentCard;