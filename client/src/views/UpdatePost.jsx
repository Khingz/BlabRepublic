import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchSinglePost, updatePostItem } from '../services/post.api';
import Spinner from '../components/spinner';

const UpdatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const { id } = useParams();

  const categories = [
    { name: 'Health' },
    { name: 'Education' },
    { name: 'Politics' },
    { name: 'Lifestyle' }
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title,
        content,
        category: selectedCategory
      }
      await updatePostItem(formData, id);
      navigate(`/posts/${id}`);
      toast.success('Post updated successfully')
    } catch(err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    const getPost = async (id) => {
        try {
            const postData = await fetchSinglePost(id);
            console.log(postData);
            setTitle(postData.data.title);
            setContent(postData.data.content);
            setSelectedCategory(postData.data.category);
            setIsLoading(false)
        } catch (err) {
          navigate('*')
            setIsLoading(false)
        }
    }
    getPost(id)
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-deepPurple pt-16 pb-8">
      { isLoading ? (<div className='pt-8'>
                <Spinner />
            </div>) : (
      <div className="bg-lightPurple rounded-lg shadow-md px-8 py-12 w-full md:w-1/2 mt-24">
        <h2 className="text-2xl font-bold text-center text-lemonGreen mb-6">Update Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="username"
              className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    name="message"
                    className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full rounded-lg border border-gray-300 resize-none h-64  p-3"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
          </div>
          <div className='mb-4'>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Post Category
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen sm:text-sm"
            >
            <option value="">Select...</option>
            {categories.map((category) => (
                <option key={category.name} value={category.name}>
                {category.name}
                </option>
            ))}
           </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-lemonGreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lemonGreen text-center text-white rounded-lg"
          >
            Update
          </button>
        </form>
      </div>)
      }
    </div>
  );
};

export default UpdatePost;