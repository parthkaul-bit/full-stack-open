import { useEffect, useState } from "react";
import blogs from "../services/blogs";
import { PropTypes } from "prop-types";

const Blog = ({ blog, user, fetchBlogs }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async (event) => {
    event.preventDefault();
    await blogs.updateOne({ ...blog, likes: blog.likes + 1 }, user.token);
    await fetchBlogs();
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      await blogs.deleteOne(blog.id, user.token);
    await fetchBlogs();
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.author}
          {blog.user[0].id === user.id ? (
            <button onClick={handleDelete}>delete</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  fetchBlogs: PropTypes.func.isRequired,
};

export default Blog;
