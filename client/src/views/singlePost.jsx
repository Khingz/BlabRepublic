import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePostItem, fetchSinglePost } from '../services/post.api';
import Spinner from '../components/spinner';
import { useAuth } from '../context/userContext';
import { useConfirm } from '../context/confirmContext';
import Confirm from '../components/confirm';
import { toast } from 'react-toastify';
import '../styles/customStyles.css';
import { formatDate, getCategoryColor } from '../utility/postUtils';
import { singleUser } from '../services/auth.api';
import LikedButton from '../components/likedButton';
import CommentInputForm from '../components/commentInput';
import CommentSection from '../components/commentSection';


const SinglePost = () => {
    const { id } = useParams();
    const { user, isLoggedIn } = useAuth();
    const { isConfirmOpen, handleConfirmOpen, handleConfirmClose  } = useConfirm();
    const [ isLoading, setIsLoading ] = useState(true);
    const [post, setPost] = useState();
    const [postAuthor, setPostAuthor] = useState({})
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);

    const img = post && post.img

    const handleDelete = async (id) => {
        try {
            await deletePostItem(id);
            toast.success('Post deleted successfully')
            navigate('/');
        } catch (err) {
            toast.error(err.message)
        } finally {
            handleConfirmClose();
        }
    }
    
    useEffect(() => {
        const getPost = async (id) => {
            try {
                const postData = await fetchSinglePost(id);
                const userId = postData.data.author;
                const userData = await singleUser(userId);
                setPost(postData.data)
                setPostAuthor(userData)
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
                navigate('*')
            }
        }
        getPost(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (
            <div className='mt-72'>
                <Spinner />
            </div>
        )
    }

    return (       
        <div className='mt-16 md:mt-32'>
            {isConfirmOpen && <Confirm handleDelete={() => handleDelete(post._id)} title={'Are you sure you want to delete post?'}/>}
            {isLoading ? (<div className='pt-8'>
                <Spinner />
            </div>) : post && (
                <div>
                    <div className='px-4 my-10 pt-10'>
                        <p className='text-3xl font-semibold md:text-6xl capitalize'>{post.title}</p>
                    </div>
                    <div className='px-4 flex justify-start items-center gap-2 md:gap-4 -mt-10 md:text-2xl md:-mt-6 mb-8'>
                        {isLoggedIn && postAuthor && (
                            <>
                            {user._id === post.author ? (
                                <Link className='underline capitalize' to={'/profile'} >Your Post</Link>
                            ) : (
                                <Link to={`/users/${post.author}`} className='underline capitalize'>{postAuthor.username}</Link>
                            )}
                            </>
                        )}
                        <div className='border border-gray-200 h-6'></div>
                        <p>{formatDate(post.createdAt)}</p>
                        <div className='border border-gray-200 h-6'></div>
                        <p className={`${getCategoryColor(post.category.toLowerCase())}`}>{post.category}</p>
                    </div>
                    <div className='w-full h-1/2'>
                        <img src={img} alt={post.title} className='w-3/4 h-5/6 m-auto' />
                    </div> 
                    <div className='px-4 my-4'>
                        <p className='preserve-newline text-base sm:text-lg md:text-2xl'>{post.content}</p>
                    </div>
                
                    {/* Like and Comment Section stats  */}

                    <div className='px-4 flex items-center justify-start gap-4'>
                        <div className='border-t border-gray-500 w-28'></div>
                        {isLoggedIn && user ? (
                            <div className='flex items-center justify-start gap-4'>
                                <div>
                                    {post && user && <LikedButton userID={user._id} postID={post._id} likes={post.likes} />}
                                </div>

                                {/* Comments */}
                                <div className='flex items-center justify-start gap-1'>
                                    <p className='text-xl'>{comments.length}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className='flex items-center justify-start gap-4'>
                                <div className='flex items-center justify-start gap-1'>
                                    <p className='text-xl'>{post.likes}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </div>
                                <div className='flex items-center justify-start gap-1'>
                                    <p className='text-xl'>{comments.length}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>

                                </div>
                            </div>
                        )}
                    </div>

                    {/* Post Edit and delete buttons  */}
                    <div>
                        {(post && isLoggedIn && (post._id === user._id || user.role === 'admin')) && (
                            <div className=''>
                                {/* Edit post  */}
                                <div className='px-4 flex items-center justify-start'>
                                    <Link className='mr-4' to={`/posts/${id}/update`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                        </svg>
                                    </Link>
                                    <button onClick={handleConfirmOpen}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    
                    {/* List of comment section  */}
                    <div className='px-4 mt-4'>
                        <h2 className='text-xl md:text-3xl font-light mb-4'>Comments</h2>
                        {user && <CommentInputForm postID={post._id} setComments={setComments} comments={comments} />}
                        {post && <CommentSection postID={post._id} comments={comments} setComments={setComments}/>}
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default SinglePost;