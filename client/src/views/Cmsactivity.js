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

class Cmsactivity extends Component {
  constructor() {
    super();
    this.state = {
      itineraries: [],
      title: "",
      image: null,
      activitykey: "",
      selectedFile: null,
      previewFile: null
    };
    // this.onChange = this.onChange.bind(this);
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

    //CREATE ACTION
    this.props.createActivity(formData);
    alert("Upload successful");
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
    const previewFile = this.state.previewFile;
    const cmstitle = (
      <React.Fragment>
        <div>
          <Header title={"Create Activities"} />
        </div>
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
            Select Parent Itinerary (Key):
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
      <div>
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
              />
            </div>
            {selectActivity}
          </form>
          <div className="cmsUploadimage">
            Upload Activity Image.
            <input type="file" onChange={this.fileChangedHandler} />
          </div>

          {/* SUBMIT BUTTON */}
          <button className="submitCommentBtn" onClick={this.onSubmit}>
            Upload Activity!
          </button>
        </Card>

        <div className="cmsTitletext">
          <h3>Preview Your Image Below : </h3>
        </div>
      </div>
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
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  itineraries: state.itineraries,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createActivity, fetchItineraries }
)(Cmsactivity);
