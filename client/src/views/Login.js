import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  loginUser,
  registerUser,
  socialRegisterUser
} from "../actions/authActions";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { googleClientID } from "./../keys.js";

import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import Header from "./../components/layout/Header";

import CustomButton from "../components/layout/CustomButton";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";

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
      token: ""
      // loginError: false,
      // redirect: false
    };
  }

  // RE-ENABLE PUSH (REDIRECT)
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

  onFailure = error => {
    alert(error);
  };

  componentClicked = () => console.log("clicked");

  // SUBMIT

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };

    this.props.loginUser(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    const responseFacebook = response => {
      console.log(response);
      let facebookData;
      facebookData = {
        facebookID: response.id,
        email: response.email,
        password: "",
        username: response.name,
        firstname: "",
        lastname: "",
        avatar: response.picture.data.url,
        accesstoken: response.accessToken
      };
      this.props.socialRegisterUser(facebookData);
    };

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
    };

    const loginComponent = (
      <React.Fragment>
        <Header title={"Login"} />
        <div className="itineraryCard">
          {/* START OF FORM */}
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
                    <div className="removePhotoDiv" />
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <div>
                <CustomButton
                  bgcolor={"#039be5"}
                  disabled={false}
                  title={"Submit"}
                  type={"submit"}
                  size={"large"}
                  variant={"extended"}
                  value={"submit"}
                />
              </div>
              <div>*Sign Up or Register using third party services.</div>

              <div className="socialDiv">
                <div>
                  <GoogleLogin
                    clientId={googleClientID}
                    render={renderProps => (
                      <GoogleLoginButton
                        className="googleBtn"
                        alt="googleLogo"
                        onClick={renderProps.onClick}
                        align={"center"}
                      >
                        <span>Google</span>
                      </GoogleLoginButton>
                    )}
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className="googleComponentBtn"
                    theme="dark"
                  />
                </div>
                <div>
                  <FacebookLogin
                    appId="284220635589707"
                    callback={responseFacebook}
                    fields="name,email,picture"
                    render={renderProps => (
                      <FacebookLoginButton
                        className="facebookBtn"
                        alt="facebookLogo"
                        onClick={renderProps.onClick}
                        align={"center"}
                      >
                        <span>Facebook</span>
                      </FacebookLoginButton>
                    )}
                  />
                </div>
              </div>
            </form>
          </Card>
        </div>
      </React.Fragment>
    );
    const noAccountMessage = (
      <div>
        <p className="createAccountText">
          Dont have a MYtinerary account?{" "}
          <Link to="/Signup">
            <span className="createAccountLink">Create an account!</span>
          </Link>{" "}
          Its totally free and only takes a minute.
        </p>
      </div>
    );
    return (
      <div>
        {loginComponent}
        {noAccountMessage}
        <div />
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
