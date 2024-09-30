import axios from "axios";

export const getAll = () => {
  return axios.get("http://localhost:3001/anecdotes").then((res) => res.data);
};

export const postOne = (content) => {
  return axios
    .post("http://localhost:3001/anecdotes", content)
    .then((res) => res.data);
};

export const updateVotes = (anecdote) => {
  return axios
    .put(`http://localhost:3001/anecdotes/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    .then((res) => res.data);
};
