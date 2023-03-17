import "./App.css";
import { Form } from "./components/FormInput";
import { Text } from "@nextui-org/react";

export const App = () => {
  return (
    <div>
      <Text
        css={{
          "@smMax": {
            fontSize: "25px",
          },
        }}
        color="white"
        h1
      >
        Enter Your Desired Task
      </Text>
      <Form />
    </div>
  );
};

export default App;
