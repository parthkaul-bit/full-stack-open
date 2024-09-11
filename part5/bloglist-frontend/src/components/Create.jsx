import React, { useState } from "react";
import blogs from "../services/blogs";
import Alert from "./Alert";

const Create = ({ user }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();

    const returnedValue = await blogs.postOne(
      { title, author, url },
      user.token
    );
    if (returnedValue) {
      setMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <Alert message={message} type="success" />

      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default Create;
