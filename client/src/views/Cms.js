import React, { Component } from "react";
import Navbar from "../components/layout/Navbar";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
// import { connect } from "react-redux";
import axios from "axios";

class cms extends Component {
  state = { selectedFile: null, previewFile: null };

  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
  };

  uploadHandler = () => {
    console.log("this file", this.state.selectedFile);
    console.log("this state", this.state);
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios.post("api/image", formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    });
  };

  render() {
    const previewFile = this.state.previewFile;
    const cms = (
      <div>
        <h2>CMS App</h2>

        <input type="file" onChange={this.fileChangedHandler} />

        <button onClick={this.uploadHandler}>Upload!</button>
        <div>
          <h3>See Your Image Below : </h3>
          {/* <img
            className="homeBrand"
            alt="logo_image"
            src={this.state.selectedFile}
          /> */}
        </div>
      </div>
    );
    const noPreview = (
      <div>
        <div className="addPhoto">
          <div>
            Preview Image
            <CloudUploadIcon />
          </div>
        </div>
      </div>
    );
    const preview = (
      <div>
        <img
          className="homeBrand"
          alt="logo_image"
          src={this.state.previewFile}
        />
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
