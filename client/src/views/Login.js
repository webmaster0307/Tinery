import React, { Component } from "react";
import PropTypes from "prop-types";
// import TextFieldGroup from "../components/TextFieldGroup";
import BtnHome from "../components/layout/BtnHome";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

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

  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

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
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>

              <form onSubmit={this.onSubmit}>
                <div>
                  <input
                    className="forminput"
                    type="text"
                    placeholder="email:"
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
                  <input
                    className="forminput"
                    type="password"
                    placeholder="Password:"
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
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </div>
              </form>

              <div>
                <Button>Login with Google</Button>
              </div>

              <div>
                <Button>Login with Facebook</Button>
              </div>

              <div>
                <p>
                  Dont have a MYtinerary account yet? You should create one! Its
                  totally free and only takes a minute.
                </p>
                <Link to="/Signup">
                  <span className="tandc">Create Account</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <Navbar />
        {loginComponent}
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
