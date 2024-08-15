import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part1} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
      {/* <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} /> */}
    </div>
  );
};

export default Content;
