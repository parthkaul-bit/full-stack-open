import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: 112,
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already in the list`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
    }
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
