import React from "react";

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
