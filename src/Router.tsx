import { BrowserRouter, Route, Switch } from "react-router-dom";
import Univ from "./routes/Univ";
import Main from "./routes/Main";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:univId">
          <Univ />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
