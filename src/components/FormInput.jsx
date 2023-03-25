import {
  Input,
  Container,
  Button,
  Spacer,
  Row,
  Checkbox,
} from "@nextui-org/react";
import { useState } from "react";
import "./FormInput.css";

export const Form = () => {
  // useState below stores the input that is given
  const [currentMessage, setCurrentMessage] = useState([]);
  // useState stores as an array instead of string @NOTE: spent 2 hours trying to fix it... map only works with (arrays!!!!)
  const [todoMessage, setTodoMessage] = useState([]);

  // This function acts as a keyEvent where when Enter is pressed, it prints
  // the value that is given in the Input as "onKeyPress={keyboardEventModifier}"
  const keyboardEventModifier = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") {
        console.log("stop inputting blank stuff"); // Acts as an error state
      } else {
        console.log(`Printed => ${e.target.value}`); // debugger
        setTodoMessage([...todoMessage, currentMessage]); // Concatenates new message to existing array
        setCurrentMessage(""); // Clears input field
      }
    }
  };
  // Sets text if you press enter, uses e.target.value to grab contents after change occurs
  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  // function to store onChange data into a state
  const handleClick = () => {
    if (currentMessage === "") {
      console.log("Stop inputting blank stuff"); // Acts as an error state
    } else {
      setTodoMessage([...todoMessage, currentMessage]); // Concatenates new message to existing array
      setCurrentMessage(""); // Clears input field
    }
  };

  return (
    <div className="container">
      <div className="input-card">
        <div className="components">
          <Container css={{ d: "flex", flexWrap: "nowrap" }}>
            <Row justify="center">
              <Spacer x={-3.5} />
              <Input
                value={currentMessage}
                onChange={handleChange}
                onKeyPress={keyboardEventModifier}
                clearable
                labelPlaceholder="Enter Task"
                css={{
                  $$inputColor: "#00000082",
                  "@xsMax": {
                    marginRight: "-1cm",
                    width: "3cm",
                  },
                  "@smMax" : {
                    marginRight: "-1cm",
                    width: "3cm",
                  }
                }}
              />
              <Spacer x={2} />
              <Button
                onPress={handleClick}
                auto
                css={{
                  $$buttonColor: "#00000082",
                  "@xsMax": {
                    zIndex: "100",
                  },
                }}
              >
                Enter Task
              </Button>
            </Row>
          </Container>
          {/* Rendering data from input after click or enter */}
          <div className="wrapper-list">
            {todoMessage.map((newTodo, index) => (
              <div key={index}>
                <Checkbox lineThrough>
                  <p>{newTodo}</p>
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
