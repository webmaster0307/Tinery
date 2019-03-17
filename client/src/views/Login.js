import React, { Component } from "react";
import PropTypes from "prop-types";
// import TextFieldGroup from "../components/TextFieldGroup";
import IconHome from "../components/layout/IconHome";

// import LoginFacebook from "../components/LoginFacebook";
// import LoginGoogle from "../components/LoginGoogle";
// import { FacebookLogout } from "react-facebook-logout";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  loginUser,
  registerUser,
  socialRegisterUser
} from "../actions/authActions";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";

// import TwitterLogin from "react-twitter-auth";
// import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
// import { GoogleLogout } from "react-google-login";

import { googleClientID } from "./../keys.js";
// import { PostData } from "../actions/utils/PostData";
// import { CircularProgress } from "@material-ui/core";

// REDIRECT
// import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      avatar: "",
      firstname: "",
      lastname: "",
      errors: {},
      isAuthenticated: false,
      user: null,
      token: "",
      loginError: false,
      redirect: false
    };
  }

  // RE-ENABLE PUSH (REDIRECT)
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
      // console.log(this.props.history);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
      // console.log(this.props.history);
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // LOGOUT

  logout = () => {
    this.setState({
      isAuthenticated: false,
      token: "",
      user: null,
      isLoggedIn: false,
      userID: "",
      name: "",
      email: "",
      picture: ""
    });
  };

  // logoutGoogle = response => {
  // console.log(response);

  //   this.setState({
  //     isLoggedIn: false,
  //     isAuthenticated: false,
  //     token: "",
  //     user: "",
  //     userID: "",
  //     name: "",
  //     email: "",
  //     picture: ""
  //   });
  // };

  onFailure = error => {
    alert(error);
  };

  // SUBMIT

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };

    // this.props.loginUser(userData);
    // console.log(userData);

    this.props.loginUser(userData, this.props.history);
    // this.props.registerUser(userData);
    // console.log(userData);
    // console.log(this.state);
    // console.log(this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    //FACEBOOK LOGIN
    // console.log(this.props);
    // console.log(this.state);
    // const responseFacebook = response => {
    //   // console.log(this.props.history);
    //   // console.log(this.props);
    //   let facebookData;
    //   facebookData = {
    //     facebookID: response.id,
    //     email: response.email,
    //     password: "",
    //     username: response.name,
    //     firstname: "",
    //     lastname: "",
    //     avatar: response.picture.data.url,
    //     accesstoken: response.accessToken
    //   };
    //   // this.props.socialRegisterUser(facebookData);
    //   // console.log("facebook console");
    //   // console.log(response);
    //   // console.log("username", response.name);
    //   // console.log("email", response.email);
    //   // console.log("avatar", response.picture.data.url);
    //   // console.log("id", response.id);
    //   // console.log("accesstoken", response.accessToken);
    //   console.log(facebookData);
    // };

    const responseGoogle = response => {
      let googleData;
      googleData = {
        googleID: response.profileObj.googleId,
        email: response.profileObj.email,
        password: "",
        username: response.profileObj.name,
        firstname: response.profileObj.givenName,
        lastname: response.profileObj.familyName,
        avatar: response.profileObj.imageUrl,
        accesstoken: response.accessToken
      };
      this.props.socialRegisterUser(googleData);
      // console.log(this.state);
    };
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
                    errorform={errors.email}
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
                    errorform={errors.password}
                  />

                  {errors.password && (
                    <div>
                      <div className="invalid-feedback">{errors.password}</div>
                      <div className="removePhotoDiv">
                        {/* <Button className="removePhoto" variant="contained">
                          Reset Password
                        </Button> */}
                      </div>
                    </div>
                  )}
                </div>
                {/* REMEMBER ME CHECKBOX */}
                {/* <div>
                  <Checkbox value="t&c" color="primary" name="t&c_checkbox" />
                  <span>Remember Me</span>
                </div> */}
                {/* SUBMIT BUTTON */}
                <div>
                  <button className="loginButton" type="submit" value="Submit">
                    Submit
                  </button>
                </div>
                <div>Sign Up or Register using third party services.</div>
                <div className="googleDiv">
                  <GoogleLogin
                    clientId={googleClientID}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className="googleComponentBtn"
                    theme="dark"
                  />
                  {/* <GoogleLogin
                    clientId="24280000651-bvmpenmvj4p7dila2kni75utafi5sqc4.apps.googleusercontent.com"
                    render={renderProps => (
                      <button
                        onClick={renderProps.onClick}
                        className="loginGBtn"
                      >
                        Login with Google
                      </button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className="googleComponent"
                  /> */}
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
    // const socialLogin = (
    //   <div>
    //     <Card>
    //       {/* <div className="loginSocialFlex"> */}
    //       <div>
    //         <div>
    //           {/* <GoogleLogout
    //               buttonText="Logout"
    //               onLogoutSuccess={this.logoutGoogle}
    //             /> */}
    //           {/* <FacebookLogin
    //       appId="284220635589707"
    //       autoLoad={false}
    //       fields="name,email,picture"
    //       callback={responseFacebook}
    //     /> */}
    //         </div>
    //         {/* <div> */}
    //         {/* <button className="loginGBtn">Login with Google</button>
    //           <button className="loginFBtn">Login with Facebook</button> */}
    //         {/* </div> */}
    //       </div>
    //     </Card>
    //   </div>
    // );
    return (
      <div>
        {loginComponent}
        {/* {socialLogin} */}
        {noAccountMessage}
        <IconHome />
      </div>
    );
  }
}

Login.propTypes = {
  registerUser: PropTypes.func.isRequired,
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
  { loginUser, registerUser, socialRegisterUser }
)(Login);
