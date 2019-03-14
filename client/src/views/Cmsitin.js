import React, { Component } from "react";
import Navbar from "../components/layout/Navbar";

import { connect } from "react-redux";
import axios from "axios";

// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
    console.log("this file", this.state.selectedFile);
    console.log("this state", this.state);
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

    console.log(formData);
    console.log(this.state);
    axios.post("api/cms/itin", formData, {
      // onUploadProgress: progressEvent => {
      //   console.log(progressEvent.loaded / progressEvent.total);
      // }
    });
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
          Create Your Own Itinerary
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
          <div className="cmsImage">
            <input type="file" onChange={this.fileChangedHandler} />
          </div>
          <button className="submitCommentBtn" onClick={this.onSubmit}>
            Upload Itinerary!
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
        Author Image
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
)(Cmsitin);
