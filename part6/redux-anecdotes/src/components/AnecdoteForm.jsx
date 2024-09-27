import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewNote,
  createAnecdote,
  createNewAnecdote,
} from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    // dispatch(createAnecdote(newAnecdote));
    dispatch(createNewAnecdote(content));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
