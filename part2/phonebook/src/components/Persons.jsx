import React from "react";

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      {filteredPersons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button
              onClick={() => {
                handleDelete(person.id);
              }}
            >
              Delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
