import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class Cmscity extends Component {
  constructor() {
    super();
    this.state = {
      cityname: "",
      flagimg: null,
      country: "",
      url: "",
      // open: false,
      // previewAvatar: null,
      // errors: {},
      selectedFile: null,
      previewFile: null
      // name: ""
    };
  }

  // IMAGE INFO

  fileChangedHandler = event => {
    // console.log("this file", this.state.selectedFile);
    // console.log("this state", this.state);
    this.setState({
      flagimg: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // console.log("this file", this.state.selectedFile);
    // console.log("this state", this.state);
    const formData = new FormData();
    formData.append("cityname", this.state.cityname);
    formData.append("country", this.state.country);
    formData.append("flagimg", this.state.flagimg);
    formData.append("url", this.state.url);
    // console.log(formData);
    // console.log(this.state);
    axios.post("api/cms/city", formData, {});
    alert("Upload successful");
    this.setState({
      cityname: "",
      country: "",
      flagimg: null,
      url: ""
    });
  };

  // FORM INFO

  onChange = e => {
    // let input = {
    //   name: this.state.name
    // };
    // console.log(input);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const previewFile = this.state.previewFile;
    const cmstitle = (
      <div>
        <Typography
          className="city"
          component="h2"
          variant="display2"
          gutterBottom
        >
          Create Your Own City
        </Typography>
        <div>Welcome {this.props.auth.user.username}</div>
      </div>
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
                onChange={this.onChange}
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
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter city name (snake_case):"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.onChange}
              />
            </div>
          </form>
          <div className="cmsImage">
            Upload Country Flag Here.
            <input type="file" onChange={this.fileChangedHandler} />
          </div>
          <button className="submitCommentBtn" onClick={this.onSubmit}>
            Upload City!
          </button>
        </Card>

        <div>
          <h3>Preview Your Image Below : </h3>
        </div>
      </div>
    );
    const noPreview = (
      <div>
        {/* <div className="addPhoto"> */}
        Flag Image
        <div>
          Preview Image
          <CloudUploadIcon />
        </div>
        {/* </div> */}
      </div>
    );
    const preview = (
      <div>
        <img alt="imageuploader" src={this.state.previewFile} />
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

const mapStateToProps = state => ({
  favid: state.favid,
  // errors: state.errors,
  profile: state.profile,
  auth: state.auth
});

Cmscity.propTypes = {
  auth: PropTypes.object
};

export default connect(
  mapStateToProps,
  {}
)(Cmscity);
