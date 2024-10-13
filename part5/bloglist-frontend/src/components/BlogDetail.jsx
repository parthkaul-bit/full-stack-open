import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>{blog.content}</p>
      <p>Likes: {blog.likes}</p>
      <p>Posted by: {blog.user[0]?.name}</p>
    </div>
  );
};

export default BlogDetail;
