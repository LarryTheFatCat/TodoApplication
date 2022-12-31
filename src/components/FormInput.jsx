import { useState, useRef } from 'react';
import './FormInput.css'

export const Form = () => {
    const [todoMessage, setTodoMessage] = useState('');
    const inputRef = useRef();

    const handleClick = () => {
        setTodoMessage(inputRef.current.value);
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
                </div>
                {/*This section will just be used to render the output contents..., we use ref and useState react components */}
                <div className="todo-output">
                    <h2 className="test">{todoMessage}</h2>
                </div>
            </main>
        </div>
    )
}