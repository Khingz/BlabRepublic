import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePost } from '../context/postContext';
import Spinner from '../components/spinner';
import SpinnerSmall from '../components/spinnerSmall';

const AddPost = () => {
  const navigate = useNavigate();
  const { addPost, isLoading } = usePost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submitSpinner, setSubmitSpinner] = useState(false)

  const categories = [
    { name: 'Health' },
    { name: 'Education' },
    { name: 'Politics' },
    { name: 'Lifestyle' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitSpinner(true)
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', selectedCategory);
      formData.append('img', imageFile);
      await addPost(formData);
      toast.success('Post created successfully')
      setTitle('');
      setContent('');
      setSelectedCategory('');
      setImageFile(null);
      setSubmitSpinner(false)
      navigate('/')
    } catch(err) {
      toast.error(err.message)
      setSubmitSpinner(false)
    }
  }

  useEffect(() => {
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700 pt-16 pb-8 px-2">
      <div className="bg-gray-100 rounded-lg shadow-md px-8 py-12 w-full md:w-1/2 mt-24">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Add Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="username"
              className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full p-3 rounded-lg border border-gray-300"
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
                    className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full rounded-lg border border-gray-300 resize-none h-64  p-3"
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
            className="mt-1 block w-full p-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"
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
                className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full p-3 rounded-lg border border-gray-300"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-none border border-gray-900 text-gray-900 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray text-center rounded-lg flex justify-center items-center gap-2"
          >
            <span className={`${submitSpinner ? 'block' : 'hidden'}`}>{<SpinnerSmall />}</span>
            <p>Add Post</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;