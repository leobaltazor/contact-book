import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Form, Checkbox } from "semantic-ui-react";

class EditContact extends Component {
  constructor(props) {
    super(props);
  }
  style = {
    width: "500px",
    margin: "0 auto"
  };
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
    return (
      <Form style={this.style}>
        <Form.Group widths="equal">
          <Form.Field>
            <label>First Name contact.name</label>
            <input placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Last Name contact.lastname</label>
            <input placeholder="Last Name" />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>contact.company.name</label>
          <input placeholder="First Name" />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field>
            <label>contact.email</label>
            <input placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>contact.phone</label>
            <input placeholder="Last Name" />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    );
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
