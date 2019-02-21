import React, { Component } from "react";
// import { NavLink, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import { clearCurrentProfile } from "../../actions/profileActions";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 160,
    height: 160
  }
};

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <div>
        <Link className="nav-link" to="//">
          Status : Logged In
        </Link>
        <br />
        <div>
          <a
            href="/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <div>
              <Avatar
                alt={user.name}
                src={user.avatar}
                className={styles.avatar}
                title="You must have a Gravatar connected to your email to display an image"
              />
              {/* <Avatar
                alt={user.name}
                src={user.avatar}
                className={styles.bigAvatar}
                title="You must have a Gravatar connected to your email to display an image"
              /> */}
            </div>
            Status : Logout
          </a>
        </div>
      </div>
    );
    const guestLinks = (
      <Link className="nav-link" to="/login">
        Not Logged In
      </Link>
    );
    return (
      <React.Fragment>
        <div>1. Profile Icon</div>
        <div>2. Hamburger Menu Icon</div>
        {isAuthenticated ? authLinks : guestLinks}
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// export default connect(
//   mapStateToProps,
//   { logoutUser, clearCurrentProfile }
// )(Navbar);
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

// export default withRouter(Navbar);
