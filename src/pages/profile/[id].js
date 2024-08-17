"use client"
import { useRouter } from "next/router"
import ThemeSwitcher from "../Components/ThemeSwitcher";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useDisclosure,
    Select,
    ModalFooter,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    Circle,
    AccordionPanel,
    Spacer
} from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";
export default function TaskPage() {
    const router = useRouter();
    const [profileInfo, setProfileInfo] = useState({
        profileName: "",
        description: "",
        priorityLevel: ""
    });
    const [inputValue, setInputValue] = useState({
        taskTitle: "",
        taskDescription: "",
        priorityLevel: "",
    });
    const [task, setTask] = useState([]);
    const [taskVisibility, setTaskVisibility] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id } = router.query;

    useEffect(() => {
        const wordsToRemove = ["profileName,", "description,", "priorityLevel,"];
        if (id !== undefined) {
            let profile = localStorage.getItem(`profile_${id}`);
            wordsToRemove.forEach((word) => {
                profile = profile.replace(new RegExp(word, 'g'), ' ');
            });
            profile = profile.split(", ")
            for (let i = 0; i < profile.length; i++) {
                // newProfile.push(profile[i]);
                setProfileInfo({
                    profileName: profile[0],
                    description: profile[1],
                    priorityLevel: [2]
                });
            }
        }
    }, [id]);
    function storeValues(e) {
        let { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }
    function createTask() {
        if (inputValue.taskTitle.trim()) {
            setTask([...task, inputValue]);
            setInputValue({
                taskTitle: "",
                taskDescription: "",
                priorityLevel: ""
            });
        }
        setTaskVisibility(true);
    }

    const priorityColors = {
        1: "red",
        2: "yellow",
        3: "green"
    };

    return (
        <>
            <ThemeSwitcher />
            <Flex minH={"95vh"} align={"center"} justify={"center"}>
                <Card>
                    <CardHeader>
                        <Heading fontSize="4xl">
                            Task Profile: <Text as="u">{profileInfo.profileName}</Text>
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Center gap="50%">
                            <Box>
                                <Button onClick={onOpen} colorScheme="green">
                                    Add Tasks
                                </Button>
                                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>
                                            <Heading textAlign="center" text="lg">
                                                Add Tasks
                                            </Heading>
                                        </ModalHeader>
                                        <ModalBody>
                                            <FormControl>
                                                <FormLabel>
                                                    Task Title
                                                </FormLabel>
                                                <InputGroup>
                                                    <InputLeftAddon>
                                                        <FaTasks />
                                                    </InputLeftAddon>
                                                    <Input
                                                        value={inputValue.taskTitle}
                                                        name="taskTitle"
                                                        onChange={storeValues}
                                                        placeholder="Walk The Dog" />
                                                </InputGroup>
                                                <FormLabel pt="10px">
                                                    Task Description
                                                </FormLabel>
                                                <Textarea
                                                    value={inputValue.taskDescription}
                                                    name="taskDescription"
                                                    onChange={storeValues}
                                                    borderRadius="xl"
                                                />
                                                <FormLabel pt="10px">
                                                    Priority Level
                                                </FormLabel>
                                                <Select
                                                    value={inputValue.priorityLevel}
                                                    name="priorityLevel"
                                                    onChange={storeValues}
                                                    placeholder="Priority Level"
                                                >
                                                    <option value='1'>Priority 1</option>
                                                    <option value='2'>Priority 2</option>
                                                    <option value='3'>Priority 3</option>
                                                </Select>
                                            </FormControl>
                                        </ModalBody>
                                        <Flex align="center" justify="center" gap="50%" margin="25px">
                                            <Button onClick={onClose}>
                                                Close Task
                                            </Button>
                                            <Button onClick={createTask} colorScheme="green">
                                                Add Task
                                            </Button>
                                        </Flex>
                                    </ModalContent>
                                </Modal>
                            </Box>
                        </Center>
                        {taskVisibility ?
                            <>
                                {task.map((task, index) => (
                                    <div key={index}>
                                        <Accordion allowToggle pt="10px" w="full">
                                            <AccordionItem>
                                                <AccordionButton _expanded={{ bg: "darkGrey" }} borderRadius="10px">
                                                    <Box as="span" flex="1" textAlign="left">
                                                        <Heading fontSize="md">
                                                            {task.taskTitle}
                                                        </Heading>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel pb="4">
                                                    <Flex>
                                                        {task.taskDescription}
                                                        <Spacer />
                                                        <Circle bg={priorityColors[task.priorityLevel]} width="30px" height="30px">
                                                            {task.priorityLevel}
                                                        </Circle>
                                                    </Flex>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                ))}
                            </>
                            :
                            ""
                        }
                    </CardBody>
                </Card>
            </Flex>
        </>
    )
}