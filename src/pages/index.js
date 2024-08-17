"use client"
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  VStack,
  Box,
  Text,
  Center,
  InputGroup,
  InputLeftAddon,
  Flex,
  Button,
  InputRightElement,
  Link,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import { FaUser, FaKey } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md"
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [show, setShow] = useState(false); // default value for pword input false
  const [signUp, setSignUp] = useState(false);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(false);
  const usernameRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]{6,})(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const router = useRouter();

  function handleInputChange(e) {
    let { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  }

  function handlePasswordVisibility() {
    setShow(!show);
  }
  function handleSignUpVisibility() {
    setSignUp(!signUp);
  }

  function checkLogin() {
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    if(username !== inputValue.username || password !== inputValue.password) {
      setError(true);
    } else {
      setError(false);
      router.push("/Tasks")
    }
  }

  function checkSignUp() {
    if (!usernameRegex.test(inputValue.username)
      || !emailRegex.test(inputValue.email)
      || inputValue.password.length < 8
      || inputValue.password !== inputValue.confirmPassword) {
      setError(true);
    } else {
      localStorage.setItem("username", inputValue.username);
      localStorage.setItem("email", inputValue.email);
      localStorage.setItem("password", inputValue.password);
      setError(false);
      setSignUp(false);
      // we don't need to store confirmation via localStorage, it's just to slow signup values.
    }
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      {signUp ? <Card maxW="sm">
        <CardHeader>
          <Center>
            <Heading as="h1" size="lg">Login</Heading>
          </Center>
          <Center>
            <Text color="grey">Welcome to our app. Please Sign Up.</Text>
          </Center>
        </CardHeader>
        <CardBody>
          <FormControl isInvalid={error}>
            <VStack spacing='24px'>
              <>
                <Box w="full">
                  <Text>
                    <label htmlFor="username_input">
                      Username
                    </label>
                  </Text>
                  <InputGroup>
                    <InputLeftAddon>
                      <FaUser />
                    </InputLeftAddon>
                    <Input
                      value={inputValue.username}
                      name="username"
                      onChange={handleInputChange}
                      id="username_input"
                      placeHolder="Cool.Username123!"
                    />
                  </InputGroup>
                  {error ?
                    <FormErrorMessage>
                      Please Enter a proper username.
                    </FormErrorMessage>
                    :
                    ""
                  }
                </Box>
              </>
              <>
                <Box w="full">
                  <Text>
                    <label htmlFor="email_input">
                      Email
                    </label>
                  </Text>
                  <InputGroup>
                    <InputLeftAddon>
                      <MdAlternateEmail />
                    </InputLeftAddon>
                    <Input
                      value={inputValue.email}
                      name="email"
                      onChange={handleInputChange}
                      id="email_input"
                      placeHolder="somecool.email@email.com"
                    />
                  </InputGroup>
                  {error ?
                    <FormErrorMessage>
                      Please enter a proper email.
                    </FormErrorMessage>
                    :
                    ""
                  }
                </Box>
              </>
              <>
                <Box w="full">
                  <Text>
                    <label htmlFor="password_input">
                      Password
                    </label>
                  </Text>
                  <InputGroup>
                    <InputLeftAddon>
                      <FaKey />
                    </InputLeftAddon>
                    <Input
                      value={inputValue.password}
                      name="password"
                      onChange={handleInputChange}
                      id="password_input"
                      placeholder="CoolPassword123!"
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button onClick={handlePasswordVisibility} h='1.72rem' size='sm'>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {error ?
                    <FormErrorMessage>
                      Please enter a proper password
                    </FormErrorMessage>
                    :
                    ""
                  }
                </Box>
              </>
              <>
                <Box w="full">
                  <Text>
                    <label htmlFor="confirm_pass_input">
                      Confirm Password
                    </label>
                  </Text>
                  <InputGroup>
                    <InputLeftAddon>
                      <FaKey />
                    </InputLeftAddon>
                    <Input
                      value={inputValue.confirmPassword}
                      name="confirmPassword"
                      onChange={handleInputChange}
                      id="confirm_pass_input"
                      placeholder="******"
                      type="password"
                    />
                  </InputGroup>
                  {error ?
                    <FormErrorMessage>
                      Please confirm your password
                    </FormErrorMessage>
                    :
                    ""
                  }
                </Box>
              </>

              <Box>
                <Button onClick={checkSignUp} colorScheme={"blue"}>Sign Up</Button>
              </Box>
              <Box>
                <Text color={"grey"}>
                  No Account? <Link onClick={handleSignUpVisibility}> Login </Link>
                </Text>
              </Box>
            </VStack>
          </FormControl>
        </CardBody>
      </Card>
        :
        <Card maxW="sm">
          <CardHeader>
            <Center>
              <Heading as="h1" size="lg">Login</Heading>
            </Center>
            <Center>
              <Text color="grey">Welcome to our app. Please Login.</Text>
            </Center>
          </CardHeader>
          <CardBody>
            <VStack spacing='24px'>

              <>
                <Box w="full">
                  <Text>
                    <label htmlFor="username_input">
                      Username
                    </label>
                  </Text>
                  <InputGroup>
                    <InputLeftAddon>
                      <FaUser />
                    </InputLeftAddon>
                    <Input
                      value={inputValue.username}
                      name="username"
                      onChange={handleInputChange}
                      id="username_input"
                      placeHolder="Cool.Username123!"
                    />
                  </InputGroup>
                </Box>
              </>

              <>
                <Box w="full">
                  <Text>
                    <label htmlFor="password_input">
                      Password
                    </label>
                  </Text>
                  <InputGroup>
                    <InputLeftAddon>
                      <FaKey />
                    </InputLeftAddon>
                    <Input
                      value={inputValue.password}
                      name="password"
                      onChange={handleInputChange}
                      id="password_input"
                      placeholder="CoolPassword123!"
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button onClick={handlePasswordVisibility} h='1.72rem' size='sm'>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </>

              <Box>
                <Button onClick={checkLogin} colorScheme={"blue"}>Login</Button>
              </Box>
              <Box>
                <Text color={"grey"}>
                  No Account? <Link onClick={handleSignUpVisibility}> Sign Up </Link>
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>}
    </Flex >
  );
}
