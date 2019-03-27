import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createActivity } from "../actions/cmsActions";
import Header from "../components/layout/Header";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    // console.log(formData);
    // console.log(this.state);

    //MIGRATE TO REDUX
    this.props.createActivity(formData);
    // axios.post("api/cms/activity", formData, {});
    alert("Upload successful");
    this.setState({
      title: "",
      activitykey: "",
      image: null
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
      activitykey: val
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
          <Header title={"Create Activities"} />
        </div>
        <div className="cmsTitletext">
          <p>Fill out the form below to create a new city.</p>
          <p>Click on the button below to edit an existing city.</p>
          <div>
            <Button variant="outlined">Edit Activities</Button>
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
          <div className="cmsUploadimage">
            Upload Activity Image Here.
            <input type="file" onChange={this.fileChangedHandler} />
          </div>
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
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  favid: state.favid,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createActivity }
)(Cmsactivity);
