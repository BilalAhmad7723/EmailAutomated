import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/login";
import SuccessPage from "./Components/MailTemplate/success";
import ErrorPage from "./Components/MailTemplate/error";
import dashboard from "./Components/Dashboard/dashboard";
import RouteApp from "./App";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import mail from "./Components/MailTemplate/editor";
import subject from "./Components/Subject/subject";
import account from "./Components/Accounts/account";
import nomatch from "./Components/MailTemplate/nomatch";
import { Provider } from "react-redux";
import store from "./Store/store/store";

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route exact path={"/"} component={Login} />
      <Route
        path={"/app"}
        render={({ match: { url } }) => (
          <Switch>
            <RouteApp exact path={`${url}/`} component={dashboard} />
            <RouteApp exact path={`${url}/mail`} component={mail} />
            <RouteApp exact path={`${url}/subject`} component={subject} />
            <RouteApp exact path={`${url}/account`} component={account} />
          </Switch>
        )}
      />
       <Route exact path={"/success"} component={SuccessPage} />
       <Route exact path={"/error"} component={ErrorPage} />
       <Route exact path={"*"} component={nomatch} />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
