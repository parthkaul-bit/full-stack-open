// src/components/Users.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Users() {
  const blogs = useSelector((state) => state.blogs);

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  const userBlogCount = {};

  blogs.forEach((blog) => {
    const user = blog.user[0];

    if (user) {
      if (!userBlogCount[user.id]) {
        userBlogCount[user.id] = {
          name: user.name,
          count: 0,
        };
      }
      userBlogCount[user.id].count += 1;
    }
  });

  return (
    <div>
      <h1>Users</h1>
      {Object.entries(userBlogCount).map(([id, { name, count }]) => (
        <div key={id}>
          <Link to={`/users/${id}`}>
            <strong>{name}</strong>: {count} blogs
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Users;
