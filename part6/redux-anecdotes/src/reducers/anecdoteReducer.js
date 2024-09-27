import { createSlice, current } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    addNewNote(state, action) {
      const content = action.payload;
      const newAnecdote = {
        id: getId(),
        votes: 0,
        content,
      };
      return [...state, newAnecdote].sort((a, b) => b.votes - a.votes);
    },
    increaseVote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const {
  addNewNote,
  increaseVote,
  appendAnecdotes,
  setAnecdotes,
  createAnecdote,
} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const updateVotes = (id) => {
  return async (dispatch) => {
    await anecdoteService.update(id);
    dispatch(increaseVote(id)); // Only pass the id
  };
};

export default anecdoteSlice.reducer;

// const anecdoteReducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);

//   switch (action.type) {
//     case "VOTE":
//       const id = action.payload.id;
//       const anecdoteToVote = state.find((a) => a.id === id);
//       const updatedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1,
//       };
//       return state
//         .map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote))
//         .sort((a, b) => b.votes - a.votes);
//     case "ADD_NEW":
//       const content = action.payload.content;
//       const newAnecdote = {
//         id: getId(),
//         votes: 0,
//         content,
//       };
//       return [...state, newAnecdote].sort((a, b) => b.votes - a.votes);
//   }
//   return state.sort((a, b) => b.votes - a.votes);
// };

// export const increaseVote = (id) => {
//   return {
//     type: "VOTE",
//     payload: { id },
//   };
// };

// export const addNewNote = (content) => {
//   return {
//     type: "ADD_NEW",
//     payload: { content },
//   };
// };
// export default anecdoteReducer;
