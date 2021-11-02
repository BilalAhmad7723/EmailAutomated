import React from "react";
import Login from "./Login/login";
import MailEditor from "./MailTemplate/editor";
import SuccessPage from "./MailTemplate/success";
import ErrorPage from "./MailTemplate/error";
import Subject from "./Subject/subject";
import Dashboard from "./Dashboard/dashboard"
import { Switch, Route } from "react-router-dom";

import "./App.css";

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/subject" component={Subject} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/mail" component={MailEditor} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/error" component={ErrorPage} />
      </Switch>
    </>
  );
}
