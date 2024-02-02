import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import Employee from './Employee';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '', // Set role based on user selection (admin or employee)
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the registration endpoint using fetch
      const response = await fetch('http://localhost:4040/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Assuming the server sends back some data upon successful registration
        // Check the role and navigate accordingly
        if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'employee') {
          navigate(`/employee/${data._id}`);
        }
      } else {
        console.error('Failed to register user:', response.statusText);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-700">Register</h1>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
