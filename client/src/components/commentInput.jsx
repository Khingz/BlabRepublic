import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { newComment } from '../services/comments.api';

const CommentInputForm = ({postID, setComments, comments}) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentData = await newComment(postID, {content})
      setComments([commentData.data, ...comments])
      setContent('');
      toast.success('Comment added successfully');
    } catch(err) {
      toast.error(err.message)
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={content} placeholder='Add comment' className='border md:p-4 p-2 w-3/6 rounded-md focus:outline-none' onChange={(e) => setContent(e.target.value)} />
            <input type="submit" value="Submit" className='w-24 md:p-4 p-2 ml-2 px-4 bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 text-center text-white rounded-lg cursor-pointer'/>
        </form>
    </div>
  )
}

export default CommentInputForm