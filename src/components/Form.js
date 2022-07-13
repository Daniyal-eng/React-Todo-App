import React from "react";
//import {v4 as uidv4} from "uid"

const Form = ({ input, setInput, todos, setTodos }) => {
  const OnInpChange = (event) => {
    setInput(event.target.value);
  };

  const OnformSubmit = (event) => {
    event.preventDefault();
    // setTodos([...todos,{id:uidv4, title:input, completed:false}]);
    setInput("");
  };
  return (
    <form onSubmit={OnformSubmit}>
      <input
        type="text"
        placeholder="Enter an item"
        className="task-input"
        value={input}
        required
        onChange={OnInpChange}
        name=""
        id=""
      />
      <button type="submit" className="button-add">
        Add
      </button>
    </form>
  );
};

export default Form;
