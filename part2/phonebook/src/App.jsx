import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    personService.getAllPersons().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = persons.find((p) => p.name === newName);
    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one? `
        )
      ) {
        personService
          .updatedPerson({
            ...person,
            number: newNumber,
          })
          .then((response) => {
            setPersons(persons.map((p) => (p.id !== person.id ? p : response)));
          });
      }
    } else {
      personService
        .addNewPerson({
          name: newName,
          number: newNumber,
          id: (persons.length + 1).toString(),
        })
        .then((response) => {
          setPersons([...persons, response]);
        });
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

  const handleDelete = (id) => {
    const targetPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${targetPerson.name}`)) {
      personService.deletePerson(id).then((response) => {
        setPersons(persons.filter((person) => response.id !== person.id));
      });
    }
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
