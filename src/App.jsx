import './App.css'
import { Form } from './components/FormInput';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export const App = () => {
  return (
    <div>
      <Form />
      <ThemeSwitcher />
    </div>
  );
}

export default App
