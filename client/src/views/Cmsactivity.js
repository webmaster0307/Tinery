import React, { Component } from "react";
import Navbar from "../components/layout/Navbar";

import { connect } from "react-redux";
import axios from "axios";

// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class Cmsactivity extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      image: null,
      activitykey: "",
      hashtag: "",
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
    console.log("this file", this.state.selectedFile);
    console.log("this state", this.state);
    this.setState({
      image: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // console.log("this file", this.state.selectedFile);
    // console.log("this state", this.state);
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("activitykey", this.state.activitykey);
    formData.append("image", this.state.image);
    console.log(formData);
    console.log(this.state);
    axios.post("api/cms/activity", formData, {});
    alert("Upload successful");
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
          Create Your Own Activity
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
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter activity key (snake_case):"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="text"
                name="activitykey"
                value={this.state.activitykey}
                onChange={this.onChange}
              />
            </div>
          </form>
          <div className="cmsImage">
            <input type="file" onChange={this.fileChangedHandler} />
          </div>
          <button className="submitCommentBtn" onClick={this.onSubmit}>
            Upload Activity!
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
        Activity Image
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
        <Navbar />
        {cmstitle}
        {cmsbody}

        {previewFile === null ? noPreview : preview}
      </React.Fragment>
    );
  }
}

// export default cms;

const mapStateToProps = state => ({
  favid: state.favid,
  // errors: state.errors,
  profile: state.profile,
  auth: state.auth,
  itinID: state.itinID
});

// export default Dashboard;

export default connect(
  mapStateToProps,
  {}
)(Cmsactivity);
