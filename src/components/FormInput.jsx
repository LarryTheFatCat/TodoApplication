import React, { useState, useRef, useEffect } from 'react'
import './FormInput.css'

export const Form = () => {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    let [errorMessage, setErrorMessage] = useState(false);
    const [todoMessage, setTodoMessage] = useState([]);
    const inputRef = useRef();

    // add a new state to store the todo items
    const [todoList, setTodoList] = useState(storedTodoList || []);

    const handleClick = () => {
        if (inputRef.current.value === "") {
            setErrorMessage(true);
            reloadFocus();
        } else {
            // add the new todo item to the list and reset the input value
            setTodoList([...todoList, inputRef.current.value]);
            inputRef.current.value = '';
            setErrorMessage(false);
        }
    }

    const reloadFocus = () => {
        inputRef.current.focus();
    }

    const deleteTodo = (index) => {
        // update the todo list by filtering out the todo item at the specified index
        setTodoList(todoList.filter((_, i) => i !== index));
    }

    
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    },[todoList]);
    return (
        <div className="container">
            <main>
                <div className="input-section">
                    <label htmlFor="input" className="input-label">
                        Enter your Task
                    </label>
                    <input ref={inputRef} id='input' type="text" className="input" placeholder='Take dog out on a walk!' />
                    <button onClick={handleClick} id='button' type='button' className="btn btn-submit">
                        Submit Task
                    </button>
                    {errorMessage && (
                        <p className="error-message">Please Enter a Task That's Not Blank!</p>
                    )}
                </div>
                {/* render the list of todo items */}
                <div className="todo-output">
                    {todoList.map((todo, index) => (
                        <div key={index}>
                            <p className="todoOutput">{todo}</p>
                            {/* add an onClick event to the delete button that calls deleteTodo with the index of the todo item */}
                            <button onClick={() => deleteTodo(index)} id="btn" classname="btn btn-reset">
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}