import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../actions/profileActions";
import { removeFavorites } from "../actions/profileActions";
import { fetchAxiosItinerariesID } from "../actions/profileActions";

import IconCity from "../components/layout/IconCity";
import Header from "../components/layout/Header";
import ItinCard from "../components/layout/ItinCard";
import ItinCardTitle from "../components/layout/ItinCardTitle";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

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

    if (this.state.favid.length === 0) {
      this.props.fetchAxiosItinerariesID(favoritesArray);
    }
    this.setState({
      favitin: this.props.profile.favid
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  snackbarClose = () => {
    this.setState({ snackbar: false });
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
  };

  confirmButton = () => {
    let userID = this.props.auth.user.id;
    let favData = {
      favorites: this.state.favdataid
    };

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
            <Fab
              className="confirmFabButton"
              variant="extended"
              size="medium"
              color="primary"
              onClick={this.confirmButton.bind(this)}
            >
              Confirm
            </Fab>
            <Button onClick={this.handleClose} color="inherit" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    let favitin = this.props.profile.favitin;
    const listFavoriteIDs = favitin.map((itinerary, i) => (
      <React.Fragment key={i}>
        <div className="itineraryCard">
          <Card raised>
            <Grid container spacing={24}>
              {/* CARD HEADER */}
              <ItinCardTitle title={itinerary.title} />
              {/* BUTTONS */}
              <Grid item xs={3}>
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
                    {favDialog}
                  </Fab>
                </div>
              </Grid>
              {/* END OF BUTTONS */}
            </Grid>

            <ItinCard
              authorimage={itinerary.authorimage}
              duration={itinerary.duration}
              price={itinerary.price}
              likes={itinerary.likes}
              rating={itinerary.rating}
              hashtag={itinerary.hashtag}
              author={itinerary.author}
            />
          </Card>
        </div>
      </React.Fragment>
    ));

    return (
      <React.Fragment>
        <div>
          <Header title={"Dashboard"} />
        </div>

        <div className="dashboardUsername">Welcome {user.username}. </div>
        <div>
          {this.props.profile.favitin.length > 0 ? (
            <div>{listFavoriteIDs}</div>
          ) : (
            <div>{noFavouritesMessage}</div>
          )}
        </div>

        <Snackbar
          open={this.state.snackbar}
          onClose={this.snackbarClose}
          autoHideDuration={2500}
          variant="success"
          TransitionComponent={Fade}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<div className="snackbartext">Favorite Removed!</div>}
        />
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  itineraries: PropTypes.object
};

const mapStateToProps = state => ({
  favid: state.favid,
  favitin: state.favitin,
  // errors: state.errors,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    fetchAxiosItinerariesID,
    removeFavorites
  }
)(Dashboard);
