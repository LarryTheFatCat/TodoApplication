import React, { useState, useRef, useEffect } from "react";
import "./FormInput.css";
import { Button, Input, createTheme, ThemeProvider } from "@mui/material";

export const Form = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#C2185B",
      },
    },
  });

  const storedTodoList = JSON.parse(localStorage.getItem("todoList"));
  let [errorMessage, setErrorMessage] = useState(false);

  // Replace `todoMessage` state with `todoList` state
  const [todoList, setTodoList] = useState(storedTodoList || []);
  const inputRef = useRef();

  const handleClick = () => {
    if (inputRef.current.value === "") {
      setErrorMessage(true);
      reloadFocus();
    } else {
      // add the new todo item to the list and reset the input value
      setTodoList([...todoList, inputRef.current.value]);
      inputRef.current.value = "";
      setErrorMessage(false);
    }
  };

  const reloadFocus = () => {
    inputRef.current.focus();
  };

  const deleteTodo = (index) => {
    // update the todo list by filtering out the todo item at the specified index
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="input-card">
          <h3 className="title-component">
            <Input
              htmlFor={Button}
              ref={inputRef}
              placeholder="Enter your task here"
            />
            <Button
              onClick={handleClick}
              color="primary"
              sx={{ m: "1rem" }}
              size="md"
              variant="contained"
            >
              Enter
            </Button>
          </h3>
          {/* Render output lol */}
          <div className="todo-output">
            {/* Update .map() function to use `todoList` state */}
            {todoList.map((todo, index) => (
              <div key={index}>
                <p className="todoOutput">{todo}</p>
                {/* add an onClick event to the delete button that calls deleteTodo with the index of the todo item */}
                <button onClick={() => deleteTodo(index)}>X</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
