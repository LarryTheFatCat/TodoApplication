import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Stack,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { AiFillTags } from "react-icons/ai";
import { useEffect, useState } from "react";
import ThemeSwitcher from "./Components/ThemeSwitcher";
import { useRouter } from "next/router";


function Tasks() {
    const [username, setUsername] = useState("");
    const [displayTasks, setDisplayTasks] = useState(false);
    const [createProfile, setCreateProfile] = useState(false);
    const [inputValue, setInputValue] = useState({
        profileName: "",
        description: "",
        priorityLevel: "",
    });
    const [profiles, setProfiles] = useState({}); // store an empty object to later append to
    const router = useRouter();

    useEffect(() => {
        let storedUser = localStorage.getItem("username");
        return () => {
            setUsername(storedUser);
        }
    });

    function removeText(text, wordsToRemove) {
        let newText = text;
        wordsToRemove.forEach((word) => {
            newText = newText.replace(new RegExp(word, 'g'), '');
        });
        return newText;
    }

    useEffect(() => {
        const profileList = [];
        const wordsToRemove = ["profileName,", "description,", "priorityLevel,"];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith("profile_")) {
                let value = localStorage.getItem(key);
                let cleanedValue = removeText(value, wordsToRemove);
                let valuedArray = cleanedValue.split(',');
                profileList.push({ id: key.replace("profile_", ""), value: valuedArray });
            }
        }
        setProfiles(profileList);
    }, []);

    function handleTasksProfileVisibility() {
        setDisplayTasks(!displayTasks);
    }

    function handleInputChange(e) {
        let { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    function createProfileConfig() {
        let profileNumber = 0;
        let newProfileName = `profile_${profileNumber}`;
        if (inputValue.profileName.value == "" || inputValue.description.value == "") {
        } else {
            while (localStorage.getItem(newProfileName)) {
                profileNumber++;
                newProfileName = `profile_${profileNumber}`;
            }
            localStorage.setItem(newProfileName, Object.entries(inputValue));
        }
    }

    return (
        <div>
            <ThemeSwitcher />
            <Flex minH={"95vh"} align={"center"} justify={"center"}>
                {displayTasks ?
                    <Card>
                        <CardHeader>
                            <Heading as="b" size="lg">
                                <Stack direction={['column', 'row']}>
                                    <Box w="full">
                                        Task Profiles Under <Text as="u" textUnderlineOffset="4px">{username}</Text>
                                    </Box>
                                    <Box w="30px">
                                        <Button colorScheme="red" onClick={() => setDisplayTasks(!displayTasks)}>X</Button>
                                    </Box>
                                </Stack>
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Center>
                                <Stack direction={['column', 'row']}>
                                    <Box w="full">
                                        {profiles.map((profileValue, index) => (
                                            <Card onClick={() => router.push(`/profile/${profileValue.id}`)} mb="10px" key={index} >
                                                <CardHeader>
                                                    <Text as="b" fontSize="2xl">
                                                        Profile Name: {profileValue.value[0]}
                                                    </Text>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </Box>
                                </Stack>
                            </Center>
                        </CardBody>
                    </Card>
                    :
                    createProfile ?
                        <Card>
                            <Center>
                                <Heading mt={5} as="b" size="lg">
                                    Add New Task
                                </Heading>
                                <Button colorScheme="red" onClick={() => setCreateProfile(false)} mt={5} ml={5}>
                                    X
                                </Button>
                            </Center>
                            <CardBody>
                                <Center>
                                    <>
                                        <VStack spacing="24px">
                                            <Box w="full">
                                                <label htmlFor="task_profile_name">
                                                    Profile Name
                                                </label>
                                                <InputGroup>
                                                    <InputLeftAddon>
                                                        <AiFillTags />
                                                    </InputLeftAddon>
                                                    <Input value={inputValue.profileName} name="profileName" onChange={handleInputChange} id="task_profile_name" placeholder="Shopping Tasks" />
                                                </InputGroup>
                                            </Box>
                                            <Box w="full">
                                                <label htmlFor="task_description">
                                                    Description
                                                </label>
                                                <Textarea value={inputValue.description} name="description" onChange={handleInputChange} id="task_description" />
                                            </Box>
                                            <Box w="full">
                                                <label htmlFor="priority_level">
                                                    Priority Level
                                                </label>
                                                <Select value={inputValue.priorityLevel} name="priorityLevel" onChange={handleInputChange} placeholder="Priority Level">
                                                    <option value='1'>Priority 1</option>
                                                    <option value='2'>Priority 2</option>
                                                    <option value='3'>Priority 3</option>
                                                </Select>
                                            </Box>
                                            <Button onClick={() => { createProfileConfig() }} colorScheme="blue">
                                                Create Profile
                                            </Button>
                                        </VStack>
                                    </>
                                </Center>
                            </CardBody>
                        </Card>
                        :
                        <Card>
                            <CardHeader>
                                <Heading as="b" size="lg">
                                    Welcome {username}
                                </Heading>
                            </CardHeader>
                            <CardBody>
                                <Center>
                                    <Stack direction={['column', 'row']} spacing="24px">
                                        <Box w='full'>
                                            <Button onClick={handleTasksProfileVisibility} colorScheme="blue">
                                                Manage Tasks Profile
                                            </Button>
                                        </Box>
                                        <Box w='full'>
                                            <Button onClick={() => setCreateProfile(true)} colorScheme="green">
                                                Add New Profile
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Center>
                            </CardBody>
                        </Card>
                }
            </Flex >
        </div >
    )
}

export default Tasks;