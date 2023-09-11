import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration'
import Forgot_Password from './pages/Forgot_Password';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import Profile from './pages/Profile';
import VideoPage from './pages/VideoPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/password/reset",
    element: <Forgot_Password />,
  },
  {
    path: "/news",
    element: <PostsPage />,
  },
  {
    path: "/videos",
    element: <PostsPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/video/:video_slug",
    element: <VideoPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
