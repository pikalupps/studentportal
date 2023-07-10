import { useNavigate } from "react-router-dom";
import { Button, Center, Heading, Container, useColorMode } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    const navigate = useNavigate()
    const { colorMode } = useColorMode()

    return (
        <Container p="0" maxW="full" minH="100vh" bg={colorMode === "light" ? "bgLight" : "bgDark"} textColor={colorMode === "light" ? "textLight" : "textDark"} centerContent>
            <Navbar />
            <Center height="calc(100vh - 96px)">
                <Heading mr="20px">Ruangguru</Heading>
                <Button data-testid="student-btn" onClick={() => navigate("/student")} ml="20px" variant={colorMode === "light" ? "light" : "dark"}>All Student</Button>
            </Center>
            <Footer />
        </Container>
    )
};

export default Home;
