import { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import { useMutation, useQuery } from "@apollo/client";

const Authors = (props) => {
  const [birthYear, setBirthYear] = useState("");
  const [authorName, setAuthorName] = useState("");

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) return <>loading...</>;
  const authors = result?.data?.allAuthors || [];

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("submitting data", authorName, birthYear);
    editAuthor({
      variables: { name: authorName, setBornTo: birthYear },
    });
    setAuthorName("");
    setBirthYear("");
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <h2>set birthyear</h2>
        {console.log(authors)}
        name
        {/* <input
          value={authorName}
          onChange={({ target }) => setAuthorName(target.value)}
        /> */}
        <select
          value={authorName}
          name="authorName"
          onChange={({ target }) => setAuthorName(target.value)}
        >
          <option value="" disabled>
            Select author
          </option>{" "}
          {/* Initial placeholder option */}
          {authors.map((author) => (
            <option value={author.name} key={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        born
        <input
          type="number"
          value={birthYear}
          onChange={({ target }) => setBirthYear(Number(target.value))}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
