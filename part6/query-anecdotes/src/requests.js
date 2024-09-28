import axios from "axios";

export const getAll = () => {
  return axios.get("http://localhost:3001/anecdotes").then((res) => res.data);
};
