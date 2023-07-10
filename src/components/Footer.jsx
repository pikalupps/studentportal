import { Box, Center, useColorMode } from "@chakra-ui/react";

const Footer = () => {
    const { colorMode } = useColorMode()

    return (
        <Box className="footer" w="100%" h="48px" px="10" py="3" textColor={colorMode === "light" ? "textLight" : "textDark"} bg={colorMode === "light" ? "primaryLight" : "primaryDark"} border="white">
            <Center>
                <p className="studentName">Putu Andhika Pratama</p>
                -
                <p className="studentId">FE5597365</p>
            </Center>
        </Box>
    );
};

export default Footer;
