import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  postFavorites,
  getCurrentProfile,
  removeFavorites
} from "./../../actions/profileActions";
// import {  } from "./../actions/profileActions";

import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
// import ItinIcons from "./ItinIcons";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

class ItinCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isBtn: false,
      eventId: ""
    };
    this.addToFav = this.addToFav.bind(this);
    this.confirmButton = this.confirmButton.bind(this);
  }

  // componentDidMount() {
  // }

  // ADD FAVORITES
  addToFav = event => {
    let eventTargetId = event;

    let favData = {
      favorites: eventTargetId
    };
    let userID = this.props.auth.user.id;
    this.props.postFavorites(userID, favData);

    this.setState({ open: true });
  };

  // CLOSE DIALOG
  dialogClose = () => {
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
    const { isAuthenticated } = this.props.auth;

    const addFavDialog = (
      <React.Fragment>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"MYtinerary added to your Favorites"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This itinerary has been added to your favorites. Go to Favorites
              page to view and manage your Itineraries.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/dashboard" className="gotoFav">
              <Fab
                className="confirmFabButton"
                variant="extended"
                size="medium"
                color="primary"
                onClick={this.handleClose}
              >
                Go To Favorites
              </Fab>
            </Link>
            <Button onClick={this.dialogClose} color="inherit" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );

    const removeFavDialog = (
      <React.Fragment>
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
      </React.Fragment>
    );

    const unauthedIcons = (
      <React.Fragment>
        <CardActions>
          <Grid container spacing={0}>
            {/* ICON 1 */}
            <Grid item xs={4}>
              <div className="itinIconpanel">
                <Fab variant="extended" disabled>
                  <Icon fontSize="large">thumb_up</Icon>
                  <span className="buttonText">Like</span>
                </Fab>
              </div>
            </Grid>
            {/* ICON 2 */}
            <Grid item xs={4}>
              <div className="itinIconpanel">
                <Fab variant="extended" disabled>
                  <Icon fontSize="large">star_rate</Icon>
                  <span className="buttonText">Rate</span>
                </Fab>
              </div>
            </Grid>
            {/* ICON 3 */}
            <Grid item xs={4}>
              <div className="itinIconpanel">
                <Fab variant="extended" disabled>
                  <Icon fontSize="large">add_location</Icon>
                  <span className="buttonText">Save</span>
                </Fab>
              </div>
            </Grid>
          </Grid>
        </CardActions>
      </React.Fragment>
    );

    const authedIcons = (
      <React.Fragment>
        <CardActions>
          <Grid container spacing={0}>
            {/* ICON 1 */}
            <Grid item xs={4}>
              <div className="itinIconpanel">
                <Fab variant="extended" disabled>
                  <Icon fontSize="large">thumb_up</Icon>
                  <span className="buttonText">Like</span>
                </Fab>
              </div>
            </Grid>
            {/* ICON 2 */}
            <Grid item xs={4}>
              <div className="itinIconpanel">
                <Fab variant="extended" disabled>
                  <Icon fontSize="large">star_rate</Icon>
                  <span className="buttonText">Rate</span>
                </Fab>
              </div>
            </Grid>
            {/* ICON 3 */}
            <Grid item xs={4}>
              <div className="itinIconpanel">
                {/*  TERNARY CONDITION*/}

                {this.props.profile.favid.includes(this.props._id) ? (
                  <React.Fragment>
                    {/*  DASHBOARD CONDITION*/}
                    {this.props.history === "/dashboard" ? (
                      <React.Fragment>
                        {/*  DASHBOARD CONDITION - FAV REMOVE*/}
                        <Fab variant="extended">
                          <Icon
                            value={this.props.title}
                            variant="outlined"
                            fontSize="large"
                            onClick={this.handleOpen.bind(this, this.props._id)}
                          >
                            favorite
                          </Icon>
                          {removeFavDialog}
                          <span className="buttonText">Remove</span>
                        </Fab>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {/*  DASHBOARD CONDITION - FAV SAVED*/}
                        <Fab variant="extended" disabled>
                          <Icon value={this.props.title} fontSize="large">
                            favorite
                          </Icon>
                          <span className="buttonText">Saved</span>
                          {/* {favDialog} */}
                        </Fab>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {/*  ITIN PAGE CONDITION - ADD TO FAV*/}
                    <Fab variant="extended">
                      <Icon
                        value={this.props.title}
                        fontSize="large"
                        onClick={this.addToFav.bind(this, this.props._id)}
                      >
                        add_location
                      </Icon>
                      <span className="buttonText">Save</span>
                      {addFavDialog}
                    </Fab>
                  </React.Fragment>
                )}
              </div>
            </Grid>
          </Grid>
        </CardActions>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <div className="itineraryCard">
          <Card raised>
            {/* CARD HEADER */}
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <div>
                  <h2 className="itinCardTitleText">{this.props.title}</h2>
                  <div className="itinCardTitleBy">By: {this.props.author}</div>
                </div>
              </Grid>
            </Grid>
            {/* CARD CONTENT */}
            <CardContent>
              <Grid container spacing={0}>
                <Grid item xs={5} sm={6}>
                  <div className="dashboardImgDiv">
                    <img
                      alt="profile"
                      src={this.props.authorimage}
                      className="dashboardImg"
                    />
                  </div>
                </Grid>
                <Grid item xs={7} sm={6}>
                  <Grid item xs={8}>
                    <div>• Time: {this.props.duration} Hours</div>
                  </Grid>
                  <Grid item xs={8}>
                    <div>• Cost: {this.props.price}</div>
                  </Grid>
                  <Grid item xs={8}>
                    <div>• Likes: {this.props.likes}</div>
                  </Grid>
                  <Grid item xs={8}>
                    <div>• Rating: {this.props.rating}/5</div>
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      • Hashtags:{" "}
                      {this.props.hashtag.map(item => {
                        return (
                          <React.Fragment key={item + item}>
                            {" "}
                            <Link
                              to={{
                                pathname:
                                  "/hashtag/" +
                                  item.toLowerCase().replace("#", ""),
                                state: {
                                  hashtag: { item }
                                }
                              }}
                            >
                              <span className="hashtagTags">{item}</span>
                            </Link>{" "}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            {/* CARD ICONS => TERNARY : AUTHED : UNAUTHED */}
            {isAuthenticated ? authedIcons : unauthedIcons}
          </Card>
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

const mapStateToProps = state => {
  return {
    itineraries: state.itineraries,
    profile: state.profile,
    auth: state.auth,
    favid: state.favid
  };
};

export default connect(
  mapStateToProps,
  { postFavorites, getCurrentProfile, removeFavorites }
)(ItinCard);
