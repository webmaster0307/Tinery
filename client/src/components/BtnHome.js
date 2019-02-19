import React, { Component } from "react";
import { Link } from "react-router-dom";

class BtnHome extends Component {
  render() {
    return (
      <Link to="/">
        <img
          to="/"
          className="homeIcon"
          alt="logo_image"
          src={require("../images/client/homeIcon.png")}
        />
      </Link>
    );
  }
}

export default BtnHome;
