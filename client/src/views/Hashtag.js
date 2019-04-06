import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchItinerariesHashtag } from "../actions/itinerariesActions";
import { postFavorites } from "../actions/profileActions";
import { getCurrentProfile } from "./../actions/profileActions";

import Header from "./../components/layout/Header";
import ItinCard from "./../components/layout/ItinCard";
import ItinCardTitle from "../components/layout/ItinCardTitle";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Hashtag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      itineraries: [],
      hashtag: "",
      hashtagitin: []
    };
    this.addToFav = this.addToFav.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.fetchItinerariesHashtag(this.props.location.state.hashtag.item);
    this.setState({
      hashtagitin: this.props.itineraries.itineraries
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(nextProps.match.params);
    if (nextProps.match.params !== this.props.match.params) {
      this.props.fetchItinerariesHashtag(nextProps.location.state.hashtag.item);
      this.setState({
        hashtagitin: this.props.itineraries.itineraries
      });
    }
  }

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
  render() {
    // console.log(this.props);
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
            <Button onClick={this.dialogClose} color="inherit" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    let itinlist = this.props.itineraries.itineraries;
    const header = (
      <React.Fragment>
        <Header title={this.props.location.state.hashtag.item} />
        <div className="hashtagHeader">
          The following Itineraries match the hashtag{" "}
          <span className="hashtagtext">
            {this.props.location.state.hashtag.item}
          </span>{" "}
          :
        </div>
      </React.Fragment>
    );
    const itinerary = itinlist.map((itinerary, i) => {
      return (
        <React.Fragment key={i}>
          <div className="itineraryCard">
            <Card raised>
              <Grid container spacing={24}>
                {/* CARD HEADER */}
                <ItinCardTitle title={itinerary.title} />
                {/* BUTTONS */}
                <Grid item xs={3}>
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
                    <span />
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
                    <span />
                  )}
                </Grid>
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
      );
    });

    return (
      <React.Fragment>
        {header}
        {itinerary}
      </React.Fragment>
    );
  }
}

Hashtag.propTypes = {
  itineraries: PropTypes.object
};

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
  {
    fetchItinerariesHashtag,
    postFavorites,
    getCurrentProfile
  }
)(Hashtag);
