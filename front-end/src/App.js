import React, { Component } from "react";
import "./App.css";
//import components
import Search from "./components/Search";
import ContactDetails from "./components/ContactDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <ContactDetails />
      </div>
    );
  }
}

export default App;
