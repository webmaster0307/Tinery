import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import BtnHome from "../components/layout/BtnHome";
import Navbar from "../components/layout/Navbar";
// import Sidenav from "../components/layout/Sidenav";

class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="Home">
        <Navbar />
        {/* <Sidenav /> */}
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

        <div className="flexIcons">
          <div className="">
            <NavLink to="/login">Log In</NavLink>
          </div>
          <div className="">
            <NavLink to="/signup">Create Account</NavLink>
          </div>
        </div>

        <div>
          <BtnHome />
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

export default Home;
