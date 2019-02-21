import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
// import TextFieldGroup from "../components/TextFieldGroup";
import BtnHome from "../components/layout/BtnHome";
import Navbar from "../components/layout/Navbar";

// import classnames from "classnames";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import FilledInput from "@material-ui/core/FilledInput";
// import Input from "@material-ui/core/Input";
// import FormHelperText from "@material-ui/core/FormHelperText";

// import { Row, input, Modal, Card } from "react-materialize";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
      open: false,
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

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
    this.props.registerUser(newUser, this.props.history);
    console.log(newUser);
    console.log(this.state);
  };

  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth;
    // console.log(user);
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
                label="Add Photo"
                type="file"
                name="avatar"
                accept="image"
                value={this.state.avatar}
                onChange={this.onChange}
                error={errors.avatar}
              />
            </div>
            <div>
              <input
                className="forminput"
                type="text"
                placeholder="Username:"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                error={errors.username}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div>
              <input
                className="forminput"
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <input
              className="forminput"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
            <div>
              <input
                className="forminput"
                type="email"
                placeholder="Email:"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div>
              <input
                className="forminput"
                type="text"
                placeholder="First Name:"
                name="firstname"
                value={this.state.firstname}
                onChange={this.onChange}
                error={errors.firstname}
              />
              {errors.firstname && (
                <div className="invalid-feedback">{errors.firstname}</div>
              )}
            </div>
            <div>
              <input
                className="forminput"
                type="text"
                placeholder="Last Name:"
                name="lastname"
                value={this.state.lastname}
                onChange={this.onChange}
                error={errors.lastname}
              />
              {errors.lastname && (
                <div className="invalid-feedback">{errors.lastname}</div>
              )}
            </div>
            {/* <FormControl variant="filled">
              <InputLabel htmlFor="component-filled">Name</InputLabel>
              <FilledInput
                id="component-filled"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Name</InputLabel>
              <Input
                id="component-simple"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormControl> */}

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
            <div>
              <select
                className="forminput"
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
            </div>
            {/* {errors.country && (
                <div className="invalid-feedback">{errors.country}</div>
              )} */}
            <div>
              <Checkbox value="t&c" color="primary" name="t&c_checkbox" />
              {/* <input
                  name="t&c_checkbox"
                  type="checkbox"
                  value=" "
                  label=" "
                  className="filled-in"
                /> */}
              <span>
                I agree to MYtinerarys{" "}
                <span className="tandc" onClick={this.handleClickOpen}>
                  Terms & Conditions
                </span>
              </span>
            </div>
            {/* MODAL */}
            <div>
              <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  {"MYtinerary Terms & Conditions"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Let MYtinerary help apps determine location. This means
                    sending anonymous data to MYtinerary, even when no apps are
                    running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            {/* SUBMIT BUTTON */}
            <div>
              <input type="submit" className="" />
            </div>
            {/* SUBMIT BUTTON 2*/}
            {/* <div>
              <Button variant="contained" color="secondary" disabled>
                Submit
              </Button>
            </div> */}
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

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// export default Signup;
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));
