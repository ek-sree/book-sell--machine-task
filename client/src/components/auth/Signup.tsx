import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAxios } from '../../constraints/axios/userAxios';
import { userEndpoints } from '../../constraints/endpoints/userEndpoints';
import { toast, Toaster } from 'sonner';
import { AxiosError } from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return 'All fields are required!';
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match!';
    }

    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validationError = validateForm();
  
      if (validationError) {
        setError(validationError);
        return;
      }
      
      const { name, email, password } = formData; 
      const dataToSend = { name, email, password };
  
      setError('');
      const response = await userAxios.post(userEndpoints.signup, dataToSend);
  
      if (response.status === 200) {
        navigate('/otp');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          toast.error("Email already exists"); 
        } else {
          console.log("Error signing up", error);
          toast.error("An error occurred during signup. Please try again.");
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster expand={true} position='top-center' richColors/>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <p className='pt-4'>Already have an account ? <Link className='text-blue-500' to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
