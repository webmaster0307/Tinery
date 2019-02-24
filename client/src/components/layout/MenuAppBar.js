import React from "react";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

class MenuAppBar extends React.Component {
  state = {
    left: false
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  onLogoutClick(e) {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // NAVIGATION
    const loginState = (
      <div>
        <ListItem button>
          <ListItemIcon>
            {/* <InboxIcon /> */}
            <NavLink onClick={this.onLogoutClick.bind(this)} to="/login">
              Log Out
            </NavLink>
          </ListItemIcon>
        </ListItem>
      </div>
    );
    const logoutState = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <NavLink to="/login">Log In</NavLink>
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <NavLink to="/signup">Create Account</NavLink>
        </ListItem>
      </div>
    );

    const sideList = (
      <div>
        {isAuthenticated ? loginState : logoutState}
        <Divider />
        <ListItem button>
          <NavLink to="/cities"> Cites</NavLink>
        </ListItem>
        <Divider />
      </div>
    );

    // LINKS

    const authLinks = (
      <div>
        {/* <Link className="nav-link" to="/">
          Status : Logged In
        </Link> */}
        <div>
          <Avatar
            alt={user.name}
            src={user.avatar}
            title="You must have a Gravatar connected to your email to display an image"
          />
        </div>
        {/* LOGOUT LINK */}
        {/* <div>
          <a
            href="/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </div> */}
      </div>
    );
    const guestLinks = (
      <div>
        <Link className="nav-link" to="/login">
          <AccountCircle className="IconaAccountCircle" fontSize="large" />
        </Link>
        {/* <Avatar
          alt={user.name}
          src={user.avatar}
          title="You must have a Gravatar connected to your email to display an image"
        /> */}
      </div>
    );

    return (
      <div>
        <AppBar className="appBar" position="static" color="default">
          <Toolbar className="toolBarFlex">
            {/* MENU PROFILE ICON */}
            <div>{isAuthenticated ? authLinks : guestLinks}</div>
            {/* MENU BURGER ICON */}
            <div>
              <IconButton
                aria-label="Menu"
                onClick={this.toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>

              <SwipeableDrawer
                open={this.state.left}
                onClose={this.toggleDrawer("left", false)}
                onOpen={this.toggleDrawer("left", true)}
              >
                <div
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer("left", false)}
                  onKeyDown={this.toggleDrawer("left", false)}
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

// export default withStyles(styles)(MenuAppBar);