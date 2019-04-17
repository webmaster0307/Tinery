import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createCity } from "../actions/cmsActions";

import Header from "../components/layout/Header";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

class Cmscity extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      cityname: "",
      flagimg: null,
      country: "",
      url: "",
      authorid: "",
      selectedFile: null,
      previewFile: null
    };
  }

  // ERROR MAPPING
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // IMAGE INFO
  fileChangedHandler = event => {
    this.setState({
      flagimg: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
  };

  // SUBMIT
  onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cityname", this.state.cityname);
    formData.append("country", this.state.country);
    formData.append("flagimg", this.state.flagimg);
    formData.append("url", this.state.url);
    formData.append("authorid", this.props.auth.user.id);

    //CREATE ACTION
    this.props.createCity(formData);
    // alert("Upload successful");
    this.setState({
      cityname: "",
      country: "",
      flagimg: null,
      previewFile: null,
      url: ""
    });
  };

  // FORM INFO
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //CONVERT TO SNAKE CASE
  onSnakecase = e => {
    var val = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      url: val
        .split(" ")
        .join("_")
        .toLowerCase()
    });
  };

  render() {
    const { errors } = this.state;

    const previewFile = this.state.previewFile;
    const cmstitle = (
      <React.Fragment>
        <Header title={"Create Cities"} />
        <div className="cmsTitletext">
          <p>Fill out the form below to create a new city.</p>
          <p>Or click below to edit an existing city.</p>
          <div>
            <Link to="/cmscity/editcity">
              <Button variant="outlined">Edit Cities</Button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
    const cmsbody = (
      <React.Fragment>
        <div className="itineraryCard">
          <Card raised className="commentForm">
            <form encType="multipart/form-data" onSubmit={this.onSubmit}>
              <div>
                <TextField
                  className="commentFormInput"
                  id="outlined-with-placeholder"
                  label="Please enter City Name:"
                  placeholder=""
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="cityname"
                  value={this.state.cityname}
                  onChange={this.onSnakecase}
                  errorform={errors.cityname}
                />
              </div>
              {errors.cityname && (
                <div className="invalid-feedback">{errors.cityname}</div>
              )}
              <div>
                <TextField
                  className="commentFormInput"
                  id="outlined-with-placeholder"
                  label="Please enter City Country:"
                  placeholder=""
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  errorform={errors.country}
                />
              </div>
              {errors.country && (
                <div className="invalid-feedback">{errors.country}</div>
              )}
            </form>
            <div className="cmsUploadimage">
              Upload City Cover Image.
              <input type="file" onChange={this.fileChangedHandler} />
            </div>

            {/* SUBMIT BUTTON VALIDATION */}
            {this.state.flagimg === null ||
            !this.state.cityname ||
            !this.state.country ? (
              <React.Fragment>
                <div className="cmsAction">
                  <Button variant="outlined" color="primary" disabled>
                    Create City!<Icon>save</Icon>
                  </Button>
                </div>
                <div>
                  <p className="cmsimagerequired">
                    *Fill out Form to enable Create City.
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
                    Create City!<Icon>save</Icon>
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

Cmscity.propTypes = {
  createCity: PropTypes.func,
  auth: PropTypes.object,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities,
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createCity }
)(Cmscity);
