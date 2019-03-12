import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../actions/profileActions";
import { removeFavorites } from "../actions/profileActions";
import { fetchAxiosItinerariesID } from "../actions/itinerariesActions";

import Navbar from "../components/layout/Navbar";
// import Favorites from "../components/Favorites";

// import Spinner from "../components/layout/Spinner";
// import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";

// import ProfileActions from './ProfileActions';

import Typography from "@material-ui/core/Typography";
// import Avatar from "@material-ui/core/Avatar";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@material-ui/core/Icon";
// import Favorite from "@material-ui/icons/Favorite";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      // isBtn: false,
      // eventId: "",
      itineraries: [],
      itinid: []
      // favoriteIDs: this.props.auth.user.favorites,
      // favorites: [],
      // profile: []
      // activities: [],
      // comments: [],
      // open: false
    };
    this.removeFav = this.removeFav.bind(this);
  }
  componentDidMount() {
    // getCurrentProfile(this.props.auth.user.id);
    // console.log("didmount", this.props.auth.user.id);
    // console.log("didmount", this.props.auth.user.favorites);
    // console.log("state.profile", this.state);
    // console.log("didmount updated user info", this.props.auth.user.id);
    // if (this.props.itineraries.itinid.length === 0) {
    let favoritesArray = this.props.auth.user.favorites;

    this.props.fetchAxiosItinerariesID(favoritesArray);
    this.setState({
      itineraries: this.props.itineraries.itineraries,
      itinid: this.props.itineraries.itinid
    });
    // }
    // console.log(this.state);
    // console.log(this.props.itineraries);
  }
  // onDeleteClick(e) {
  //   this.props.deleteAccount();
  // }

  removeFav = event => {
    let eventTargetId = event;
    let favData = {
      favorites: eventTargetId
    };
    let userID = this.props.auth.user.id;
    console.log("user id", userID);
    console.log("itin id", favData.favorites);
    // console.log("itin id", favData);
    // console.log(eventTargetId);
    // this.props.removeFavorites();
    // this.props.removeFavorites(userID, favData);
    this.props.removeFavorites(userID, favData.favorites);
    console.log("state", this.state);
  };

  refreshProfile = event => {
    console.log("This Props ID", this.props.auth.user.id);
    getCurrentProfile(this.props.auth.user.id);
  };

  render() {
    // getCurrentProfile(this.props.auth.user.id);
    const { isAuthenticated, user } = this.props.auth;
    // const { profile, loading } = this.props.profile;
    // console.log(this.props.itineraries);
    // console.log("itin.itin", this.props.itineraries.itineraries);
    // console.log("itin.id", this.props.itineraries.itinid);
    // console.log("state", this.state);

    // const { profile, loading } = this.props.profile;

    // const listID = user.favorites.map((favorite, i) => (
    //   <div key={i}>
    //     <Card>
    //       <div>{favorite}</div>
    //       <FavoriteBorder onClick={this.removeFav.bind(this, favorite)} />

    //       {/* <Favorites key={i + favorite} favoriteID={favorite} /> */}
    //     </Card>
    //   </div>
    // ));

    // let itinstate = this.props.itineraries.itineraries;
    let itinid = this.props.itineraries.itinid;
    // console.log("itinid", this.props.itineraries.itinid[0]);
    // let uniqueitin = [...new Set(itinid)];

    // const listFavorites = itinstate.map((itin, i) => (
    //   <Card key={i} raised className="dashboardCard">
    //     <FavoriteBorder onClick={this.removeFav.bind(this, itin._id)} />
    //     <div>{itin.title}</div>
    //     <Avatar className="authorIcon" src={itin.authorimage} />
    //     <div>{itin.author}</div>

    //     <div>${itin.price}</div>
    //     <div>Hours : {itin.duration}</div>
    //     {/* <img src={itin.authorimage} /> */}
    //   </Card>
    // ));
    // const listNestedArray = itinid.map((itinerary, i) => (
    //   <div key={i} className="dashboardCard">
    //     {itinerary.title}
    //     {itinerary.map((subitem, i) => {
    //       return (
    //         <ul>
    //           <li>{subitem.title}</li>
    //         </ul>
    //       );
    //     })}
    //   </div>
    // ));

    const listFavoriteIDs = itinid.map((itinerary, i) => (
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
    console.log(this.state);
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
          <button onClick={this.refreshProfile}>Refresh Profile</button>
        </div>
        <div>
          <p>Welcome {user.username}.</p>
          {/* {isAuthenticated ? <p>Welcome {user.username}.</p> : guestContent} */}
        </div>
        {/* <div>{listID}</div> */}
        {/* 
        {itinid.length > itinstate.length ? (
          <div>{listFavoriteIDs}</div>
        ) : (
          <div>{listFavorites}</div>
        )} */}

        {/* <div>{listFavorites}</div> */}
        <div>{listFavoriteIDs}</div>
        {/* <div>{listNestedArray}</div> */}
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  // favorites: PropTypes.array,
  // // deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired
  itineraries: PropTypes.object
};

const mapStateToProps = state => ({
  // favorites: state.favorites,
  // errors: state.errors,
  profile: state.profile,
  auth: state.auth,
  itineraries: state.itineraries,
  itinid: state.itinid
});

// export default Dashboard;

export default connect(
  mapStateToProps,
  { getCurrentProfile, fetchAxiosItinerariesID, removeFavorites }
)(Dashboard);
