import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { setAuthParams } from "../../actions";
import { connect } from "react-redux";
import { push } from "react-router-redux";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preloader: false,
      login: "",
      password: ""
    };
  }
  style = {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    border: "none"
  };
  componentDidMount() {
    if (this.props.token) {
      this.props.redirect("/");
    }
  }

  onInput = (value, key) => this.setState({ [key]: value });

  handleSubmit = () => {
    const { login, password } = this.state;
    this.props.setAuthParams(login, password);
  };

  render() {
    const { login, password } = this.state;
    const { status, token, errorMessage } = this.props;
    return (
      <section style={this.style}>
        <span>{(status, token, errorMessage)}</span>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Login</label>
            <input
              placeholder="Enter login"
              type="text"
              name="login"
              value={login}
              onChange={e => this.onInput(e.target.value, "login")}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Enter Password"
              type="password"
              name="password"
              value={password}
              onChange={e => this.onInput(e.target.value, "password")}
            />
          </Form.Field>
          <Form.Button content="Submit" />
        </Form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  status: state.auth.status,
  token: state.auth.token,
  errorMessage: state.auth.errorMsg
});

const mapDispatchToProps = dispatch => ({
  setAuthParams: (login, password) => dispatch(setAuthParams(login, password)),
  redirect: url => dispatch(push(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
