import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";

class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: "",
      selected: false
    };
  }

  render() {
    if (!this.props.selected) {
      return <div> Select contact...</div>;
    } else {
      return (
        <div>
          <p>test</p>
          <p>
            {this.props.contact.map(contact => {
              return contact.name;
            })}
          </p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    contact: state.request.contact,
    selected: state.request.selected
  };
};

export default connect(mapStateToProps)(ContactDetail);
