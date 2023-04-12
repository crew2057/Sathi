import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      variants: {
        query: {},
      },
    },
  },
  config: {
    useSystemColorMode: "false",
    initialColorMode: "light",
  },
});
