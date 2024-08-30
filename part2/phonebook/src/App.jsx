import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personService.getAllPersons().then((response) => {
      setPersons(response);
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = persons.find((p) => p.name === newName);

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updatedPerson({
            ...person,
            number: newNumber,
          })
          .then((response) => {
            setPersons(persons.map((p) => (p.id !== person.id ? p : response)));
            setSuccessMessage(`${newName}'s number updated successfully.`);
          })
          .catch((err) => {
            if (err.response.status === 404) {
              setErrorMessage(
                `Information of ${newName} has already been removed from the server.`
              );
              setPersons(persons.filter((p) => p.id !== person.id));
            } else {
              setErrorMessage(`Failed to update ${newName}.`);
            }
          });
      }
    } else {
      personService
        .addNewPerson({
          name: newName,
          number: newNumber,
        })
        .then((response) => {
          setPersons([...persons, response]);
          setSuccessMessage(`${newName} added to the list.`);
          personService.getAllPersons().then((response) => {
            setPersons(response);
          });
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        });
    }

    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 3000);

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
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`${targetPerson.name} deleted successfully.`);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setErrorMessage(
              `Information of ${targetPerson.name} has already been removed from the server.`
            );
            setPersons(persons.filter((p) => p.id !== id));
          } else {
            setErrorMessage(`Failed to delete ${targetPerson.name}.`);
          }
        });

      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 3000);
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div
        className="error"
        style={{ display: errorMessage ? "block" : "none" }}
      >
        {errorMessage}
      </div>
      <div
        className="success"
        style={{ display: successMessage ? "block" : "none" }}
      >
        {successMessage}
      </div>
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
