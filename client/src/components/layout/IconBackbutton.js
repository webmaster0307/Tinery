import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

class IconBackbutton extends Component {
  render() {
    return (
      <div className="flexIcons">
        <div className="flexLink">
          <Link to="/">
            <Icon fontSize="large" className="homeIcon">
              arrow_back
            </Icon>
            {/* <Icon fontSize="large" className="homeIcon">
              backspace
            </Icon> */}
          </Link>
        </div>
      </div>
    );
  }
}

export default IconBackbutton;
