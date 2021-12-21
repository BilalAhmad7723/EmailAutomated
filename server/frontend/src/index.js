import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login/login";
import SuccessPage from "./MailTemplate/success";
import ErrorPage from "./MailTemplate/error";
import dashboard from "./Dashboard/dashboard";
import RouteApp from "./App";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import mail from "./MailTemplate/editor";
import subject from "./Subject/subject";
import nomatch from "./MailTemplate/nomatch";

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
       <Route exact path={"/success"} component={SuccessPage} />
       <Route exact path={"/error"} component={ErrorPage} />
       <Route exact path={"*"} component={nomatch} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
