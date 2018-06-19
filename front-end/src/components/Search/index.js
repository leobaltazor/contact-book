import React, { Component } from "react";
import "./index.css";
import { Input, List } from "semantic-ui-react";
import { connect } from "react-redux";
import { requestData } from "../../actions";
import { NEW_SELECT } from "../../types";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showedUser: [],
      value: ""
    };
  }
  componentWillMount() {
    requestData();
    setTimeout(() => {
      this.setState({
        showedUser: Object.entries(this.props.contactar)
      });
    }, 2000);
  }
  contactsInject() {
    //   let data = this.state.showedUser
    // console.log(data);

    if (this.state.showedUser !== null) {
      return this.state.showedUser.map(el => {
        //   console.log(el[1]);
        let key = el[0];
        el = el[1];
        return (
          <List.Item
            key={key}
            onClick={this.onItemClick.bind(this)}
            value={key.toString()}
          >
            <List.Content>
              <List.Header>{el.name}</List.Header>
              {el.phone}
            </List.Content>
          </List.Item>
        );
      });
    }
  }
  handleSearch(event) {
    let searchTarget = event.target.value.toLowerCase();
    let data = this.props.contactar;
    // console.log(Object.entries(data));

    let showedUser = Object.entries(data).filter(function(el) {
      el = el[1];
      let serchValue = el.name.toLowerCase();
      //   console.log(searchTarget);
      //   console.log(serchValue);
      //   console.log(serchValue.indexOf(searchTarget) !== -1);
      return serchValue.indexOf(searchTarget) !== -1;
    });
    this.setState({
      showedUser: showedUser,
      value: searchTarget
    });
  }
  onItemClick = event => {
    return this.props.clickitem(event);
  };

  render() {
    return (
      <section className="search">
        <Input
          placeholder="Search..."
          icon="search"
          fluid
          onInput={this.handleSearch.bind(this)}
        />

        <List celled>{this.contactsInject()}</List>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    getStatus: state.request.getStatus,
    contactar: state.request.contactarr
  };
};

const mapDispatchToProps = dispatch => ({
  clickitem: event =>
    dispatch({
      type: NEW_SELECT,
      contact: event.currentTarget.dataset.value
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
