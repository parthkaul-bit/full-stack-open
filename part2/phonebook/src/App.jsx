import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already in the list`);
    } else {
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ]);
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

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery)
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;