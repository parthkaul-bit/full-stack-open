import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "./requests";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  });
  console.log(result);

  if (result.isLoading) {
    return <div>Loading anecdotes...</div>;
  }
  const anecdotes = result.data;
  console.log(anecdotes);

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
