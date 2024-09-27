import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseVote, updateVotes } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    return anecdote.content.includes(filter);
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(updateVotes(id));
    const matchingAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    const notificationText = matchingAnecdote.content;

    dispatch(notify(`You voted '${notificationText}'`, 10));

    setTimeout(() => {
      dispatch(notify(""));
    }, 5000);
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
