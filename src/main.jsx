import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import About from "./pages/About";
import Search from "./pages/Search";           
import Dashboard from "./pages/Dashboard";     
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },

      // Auth routes
      { path: "/login", element: <AuthLayout authentication={false}><Login /></AuthLayout> },
      { path: "/signup", element: <AuthLayout authentication={false}><Signup /></AuthLayout> },

      // Protected routes
      { path: "/all-posts", element: <AuthLayout authentication><AllPosts /></AuthLayout> },
      { path: "/my-blogs", element: <AuthLayout authentication><AllPosts myBlogs /></AuthLayout> },
      { path: "/add-post", element: <AuthLayout authentication><AddPost /></AuthLayout> },
      { path: "/edit-post/:slug", element: <AuthLayout authentication><EditPost /></AuthLayout> },
      { path: "/dashboard", element: <AuthLayout authentication><Dashboard /></AuthLayout> },

      // Public Routes
      { path: "/search", element: <Search /> }, // <- Only if this is a separate page, not a modal
      { path: "/post/:slug", element: <Post /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
