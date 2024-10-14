import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog, fetchBlogs } from "../redux/blogSlice";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap"; // Importing React Bootstrap components

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const handleDelete = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
      dispatch(fetchBlogs());
    }
  };

  return (
    <Card className="my-3" border="light">
      <Card.Body>
        <Card.Title>
          <Link
            to={`/blogs/${blog.id}`}
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            {blog.title}
          </Link>
        </Card.Title>
        <Card.Text>Author: {blog.author}</Card.Text>
        <Card.Text>
          Likes: {blog.likes}
          {/* Uncomment the following line to enable like functionality */}
          {/* <Button variant="outline-primary" onClick={handleLike}>Like</Button> */}
        </Card.Text>
        {blog.user && blog.user[0] && blog.user[0].id === user.id && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
