import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/react";
import client from "../apollo-client";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
