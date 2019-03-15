import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../actions/profileActions";
import { removeFavorites } from "../actions/profileActions";
// import { getProfileFavorites } from "../actions/profileActions";
import { fetchAxiosItinerariesID } from "../actions/profileActions";
import BtnHome from "../components/layout/BtnHome";

import Navbar from "../components/layout/Navbar";
// import Favorites from "../components/Favorites";
// import Spinner from "../components/layout/Spinner";
// import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
// import Avatar from "@material-ui/core/Avatar";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

// import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isBtn: false,
      // eventId: "",
      itineraries: [],
      favid: [],
      favitin: [],
      // favoriteIDs: this.props.auth.user.favorites,
      // favorites: [],
      profile: [],
      open: false,
      confirm: false,
      favdataid: ""
    };
    // this.removeFav = this.removeFav.bind(this);
    this.confirmButton = this.confirmButton.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    let favoritesArray = this.props.profile.favid;
    // let favoritesArray = this.props.auth.user.favorites;
    this.props.fetchAxiosItinerariesID(favoritesArray);
    this.setState({
      favitin: this.props.profile.favid
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = event => {
    this.setState({ open: true });
    // let eventTargetId = event;
    let eventTargetId = event;
    let favData = {
      favorites: eventTargetId
    };
    this.setState({
      favdataid: favData.favorites
    });
    // console.log("eventTargetId", this.eventTargetId);
    // console.log("itin id", favData.favorites);
    // console.log("itin id", favData);
    // console.log("favdataid", this.state.favdataid);
    // let userID = this.props.auth.user.id;
  };

  confirmButton = () => {
    // let eventTargetId = event;
    // let favData = {
    //   favorites: eventTargetId
    // };
    let userID = this.props.auth.user.id;
    let favData = {
      favorites: this.state.favdataid
    };
    // console.log("user id", userID);
    // console.log("confirm button id", favData.favorites);
    // console.log("confirm button id", this.state.favdataid);
    this.setState({
      open: false,
      confirm: true
    });
    if (this.state.confirm === true) {
      this.props.removeFavorites(userID, favData.favorites);
    }
  };

  // removeFav = event => {
  //   let eventTargetId = event;
  //   let favData = {
  //     favorites: eventTargetId
  //   };
  //   let userID = this.props.auth.user.id;
  //   // console.log("user id", userID);
  //   // console.log("itin id", favData.favorites);
  //   // console.log("itin id", favData);
  //   // console.log(eventTargetId);
  //   // this.props.removeFavorites();
  //   // this.props.removeFavorites(userID, favData);
  //   if (this.state.confirm === true) {
  //     this.props.removeFavorites(userID, favData.favorites);
  //   }
  //   // this.setState({ open: true });
  //   // console.log("state", this.state);
  // };

  render() {
    // getCurrentProfile(this.props.auth.user.id);
    // const { isAuthenticated, user } = this.props.auth;
    const { user } = this.props.auth;

    const favDialog = (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete MYtinerary from your Favorites?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please confirm you want to delete this MYtinerary from your
              Favorites.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Link to="/dashboard"> */}
            <Button
              onClick={this.confirmButton.bind(this)}
              color="primary"
              autoFocus
            >
              Confirm
            </Button>
            {/* </Link> */}
            <Button onClick={this.handleClose} color="inherit" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    let favid = this.props.profile.favitin;
    // console.log("props.profile.favid", favid);

    const listFavoriteIDs = favid.map((itinerary, i) => (
      <div key={i} className="dashboardCard">
        <Card raised>
          <Grid container spacing={24}>
            {/* CARD HEADER */}
            <Grid item xs={10}>
              <Typography
                className="activtytitle"
                gutterBottom
                variant="h4"
                component="h2"
              >
                {itinerary.title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {/* REMOVE FAVORITES */}
              {/* <Icon
                value={itinerary.title}
                color="inherit"
                variant="outlined"
                fontSize="large"
                onClick={this.removeFav.bind(this, itinerary._id)}
              >
                favorite
              </Icon> */}
              <Icon
                value={itinerary.title}
                color="inherit"
                variant="outlined"
                fontSize="large"
                onClick={this.handleOpen.bind(this, itinerary._id)}
              >
                favorite
              </Icon>
              {favDialog}
            </Grid>
          </Grid>
          {/* CARD BODY */}
          <CardContent>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                {/* <Avatar className="authorIcon" src={itinerary.authorimage} />{" "} */}
                <img
                  alt="profile"
                  src={itinerary.authorimage}
                  className="dashboardImg"
                />
              </Grid>
              <Grid item xs={4}>
                <div>Time: {itinerary.duration} Hours</div>
              </Grid>
              <Grid item xs={4}>
                <div>Cost ${itinerary.price}</div>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <div>{itinerary.author}</div>
            </Grid>
          </CardContent>
        </Card>
      </div>
    ));

    return (
      <React.Fragment>
        <Navbar />
        <div>
          <Typography
            className="city"
            component="h2"
            variant="display2"
            gutterBottom
          >
            Dashboard
          </Typography>
        </div>
        <div>
          <p>Welcome {user.username}.</p>
          {/* {isAuthenticated ? <p>Welcome {user.username}.</p> : guestContent} */}
        </div>
        {/* {this.props.profile.favid.map(i => (
          <div key={i + 1}>{i}</div>
        ))} */}
        {/* <div>{listID}</div> */}

        {/* <div>{listFavorites}</div> */}
        {/* <div>{listFavoriteIDs}</div> */}
        {/* <div>{listNestedArray}</div> */}
        <div>{listFavoriteIDs}</div>
        <BtnHome />
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired
  itineraries: PropTypes.object
};

const mapStateToProps = state => ({
  favid: state.favid,
  favitin: state.favitin,
  // errors: state.errors,
  profile: state.profile,
  auth: state.auth
});

// export default Dashboard;

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    fetchAxiosItinerariesID,
    removeFavorites
  }
)(Dashboard);
