import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Create from "./components/Create";
import Togglable from "./components/Toggable";
import Alert from "./components/Alert";
import { fetchBlogs } from "./redux/blogSlice";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Users from "./components/Users";
import UserDetail from "./components/UserDetail";
import BlogDetail from "./components/BlogDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    console.log("Current blogs state:", blogs);
  }, [blogs]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };

  return user === null ? (
    <LoginForm />
  ) : (
    <BrowserRouter>
      <div>
        <nav>
          <NavLink to="/" style={{ paddingRight: 10 }}>
            Blogs
          </NavLink>
          <NavLink to="/users" style={{ paddingRight: 10 }}>
            Users
          </NavLink>
          {user && (
            <span>
              {user.username} logged in{" "}
              <button onClick={handleLogout}>Logout</button>
            </span>
          )}
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>blogs</h2>
                <Alert message={message} type={type} />
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <Create
                    user={user}
                    toggleVisibility={() => {
                      blogFormRef.current.toggleVisibility();
                    }}
                    fetchBlogs={fetchBlogs}
                  />
                </Togglable>
                <br />
                {blogs.length === 0 ? (
                  <p>No blogs available</p>
                ) : (
                  blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} user={user} />
                  ))
                )}
              </div>
            }
          />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
