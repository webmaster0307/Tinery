import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import BtnHome from "../components/layout/BtnHome";
import Navbar from "../components/layout/Navbar";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";

class Home extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const loginState = (
      <div className="flexIcons">
        <div className="flexLink">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
        <div className="flexLink">
          <NavLink onClick={this.onLogoutClick.bind(this)} to="/login">
            Log Out
          </NavLink>
        </div>
      </div>
    );
    const logoutState = (
      <div className="flexIcons">
        <div className="flexLink">
          <NavLink to="/login">Log In</NavLink>
        </div>
        <div className="flexLink">
          <NavLink to="/signup">Create Account</NavLink>
        </div>
      </div>
    );
    // console.log(this.props.auth);
    return (
      <div className="Home">
        <Navbar />
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

        {/* LOGIN STATE LOGIC */}
        {isAuthenticated ? loginState : logoutState}

        <div>
          <BtnHome />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

// export default Home;

export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);
