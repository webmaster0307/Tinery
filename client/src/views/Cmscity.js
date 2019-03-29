import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../components/layout/Header";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createCity } from "../actions/cmsActions";

class Cmscity extends Component {
  constructor() {
    super();
    this.state = {
      cityname: "",
      flagimg: null,
      country: "",
      url: "",
      selectedFile: null,
      previewFile: null
    };
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

    //CREATE ACTION
    this.props.createCity(formData);
    alert("Upload successful");
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
    const previewFile = this.state.previewFile;
    const cmstitle = (
      <React.Fragment>
        <div>
          <Header title={"Create Cities"} />
        </div>

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
                label="Please enter City Name:"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="text"
                name="cityname"
                value={this.state.cityname}
                onChange={this.onSnakecase}
              />
            </div>
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
              />
            </div>
          </form>
          <div className="cmsUploadimage">
            Upload Country Flag.
            <input type="file" onChange={this.fileChangedHandler} />
          </div>

          {/* SUBMIT BUTTON */}
          <button className="submitCommentBtn" onClick={this.onSubmit}>
            Upload City!
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

Cmscity.propTypes = {
  createCity: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  favid: state.favid,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createCity }
)(Cmscity);
