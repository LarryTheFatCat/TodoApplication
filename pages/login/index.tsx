import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import RocketIcon from "@/public/RocketIcon";
import PasswordClosedIcon from "@/public/input/PasswordClosedIcon";
import PasswordOpenIcon from "@/public/input/PasswordOpenIcon";
import {
  LoginErrorManagement,
  LoginErrorManagementDescription,
  LoginInformation,
} from "@/types/Types";
import { doSignInWithEmailAndPassword } from "@/utils/Methods";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [displayPassword, setDisplayPassword] = useState<boolean>(false);
  const [userInformation, setUserInformation] = useState<LoginInformation>({
    email: "",
    password: "",
  });
  const [displayErrorState, setDisplayErrorState] =
    useState<LoginErrorManagement>({
      email: false,
      password: false,
    });
  const [displayErrorMessage, setDisplayErrorMessage] =
    useState<LoginErrorManagementDescription>({
      emailErrorDescription: "",
      passwordErrorDescription: "",
    });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (key: keyof LoginInformation, value: string) => {
    setUserInformation((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    // Reset error states when user types
    setDisplayErrorState((prevState) => ({
      ...prevState,
      [key]: false,
    }));
    setDisplayErrorMessage((prevMessage) => ({
      ...prevMessage,
      [`${key}ErrorDescription`]: "",
    }));
  };

  const validateEmail = (value: string): boolean =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  const validatePassword = (value: string): boolean => value.length >= 7;

  const validateInputs = (): boolean => {
    let isValid = true;
    const errors: LoginErrorManagement = { email: false, password: false };
    const errorMessages: LoginErrorManagementDescription = {
      emailErrorDescription: "",
      passwordErrorDescription: "",
    };

    if (!validateEmail(userInformation.email)) {
      isValid = false;
      errors.email = true;
      errorMessages.emailErrorDescription =
        "Please enter a valid email address.";
    }

    if (!validatePassword(userInformation.password)) {
      isValid = false;
      errors.password = true;
      errorMessages.passwordErrorDescription =
        "Password must be at least 7 characters long.";
    }

    setDisplayErrorState(errors);
    setDisplayErrorMessage(errorMessages);

    return isValid;
  };

  const loginUser = async () => {
    try {
      if (!validateInputs()) setDisplayErrorState({
        email: true,
        password: true
      });
      setIsLoading(true);
      await doSignInWithEmailAndPassword(
        userInformation.email,
        userInformation.password
      );
      setIsLoading(false);
      router.push("/home");
    } catch (e: any) {
      alert("An error occurred during login. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Card className="flex flex-row p-0 w-1/2 mx-auto">
          <div className="flex-1 p-5 border-r border-gray-300 bg-blue-500 pt-[15%]">
            <RocketIcon className="w-20 mx-auto" />
            <h2 className="text-xl font-bold text-white text-center">
              Welcome back!
            </h2>
            <CardBody>
              <p className="text-white text-center">
                Remember, you can get back to managing your tasks by entering
                your login details on the right!
              </p>
            </CardBody>
          </div>
          <div className="flex-1 p-5 bg-white">
            <CardHeader>
              <h2 className="text-2xl font-bold text-black">
                Welcome, please get started below!
              </h2>
            </CardHeader>
            <CardBody className="gap-y-5">
              <div>
                <Input
                  type="text"
                  variant="faded"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="johndoe@example.com"
                  value={userInformation.email}
                  isClearable
                  isRequired
                  onChange={(e) => {
                    handleInputChange("email", e.target.value);
                  }}
                  className={displayErrorState.email ? "border-red-500" : ""}
                  errorMessage={
                    displayErrorState.email
                      ? displayErrorMessage.emailErrorDescription
                      : ""
                  }
                  isInvalid={displayErrorState.email}
                />
              </div>
              <div>
                <Input
                  type={displayPassword ? "text" : "password"}
                  variant="faded"
                  label="Password"
                  labelPlacement="outside"
                  placeholder="*******"
                  value={userInformation.password}
                  isRequired
                  onChange={(e) => {
                    handleInputChange("password", e.target.value);
                  }}
                  className={displayErrorState.password ? "border-red-500" : ""}
                  errorMessage={
                    displayErrorState.password
                      ? displayErrorMessage.passwordErrorDescription
                      : ""
                  }
                  isInvalid={displayErrorState.password}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setDisplayPassword(!displayPassword)}
                    >
                      {displayPassword ? (
                        <PasswordClosedIcon />
                      ) : (
                        <PasswordOpenIcon />
                      )}
                    </button>
                  }
                />
              </div>
              <Button
                isLoading={isLoading}
                onClick={loginUser}
                className="mx-auto"
                color="primary"
                variant="solid"
              >
                Login
              </Button>
            </CardBody>
            <CardFooter className="grid grid-cols-1 gap-y-2">
              <p className="text-sm mx-auto">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  underline="hover"
                  className="hover:cursor-pointer text-sm mx-auto"
                >
                  Click here
                </Link>
              </p>
              <p className="text-sm mx-auto">
                Forgot your password?{" "}
                <Link
                  href="/reset"
                  underline="hover"
                  className="hover:cursor-pointer text-sm mx-auto"
                >
                  Click here
                </Link>
              </p>
            </CardFooter>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
