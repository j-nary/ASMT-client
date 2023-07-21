// import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import GlobalStyle from "./Styles/Globalstyle";
import { theme } from "./Styles/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
