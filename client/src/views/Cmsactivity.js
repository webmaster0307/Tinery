import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createActivity } from "../actions/cmsActions";
import { fetchItineraries } from "../actions/itinerariesActions";
import { Link } from "react-router-dom";

import Header from "../components/layout/Header";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";

class Cmsactivity extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      itineraries: [],
      title: "",
      image: null,
      activitykey: "",
      authorid: "",
      selectedFile: null,
      previewFile: null
    };
    // this.onChange = this.onChange.bind(this);
  }

  // ERROR MAPPING
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.props.fetchItineraries();
  }

  // IMAGE INFO
  fileChangedHandler = event => {
    this.setState({
      image: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
  };

  //SUBMIT
  onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("activitykey", this.state.activitykey);
    formData.append("image", this.state.image);
    formData.append("authorid", this.props.auth.user.id);

    //CREATE ACTION
    this.props.createActivity(formData);
    // alert("Upload successful");
    this.setState({
      title: "",
      activitykey: "",
      image: null,
      selectedFile: null,
      previewFile: null
    });
  };

  // FORM INFO
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.state;

    const previewFile = this.state.previewFile;
    const cmstitle = (
      <React.Fragment>
        <Header title={"Create Activities"} />
        <div className="cmsTitletext">
          <p>Fill out the form below to create a new Activity.</p>
          <p>Or click below to edit an existing activity.</p>
          <div>
            <Link to="/cmsactivity/editactivity">
              <Button variant="outlined">Edit Activities</Button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );

    const selectActivity = (
      <React.Fragment>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-itin-simple">
            Select Itinerary:
          </InputLabel>
          <Select
            className="selectForms"
            value={this.state.activitykey}
            onChange={this.onChange}
            type="select"
            name="activitykey"
            input={<FilledInput name="activitykey" id="filled-itin-simple" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.itineraries.itineraries.map(itin => {
              let cityName = itin.cityurl
                .split("_")
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
              return (
                <MenuItem key={itin._id} value={itin.activitykey}>
                  {itin.title} - {cityName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </React.Fragment>
    );

    const cmsbody = (
      <React.Fragment>
        <div className="itineraryCard">
          <Card raised className="commentForm">
            <form
              encType="multipart/form-data"
              noValidate
              onSubmit={this.onSubmit}
            >
              <div>
                <TextField
                  className="commentFormInput"
                  id="outlined-with-placeholder"
                  label="Please enter Activity Title:"
                  placeholder=""
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  errorform={errors.title}
                />
              </div>
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
              {selectActivity}
            </form>
            <div className="cmsUploadimage">
              Upload Activity Image.
              <input type="file" onChange={this.fileChangedHandler} />
            </div>

            {/* SUBMIT BUTTON VALIDATION */}
            {this.state.image === null ||
            !this.state.title ||
            !this.state.activitykey ? (
              <React.Fragment>
                <div className="cmsAction">
                  <Button variant="outlined" color="primary" disabled>
                    Create Activity!<Icon>save</Icon>
                  </Button>
                </div>
                <div>
                  <p className="cmsimagerequired">
                    *Fill out Form to enable Create Activity.
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="cmsAction">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onSubmit}
                    value="Submit"
                  >
                    Create Activity!<Icon>save</Icon>
                  </Button>
                </div>
              </React.Fragment>
            )}
          </Card>

          <div className="cmsTitletext">
            <h3>Preview Your Image Below : </h3>
          </div>
        </div>
      </React.Fragment>
    );
    const noPreview = (
      <div>
        <Card />
      </div>
    );
    const preview = (
      <div>
        <Card raised>
          <div className="cmsImageDiv">
            <img alt="cmsImage" src={this.state.previewFile} />
          </div>
        </Card>
      </div>
    );

    return (
      <React.Fragment>
        {cmstitle}
        {cmsbody}
        {previewFile === null ? noPreview : preview}
      </React.Fragment>
    );
  }
}

Cmsactivity.propTypes = {
  createActivity: PropTypes.func,
  fetchItineraries: PropTypes.func,
  auth: PropTypes.object,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  itineraries: state.itineraries,
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createActivity, fetchItineraries }
)(Cmsactivity);
