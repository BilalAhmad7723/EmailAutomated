import React from "react";
import Login from "./Login/login";
import MailEditor from "./MailTemplate/editor";
import SuccessPage from "./MailTemplate/success";
import ErrorPage from "./MailTemplate/error";
import { Switch, Route } from "react-router-dom";

import "./App.css";

// const Homepage = props => {
//   console.log(props);
// return (
//   <div>
//     <button onClick={()=>{props.history.push('/about')}}>About</button>
//     <h1>Homepage</h1>
//   </div>
//   )
// }

// const About = props => {
//   console.log(props);
//   return (
//     <div>
//       <button onClick={()=>{props.history.push('/topic')}}>Topic</button>
//       <h1>About</h1>
//     </div>
//     )
//   }

//   const Topics = props => {
//     console.log(props);
//     return (
//       <div>
//         <button onClick={()=>{props.history.push('/topic/1')}}>Topic Detail</button>
//         <Link to={ `${props.match.url}/2` }>Topic 2</Link>
//         <h1>Topics</h1>
//       </div>
//     )
//   }

//   const TopicsDetails = props => {
//     console.log(props);
//     return (
//       <div>
//         <button onClick={()=>{props.history.push('/')}}>Home</button>
//         <h1>Topic Detail : {props.match.params.TD}</h1>
//       </div>
//     )
//   }
export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/mail" component={MailEditor} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/error" component={ErrorPage} />
      </Switch>
    </>
  );
}
