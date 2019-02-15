import React, { Component } from "react";
import { connect } from "react-redux";
// import { fetchAxiosItineraries } from "../actions/fetchItineraries";
import { fetchAxiosActivities } from "../actions/fetchActivities";
import { fetchAxiosComments } from "../actions/fetchComments";
import Activity from "./Activity";
import Comments from "./Comments";

class Itinerary extends Component {
  componentDidMount() {
    // this.props.fetchAxiosActivities(event.target.id);
    // this.props.fetchAxiosItineraries();
    // this.props.fetchAxiosItineraries(this.props.match.params.city_name);
  }
  constructor(props) {
    super(props);
    this.state = {
      isBtn: false,
      eventId: "",
      activities: [],
      comments: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    // console.log("button value :", eventTargetId);

    let eventTargetId = event.target.id;

    this.props.fetchAxiosActivities(eventTargetId);
    this.props.fetchAxiosComments(eventTargetId);
    console.log(this.props.fetchAxiosComments(eventTargetId));

    this.setState(state => ({
      eventId: eventTargetId,
      isBtn: !state.isBtn
    }));
  }
  render() {
    const listItin = this.props.itineraries.itineraries.map(itinerary => (
      <div
        className="card-panel grey lighten-5 z-depth-2 hoverable"
        key={itinerary.title}
      >
        <div className="row valign-wrapper">
          {/* <div className="col left-align s2 m4 l3"> */}
          <div className="col s4 leftDiv">
            <p> Author : {itinerary.author}</p>
          </div>

          {/* <div className="col s12 m8 l9 "> */}
          <div className="col s9 m8 l9 rightDiv">
            <div className="col center-align rightDiv">
              <h4> {itinerary.title} </h4>
            </div>

            <div className="col s12">
              <div className="col s4 rightDiv">
                <p> Likes : {itinerary.likes}</p>
              </div>
              <div className="col s4 rightDiv">
                <p> Duration : {itinerary.duration} Hours </p>
              </div>
              <div className="col s4 rightDiv">
                <p> Price : ${itinerary.price} </p>
              </div>
              {/* <p> Rating : {itinerary.rating} out of 5 </p> */}
            </div>

            <div className="col s12 rightDiv">
              <p> Hashtags : {itinerary.hashtag + " "}</p>
            </div>
            {/* <p> Key : {itinerary.activitykey}</p> */}
          </div>
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
              className="viewActivityBtn"
              id={itinerary.activitykey}
              onClick={this.handleClick}
            >
              Close
            </button>
          ]
        ) : (
          <button
            className="viewActivityBtn"
            id={itinerary.activitykey}
            onClick={this.handleClick}
          >
            View All
          </button>
        )}
      </div>
    ));

    return <div>{listItin}</div>;
  }
}

const mapStateToProps = state => {
  // console.log(this.props.itineraries.itineraries);
  // // let id = ownProps.match.params.city_name;

  return {
    itineraries: state.itineraries,
    // eventId: state.event.target.id
    activities: state.activities,
    comments: state.comments
  };
};

export default connect(
  mapStateToProps,
  { fetchAxiosActivities, fetchAxiosComments }
)(Itinerary);
