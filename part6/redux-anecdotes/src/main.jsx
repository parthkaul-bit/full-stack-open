import ReactDOM from "react-dom/client";
// import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import filterReducer from "./reducers/filterReducer";
import anecdoteReducer, { setAnecdotes } from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import { configureStore } from "@reduxjs/toolkit";
import anecdoteService from "./services/anecdoteService";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

anecdoteService.getAll().then((anecdotes) => {
  store.dispatch(setAnecdotes(anecdotes));
});

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer,
// });

// const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
