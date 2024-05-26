import React, { useEffect } from 'react'
import { fetchCommentsFromServer } from '../services/comments.api'
import CommentCard from './commentCard';
import { useAuth } from '../context/userContext';

const CommentSection = ({ postID, setComments, comments }) => {
    const { user } = useAuth();
    useEffect(() => {
        const getComments = async (postID) => {
            try {
                const comments = await fetchCommentsFromServer(postID);
                setComments(comments.data)
            } catch (err) {
                console.log(err);
            }
        }
        getComments(postID)
    }, [])
    return (
    <div>
        {
            comments && comments.length < 1 ? (
                <div>
                    {user ? (
                        <p className='p-4 text-lg'>No comment yet, Be the first to comment</p>
                    ) : (
                        <p className='p-4 text-lg'>No comment yet</p>
                    )}
                </div>
            ) : (
                <div>
                    {
                        comments.map((comment) => (
                            <CommentCard key={comment._id} comment={comment} />
                        ))
                    }
                </div>
            )
        }
    </div>
)
}

export default CommentSection;