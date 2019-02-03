import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import HomeButton from "../components/HomeButton";

class Lp1 extends Component {
  render() {
    return (
      <div className="Lp1">
        <div>
          <img
            className="homeBrand"
            alt="logo_image"
            src={require("../images/client/MYtineraryLogo.png")}
          />
        </div>

        <div className="homeP">
          Find your perfect trip, designed by insider who know and love their
          cities.
        </div>

        <div className="homeBrowsing">
          {" "}
          <span>Start Browsing</span>
        </div>

        <div>
          <Link to="/cities">
            <img
              className="homeCircle"
              alt="logo_image"
              src={require("../images/client/circled-right-2.png")}
            />
          </Link>
        </div>

        <div className="homeP bold">Want to build your own MYtinerary?</div>

        <div className="row">
          <div className="col s6 center">
            <NavLink to="/login">Log In</NavLink>
          </div>
          <div className="col s6 center">
            <NavLink to="/signup">Create Account</NavLink>
          </div>
        </div>

        <div>
          <HomeButton />
          {/* <Link to="/">
            <img
              to="/"
              className="homeIcon"
              alt="logo_image"
              src={require("../images/client/homeIcon.png")}
            />
          </Link> */}
        </div>
      </div>
    );
  }
}

export default Lp1;
