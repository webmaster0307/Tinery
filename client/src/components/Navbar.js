import React from "react";
// import { Link, NavLink, withRouter } from "react-router-dom";
import { NavLink, withRouter } from "react-router-dom";

const Navbar = props => {
  // setTimeout(() => {
  // props.history.push("./about");
  // console.log(props);
  // }, 2000);
  return (
    <div className="white lighten-2">
      <React.Fragment>
        <ul>
          <li>
            <NavLink to="/">MyTinerary</NavLink>
          </li>
          <li>
            <NavLink to="/lp1">Landing Page 1</NavLink>
          </li>
          <li>
            <NavLink to="/lp2">Landing Page 2</NavLink>
          </li>
          <li>
            <NavLink to="/react_exercises">React Exercises</NavLink>
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
