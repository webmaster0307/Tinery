import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../actions/profileActions";
import { removeFavorites } from "../actions/profileActions";
import { fetchAxiosItinerariesID } from "../actions/profileActions";
import IconHome from "../components/layout/IconHome";
import IconCity from "../components/layout/IconCity";

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
// import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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
      snackbar: false,
      confirm: false,
      favdataid: ""
    };
    // this.removeFav = this.removeFav.bind(this);
    this.confirmButton = this.confirmButton.bind(this);
  }

  componentDidMount() {
    let favoritesArray = this.props.profile.favid;
    // let favoritesArray = this.props.auth.user.favorites;

    if (this.state.favid.length === 0) {
      this.props.fetchAxiosItinerariesID(favoritesArray);
    }
    this.setState({
      favitin: this.props.profile.favid
    });
  }

  handleClose = () => {
    this.setState({ open: false, snackbar: false });
  };

  handleOpen = event => {
    this.setState({ open: true, snackbar: false });
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
      confirm: true,
      snackbar: true
    });
    if (this.state.confirm === true) {
      this.props.removeFavorites(userID, favData.favorites);
    }
  };

  render() {
    // getCurrentProfile(this.props.auth.user.id);
    // const { isAuthenticated, user } = this.props.auth;
    const { user } = this.props.auth;

    const noFavouritesMessage = (
      <div className="dashboardCard">
        <Card raised>
          <div className="dashboardNoFavMessage">
            <p> You have not added any favorites to your profile.</p>
            <p>
              To add favourites please browse itineraries in cities and click on
              the <span className="addToFavText">add to favorite</span> icon.
            </p>
            <IconCity />
          </div>
        </Card>
      </div>
    );

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
            <Fab
              className="confirmFabButton"
              variant="extended"
              size="medium"
              color="primary"
              onClick={this.confirmButton.bind(this)}
            >
              Confirm
            </Fab>

            {/* </Link> */}
            <Button onClick={this.handleClose} color="inherit" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    let favitin = this.props.profile.favitin;
    const listFavoriteIDs = favitin.map((itinerary, i) => (
      <div key={i} className="dashboardCard">
        <Card raised>
          <Grid container spacing={24}>
            {/* CARD HEADER */}
            <Grid item xs={9}>
              {/* <Card> */}
              {/* <Typography
                className="activtytitle"
                variant="h5"
                align="center"
                inline
              >
                {itinerary.title}
              </Typography> */}
              <div className="activtytitle">
                <h3>{itinerary.title}</h3>
              </div>

              {/* </Card> */}
            </Grid>
            <Grid item xs={3}>
              {/* <Card raised> */}
              <div className="favIconDiv">
                <Fab>
                  <Icon
                    value={itinerary.title}
                    variant="outlined"
                    fontSize="large"
                    onClick={this.handleOpen.bind(this, itinerary._id)}
                  >
                    favorite
                  </Icon>
                </Fab>
              </div>
              {/* </Card> */}
              {favDialog}
            </Grid>
          </Grid>

          <CardContent>
            <Grid container spacing={32} direction="row">
              <Grid item xs={4}>
                <img
                  alt="profile"
                  src={itinerary.authorimage}
                  className="dashboardImg"
                />
              </Grid>
              <Grid item xs={8}>
                {/* <Grid
                item
                xs={4}
                container
                spacing={24}
                direction="column"
                alignItems="center"
                justify="center"
              > */}
                <Grid item xs={8}>
                  <div>• Time: {itinerary.duration} Hours</div>
                </Grid>
                <Grid item xs={8}>
                  <div>• Cost ${itinerary.price}</div>
                </Grid>
                <Grid item xs={8}>
                  <div>• Likes: {itinerary.likes}</div>
                </Grid>
                <Grid item xs={8}>
                  <div>• Rating: {itinerary.rating}/5</div>
                </Grid>
                <Grid item xs={8}>
                  <div>• Hashtags: {itinerary.hashtag}</div>
                </Grid>
                {/* <Grid item xs={8}>
                  <div>By: {itinerary.author}</div>
                </Grid> */}
                <Grid item xs={8}>
                  <br />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <div>By: {itinerary.author}</div>
            </Grid>
          </CardContent>
        </Card>
      </div>
    ));

    return (
      <React.Fragment>
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

        <div className="dashboardUsername">Welcome {user.username}. </div>

        {this.props.profile.favitin.length > 0 ? (
          <div>{listFavoriteIDs}</div>
        ) : (
          <div>{noFavouritesMessage}</div>
        )}

        <Snackbar
          open={this.state.snackbar}
          autoHideDuration={1000}
          variant="success"
          TransitionComponent={Fade}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<div className="snackbartext">Favorite Removed!</div>}
        />

        <IconHome />
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
