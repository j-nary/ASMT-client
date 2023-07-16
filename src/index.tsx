import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from 'styled-components';
import { theme } from "./Styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
