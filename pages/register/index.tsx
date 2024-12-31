import MailIcon from "../../public/MailIcon";
import NameIcon from "../../public/NameIcon";
import PasswordClosedIcon from "../../public/PasswordClosedIcon";
import PasswordIcon from "../../public/PasswordIcon";
import PasswordOpenIcon from "../../public/PasswordOpenIcon";
import RocketIcon from "../../public/RocketIcon";
import {
  DisplayPasswordState,
  ErrorManagement,
  ErrorManagementDescription,
  RegisterInputData,
} from "../../types/Types";
import { db } from "../../utils/Firebase";
import { doCreateUserWithEmailAndPassword } from "../../utils/Methods";
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
import { doc, setDoc } from "firebase/firestore";
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
  const [displayErrorMessage, setDisplayErrorMessage] =
    useState<ErrorManagementDescription>({
      fullNameErrorDescription: "Please enter your first and last name only.",
      emailErrorDescription: "Please enter a valid email.",
      passwordErrorDescription:
        "Please enter a password that is greater than 7 characters.",
      confirmPasswordErrorDescription: "Passwords do not match.",
      birthdayErrorDescription: "Please enter a valid birthday.",
    });
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const registerUser = async () => {
    try {
      if (
        validateEmail(registerData.email) &&
        validateFullName(registerData.fullName) &&
        registerData.password.length > 7 &&
        registerData.password === registerData.confirmPassword
      ) {
        setIsLoading(true);
        console.log(registerData.birthday);
        let user = await doCreateUserWithEmailAndPassword(
          registerData.email,
          registerData.password
        );
        let uid = user.user.uid;
        console.log(typeof registerData.birthday);
        const birthday = registerData.birthday
          ? String(registerData.birthday.day) +
            "/" +
            String(registerData.birthday.month) +
            "/" +
            String(registerData.birthday.year)
          : undefined;
        await setDoc(doc(db, "users", uid), {
          email: registerData.email,
          fullname: registerData.fullName,
          username: registerData.fullName.replace(" ", ""),
          birthday: birthday,
          gender: registerData.gender,
        });
        setDisplayError({
          fullNameError: false,
          emailError: false,
          passwordError: false,
          confirmPasswordError: false,
          birthdayError: false,
        });
        router.push("/home");
      } else {
        setDisplayError({
          fullNameError: true,
          emailError: true,
          passwordError: true,
          confirmPasswordError: true,
          birthdayError: true,
        });
        setIsLoading(false);
      }
    } catch (e: any) {
      alert(e);
      setIsLoading(false);
    }
  };
  /**
   * converts text to PascalCase
   * @param string
   * @returns PascalCase text
   */
  const toPascalCase = (string: string): string =>
    (string.match(/[a-zA-Z0-9]+/g) || [])
      .map((word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join("");

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
              errorMessage={
                displayError.fullNameError
                  ? displayErrorMessage.fullNameErrorDescription
                  : ""
              }
              onChange={(e) => {
                handleInputChange("fullName", e.target.value);
                const isInvalid = !validateFullName(e.target.value);
                setErrorField("fullNameError", isInvalid);
                if (isInvalid) {
                  setDisplayErrorMessage((prev) => ({
                    ...prev,
                    fullNameErrorDescription:
                      "Invalid full name. Please ensure it is first and last name only.",
                  }));
                }
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
              errorMessage={
                displayError.emailError
                  ? displayErrorMessage.emailErrorDescription
                  : ""
              }
              value={registerData.email}
              onChange={(e) => {
                handleInputChange("email", e.target.value);
                const isInvalid = !validateEmail(e.target.value);
                setErrorField("emailError", isInvalid);
                if (isInvalid) {
                  setDisplayErrorMessage((prev) => ({
                    ...prev,
                    emailErrorDescription:
                      "Please enter a valid email address.",
                  }));
                }
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
              errorMessage={
                displayError.passwordError
                  ? displayErrorMessage.passwordErrorDescription
                  : ""
              }
              value={registerData.password}
              onChange={(e) => {
                handleInputChange("password", e.target.value);
                const isInvalid = !validatePassword(e.target.value);
                setErrorField("passwordError", isInvalid);
                if (isInvalid) {
                  setDisplayErrorMessage((prev) => ({
                    ...prev,
                    passwordErrorDescription:
                      "Password must be at least 8 characters long.",
                  }));
                }
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
              errorMessage={
                displayError.confirmPasswordError
                  ? displayErrorMessage.confirmPasswordErrorDescription
                  : ""
              }
              value={registerData.confirmPassword}
              onChange={(e) => {
                handleInputChange("confirmPassword", e.target.value);
                const isInvalid = e.target.value !== registerData.password;
                setErrorField("confirmPasswordError", isInvalid);
                if (isInvalid) {
                  setDisplayErrorMessage((prev) => ({
                    ...prev,
                    confirmPasswordErrorDescription: "Passwords do not match.",
                  }));
                }
              }}
            />

            <DatePicker
              value={registerData.birthday}
              isInvalid={displayError.birthdayError}
              validationState={displayError.birthdayError ? "invalid" : "valid"}
              errorMessage={
                displayError.birthdayError
                  ? displayErrorMessage.birthdayErrorDescription
                  : ""
              }
              onChange={(date) => {
                handleInputChange("birthday", date);
                const isInvalid = !date;
                setErrorField("birthdayError", isInvalid);
                if (isInvalid) {
                  setDisplayErrorMessage((prev) => ({
                    ...prev,
                    birthdayErrorDescription: "Please select a valid birthday.",
                  }));
                }
              }}
            />

            <Dropdown showArrow>
              <DropdownTrigger>
                <Button variant="bordered">
                  {registerData.gender
                    ? toPascalCase(String(registerData.gender))
                    : "Select Gender"}
                </Button>
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
            <Button
              onClick={registerUser}
              type="button"
              variant="solid"
              color="primary"
              isLoading={isLoading}
            >
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
