import React, { useState } from "react";
import { useDispatch } from "react-redux";
import blogs from "../services/blogs";
import { setNotification, clearNotification } from "../redux/notificationSlice";

const Create = ({ user, toggleVisibility, fetchBlogs }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    const returnedValue = await blogs.postOne(
      { title, author, url },
      user.token
    );
    if (returnedValue) {
      dispatch(
        setNotification({
          message: `a new blog ${title} by ${author} added`,
          type: "success",
        })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 2000);
    }
    setAuthor("");
    setTitle("");
    setUrl("");
    toggleVisibility();
    dispatch(fetchBlogs());
  };

  return (
    <>
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            Title:
            <input
              type="text"
              value={title}
              name="title"
              placeholder="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author:
            <input
              type="text"
              value={author}
              name="author"
              placeholder="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            URL:
            <input
              type="text"
              value={url}
              name="url"
              placeholder="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
    </>
  );
};

export default Create;
