import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

class IconCity extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/cities">
          <Icon fontSize="large" className="homeIcon">
            location_city
          </Icon>
        </Link>
      </React.Fragment>
    );
  }
}

export default IconCity;
