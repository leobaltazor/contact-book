import React, { Component, Fragment } from "react";
import "./App.css";
import { Route } from "react-router";
import Auth from "./page/auth";
import Main from "./page/main";
import EditContact from "./page/editcontact";

class App extends Component {
  render() {
    return (
        <Fragment>
          <Route exact path="/" component={Main} />
          <Route path="/auth" component={Auth} />
          <Route path="/editcontact" component={EditContact} />
        </Fragment>
    );
  }
}

export default App;
