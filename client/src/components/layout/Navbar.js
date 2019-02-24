import React, { Component } from "react";
// import { NavLink, withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import { clearCurrentProfile } from "../../actions/profileActions";
// import Avatar from "@material-ui/core/Avatar";
import MenuAppBar from "./MenuAppBar";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import Sidenav from "./Sidenav";

//  NAVBAR
// import { withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

// import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormGroup from "@material-ui/core/FormGroup";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    // const { isAuthenticated, user } = this.props.auth;
    // const authLinks = (
    //   <div>
    //     <Link className="nav-link" to="/">
    //       Status : Logged In
    //     </Link>
    //     <br />
    //     <div>
    //       <a
    //         href="/"
    //         onClick={this.onLogoutClick.bind(this)}
    //         className="nav-link"
    //       >
    //         <div>
    //           <Avatar
    //             alt={user.name}
    //             src={user.avatar}
    //             title="You must have a Gravatar connected to your email to display an image"
    //           />
    //         </div>
    //         Status : Logout
    //       </a>
    //     </div>
    //   </div>
    // );
    // const guestLinks = (
    //   <div>
    //     <Link className="nav-link" to="/login">
    //       <AccountCircle />
    //     </Link>
    //     {/* <Avatar
    //       alt={user.name}
    //       src={user.avatar}
    //       title="You must have a Gravatar connected to your email to display an image"
    //     /> */}
    //   </div>
    // );
    return (
      <React.Fragment>
        <MenuAppBar />

        {/* {isAuthenticated ? authLinks : guestLinks} */}
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
