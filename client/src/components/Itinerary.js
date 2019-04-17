import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchActivityByKey } from "../actions/activitiesActions";
import { fetchAxiosComments } from "../actions/commentActions";
import { getCurrentProfile } from "./../actions/profileActions";

import ItinCard from "./layout/ItinCard";
import CustomButton from "./../components/layout/CustomButton";

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
    this.expandOpen = this.expandOpen.bind(this);
    this.expandClose = this.expandClose.bind(this);
  }

  // OPEN (FETCH) ACTIVITY AND COMMENTS
  expandOpen(event) {
    let eventTargetId = event.target.id;
    this.props.fetchActivityByKey(eventTargetId);
    this.props.fetchAxiosComments(eventTargetId);

    this.setState(() => ({
      eventId: eventTargetId,
      isBtn: eventTargetId
    }));
  }

  //CLOSE ACTIVITY AND COMMENTS
  expandClose() {
    this.setState(() => ({
      eventId: null,
      isBtn: null
    }));
  }

  render() {
    const listItin = this.props.itineraries.itineraries.map((itinerary, i) => (
      <React.Fragment key={itinerary._id}>
        <ItinCard
          title={itinerary.title}
          authorimage={itinerary.authorimage}
          duration={itinerary.duration}
          price={itinerary.price}
          likes={itinerary.likes}
          ratings={itinerary.ratings}
          hashtag={itinerary.hashtag}
          author={itinerary.author}
          _id={itinerary._id}
          activitykey={itinerary.activitykey}
          history={this.props.history}
          cityurl={itinerary.cityurl}
        />
      </React.Fragment>
    ));

    return (
      <React.Fragment>
        {this.props.itineraries.itineraries.length > 0 ? (
          <React.Fragment> {listItin} </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="paragraphText">
              There are no Itineraries for this City.
            </div>
            <div className="homeParagraphText">
              • Create your own Itinerary with our CMS.
            </div>
            <div className="flexLink">
              <NavLink to="/cms">
                {/* <span className="homepageLinkText">CMS</span> */}
                <CustomButton
                  bgcolor={"#039be5"}
                  disabled={false}
                  title={"CMS"}
                  type={"CMS"}
                  size={"large"}
                  variant={"extended"}
                  value={"submit"}
                />
              </NavLink>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
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
    auth: state.auth,
    profile: state.profile,
    itineraries: state.itineraries,

    favid: state.favid,
    activities: state.activities,
    comments: state.comments,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { fetchActivityByKey, fetchAxiosComments, getCurrentProfile }
)(Itinerary);
