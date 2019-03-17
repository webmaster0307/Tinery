import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

import IconHome from "../components/layout/IconHome";

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
// import TextFieldGroup from "../components/TextFieldGroup";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";

import Input from "@material-ui/core/Input";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
// import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

// import axios from "axios";

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
      avatar: null,
      country: "",
      open: false,
      previewAvatar: null,
      errors: {},
      checkbox: false
    };
    this.tccheckbox = this.tccheckbox.bind(this);
  }

  // T&C LOGIC

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAgree = () => {
    this.setState(state => ({
      checkbox: true,
      open: false
    }));
  };

  tccheckbox = () => {
    this.setState(state => ({
      // checkbox: !state.checkbox,
      checkbox: true,
      open: false
    }));
  };

  // ROUTE LOGIC

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // REMOVE IMAGE

  removeImage = event => {
    this.setState({
      avatar: null,
      previewAvatar: null
    });
  };

  // IMAGE METHODS
  fileChangedHandler = event => {
    this.setState({
      avatar: event.target.files[0],
      previewAvatar: URL.createObjectURL(event.target.files[0])
    });
  };

  // FORM EVENT HANDLER

  onChange = e => {
    // let input = {
    //   name: this.state.name
    // };
    // console.log(input);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // FORM SUBMIT

  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", this.state.avatar);
    formData.append("username", this.state.username);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("password2", this.state.password2);
    formData.append("firstname", this.state.firstname);
    formData.append("lastname", this.state.lastname);
    formData.append("country", this.state.country);

    this.props.registerUser(formData, this.props.history);
  };

  render() {
    const previewAvatar = this.state.previewAvatar;
    const { errors } = this.state;
    // const { user } = this.props.auth;

    const checkboxFalseBtn = (
      <div>
        <button
          disabled
          className="loginButtonDisabled"
          type="submit"
          value="Submit"
        >
          Agree to Terms & Conditions
        </button>
      </div>
    );

    const checkboxTrueBtn = (
      <div>
        <button
          className="loginButton"
          onClick={this.onSubmit}
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </div>
    );

    const checkboxFalse = (
      <div>
        <Checkbox
          value="t&c"
          color="primary"
          name="t&c_checkbox"
          onClick={this.tccheckbox}
        />

        <span>
          I agree to MYtinerarys{" "}
          <span className="tandc" onClick={this.handleClickOpen}>
            Terms & Conditions
          </span>
        </span>
      </div>
    );

    const checkboxTrue = (
      <div>
        <Checkbox disabled />

        <span>
          I agree to MYtinerarys{" "}
          <span className="tandc">Terms & Conditions</span>
        </span>
      </div>
    );

    //IMAGE LOGIC

    const noPreview = (
      <Card className="commentForm">
        <div className="addPhoto">
          <div>
            <CloudUploadIcon />
            <Input
              id="contained-button-file"
              type="file"
              label="Add Photo"
              accept="image/*"
              name="avatar"
              onChange={this.fileChangedHandler}
              errorform={errors.avatar}
            />
            {/* {errors.avatar && (
              <div className="invalid-feedback">{errors.avatar}</div>
            )} */}
          </div>
        </div>
        <div>
          <p>*Gravatar is Supported.</p>
          <Link to="/login">
            <p className="homepageLinkText">
              *Google Registration is Supported.
            </p>
          </Link>
        </div>
      </Card>
    );

    const preview = (
      <Card className="commentForm">
        <div className="previewPhoto">
          {/* <div className="previewPhotoContainer"> */}
          <img
            className="previewImage"
            alt="imageuploader"
            src={this.state.previewAvatar}
          />
          {/* </div> */}
        </div>
        <div className="removePhotoDiv">
          <Button
            className="removePhoto"
            onClick={this.removeImage}
            variant="contained"
          >
            Remove Image
            <DeleteIcon />
          </Button>
        </div>
      </Card>
    );

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
            <form
              encType="multipart/form-data"
              noValidate
              onSubmit={this.onSubmit}
            >
              {previewAvatar === null ? noPreview : preview}

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
                  errorform={errors.username}
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
                  errorform={errors.password}
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
                errorform={errors.password2}
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
                  errorform={errors.email}
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
                  errorform={errors.firstname}
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
                  errorform={errors.lastname}
                />
                {errors.lastname && (
                  <div className="invalid-feedback">{errors.lastname}</div>
                )}
              </div>
              <div>
                <div>
                  <FormControl variant="filled">
                    <InputLabel htmlFor="filled-country-simple">
                      Country:
                    </InputLabel>
                    <Select
                      className="selectCountry"
                      value={this.state.country}
                      onChange={this.onChange}
                      errorform={errors.country}
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
                  </FormControl>
                </div>
              </div>
              {errors.country && (
                <div className="invalid-feedback">{errors.country}</div>
              )}

              {/* T&C CHECKBOX */}
              <div>
                {this.state.checkbox === false ? checkboxFalse : checkboxTrue}
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
                    <Fab
                      className="confirmFabButton"
                      variant="extended"
                      size="medium"
                      color="primary"
                      onClick={this.handleCloseAgree}
                    >
                      {/* <Button color="primary"> */}
                      Agree
                      {/* </Button> */}
                    </Fab>
                    <Button onClick={this.handleClose} color="primary">
                      Disagree
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              {/* SUBMIT BUTTON */}
              <div>
                {this.state.checkbox === false
                  ? checkboxFalseBtn
                  : checkboxTrueBtn}
              </div>
            </form>
          </Card>
        </div>
      </div>
    );

    return (
      <div>
        {registerForm}
        <IconHome />
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
