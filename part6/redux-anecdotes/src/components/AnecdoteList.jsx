import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  console.log(anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    return anecdote.content.includes(filter);
  });
  console.log(filteredAnecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(increaseVote(id));
    console.log("vote", id);
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
