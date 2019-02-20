import React, { Component } from "react";
// import PropTypes from "prop-types";
import TextFieldGroup from "../components/TextFieldGroup";
import BtnHome from "../components/layout/BtnHome";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

// import { connect } from 'react-redux';
// import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }

  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(userData);
    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const loginComponent = (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Username:"
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  placeholder="Password:"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />

                <div>Remember Me Checkbox</div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <div>
                <button>Login with Google</button>
              </div>
              <div>
                <button>Login with Facebook</button>
              </div>
              <div>
                <p>
                  Dont have a MYtinerary account yet? You should create one! Its
                  totally free and only takes a minute.
                </p>
                <Link to="/Signup">Create Account</Link>
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

export default Login;
