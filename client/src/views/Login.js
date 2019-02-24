import React, { Component } from "react";
import PropTypes from "prop-types";
// import TextFieldGroup from "../components/TextFieldGroup";
import BtnHome from "../components/layout/BtnHome";
import Navbar from "../components/layout/Navbar";
// import LoginFacebook from "../components/LoginFacebook";
// import LoginGoogle from "../components/LoginGoogle";
// import { FacebookLogin } from "react-facebook-login";
// import { FacebookLogout } from "react-facebook-logout";
// import { GoogleLogin } from "react-google-login";
// import { GoogleLogout } from "react-google-login";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

import Checkbox from "@material-ui/core/Checkbox";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";

// REDIRECT
// import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    // this.props.loginUser(userData);
    // console.log(userData);

    this.props.loginUser(userData, this.props.history);
    console.log(userData);
    console.log(this.state);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    const loginComponent = (
      <div>
        <div>
          <div>
            <div>
              <Typography
                component="h2"
                variant="display1"
                gutterBottom
                className="activtytitle"
              >
                Login
              </Typography>
            </div>
            <Card raised className="commentForm">
              <form onSubmit={this.onSubmit}>
                <div>
                  <TextField
                    className="registerFormInput"
                    id="outlined-with-placeholder"
                    label="Please enter your Email:"
                    placeholder="email:"
                    margin="normal"
                    variant="outlined"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                </div>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <div>
                  <TextField
                    className="registerFormInput"
                    id="outlined-with-placeholder"
                    label="Please enter your Password:"
                    placeholder="Password:"
                    margin="normal"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />

                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div>
                  <Checkbox value="t&c" color="primary" name="t&c_checkbox" />
                  <span>Remember Me</span>
                </div>
                {/* SUBMIT BUTTON */}
                <div>
                  <button className="loginButton" type="submit" value="Submit">
                    Submit
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
    const noAccountMessage = (
      <div>
        <p className="createAccountText">
          Dont have a MYtinerary account yet? You should create one! Its totally
          free and only takes a minute.
        </p>
        <Link to="/Signup">
          <div className="createAccountLink">Create Account</div>
        </Link>
      </div>
    );
    const socialLogin = (
      <div>
        <Card>
          <div className="loginSocialFlex">
            {/* <LoginGoogle /> */}
            {/* <img
            className="loginSocialBtn"
            alt="logo_image"
            src={require("../images/google1.png")}
          /> */}
            <button className="loginGBtn">Login with Google</button>
            {/* </div>
          <div > */}
            {/* <LoginFacebook />
          <img
            className="loginSocialBtn"
            alt="logo_image"
            src={require("../images/facebook.png")}
          /> */}
            <button className="loginFBtn">Login with Facebook</button>
          </div>
        </Card>
      </div>
    );
    return (
      <div>
        <Navbar />
        {loginComponent}
        {socialLogin}
        {noAccountMessage}
        <BtnHome />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
