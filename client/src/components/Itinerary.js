import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postFavorites } from "../actions/profileActions";
import { fetchActivityByKey } from "../actions/activitiesActions";
import { fetchAxiosComments } from "../actions/commentActions";
import { getCurrentProfile } from "./../actions/profileActions";

import ItinCard from "./layout/ItinCard";

import Activity from "./Activity";
import Comments from "./Comments";

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isBtn: false,
      eventId: "",
      activities: [],
      itineraries: [],
      comments: [],
      errors: {}
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // OPEN (FETCH) ACTIVITY AND COMMENTS
  handleOpen(event) {
    let eventTargetId = event.target.id;

    this.props.fetchActivityByKey(eventTargetId);
    this.props.fetchAxiosComments(eventTargetId);

    this.setState(() => ({
      eventId: eventTargetId,
      isBtn: eventTargetId
    }));
  }

  //CLOSE ACTIVITY AND COMMENTS
  handleClose() {
    this.setState(() => ({
      eventId: null,
      isBtn: null
    }));
  }

  render() {
    const listItin = this.props.itineraries.itineraries.map((itinerary, i) => (
      <React.Fragment key={i}>
        <ItinCard
          title={itinerary.title}
          authorimage={itinerary.authorimage}
          duration={itinerary.duration}
          price={itinerary.price}
          likes={itinerary.likes}
          rating={itinerary.rating}
          hashtag={itinerary.hashtag}
          author={itinerary.author}
          _id={itinerary._id}
        />

        {/* TERNARY OPERATOR */}
        {this.state.eventId === itinerary.activitykey ? (
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
              onClick={this.handleClose}
              key={itinerary.title + itinerary._id}
            >
              Close
            </button>
          ]
        ) : (
          <button
            className="viewActivityBtn "
            id={itinerary.activitykey}
            onClick={this.handleOpen}
            key={itinerary.title + itinerary._id}
          >
            Expand
          </button>
        )}
      </React.Fragment>
    ));

    return <React.Fragment>{listItin}</React.Fragment>;
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
