import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog, fetchBlogs } from "../redux/blogSlice";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

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
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likeBlog(updatedBlog));
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
      dispatch(fetchBlogs());
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        <div>Title: {blog.title}</div>
        Author: {blog.author}
        <div>
          <button onClick={() => setVisible(!visible)}>
            {visible ? "hide" : "view"}
          </button>
        </div>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div className="url">URL: {blog.url}</div>
        <div className="likes">
          Likes: {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.user && blog.user[0] && blog.user[0].name}
          {blog.user && blog.user[0] && blog.user[0].id === user.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
