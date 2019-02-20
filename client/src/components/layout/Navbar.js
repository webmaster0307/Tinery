import React, { Component } from "react";
// import { NavLink, withRouter } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import { SideNav, SideNavItem, Button, Nav } from "react-materialize";

class Navbar extends Component {
  render() {
    return (
      <div className="white lighten-2">
        <React.Fragment>
          {/* <ul id="slide-out" className="sidenav">
            <li>
              <NavLink to="/">MyTinerary</NavLink>
            </li>
            <li>
              <NavLink to="/cities">Cities</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </ul> */}
          <div className="flexIcons">
            <a href="/" data-target="slide-out" className="">
              {/* <a href="/" data-target="slide-out" className="sidenav-trigger"> */}
              <i className="medium material-icons">person_outline</i>
            </a>
            <a href="/" data-target="slide-out" className="sidenav-trigger">
              <i className="medium material-icons">menu</i>
            </a>
          </div>
        </React.Fragment>
      </div>
    );
  }
}
export default withRouter(Navbar);
