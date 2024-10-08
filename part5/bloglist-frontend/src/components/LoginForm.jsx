import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginService from "../services/loginService";
import { setNotification, clearNotification } from "../redux/notificationSlice";
import { setUser } from "../redux/userSlice"; // Import the setUser action
import Alert from "./Alert";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { message, type } = useSelector((state) => state.notification);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setUser(user)); // Dispatch to set the user in Redux store
      } catch (error) {
        console.error(
          "Error parsing loggedBlogappUser from localStorage",
          error
        );
      }
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user)); // Set the user in the Redux store
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user)); // Save user in localStorage
      // navigate("/blogs"); // You should navigate using useNavigate from react-router-dom
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
      {message && <Alert message={message} type={type} />}{" "}
      {/* Show notification */}
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
