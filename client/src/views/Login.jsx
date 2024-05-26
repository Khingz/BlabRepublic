import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/userContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login, error, setError, user  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({email, password})
      navigate('/');
      setEmail('');
      setPassword('');
      toast.success('Logged in succesfully')
    } catch(err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    setError(null)
    if (user) {
      navigate('/')
    }
  }, [setError, error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-deepPurple px-4">
      <div className="bg-lightPurple rounded-lg shadow-md px-8 py-10 w-full md:w-1/3 mt-24">
        <h2 className="text-2xl font-bold text-center text-lemonGreen mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" name="remember" className="w-4 h-4 text-lemonGreen bg-gray-100 rounded border-gray-300 focus:ring-none focus:ring-lemonGreen" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember Me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-lemonGreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lemonGreen text-center text-white rounded-lg"
          >
            Login
          </button>
        </form>
        <Link to='/register' className="text-sm text-gray-700 hover:underline">Dont have an account? Signup</Link>
      </div>
    </div>
  );
};

export default Login;