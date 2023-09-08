import { lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Principal = lazy(() => import("./pages/Principal/index"));

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Principal />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
