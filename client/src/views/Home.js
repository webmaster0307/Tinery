import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import IconHome from "../components/layout/IconHome";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../actions/profileActions";

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.getCurrentProfile();
    }
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const loginState = (
      <div className="flexIcons">
        <div className="flexLink">
          <NavLink to="/dashboard">
            {" "}
            <span className="homepageLinkText">Dashboard</span>
          </NavLink>
        </div>
        <div className="flexLink">
          <NavLink onClick={this.onLogoutClick.bind(this)} to="/login">
            <span className="homepageLinkText">Log Out</span>
          </NavLink>
        </div>
      </div>
    );
    const logoutState = (
      <div className="flexIcons">
        <div className="flexLink">
          <NavLink to="/login">
            <span className="homepageLinkText">Log In</span>
          </NavLink>
        </div>
        <div className="flexLink">
          <NavLink to="/signup">
            <span className="homepageLinkText">Create Account</span>
          </NavLink>
        </div>
      </div>
    );

    return (
      <div>
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
          <IconHome />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, getCurrentProfile }
)(Home);
