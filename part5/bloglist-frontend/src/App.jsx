import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Create from "./components/Create";
import Togglable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };
  useEffect(() => {
    fetchBlogs();
    // blogService.getAll().then((blogs) => setBlogs(blogs));
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
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <Create
          user={user}
          toggleVisibility={() => {
            blogFormRef.current.toggleVisibility();
          }}
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
