import React from "react";

const Total = (props) => {
  let total = 0;
  {
    props.parts.map((part) => {
      total += part.exercises;
    });
  }
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

export default Total;
