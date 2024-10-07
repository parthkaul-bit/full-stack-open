import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginService from "../services/loginService";
import { setNotification, clearNotification } from "../redux/notificationSlice";
import Alert from "./Alert";

const LoginForm = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.notification);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (exception) {
      dispatch(
        setNotification({
          message: "Wrong username or password",
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 2000);
    }
  };

  return (
    <>
      <h2>log in to application</h2>
      <Alert message={message} type="error" />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
