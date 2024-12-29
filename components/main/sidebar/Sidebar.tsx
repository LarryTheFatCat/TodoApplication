import CompletedIcon from "../../../public/sidebar/CompletedIcon";
import HomeIcon from "../../../public/sidebar/HomeIcon";
import PendingIcon from "../../../public/sidebar/PendingIcon";
import PriorityIcon from "../../../public/sidebar/PriorityIcon";
import VerticalThreeDots from "../../../public/ThreeDotsVertical";
import { UserData } from "../../../types/Types";
import { auth, db } from "../../../utils/Firebase";
import { doSignOut } from "../../../utils/Methods";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      // if there is a currentUser, we fetch user data
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, `users/${uid}`);
        const docSnap = await getDoc(docRef);
        // if there is an exsiting document then we update our user info
        if (docSnap.exists()) {
          let data = docSnap.data();
          // setUserData(data.fullname);
          setUserData({
            fullName: data.fullname,
            email: data.email,
          });
        } else {
          router.push("/");
        }
      }
    };
    console.log(userData);
    // call functions here
    fetchUserData();
  }, []);
  return (
    <>
      <Card className="w-10/12 bg-[#2E2E48] rounded-l-none rounded-sm h-screen">
        <div className="grid grid-rows-[auto_1fr_auto] h-full">
          <CardHeader className="grid grid-cols-2">
            <div className="grid col-span-1">
              <h2 className="w-full float-start text-white">
                <User name={userData.fullName} description={userData.email} />
              </h2>
            </div>
            <div className="grid col-span-1 w-full justify-end">
              <Popover placement="right" showArrow={true}>
                <PopoverTrigger>
                  <Button variant="flat" isIconOnly>
                    <VerticalThreeDots />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Button
                    onPress={onOpen}
                    variant="light"
                    color="danger"
                    className="w-full"
                  >
                    Sign out
                  </Button>
                </PopoverContent>
              </Popover>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        <h1 className="text-danger-500 text-center text-xl">
                          Woah! Hold It Right There!
                        </h1>
                      </ModalHeader>
                      <ModalBody>
                        <p>
                          Remember, if you sign out you'll have to resign back
                          in and it is a long process are you sure!
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          I change my mind!
                        </Button>
                        <Button
                          color="primary"
                          onPress={() => {
                            doSignOut();
                            router.push("/");
                          }}
                        >
                          Let me sign out!
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </CardHeader>
          <CardBody>
            <Tooltip
              placement="right-end"
              showArrow
              content="See where all your tasks lie!"
            >
              <Button
                className="w-full flex items-center justify-between"
                variant="light"
              >
                <HomeIcon />
                <p className="text-white mt-1 font-semibold mr-2">Home</p>
              </Button>
            </Tooltip>
            <Tooltip
              placement="right-end"
              showArrow
              content="Focus on tasks that need attention!"
            >
              <Button
                className="w-full flex items-center justify-between"
                variant="light"
              >
                <PendingIcon />
                <p className="text-white mt-1 font-semibold mr-2">
                  Pending Tasks
                </p>
              </Button>
            </Tooltip>
            <Tooltip
              placement="right-end"
              showArrow
              content="Track your accomplished tasks!"
            >
              <Button
                className="w-full flex items-center justify-between"
                variant="light"
              >
                <CompletedIcon />
                <p className="text-white mt-1 font-semibold mr-2">
                  Completed Tasks
                </p>
              </Button>
            </Tooltip>
            <Tooltip
              showArrow
              placement="right-end"
              content="Find your prioritized tasks"
            >
              <Button
                className="w-full flex items-center justify-between"
                variant="light"
              >
                <PriorityIcon />
                <p className="text-white mt-1 font-semibold mr-2">
                  Important Tasks
                </p>
              </Button>
            </Tooltip>
          </CardBody>
          <CardFooter className="text-white text-center">
            <p>hello</p>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};
export default Sidebar;
