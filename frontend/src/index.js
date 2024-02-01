import React from 'react';
import './index.css'
import ReactDOM from 'react-dom/client';
import Root from './components/root';
import SignIn from './components/signin'
import Register from './components/register';
import Admin from './components/Admin';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root /> ,
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin",
    element: <Admin />,
  }, 
  {
    path: "/admin/assign-task", 
    element: <Admin />
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

