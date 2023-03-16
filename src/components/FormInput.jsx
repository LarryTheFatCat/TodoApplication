import { Input, Container, Button, Spacer, Row } from "@nextui-org/react";
import "./FormInput.css";

export const Form = () => {
  // This function acts as a keyEvent where when Enter is pressed, it prints 
  // the value that is given in the Input as "onKeyPress={keyboardEventModifier}"
  const keyboardEventModifier = (e) => {
    if (e.key === "Enter") {
      console.log(`Printed => ${e.target.value}`);
    }
  };

  return (
    <div className="container">
      <div className="input-card">
        <div className="components">
          <Container css={{ d: "flex", flexWrap: "nowrap" }}>
            <Row justify="center">
              <Input
                onKeyPress={keyboardEventModifier}
                clearable
                underlined
                labelPlaceholder="Enter Task"
              />
              <Spacer x={2} />
              <Button 
                color="black" 
                auto 
                shadow 
                bordered
                css={{
                  "@xsMax": {
                    zIndex: "100",
                    marginRight: "0.87cm",
                    minWidth: "2cm"
                  }
                }}
                >
                Enter Task
              </Button>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};
