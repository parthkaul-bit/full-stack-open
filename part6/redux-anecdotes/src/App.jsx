import { useDispatch } from "react-redux";
import { addNewNote } from "./reducers/anecdoteReducer";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  return (
    // anecdote list
    <>
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
