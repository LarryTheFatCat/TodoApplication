import { useState, useRef } from 'react';
import './FormInput.css'

export const Form = () => {
    const [todoMessage, setTodoMessage] = useState('');
    const inputRef = useRef();

    const [errorMessage, setErrorMessage] = useState(false);

    // add a new state to store the todo items
    const [todoList, setTodoList] = useState([]);

    const handleClick = () => {
        if (inputRef.current.value === "") {
            setErrorMessage(true);
        } else {
            // add the new todo item to the list and reset the input value
            setTodoList([...todoList, inputRef.current.value]);
            inputRef.current.value = '';
            setErrorMessage(false);
        }
    }

    return (
        <div className="container">
            <main>
                <h1 className="title-content">
                    Please enter your Task
                </h1>
                <p className="description-content">
                    Enter your task below for it to be registered as a TODO...
                </p>
                <div className="input-section">
                    <label htmlFor="input" className="input-label">
                        Enter your Task
                    </label>
                    <input ref={inputRef} id='input' type="text" className="input" placeholder='Let the dog out!' />
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
                        <p key={index} className="test">{todo}</p>
                    ))}
                </div>
            </main>
        </div>
    )
}