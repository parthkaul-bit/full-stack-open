import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Create from "./components/Create";
import Togglable from "./components/Toggable";
import Alert from "./components/Alert";
import { useSelector } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const { message, type } = useSelector((state) => state.notification);

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

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
          message={message}
        />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} fetchBlogs={fetchBlogs} />
      ))}
    </div>
  );
};

export default App;
