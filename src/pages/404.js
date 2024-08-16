import { Flex } from "@chakra-ui/react";
import nopage from "./public/nopage.gif"
import Image from "next/image";

function PageNotFound() {
    return (
        <div>
            <Flex minH={"95vh"} align={"center"} justify={"center"}>
                <Image width={1200} height={700} src={nopage} />
            </Flex>
        </div>
    );
}

export default PageNotFound;