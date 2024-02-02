import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4040/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Assuming the server sends back some data upon successful login
        const data = await response.json();
        console.log(data);

        // Perform actions based on the response, e.g., redirect to a new page
        if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'employee') {
          navigate(`/employee/${data._id}`);
        }
      } else {
        console.error('Failed to log in:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-700">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-300 text-white px-4 py-2 rounded-full w-full hover:bg-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;