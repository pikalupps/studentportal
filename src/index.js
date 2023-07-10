import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, CSSReset, extendTheme, ColorModeScript } from "@chakra-ui/react";

const theme = extendTheme({
    initialColorMode: 'dark',
    useSystemColorMode: false,
    colors: {
        bgDark: "#141414",
        bgLight: "#FFFFFF",
        primaryDark: "#0D0D0D",
        primaryLight: "#EFEFF4",
        textDark: "white",
        textLight: "black"
    },
    components: {
      Button: {
        baseStyle: {
            bg: "primary",
            color:"white",
            _hover:"#999999",
        },
        defaultProps: {
          size: "lg",
          variant: "sm",
        },
        variants: {
            "dark": {
                bg: "primaryDark",
                textColor: "textDark"
            },
            "light": {
                bg: "primaryLight",
                textColor: "textLight"
            },
            "red": {
                textColor: "red",
            }
        },
      },
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider theme={theme}>
        <CSSReset/>
        <React.StrictMode>
            <BrowserRouter>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </ChakraProvider>
);
