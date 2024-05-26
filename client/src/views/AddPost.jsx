import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePost } from '../context/postContext';
import Spinner from '../components/spinner';

const AddPost = () => {
  const navigate = useNavigate();
  const { addPost, isLoading } = usePost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const categories = [
    { name: 'Health' },
    { name: 'Education' },
    { name: 'Politics' },
    { name: 'Lifestyle' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', selectedCategory);
      formData.append('img', imageFile);
      await addPost(formData);
      toast.success('Post created successfully')
      navigate('/');
      setTitle('');
      setContent('');
      setSelectedCategory('');
      setImageFile(null);
    } catch(err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-deepPurple pt-16 pb-8 px-2">
      <div className="bg-lightPurple rounded-lg shadow-md px-8 py-12 w-full md:w-1/2 mt-24">
        <h2 className="text-2xl font-bold text-center text-lemonGreen mb-6">Add Post</h2>
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

            {/* Image Upload */}
            <div className='mb-4'>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Post Image
              </label>
              <input
                type="file"
                name='img'
                id="image"
                className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-lemonGreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lemonGreen text-center text-white rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;