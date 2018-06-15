import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Item, Icon } from "semantic-ui-react";

class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: "",
      selected: false
    };
  }
  contactInjector() {
    return this.props.contact.map(contact => {
      return (
        <Item.Group key={contact.id}>
          <Item>
            <Item.Content>
              <Item.Header className="ContactDetails-name">
                {contact.name}
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
        </Item.Group>
      );
    });
  }

  render() {
    if (!this.props.selected) {
      return (
        <section>
          <div className="ContactDetail">
            <div className="contact"> Select contact...</div>
          </div>{" "}
        </section>
      );
    } else {
      return (
        <section>
          <div className="ContactDetail">
            <div className="contact">Contact Info</div>
            {this.contactInjector()}
          </div>
        </section>
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
