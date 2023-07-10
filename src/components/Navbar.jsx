import { Link, Flex, Container, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const NavBar = () => {
    const navigate = useNavigate()
    const { colorMode, toggleColorMode } = useColorMode()
    

    return (
        <Container maxW="full" height="48px" px="10" py="3" textColor={colorMode === "light" ? "textLight" : "textDark"} bg={colorMode === "light" ? "primaryLight" : "primaryDark"} border="white">
            <Flex justifyContent="space-between">
                <Link data-testid="home-page" onClick={() => navigate("/")} fontWeight="bold">Student Portal</Link>
                <Flex justifyContent="space-between">
                    <Link data-testid="student-page" onClick={() => navigate("/student")}>All Student</Link>
                    <Link data-testid="add-page" onClick={() => navigate("/add")} ml="5vh">Add Student</Link>
                    <Link onClick={toggleColorMode} ml="5vh">
                        {colorMode === 'light' ? (<MoonIcon />) : (<SunIcon />)}
                    </Link>
                </Flex>
            </Flex>
        </Container>
    );
};

export default NavBar;
