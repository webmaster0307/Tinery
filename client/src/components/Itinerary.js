import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchAxiosItineraries } from "../actions/fetchItineraries";
import { postFavorites } from "../actions/profileActions";
import { fetchAxiosActivities } from "../actions/activitiesActions";
import { fetchAxiosComments } from "../actions/commentActions";
import { getCurrentProfile } from "./../actions/profileActions";

import Activity from "./Activity";
import Comments from "./Comments";

// import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";

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
  componentDidMount() {
    // this.props.fetchAxiosActivities(event.target.id);
    // this.props.fetchAxiosItineraries();
    // this.props.fetchAxiosItineraries(this.props.match.params.city_name);
  }

  // ADD FAVORITES
  addToFav = event => {
    let eventTargetId = event;
    let favData = {
      favorites: eventTargetId
    };
    let userID = this.props.auth.user.id;
    // console.log("user id", userID);
    // console.log("itin id", favData);
    this.props.postFavorites(userID, favData);
    // this.props.getCurrentProfile();

    this.setState({ open: true });
  };

  // OPEN DIALOG
  handleClose = () => {
    this.setState({ open: false });
  };

  // FETCH ACTIVITY AND COMMENTS
  handleClick(event) {
    let eventTargetId = event.target.id;
    this.props.fetchAxiosActivities(eventTargetId);
    this.props.fetchAxiosComments(eventTargetId);
    this.setState(state => ({
      eventId: eventTargetId,
      isBtn: !state.isBtn
    }));
    // console.log(this.props.errors);
  }
  render() {
    // const { isAuthenticated, user } = this.props.auth;
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
            <Link to="/dashboard">
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Go To Favorites
              </Button>
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
            <Grid container spacing={24}>
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
              {/* ADD TO FAVORITES */}
              <Grid item xs={2}>
                <div>
                  {/* 1st TERNARY */}
                  {isAuthenticated &&
                  !this.props.profile.favid.includes(itinerary._id) ? (
                    <div>
                      <Icon
                        value={itinerary.title}
                        color="inherit"
                        variant="outlined"
                        fontSize="large"
                        onClick={this.addToFav.bind(this, itinerary._id)}
                      >
                        add_location
                      </Icon>
                      {favDialog}
                    </div>
                  ) : (
                    <div />
                  )}
                  {/* 2nd TERNARY */}
                  {/* {console.log("props", this.props)}
                  {console.log("state", this.state)} */}
                  {isAuthenticated &&
                  this.props.profile.favid.includes(itinerary._id) ? (
                    <div>
                      <Icon
                        value={itinerary.title}
                        color="inherit"
                        variant="outlined"
                        fontSize="large"
                      >
                        star
                      </Icon>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>

                {/* <div> {itinerary._id}</div> */}
              </Grid>
            </Grid>
            <CardContent>
              {/* AVATAR */}
              {/* <Grid item xs={3}> */}
              {/* <Avatar src={itinerary.authorimage} /> */}
              {/* </Grid> */}
              <div>
                <Grid container spacing={24}>
                  <Grid item xs={3}>
                    <div>
                      {/* <Avatar
                        className="authorIcon"
                        src={itinerary.authorimage}
                      /> */}
                      <img
                        alt="profile"
                        src={itinerary.authorimage}
                        className="itinImg"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>Likes : {itinerary.likes}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className={this.state.paper}>
                      {itinerary.duration} Hours
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>${itinerary.price}</div>
                  </Grid>
                  {/* 2nd line */}
                  <Grid item xs={3} container wrap="nowrap">
                    <div>
                      <span className="authorName">{itinerary.author}</span>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>Rating: {itinerary.rating}/5</div>
                  </Grid>
                  <Grid item xs={6} container wrap="nowrap">
                    <Typography>
                      {itinerary.hashtag.toString() + " "}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
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
            View All
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
  // // let id = ownProps.match.params.city_name;
  // console.log(state.itineraries);
  return {
    itineraries: state.itineraries,
    profile: state.profile,
    favid: state.favid,
    // eventId: state.event.target.id,
    activities: state.activities,
    comments: state.comments,
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { fetchAxiosActivities, fetchAxiosComments, postFavorites, getCurrentProfile }
)(Itinerary);
