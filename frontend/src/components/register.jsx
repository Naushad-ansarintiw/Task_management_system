import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your registration logic goes here
    console.log('Registration submitted:', { email, role, newPassword });
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
              id="email"
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              onChange={(e) => setNewPassword(e.target.value)}
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
