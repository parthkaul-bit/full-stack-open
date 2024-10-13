// src/components/UserDetail.js
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams(); // Get user ID from the URL params
  const blogs = useSelector((state) => state.blogs);

  // Filter blogs for the specific user by user.id
  const userBlogs = blogs.filter((blog) => blog.user[0]?.id === id);

  if (!userBlogs || userBlogs.length === 0) {
    return <div>No blogs available for this user.</div>;
  }

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
