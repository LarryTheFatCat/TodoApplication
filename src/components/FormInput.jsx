import './FormInput.css'

export const Form = () => {
    const submitTask = () => {
        console.log("hi");
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
                    <input id='input' type="text" className="input" placeholder='Let the dog out!' />
                    <button onClick={submitTask} id='button' type='button' className="btn btn-submit">
                        Submit Task
                    </button>
                </div>
            </main>
        </div>
    )
}