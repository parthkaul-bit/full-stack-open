// src/App.js
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Create from "./components/Create";
import Togglable from "./components/Toggable";
import Alert from "./components/Alert";
import { fetchBlogs } from "./redux/blogSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    console.log("Current blogs state:", blogs);
  }, [blogs]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return user === null ? (
    <LoginForm user={user} setUser={setUser} />
  ) : (
    <div>
      <h2>blogs</h2>
      <div>
        <div>{user.username} logged in </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />
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
        blogs.map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
      )}
    </div>
  );
};

export default App;
