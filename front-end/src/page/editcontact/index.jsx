import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Form } from "semantic-ui-react";
import { AddContact, UpdateContact } from "../../actions";

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = null;
    // {
    //   name: "Leanne",
    //   username: "Bret",
    //   email: "Sincere@april.biz",
    //   address: {
    //     street: "Kulas Light",
    //     suite: "Apt. 556",
    //     city: "Gwenborough",
    //     zipcode: "92998-3874",
    //     geo: {
    //       lat: "-37.3159",
    //       lng: "81.1496"
    //     }
    //   },
    //   phone: "1-770-736-8031 x56442",
    //   website: "hildegard.org",
    //   company: {
    //     name: "Romaguera-Crona",
    //     catchPhrase: "Multi-layered client-server neural-net",
    //     bs: "harness real-time e-markets"
    //   }
    // }
  }
  style = {
    width: "500px",
    margin: "0 auto"
  };
  componentWillReceiveProps(props) {
    // console.log(props);
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
      if (this.props.selected[0][1] !== undefined) {
        // console.log(this.props.selected[0][1]);
        this.setState({
          contactid: this.props.selected[0][0],
          contact: this.props.selected[0][1]
        });
      }
    }
  }

  onInput = (value, key) => {
    let contact = this.state.contact;
    contact[key] = value;
    this.setState({ contact: contact });
  };
  onInputCompany = (value, key) => {
    this.setState({
      contact: {
        ...this.state.contact,
        company: {
          ...this.state.contact,
          [key]: value
        }
      }
    });
  };
  handleSubmit = () => {
    let data = this.state.contact;
    let uid = this.props.uid;
    AddContact(uid, data);
  };
  closeform = e => {
    e.preventDefault();
    this.props.redirect("/");
  };
  update = e => {
    e.preventDefault();
	let data = this.state.contact;
	let contact = this.state.contactid;
    let uid = this.props.uid;
    UpdateContact(uid, contact, data);
  };

  render() {
    if (this.state !== null) {
      //   console.log(this.state);
      //   console.log(this.state[0][1]);
      let { name, lastname, company, email, phone } = this.state.contact;

      return (
        <Form style={this.style} onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>First Name contact.name</label>
              <input
                placeholder="First Name"
                value={name}
                onChange={e => this.onInput(e.target.value, "name")}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name contact.lastname</label>
              <input
                placeholder="Last Name"
                value={lastname}
                onChange={e => this.onInput(e.target.value, "lastname")}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>contact.company.name</label>
            <input
              placeholder="Company Name"
              value={company.name}
              onChange={e => this.onInputCompany(e.target.value, "name")}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>contact.email</label>
              <input
                placeholder="Email"
                value={email}
                onChange={e => this.onInput(e.target.value, "email")}
              />
            </Form.Field>
            <Form.Field>
              <label>contact.phone</label>
              <input
                placeholder="Phone"
                value={phone}
                onChange={e => this.onInput(e.target.value, "phone")}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field />
          <Form.Button type="submit">Add Contact</Form.Button>
          <Form.Button onClick={this.update}>Update Info</Form.Button>
          <Form.Button onClick={this.closeform}>Close</Form.Button>
        </Form>
      );
    } else {
      return <div>select contact</div>;
    }
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  uid: state.auth.uid,
  selected: state.request.contact
});

const mapDispatchToProps = dispatch => {
  return {
    AddContact: (uid, data) => dispatch(AddContact(uid, data)),
    UpdateContact: (uid, contact, data) =>
      dispatch(UpdateContact(uid, contact, data)),
    redirect: url => dispatch(push(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContact);
