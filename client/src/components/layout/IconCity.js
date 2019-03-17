import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

class IconCity extends Component {
  render() {
    return (
      <div className="flexIcons">
        <div className="flexLink">
          <Link to="/cities">
            <Icon fontSize="large" className="homeIcon">
              location_city
            </Icon>
            <div className="homepageLinkText">Browse Cities</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default IconCity;
