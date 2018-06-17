import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

class EditContact extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(props) {
    console.log(props);

    if (!props.token) {
      this.props.redirect("/auth");
    } else {
      localStorage.setItem("token", this.props.token);
    }
  }
  componentDidMount() {
    if (!this.props.token) {
      this.props.redirect("/auth");
    } else {
      localStorage.setItem("token", this.props.token);
    }
  }
  render() {
    return <div>edit contact</div>;
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => {
  return {
    redirect: url => dispatch(push(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContact);
