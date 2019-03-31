import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

class IconHome extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/">
          <Icon fontSize="large" className="homeIcon">
            home
          </Icon>
        </Link>
      </React.Fragment>
    );
  }
}

export default IconHome;
