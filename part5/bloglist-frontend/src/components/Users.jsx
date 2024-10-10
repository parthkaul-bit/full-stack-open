import React from "react";
import { useSelector } from "react-redux";

function Users() {
  const blogs = useSelector((state) => state.blogs);

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  const userBlogCount = {};

  blogs.forEach((blog) => {
    const user = blog.user[0];

    if (user) {
      if (!userBlogCount[user.username]) {
        userBlogCount[user.username] = {
          name: user.name,
          count: 0,
        };
      }
      userBlogCount[user.username].count += 1;
    }
  });

  return (
    <div>
      {Object.entries(userBlogCount).map(([username, { name, count }]) => (
        <div key={username}>
          <strong>{name}</strong>: {count} blogs
        </div>
      ))}
    </div>
  );
}

export default Users;
