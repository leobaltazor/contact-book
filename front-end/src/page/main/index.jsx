import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Button } from "semantic-ui-react";
import { logout } from "../../actions";

//import components
import Search from "../../components/Search";
import ContactDetails from "../../components/ContactDetails";
import { ADD_CONTACT } from "../../types";

class Main extends Component {
    style = {
        margin: "0 auto 20px",
        display: "flex",
        flexFlow: "row nowrap",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        border: "none"
    };
    styleSection = {
        width: "500px",
        margin: "100px auto"
    };
    componentWillReceiveProps(props) {
        console.log(props);

        if (!props.token) {
            this.props.redirect("/auth");
        } else {
            sessionStorage.setItem("token", this.props.token);
            sessionStorage.setItem("uid", this.props.uid);
        }
    }
    componentDidMount() {
        if (!this.props.token) {
            this.props.redirect("/auth");
        } else {
            sessionStorage.setItem("token", this.props.token);
            sessionStorage.setItem("uid", this.props.uid);
        }
    }
    AddContact = () => {
        this.props.AddContact();
        this.props.redirect("/editcontact");
    };

    render() {
        return (
            <section style={this.styleSection}>
                <div style={this.style}>
                    <Search />
                    <ContactDetails />
                </div>
                <Button.Group attached="bottom">
                    <Button onClick={this.AddContact}>Add contact</Button>
                    <Button onClick={this.props.logout}>Log out</Button>
                </Button.Group>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    uid: state.auth.uid
});

const mapDispatchToProps = dispatch => {
    return {
        redirect: url => dispatch(push(url)),
        logout: () => dispatch(logout()),
        AddContact: () =>
            dispatch({
                type: ADD_CONTACT
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
