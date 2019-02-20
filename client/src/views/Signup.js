import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { registerUser } from '../../actions/authActions';
// import TextFieldGroup from "../components/TextFieldGroup";
import BtnHome from "../components/layout/BtnHome";
import Navbar from "../components/layout/Navbar";
import axios from "axios";
// import classnames from "classnames";

// import { Row, input, Modal, Card } from "react-materialize";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      firstname: "",
      lastname: "",
      avatar: "",
      country: "",
      // country: [
      //   "UK",
      //   "Spain",
      //   "France",
      //   "Germany",
      //   "Netherlands",
      //   "Ireland",
      //   "Spain",
      //   "USA"
      // ],
      errors: {}
    };
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      country: this.state.country,
      avatar: this.state.avatar
    };
    console.log(newUser);
    axios
      .post("/api/user/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));

    // this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const registerForm = (
      <div className="register">
        <div className="container">
          <div>
            <h1 className="">Create Account</h1>
          </div>

          <form noValidate onSubmit={this.onSubmit}>
            <div className="addPhoto">
              {/* <input type="file" label="File" /> */}
              {/* <input /> */}
              {/* <input type="file" label="Add Photo" s={12} name="avatar" /> */}
              {/* <i className="small material-icons">add_a_photo</i> */}
              {/* 
                <input
                  className="btn btn-block mt-4"
                  type="file"
                  label="Add Photo"
                  name="avatar"
                  s={12}
                /> */}
              Add Photo
              <input
                s={4}
                label="Add Photo"
                type="file"
                name="avatar"
                accept="image"
                value={this.state.avatar}
                onChange={this.onChange}
                error={errors.avatar}
              />
            </div>

            <input
              type="text"
              placeholder="Username:"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
              icon="person"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
              icon="security"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
              icon="security"
            />
            <input
              type="email"
              placeholder="Email:"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              icon="email"
              info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
            />
            <input
              type="text"
              placeholder="First Name:"
              name="firstname"
              value={this.state.firstname}
              onChange={this.onChange}
              error={errors.firstname}
              icon="person"
            />
            <input
              type="text"
              placeholder="Last Name:"
              name="lastname"
              value={this.state.lastname}
              onChange={this.onChange}
              error={errors.lastname}
              icon="person"
            />

            {/* <input
              s={6}
              type="select"
              name="country"
              value={this.state.country}
              onChange={this.onChange}
              error={errors.country}
              icon="map"
            >
              <option value="">Choose Country</option>
              <option value="Spain">Spain</option>
              <option value="UK">UK</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Ireland">Ireland</option>
              <option value="USA">USA</option>
            </input> */}

            <select
              type="select"
              name="country"
              value={this.state.country}
              onChange={this.onChange}
              error={errors.country}
            >
              <option value="">Choose Country</option>
              <option value="Spain">Spain</option>
              <option value="UK">UK</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Ireland">Ireland</option>
              <option value="USA">USA</option>
            </select>

            <div>
              <input
                name="t&c_checkbox"
                type="checkbox"
                value=" "
                label=" "
                className="filled-in"
              />
              <div>
                <span>
                  I agree to MYtinerarys{" "}
                  <span className="tandc">Terms & Conditions</span>
                </span>
                {/* <Modal
                    header="Modal Header"
                    id="foo"
                    bottomSheet
                    trigger={
                      <span>
                        I agree to MYtinerarys{" "}
                        <span className="tandc">Terms & Conditions</span>
                      </span>
                    }
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </Modal> */}
              </div>
            </div>

            <input type="submit" className="btn btn-block mt-4" />
          </form>
        </div>
      </div>
    );
    return (
      <div>
        <Navbar />
        {registerForm}
        <BtnHome />
      </div>
    );
  }
}

// Signup.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

export default Signup;

// export default connect(
//   mapStateToProps,
//   { registerUser }
// )(withRouter(Register));
