import { useNavigate } from "react-router-dom";
import { Button, Center, Heading, useColorMode } from "@chakra-ui/react";

const NotFound = () => {
    const navigate = useNavigate();
    const { colorMode } = useColorMode();

    return (
        <Center h="100vh" bg={colorMode === "light" ? "bgLight" : "bgDark"} textColor={colorMode === "light" ? "textLight" : "textDark"}>
            <Heading mr="20px">"404 | Not Found"</Heading>
            <Button data-testid="back" onClick={() => navigate(-1)} ml="20px" variant={colorMode === "light" ? "light" : "dark"}>Take Me Back</Button>
        </Center>
    );
};

export default NotFound;
