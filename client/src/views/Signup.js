import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

import CustomButton from "../components/layout/CustomButton";
import Header from "./../components/layout/Header";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

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

  // ROUTE LOGIC
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  // ERROR MAPPING
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // T&C CHECKBOX LOGIC
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAgree = () => {
    this.setState(() => ({
      checkbox: true,
      open: false
    }));
  };

  tccheckbox = () => {
    this.setState(() => ({
      checkbox: true,
      open: false
    }));
  };

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

    const checkboxFalseBtn = (
      <CustomButton
        disabled={true}
        color={"primary"}
        title={"Agree to Terms & Conditions"}
        type={"submit"}
        size={"large"}
        variant={"extended"}
        value={"Submit"}
      />
    );

    const checkboxTrueBtn = (
      <CustomButton
        bgcolor={"#039be5"}
        disabled={false}
        color={"primary"}
        title={"Submit"}
        type={"submit"}
        size={"large"}
        variant={"extended"}
        value={"Submit"}
        onClick={this.onSubmit}
      />
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
        <Checkbox disabled color="primary" />
        <span>
          I agree to MYtinerarys{" "}
          <span className="tandc">Terms & Conditions</span>
        </span>
      </div>
    );

    //IMAGE LOGIC
    const noPreview = (
      <React.Fragment>
        <Link to="/login">
          <p className="homepageLinkText">
            *Google & Facebook Registration is Supported.
          </p>
        </Link>

        <div className="registerFormPhototext">Upload Profile Image Below:</div>
        <div className="cmsUploadimage">
          <input type="file" onChange={this.fileChangedHandler} />
        </div>
        <div>
          <p>*Gravatar is Supported.</p>
        </div>
      </React.Fragment>
    );

    const preview = (
      <React.Fragment>
        <div className="previewPhoto">
          <img
            className="previewImage"
            alt="imageuploader"
            src={this.state.previewAvatar}
          />
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
      </React.Fragment>
    );

    const registerForm = (
      <React.Fragment>
        <Header title={"Register"} />
        <div className="itineraryCard">
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
                      className="selectForms"
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
                      Agree
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
      </React.Fragment>
    );

    return <React.Fragment>{registerForm}</React.Fragment>;
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

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));
