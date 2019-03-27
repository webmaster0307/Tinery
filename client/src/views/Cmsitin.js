import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createItinerary } from "../actions/cmsActions";
import Header from "../components/layout/Header";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Cmsitin extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      rating: "",
      duration: "",
      price: "",
      author: "",
      // author: this.props.auth.user.username,
      likes: "",
      authorimage: null,
      cityurl: "",
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
      authorimage: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // console.log("this file", this.state.selectedFile);
    // console.log("this state", this.state);
    const formData = new FormData();
    // formData.append("rating", this.state.selectedFile);
    formData.append("title", this.state.title);
    formData.append("rating", this.state.rating);
    formData.append("duration", this.state.duration);
    formData.append("price", this.state.price);
    formData.append("author", this.props.auth.user.username);
    formData.append("likes", this.state.likes);
    formData.append("authorimage", this.state.authorimage);
    formData.append("cityurl", this.state.cityurl);
    formData.append("activitykey", this.state.activitykey);
    // formData.append("hashtag", this.state.hashtag);

    // console.log(formData);
    // console.log(this.state);

    //MIGRATE TO REDUX
    this.props.createItinerary(formData);
    // axios.post("api/cms/itin", formData, {
    //   // onUploadProgress: progressEvent => {
    //   //  console.log(progressEvent.loaded / progressEvent.total);
    //   // }
    // });
    alert("Upload successful");
    this.setState({
      title: "",
      rating: "",
      duration: "",
      price: "",
      likes: "",
      authorimage: null,
      cityurl: "",
      activitykey: ""
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
        .toLowerCase(),
      cityurl: val
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
          <Header title={"Create Itineraries"} />
        </div>
        <div className="cmsTitletext">
          <p>Fill out the form below to create a new city.</p>
          <p>Click on the button below to edit an existing city.</p>
          <div>
            <Button variant="outlined">Edit Itineraries</Button>
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
            {/* <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter Image name:"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div> */}
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter Itinerary Title:"
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
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter Rating out of 5:"
                placeholder=""
                margin="normal"
                variant="filled"
                type="number"
                name="rating"
                value={this.state.rating}
                onChange={this.onChange}
              />
            </div>
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter number of Likes"
                placeholder=""
                margin="normal"
                variant="filled"
                type="number"
                name="likes"
                value={this.state.likes}
                onChange={this.onChange}
              />
            </div>
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter number of Hours"
                placeholder=""
                margin="normal"
                variant="filled"
                type="number"
                name="duration"
                value={this.state.duration}
                onChange={this.onChange}
              />
            </div>
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter Price (USD)"
                placeholder=""
                margin="normal"
                variant="filled"
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.onChange}
              />
            </div>
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter cityurl (snakecase)"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="text"
                name="cityurl"
                value={this.state.cityurl}
                onChange={this.onChange}
              />
            </div>
            {/* <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter hashtags"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="number"
                name="hashtag"
                value={this.state.hashtag}
                onChange={this.onChange}
              />
            </div> */}
          </form>
          <div className="cmsUploadimage">
            Upload Author Image Here.
            <input type="file" onChange={this.fileChangedHandler} />
          </div>
          <button className="submitCommentBtn" onClick={this.onSubmit}>
            Upload Itinerary!
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

Cmsitin.propTypes = {
  createItinerary: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  favid: state.favid,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createItinerary }
)(Cmsitin);
