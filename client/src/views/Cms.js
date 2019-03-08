import React, { Component } from "react";
import Navbar from "../components/layout/Navbar";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import { connect } from "react-redux";
import axios from "axios";

class cms extends Component {
  state = {
    selectedFile: null,
    previewFile: null,
    name: ""
  };

  // IMAGE INFO

  fileChangedHandler = event => {
    console.log("this file", this.state.selectedFile);
    console.log("this state", this.state);
    this.setState({
      selectedFile: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
  };

  uploadHandler = () => {
    console.log("this file", this.state.selectedFile);
    console.log("this state", this.state);
    const formData = new FormData();
    formData.append("myFile", this.state.selectedFile);
    formData.append("name", this.state.name);
    //     const user = { username: "paco", name: "uno" };
    axios.post("api/image", formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    });
    alert("Upload successful");
  };

  // FORM INFO

  onChange = e => {
    let input = {
      name: this.state.name
    };
    console.log(input);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const previewFile = this.state.previewFile;
    const cms = (
      <div>
        <h2>CMS App</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            {/* <span>Please enter your username:</span> */}
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
          </div>
        </form>
        <input type="file" onChange={this.fileChangedHandler} />
        <button className="submitCommentBtn" onClick={this.uploadHandler}>
          Upload!
        </button>

        <div>
          <h3>See Your Image Below : </h3>
        </div>
      </div>
    );
    const noPreview = (
      <div>
        {/* <div className="addPhoto"> */}
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
        {cms}
        {previewFile === null ? noPreview : preview}
      </React.Fragment>
    );
  }
}

export default cms;
