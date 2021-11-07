import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login/login";
import dashboard from "./Dashboard/dashboard";
import RouteApp from "./App";
import mail from "./MailTemplate/editor";
import subject from "./Subject/subject";
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={"/"} component={Login} />
      <Route
        path={"/app"}
        render={({ match: { url } }) => (
          <Switch>
            <RouteApp exact path={`${url}/mail`} component={mail} />
            <RouteApp exact path={`${url}/subject`} component={subject} />
            <RouteApp exact path={`${url}/`} component={dashboard} />
          </Switch>
        )}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
