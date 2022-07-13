import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";

// get local storage data back

const getLocalStorage = () => {
  const lists = localStorage.getItem("TodoList");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function TodoApp() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(getLocalStorage());
  const [EditedTodoItem, setEditedTodoItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //   add items
  const addItems = () => {
    if (!input) {
      alert("Plz add some Todo");
    } else if (input && toggleButton) {
      setTodos(
        todos.map((CurData) => {
          if (CurData.id === EditedTodoItem) {
            return { ...CurData, name: input };
          }

          return CurData;
        })
      );

      setInput("");
      setEditedTodoItem(null);
      setToggleButton(false);
    } else {
      const NewTodoitem = {
        id: new Date().getTime().toString(),
        name: input,
      };

      setTodos([...todos, NewTodoitem]);
      setInput("");
    }
  };

  //   update items

  const editedItems = (index) => {
    const edited_todos = todos.find((CurData) => {
      return CurData.id === index;
    });

    setInput(edited_todos.name);
    setEditedTodoItem(index);
    setToggleButton(true);
  };

  //   delete items
  const deleteItems = (index) => {
    const UpdatedTodos = todos.filter((CurData) => {
      return CurData.id !== index;
    });
    setTodos(UpdatedTodos);
  };

  //   remove all items

  const RemoveAll = () => {
    setTodos([]);
  };

  //   local storage adding

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="main-div">
      <div className="child-div">
        <div className="add-items">
          <p className="todo-para">Add Todos </p>

          <input
            type="text"
            placeholder="Add a todo"
            className="form-control"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />

          {toggleButton ? (
            <i className="bx bxs-edit btn-edit" onClick={addItems}></i>
          ) : (
            <button className="btn-add" onClick={addItems}>
              Add Todo
            </button>
          )}

          {/* Show items */}
          <div className="showItems">
            {todos.map((CurData, index) => {
              return (
                <div className="eachItem" key={CurData.id}>
                  <h3>{CurData.name}</h3>

                  <div className="todo-btn">
                    <i
                      className="bx bxs-edit btn-edit"
                      onClick={() => editedItems(CurData.id)}
                    ></i>
                    <i
                      className="bx bx-trash btn-delete"
                      onClick={() => deleteItems(CurData.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clear items */}
          <div className="remove-items">
            <button
              className=" btn effect04"
              data-sm-link-text="Remove All"
              onClick={RemoveAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
