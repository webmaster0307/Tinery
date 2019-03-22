import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

class IconHome extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <div className="flexIcons"> */}
        <div className="flexLink">
          <Link to="/">
            <Icon fontSize="large" className="homeIcon">
              home
            </Icon>
          </Link>
        </div>
        {/*   </div> */}
      </React.Fragment>
    );
  }
}

export default IconHome;
