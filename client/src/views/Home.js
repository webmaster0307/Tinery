import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../actions/profileActions";

import { Spring } from "react-spring/renderprops";

import ComplexHomeButton from "../components/layout/ComplexHomeButton";
import CustomButton from "./../components/layout/CustomButton";

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
      <React.Fragment>
        <div className="homeParagraphText">
          • View your favorite Itineraries in the dashboard.
        </div>
        <div className="homeParagraphText">
          • Create your own Itinerary with our CMS.
        </div>
        <div className="homeParagraphText">
          • Browse by #Hashtags & Comment!
        </div>

        <div className="flexIcons">
          <div className="flexLink">
            <NavLink to="/dashboard">
              <CustomButton
                bgcolor={"#039be5"}
                disabled={false}
                title={"Dashboard"}
                type={"Dashboard"}
                size={"large"}
                variant={"extended"}
                value={"submit"}
              />
            </NavLink>
          </div>
          <div className="flexLink">
            <NavLink to="/cms">
              <CustomButton
                bgcolor={"#039be5"}
                disabled={false}
                title={"CMS"}
                type={"CMS"}
                size={"large"}
                variant={"extended"}
                value={"submit"}
              />
            </NavLink>
          </div>
        </div>
      </React.Fragment>
    );
    const logoutState = (
      <React.Fragment>
        <div className="paragraphText">
          • Signup and Login to Unlock all features!
        </div>

        <div className="flexIcons">
          <div className="flexLink">
            <NavLink to="/login">
              <CustomButton
                bgcolor={"#039be5"}
                disabled={false}
                title={"Login"}
                type={"Login"}
                size={"large"}
                variant={"extended"}
                value={"submit"}
              />
            </NavLink>
          </div>
          <div className="flexLink">
            <NavLink to="/signup">
              <CustomButton
                bgcolor={"#039be5"}
                disabled={false}
                title={"Sign Up"}
                type={"Sign Up"}
                size={"large"}
                variant={"extended"}
                value={"submit"}
              />
            </NavLink>
          </div>
        </div>
      </React.Fragment>
    );

    const homepageBody = (
      <div>
        <div>
          <div>
            <img
              className="homeBrand"
              alt="logo_image"
              src={require("../images/client/MYtineraryLogo.png")}
            />
          </div>

          <div className="paragraphText">
            Find your perfect trip, designed by insiders who know and love their
            cities.
          </div>

          <div className="paragraphText">
            <ComplexHomeButton />
          </div>

          {/* TERNERY AUTH LOGIC */}
          {isAuthenticated ? loginState : logoutState}
        </div>
      </div>
    );

    return (
      <React.Fragment>
        {/* ANIMATION TERNERY AUTH LOGIC */}
        {isAuthenticated ? (
          <div>
            {" "}
            <Spring
              from={{ opacity: 0, marginTop: -500 }}
              to={{ opacity: 1, marginTop: 0 }}
              config={{ delay: 0, duration: 500 }}
            >
              {props => <div style={props}>{homepageBody}</div>}
            </Spring>
          </div>
        ) : (
          <div>
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ delay: 500 }}
            >
              {props => <div style={props}>{homepageBody}</div>}
            </Spring>
          </div>
        )}
      </React.Fragment>
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
