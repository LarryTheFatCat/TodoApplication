import { Flex, Button, Box, Stack, VStack, Center } from "@chakra-ui/react";
import nopage from "./public/nopage.gif"
import Image from "next/image";
import { useRouter } from "next/router";

function PageNotFound() {
    const router = useRouter()
    return (
        <div>
            <VStack>
                <Box>

                    <Image width={1200} src={nopage} />
                </Box>
                <Box>
                    <Button onClick={() => router.back()} colorScheme="green">
                        Go Back
                    </Button>
                </Box>
            </VStack>
        </div>
    );
}

export default PageNotFound;