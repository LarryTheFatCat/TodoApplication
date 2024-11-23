import MailIcon from "@/public/input/MailIcon";
import NameIcon from "@/public/input/NameIcon";
import PasswordClosedIcon from "@/public/input/PasswordClosedIcon";
import PasswordIcon from "@/public/input/PasswordIcon";
import PasswordOpenIcon from "@/public/input/PasswordOpenIcon";
import RocketIcon from "@/public/RocketIcon";
import {
  DisplayPasswordState,
  ErrorManagement,
  RegisterInputData,
} from "@/types/Types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [displayPassword, setDisplayPassword] = useState<DisplayPasswordState>({
    mainPassword: false,
    confirmPassword: false,
  });
  const [registerData, setRegisterData] = useState<RegisterInputData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: null, // check types for default value
  });
  const [displayError, setDisplayError] = useState<ErrorManagement>({
    fullNameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    birthdayError: false,
  });

  const toggleVisibility = (key: keyof DisplayPasswordState) =>
    setDisplayPassword((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));

  const handleInputChange = (key: keyof RegisterInputData, value: any) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const setErrorField = (field: keyof ErrorManagement, value: boolean) => {
    setDisplayError((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const validateEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  const validateFullName = (value: string) =>
    /^[A-Za-z]+ [A-Za-z]+$/.test(value);

  const validatePassword = (value: string): boolean => value.length >= 7;

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="flex flex-row p-0 w-1/2 mx-auto">
        <div className="flex-1 p-5 border-r border-gray-300 bg-blue-500 pt-[25%]">
          <RocketIcon className="w-20 mx-auto" />
          <h2 className="text-xl font-bold text-white text-center">Welcome!</h2>
          <CardBody>
            <p className="text-white text-center">
              You're just 30 seconds away from using the best todo app!
            </p>
          </CardBody>
        </div>
        <div className="flex-1 p-5 bg-white">
          <CardHeader>
            <h2 className="text-2xl font-bold text-black ">
              Welcome, please get started below!
            </h2>
          </CardHeader>
          <CardBody className="gap-y-5">
            <Input
              placeholder="John Doe"
              label="Enter your full name"
              labelPlacement="outside"
              variant="faded"
              type="text"
              startContent={<NameIcon />}
              isRequired
              isClearable
              isInvalid={displayError.fullNameError}
              validationState={displayError.fullNameError ? "invalid" : "valid"}
              value={registerData.fullName}
              onChange={(e) => {
                handleInputChange("fullName", e.target.value);
                setErrorField(
                  "fullNameError",
                  !validateFullName(e.target.value)
                );
              }}
            />
            <Input
              placeholder="johndoe@email.com"
              label="Enter your email"
              labelPlacement="outside"
              variant="faded"
              type="text"
              startContent={<MailIcon />}
              isRequired
              isClearable
              isInvalid={displayError.emailError}
              validationState={displayError.emailError ? "invalid" : "valid"}
              value={registerData.email}
              onChange={(e) => {
                handleInputChange("email", e.target.value);
                setErrorField("emailError", !validateEmail(e.target.value));
              }}
            />
            <Input
              placeholder="*****"
              label="Enter your password"
              labelPlacement="outside"
              variant="faded"
              type={displayPassword.mainPassword ? "text" : "password"}
              startContent={<PasswordIcon />}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => toggleVisibility("mainPassword")}
                >
                  {displayPassword.mainPassword ? (
                    <PasswordClosedIcon />
                  ) : (
                    <PasswordOpenIcon />
                  )}
                </button>
              }
              isRequired
              isInvalid={displayError.passwordError}
              validationState={displayError.passwordError ? "invalid" : "valid"}
              value={registerData.password}
              onChange={(e) => {
                handleInputChange("password", e.target.value);
                setErrorField(
                  "passwordError",
                  !validatePassword(e.target.value)
                );
              }}
            />
            <Input
              placeholder="*****"
              label="Confirm your password"
              labelPlacement="outside"
              variant="faded"
              type={displayPassword.confirmPassword ? "text" : "password"}
              startContent={<PasswordIcon />}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => toggleVisibility("confirmPassword")}
                >
                  {displayPassword.confirmPassword ? (
                    <PasswordClosedIcon />
                  ) : (
                    <PasswordOpenIcon />
                  )}
                </button>
              }
              isRequired
              isInvalid={displayError.confirmPasswordError}
              validationState={
                displayError.confirmPasswordError ? "invalid" : "valid"
              }
              value={registerData.confirmPassword}
              onChange={(e) => {
                handleInputChange("confirmPassword", e.target.value);
                setErrorField(
                  "confirmPasswordError",
                  e.target.value !== registerData.password
                );
              }}
            />
            <DatePicker
              value={registerData.birthday}
              isInvalid={displayError.birthdayError}
              validationState={displayError.birthdayError ? "invalid" : "valid"}
              onChange={(date) => {
                handleInputChange("birthday", date);
                setErrorField("birthdayError", !date);
              }}
            />
            <Dropdown showArrow>
              <DropdownTrigger>
                <Button variant="bordered">Select Gender</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Genders"
                onAction={(key) => handleInputChange("gender", key)}
              >
                <DropdownItem key="male">Male</DropdownItem>
                <DropdownItem key="female">Female</DropdownItem>
                <DropdownItem key="other">
                  <Tooltip content="Don't worry, you'll be able to update it later in settings to your preferred one!">
                    Other
                  </Tooltip>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button type="button" variant="solid" color="primary">
              Register
            </Button>
          </CardBody>
          <CardFooter>
            <p className="mx-auto text-sm text-gray-500">
              Have an account?{" "}
              <Link
                className="text-sm hover:underline hover:cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Login here
              </Link>
            </p>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;
