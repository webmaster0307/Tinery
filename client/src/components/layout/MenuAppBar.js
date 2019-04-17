import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";

class MenuAppBar extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = open => () => {
    this.setState({
      left: open
    });
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // NAVIGATION
    const loginState = (
      <div>
        {/* <Divider /> */}
        <ListItem button>
          <NavLink onClick={this.onLogoutClick.bind(this)} to="/">
            <Icon className="navIcon">exit_to_app</Icon>
            <span className="navText">Log Out</span>
          </NavLink>
        </ListItem>
        {/* <Divider /> */}
        <ListItem button>
          <NavLink to="/dashboard">
            <Icon className="navIcon">dashboard</Icon>
            <span className="navText">Dashboard</span>
          </NavLink>
        </ListItem>
        {/* <Divider /> */}
        <ListItem button>
          <NavLink to="/cms">
            <Icon className="navIcon">collections</Icon>
            <span className="navText">CMS</span>
          </NavLink>
        </ListItem>
        {/* <Divider /> */}
        {/* <ListItem button>
          <NavLink to="/cmscity">
            <Icon className="navIcon">edit_location</Icon>
            <span className="navText">Create/Edit City</span>
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink to="/cmsitinerary">
            <Icon className="navIcon">add_to_photos</Icon>
            <span className="navText">Create/Edit Itinerary</span>
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink to="/cmsactivity">
            <Icon className="navIcon">add_a_photo</Icon>
            <span className="navText">Create/Edit Activity</span>
          </NavLink>
        </ListItem> */}
      </div>
    );

    const logoutState = (
      <div>
        <ListItem button>
          <NavLink to="/login">
            <Icon className="navIcon">portrait</Icon>
            <span className="navText">Login</span>
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink to="/signup">
            <Icon className="navIcon">person_add</Icon>
            <span className="navText">Create Account</span>
          </NavLink>
        </ListItem>
      </div>
    );

    const sideList = (
      <div>
        {isAuthenticated ? loginState : logoutState}
        <Divider />
        <ListItem button>
          <NavLink to="/cities">
            <Icon className="navIcon">location_city</Icon>
            <span className="navText">Cities</span>
          </NavLink>
        </ListItem>
        <Divider />
      </div>
    );

    // LINKS
    const authLinks = (
      <div>
        <div>
          <NavLink to="/">
            <Avatar
              alt={user.name}
              src={user.avatar}
              title="Gravatar and Image Files supported."
            />
          </NavLink>
        </div>
      </div>
    );
    const guestLinks = (
      <div>
        <Link className="nav-link" to="/login">
          <AccountCircle className="IconaAccountCircle" fontSize="large" />
        </Link>
      </div>
    );

    return (
      <div>
        <AppBar className="appBar" position="fixed" color="default">
          <Toolbar className="toolBarFlex">
            <div>{isAuthenticated ? authLinks : guestLinks}</div>

            <div>
              <IconButton aria-label="Menu" onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <SwipeableDrawer
                open={this.state.left}
                onClose={this.toggleDrawer(false)}
                onOpen={this.toggleDrawer(true)}
              >
                <div
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer(false)}
                  onKeyDown={this.toggleDrawer(false)}
                >
                  {sideList}
                </div>
              </SwipeableDrawer>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(MenuAppBar);
