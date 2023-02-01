import './App.css'
import { Form } from './components/FormInput';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export const App = () => {
  return (
    <div>
      <h1 className="title-content">
        Please Enter Your Task
      </h1>
      <p className="description-content">
        Enter your task below for it to be registered...
      </p>
      <Form />
      <ThemeSwitcher />
    </div>
  );
}

export default App
