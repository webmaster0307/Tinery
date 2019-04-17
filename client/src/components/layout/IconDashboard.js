import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

class IconDashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/dashboard">
          <Icon fontSize="large" className="homeIcon">
            dashboard
          </Icon>
        </Link>
      </React.Fragment>
    );
  }
}

export default IconDashboard;
