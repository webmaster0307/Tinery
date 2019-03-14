import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../actions/profileActions";
import { removeFavorites } from "../actions/profileActions";
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

// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Favorite from "@material-ui/icons/Favorite";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      // isBtn: false,
      // eventId: "",
      itineraries: [],
      favid: [],
      itinID: [],
      // favoriteIDs: this.props.auth.user.favorites,
      favorites: [],
      profile: []
      // open: false
    };
    this.removeFav = this.removeFav.bind(this);
  }

  componentDidMount() {
    let favoritesArray = this.props.profile.favid;
    this.props.fetchAxiosItinerariesID(favoritesArray);
  }

  removeFav = event => {
    let eventTargetId = event;
    let favData = {
      favorites: eventTargetId
    };
    let userID = this.props.auth.user.id;
    // console.log("user id", userID);
    // console.log("itin id", favData.favorites);
    // console.log("itin id", favData);
    // console.log(eventTargetId);
    // this.props.removeFavorites();
    // this.props.removeFavorites(userID, favData);
    this.props.removeFavorites(userID, favData.favorites);
    console.log("state", this.state);
  };

  render() {
    // getCurrentProfile(this.props.auth.user.id);
    // const { isAuthenticated, user } = this.props.auth;
    const { user } = this.props.auth;

    // console.log("favid", this.props.profile);
    // console.log("props", this.props);
    // console.log("state", this.state);

    // FETCH IN RENDER
    // let favoritesArray = this.props.profile.favid;
    // this.props.fetchAxiosItinerariesID(favoritesArray);

    // console.log(this.state);
    // console.log(this.props);

    let favid = this.props.profile.itinID;
    console.log("props.profile.itinID", favid);

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
              <Icon
                value={itinerary.title}
                color="inherit"
                variant="outlined"
                fontSize="large"
                onClick={this.removeFav.bind(this, itinerary._id)}
              >
                favorite
              </Icon>
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
        {this.props.profile.favid.map(i => (
          <div key={i + 1}>{i}</div>
        ))}
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
  // favorites: PropTypes.array,
  // // deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired
  itineraries: PropTypes.object
};

const mapStateToProps = state => ({
  favid: state.favid,
  // errors: state.errors,
  profile: state.profile,
  auth: state.auth,
  itinID: state.itinID
});

// export default Dashboard;

export default connect(
  mapStateToProps,
  { getCurrentProfile, fetchAxiosItinerariesID, removeFavorites }
)(Dashboard);
