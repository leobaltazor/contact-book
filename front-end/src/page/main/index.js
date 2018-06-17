import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Button } from "semantic-ui-react";
import { logout } from "../../actions";

//import components
import Search from "../../components/Search";
import ContactDetails from "../../components/ContactDetails";

class Main extends Component {
  style = {
    margin: "0 auto",
    display: "flex",
    flexFlow: "row nowrap",
    width: "500px",
    justifyContent: "center",
    alignItems: "center",
    border: "none"
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
      <section>
        <div style={this.style}>
          <Search />
          <ContactDetails />
        </div>
        <Button onClick={this.props.logout}>Log out</Button>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => {
  return {
    redirect: url => dispatch(push(url)),
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
