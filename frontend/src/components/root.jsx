import React from 'react'
import { Link } from 'react-router-dom'

const root = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-700">Track Management System</h1>
        <Link to="/signin">
            <button className=" mb-4 bg-blue-300 text-white px-4 py-2 rounded-full w-full hover:bg-blue-400">
              Sign In
            </button>
        </Link>
        <Link to="/register">
            <button className="bg-blue-300 text-white px-4 py-2 rounded-full w-full hover:bg-blue-400">
              Sign Up
            </button>
        </Link>
      </div>
    </div>
  );
}

export default root
