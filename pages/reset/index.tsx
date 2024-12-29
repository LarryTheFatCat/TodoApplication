import RocketIcon from "../../public/RocketIcon";
import { doSendPasswordResetEmail } from "../../utils/Methods";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
const ResetPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const validateEmail = (value: string): boolean =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const updateEmailState = (value:string) => {
    setEmail(value);
  }
  const resetPassword = async () => {
    setLoading(true);
    if(validateEmail(email)) {
      try {
        await doSendPasswordResetEmail(email);
        setLoading(false);
        router.push("/home");
      } catch (e) {
        alert(e);
      }
    } else {
      setLoading(false);
      alert("hello");
    }
  };
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Card className="flex flex-row p-0 w-1/2 mx-auto">
          <div className="flex-1 p-5 border-r border-gray-300 bg-blue-500 pt-[12%]">
            <RocketIcon className="w-20 mx-auto" />
            <h2 className="text-xl font-bold text-white text-center">
              Whoops, that's okay!
            </h2>
            <CardBody>
              <p className="text-white text-center">
                Remember, you can reset your password anytime with us!
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
                  value={email}
                  onChange={(e) => updateEmailState(e.target.value) }
                  isClearable
                  isRequired
                />
              </div>
              <Button
                onClick={resetPassword}
                className="mx-auto"
                color="primary"
                variant="solid"
                isLoading={loading}
              >
                Reset Password
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
                Remember your password?{" "}
                <Link
                  href="/login"
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
export default ResetPage;
