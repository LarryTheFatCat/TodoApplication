import { useColorMode, Button, Wrap, WrapItem } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";


function ThemeSwitcher() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Button justifyContent="end" mr="10px" onClick={toggleColorMode}>
            {colorMode === 'light' ? <FaMoon /> : <BsSun style={{ color: "Yellow" }} />}
        </Button>
    )
}
export default ThemeSwitcher;