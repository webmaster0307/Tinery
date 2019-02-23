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

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";

import Input from "@material-ui/core/Input";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import FilledInput from "@material-ui/core/FilledInput";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import Icon from "@material-ui/core/Icon";

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
            <Typography
              component="h2"
              variant="display1"
              gutterBottom
              className="activtytitle"
            >
              Register
            </Typography>
          </div>

          {/* START OF FORM */}
          <Card raised className="commentForm">
            <form noValidate onSubmit={this.onSubmit}>
              {/* UPLOAD PHOTO */}
              <div className="addPhoto">
                <div>
                  <CloudUploadIcon />

                  {/* <input
                    accept="image/*"
                    id="outlined-button-file"
                    multiple
                    type="file"
                  /> */}
                  {/* <label htmlFor="outlined-button-file">
                  <Button variant="outlined" component="span">
                    Upload
                  </Button>
                </label>*/}
                  <Input
                    id="contained-button-file"
                    type="file"
                    label="Add Photo"
                    accept="image/*"
                    name="avatar"
                    value={this.state.avatar}
                    onChange={this.onChange}
                    error={errors.avatar}
                  />
                  {errors.avatar && (
                    <div className="invalid-feedback">{errors.avatar}</div>
                  )}
                </div>
              </div>
              {/* <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span">
                    Upload
                    <CloudUploadIcon />
                  </Button>
                </label> */}

              {/* <div className="photoAvatar"> */}
              {/* <input type="file" label="File" /> */}
              {/* <input /> */}
              {/* <input type="file" label="Add Photo" s={12} name="avatar" /> */}
              {/* <i className="small material-icons">add_a_photo</i> */}
              {/* <input type="file" label="Add Photo" name="avatar" />
                Add Photo
                <TextField
                  label="Add Photo"
                  type="file"
                  name="avatar"
                  accept="image"
                  value={this.state.avatar}
                  onChange={this.onChange}
                  error={errors.avatar}
                /> */}
              {/* </div> */}

              {/* START OF REST OF FORM */}
              <div>
                <TextField
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="Username:"
                  margin="normal"
                  variant="outlined"
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
                <TextField
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="Password:"
                  margin="normal"
                  variant="outlined"
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
              <TextField
                className="registerFormInput"
                id="outlined-with-placeholder"
                label="Confirm Password:"
                margin="normal"
                variant="outlined"
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
                <TextField
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="Email:"
                  margin="normal"
                  variant="outlined"
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
                <TextField
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="First Name:"
                  margin="normal"
                  variant="outlined"
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
                <TextField
                  className="registerFormInput"
                  id="outlined-with-placeholder"
                  label="Last Name:"
                  margin="normal"
                  variant="outlined"
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
              <div>
                <div>
                  <Select
                    native
                    className="selectCountry"
                    type="select"
                    name="country"
                    label="Country:"
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
                  </Select>
                  {errors.country && (
                    <div className="invalid-feedback">{errors.country}</div>
                  )}
                </div>
                <div>
                  {/* NEW FORM */}
                  {/* <FormControl>
                    <Select
                      value={this.state.country}
                      onChange={this.onChange}
                      error={errors.country}
                      displayEmpty
                      name="country"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Spain">Spain</MenuItem>
                      <MenuItem value="UK">UK</MenuItem>
                      <MenuItem value="France">France</MenuItem>
                      <MenuItem value="Germany">Germany</MenuItem>
                      <MenuItem value="Netherlands">Netherlands</MenuItem>
                      <MenuItem value="Ireland">Ireland</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                    </Select>
                  </FormControl> */}

                  {/* NEW FORM 2*/}
                  {/* <FormControl variant="filled">
                    <InputLabel htmlFor="filled-country-simple">
                      Country:
                    </InputLabel>
                    <Select
                      className="selectCountry"
                      value={this.state.country}
                      onChange={this.onChange}
                      error={errors.country}
                      type="select"
                      name="country"
                      input={
                        <FilledInput
                          name="country"
                          id="filled-country-simple"
                        />
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Spain">Spain</MenuItem>
                      <MenuItem value="UK">UK</MenuItem>
                      <MenuItem value="France">France</MenuItem>
                      <MenuItem value="Germany">Germany</MenuItem>
                      <MenuItem value="Netherlands">Netherlands</MenuItem>
                      <MenuItem value="Ireland">Ireland</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                    </Select>
                  </FormControl> */}
                </div>
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
                      sending anonymous data to MYtinerary, even when no apps
                      are running.
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
                {/* <input type="submit" className="" /> */}
                <button className="loginButton" type="submit" value="Submit">
                  Submit
                </button>
              </div>
              {/* SUBMIT BUTTON 2*/}
              {/* <div>
              <Button variant="contained" color="secondary" disabled>
                Submit
              </Button>
            </div> */}
            </form>
          </Card>
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
