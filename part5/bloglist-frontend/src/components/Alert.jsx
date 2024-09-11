import React from "react";
import "./alert-styles.css";

const Alert = ({ message, type }) => {
  return message ? <div className={`alert alert-${type}`}>{message}</div> : "";
};

export default Alert;
