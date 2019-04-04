import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postFavorites } from "../actions/profileActions";
import { fetchActivityByKey } from "../actions/activitiesActions";
import { fetchAxiosComments } from "../actions/commentActions";
import { getCurrentProfile } from "./../actions/profileActions";

import ItinCard from "./layout/ItinCard";
import Activity from "./layout/ImageStepper";
// import Activity from "./Activity";
import Comments from "./Comments";

import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBtn: false,
      eventId: "",
      activities: [],
      itineraries: [],
      comments: [],
      errors: {},
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.addToFav = this.addToFav.bind(this);
  }
  componentDidMount() {}

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

  // OPEN DIALOG
  handleClose = () => {
    this.setState({ open: false });
  };

  // FETCH ACTIVITY AND COMMENTS
  handleClick(event) {
    let eventTargetId = event.target.id;
    this.props.fetchActivityByKey(eventTargetId);
    this.props.fetchAxiosComments(eventTargetId);
    this.setState(state => ({
      eventId: eventTargetId,
      isBtn: !state.isBtn
    }));
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const favDialog = (
      <div>
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
            <Button onClick={this.handleClose} color="inherit" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    const listItin = this.props.itineraries.itineraries.map(itinerary => (
      <div key={itinerary.title}>
        <div className="itineraryCard">
          <Card raised>
            <Grid container spacing={32} direction="row">
              <Grid item xs={9}>
                <Typography
                  className="activtytitle"
                  gutterBottom
                  variant="h5"
                  component="h5"
                >
                  {itinerary.title}
                </Typography>
              </Grid>
              {/* ADD TO FAVORITES */}
              <Grid item xs={3}>
                <div>
                  {/* 1st TERNARY */}
                  {isAuthenticated &&
                  !this.props.profile.favid.includes(itinerary._id) ? (
                    <div className="favIconDiv">
                      <Fab>
                        <Icon
                          value={itinerary.title}
                          variant="outlined"
                          fontSize="large"
                          onClick={this.addToFav.bind(this, itinerary._id)}
                        >
                          add_location
                        </Icon>
                        {favDialog}
                      </Fab>
                    </div>
                  ) : (
                    <div />
                  )}
                  {/* 2nd TERNARY */}
                  {isAuthenticated &&
                  this.props.profile.favid.includes(itinerary._id) ? (
                    <div className="favIconDiv">
                      <Fab disabled>
                        <Icon
                          value={itinerary.title}
                          variant="outlined"
                          fontSize="large"
                        >
                          star
                        </Icon>
                      </Fab>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </Grid>
            </Grid>
            {/* <ImageStepper /> */}

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
        {/* TERNARY OPERATOR */}
        {this.state.isBtn && this.state.eventId === itinerary.activitykey ? (
          [
            <Activity
              itineraryKey={itinerary.activitykey}
              key={itinerary.title}
            />,

            <Comments
              activityKey={itinerary.activitykey}
              key={itinerary._id}
            />,

            <button
              className="closeActivityBtn"
              id={itinerary.activitykey}
              onClick={this.handleClick}
              key={itinerary.title + itinerary._id}
            >
              Close
            </button>
          ]
        ) : (
          <button
            className="viewActivityBtn "
            id={itinerary.activitykey}
            onClick={this.handleClick}
            key={itinerary.title + itinerary._id}
          >
            Expand
          </button>
        )}
      </div>
    ));

    return <div>{listItin}</div>;
  }
}

Itinerary.propTypes = {
  itinerary: PropTypes.object,
  activiy: PropTypes.object,
  comment: PropTypes.array,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    itineraries: state.itineraries,
    profile: state.profile,
    favid: state.favid,
    activities: state.activities,
    comments: state.comments,
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { fetchActivityByKey, fetchAxiosComments, postFavorites, getCurrentProfile }
)(Itinerary);
