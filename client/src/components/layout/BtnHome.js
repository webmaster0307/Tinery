import React, { Component } from "react";
import { Link } from "react-router-dom";

class BtnHome extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          {/* <i class="large material-icons">insert_chart</i> */}
          <i className="icons medium material-icons">home</i>
          {/* <img
         
         
          alt="logo_image"
          src={require("../images/client/homeIcon.png")}
        /> */}
        </Link>
      </div>
    );
  }
}

export default BtnHome;
