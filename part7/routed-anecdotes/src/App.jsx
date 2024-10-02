import { useState } from "react";
import { Link, Routes, useMatch, useNavigate } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    <p>{notification}</p>
    <ul>
      {anecdotes.map((anecdote) => (
        <Link to={`/${anecdote.id}`}>
          <li key={anecdote.id}>{anecdote.content}</li>
        </Link>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: props.content.value,
      author: props.author.value,
      info: props.info.value,
      votes: 0,
    });
    navigate("/");
    props.setNotification(`a new anecdote ${props.content.value} created!`);

    setTimeout(() => {
      props.setNotification("");
    }, 3000);
  };

  const handleReset = (e) => {
    e.preventDefault();
    props.content.resetInputs();
    props.author.resetInputs();
    props.info.resetInputs();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...props.content} name="content" />
        </div>
        <div>
          author
          <input {...props.author} name="author" />
        </div>
        <div>
          url for more info
          <input {...props.info} name="info" />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

const AnecdoteDetail = ({ anecdote }) => {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>has {anecdote.votes} votes</p>
    </div>
  );
};
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const match = useMatch("/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;
  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <Menu />
      <h1>Software anecdotes</h1>
      <Routes>
        <Route
          path="/"
          element={
            <AnecdoteList anecdotes={anecdotes} notification={notification} />
          }
        />
        <Route path="/:id" element={<AnecdoteDetail anecdote={anecdote} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/create"
          element={
            <CreateNew
              addNew={addNew}
              setNotification={setNotification}
              content={content}
              author={author}
              info={info}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
