// import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import GlobalFont from "./Styles/GlobalFont";
import GlobalStyle from "./Styles/Globalstyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalFont />
      <Router />
    </>
  );
}

export default App;
