import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Form, Message, Button } from "semantic-ui-react";
import { AddContact, UpdateContact } from "../../actions";

class EditContact extends Component {
    constructor(props) {
        super(props);
        this.state = null;
    }
    validator = {
        // eslint-disable-next-line
        Email: /^(([^<>()\[\]\/\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        Phone: /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,
        Name: /.+/
    };
    blur = (value, key, res) => {
        const text = value;
        let { validateStatus, errlist } = this.state;
        const regExp = this.validator[key];
        let validateStatusBlur = regExp.test(text);
        validateStatusBlur ? delete errlist[key] : (errlist[key] = `Check ${key}`);
        if (Object.keys(errlist).length > 0) validateStatus = false;
        else validateStatus = true;
        this.setState({ validateStatus, errlist });
        try {
            res();
        } catch (error) {}
    };
    newContact = {
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
    };
    style = {
        width: "500px",
        margin: "0 auto"
    };
    componentWillReceiveProps(props) {
        // console.log(props);
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
            if (this.props.selected[0][1] !== undefined) {
                // console.log(this.props.selected[0][1]);
                this.setState({
                    contactid: this.props.selected[0][0],
                    contact: this.props.selected[0][1],
                    validateStatus: true,
                    errlist: {}
                });
            } else if (this.props.select === false) {
                console.log("addcontact");
                this.setState({
                    contactid: null,
                    contact: this.newContact,
                    validateStatus: true,
                    errlist: {}
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
        const prom = new Promise(res => {
            this.blur(this.state.contact.name, "Name", res);
        });
        prom.then(() => {
            console.log("good");
            console.log(this.state);

            if (this.state.validateStatus) {
                let data = this.state.contact;
                let uid = this.props.uid;
                AddContact(uid, data);
            }
        });
    };
    closeform = e => {
        e.preventDefault();
        this.props.redirect("/");
    };
    update = e => {
        e.preventDefault();
        if (this.state.validateStatus) {
            let data = this.state.contact;
            let contact = this.state.contactid;
            let uid = this.props.uid;
            UpdateContact(uid, contact, data);
        }
    };

    render() {
        // console.log(this.state);

        if (this.state !== null) {
            let { name, lastname, company, email, phone } = this.state.contact;
            return (
                <Form warning style={this.style} onSubmit={this.handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>First Name contact.name</label>
                            <input
                                placeholder="First Name"
                                value={name}
                                onBlur={e => this.blur(e.target.value, "Name")}
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
                            <label>
                                Contact <br />Email
                            </label>
                            <input
                                placeholder="Email"
                                value={email}
                                onBlur={e => this.blur(e.target.value, "Email")}
                                onChange={e => this.onInput(e.target.value, "email")}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Phone<br /> (+99(999)99-99-999 or 999 99 99 999)
                            </label>
                            <input
                                placeholder="Phone"
                                value={phone}
                                pattern="^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$"
                                onBlur={e => this.blur(e.target.value, "Phone")}
                                onChange={e => this.onInput(e.target.value, "phone")}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button.Group attached="bottom">
                        <Button type="submit">Add Contact</Button>
                        <Button onClick={this.update}>Update Info</Button>
                        <Button onClick={this.closeform}>Close</Button>
                    </Button.Group>
                    <Form.Field />
                    {this.state.validateStatus ? (
                        ""
                    ) : (
                        <Message warning header="Could you check something!" list={Object.values(this.state.errlist)} />
                    )}
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
    selected: state.request.contact,
    select: state.request.selected
});

const mapDispatchToProps = dispatch => {
    return {
        AddContact: (uid, data) => dispatch(AddContact(uid, data)),
        UpdateContact: (uid, contact, data) => dispatch(UpdateContact(uid, contact, data)),
        redirect: url => dispatch(push(url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContact);
