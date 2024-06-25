import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/userContext';
import { toast } from 'react-toastify';
import SpinnerSmall from '../components/spinnerSmall';

const Register = () => {
  const { register, setError, error } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password2, setPassword2] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('img', imageFile);
      if (password !== password2) {
        toast.error('Password does not match');
        return;
      }
      await register(formData);
      toast.success('User created successfully')
      navigate('/login');
      setUsername('');
      setPassword('');
      setEmail('');
      setImageFile(null);
      setFirstname('');
      setLastname('');
      setPassword2('');
      setIsLoading(false)
    } catch(err) {
      toast.error(err.message);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    setError(null)
  }, [setError])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-gray-100 rounded-lg shadow-md px-8 py-10 w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Register</h2>
        { error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Firstname */}
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full p-3 rounded-lg border border-gray-300"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>

            {/* Lastname */}
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full p-3 rounded-lg border border-gray-300"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full p-3 rounded-lg border border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>            

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full p-3 rounded-lg border border-gray-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full p-3 rounded-lg border border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Password2 */}
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full p-3 rounded-lg border border-gray-300"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Profile Image (optional)
              </label>
              <input
                type="file"
                name='img'
                id="image"
                className="bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 w-full p-3 rounded-lg border border-gray-300"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-none border border-gray-900 text-gray-900 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray text-center rounded-lg flex justify-center items-center gap-2"
          >
            <span className={`${isLoading ? 'block' : 'hidden'}`}>{<SpinnerSmall />}</span>
            <p>Register</p>
          </button>
        </form>
        <Link to='/login' className="text-sm text-gray-700 hover:underline">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
