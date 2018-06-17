import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Item, Icon, Button } from "semantic-ui-react";
import { removeContact } from "../../actions";
import { push } from "react-router-redux";

class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: "",
      selected: false
    };
  }
  contactInjector() {
    return Object.entries(this.props.contact).map(contact => {
      //   console.log(contact[1]);
      let key = contact[1][0];
      contact = contact[1][1];
      return (
        <Item.Group key={key}>
          <Item>
            <Item.Content>
              <Item.Header className="ContactDetails-name">
                {contact.name} {contact.lastname}
              </Item.Header>
              <Item.Meta className="ContactDetails-job">
                {contact.company.name}
              </Item.Meta>
              <Item.Description>
                <div className="contact">
                  <div className="email">
                    <Icon name="mail" />
                    {contact.email}
                  </div>
                  <div className="phone">
                    <Icon name="phone" />
                    {contact.phone}
                  </div>
                </div>
                <div className="address">
                  <Icon name="marker" />
                  <div className="city address-item">
                    <div className="address-head">City:</div>
                    <div className="address-description">
                      {contact.address.city}
                    </div>
                  </div>
                  <div className="street address-item">
                    <div className="address-head">Street:</div>
                    <div className="address-description">
                      {" "}
                      {contact.address.street}
                    </div>
                  </div>
                  <div className="zipCode address-item">
                    <div className="address-head">ZIP Code: </div>
                    <div className="address-description">
                      {contact.address.zipcode}
                    </div>
                  </div>
                </div>
              </Item.Description>
            </Item.Content>
          </Item>
          <Button.Group attached="bottom">
            <Button onClick={this.handleClick.bind(this)}>Remove</Button>
            <Button.Or />
            <Button onClick={this.editContact.bind(this)}>Edit</Button>
          </Button.Group>
        </Item.Group>
      );
    });
  }
  handleClick(e) {
    // console.log(this.props.contact[0][0]);
    this.props.removeContact(this.props.contact[0][0], this.props.uid);
  }
  editContact() {
    this.props.redirect("/editcontact");
  }

  render() {
    if (!this.props.selected) {
      return (
        <section className="ContactDetail">
          <div className="contact"> Select contact...</div>
        </section>
      );
    } else {
      return (
        <section className="ContactDetail">
          <div className="contact">Contact Info</div>
          {this.contactInjector()}
        </section>
      );
    }
  }
}

const mapStateToProps = state => {
//   console.log(state);

  return {
    contact: state.request.contact,
    uid: state.auth.uid,
    selected: state.request.selected
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeContact: (key, uid) => dispatch(removeContact(key, uid)),
    redirect: url => dispatch(push(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetail);
