import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Navbar = props => {
  return (
    <div className="white lighten-2">
      <React.Fragment>
        <ul>
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
        </ul>
      </React.Fragment>
    </div>
  );
};

export default withRouter(Navbar);
