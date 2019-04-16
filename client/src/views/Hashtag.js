import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItinerariesHashtag } from "../actions/itinerariesActions";
import { getCurrentProfile } from "./../actions/profileActions";

import Header from "./../components/layout/Header";
import ItinCard from "./../components/layout/ItinCard";

class Hashtag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // open: false,
      itineraries: [],
      hashtag: "",
      hashtagitin: [],
      favid: []
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.getCurrentProfile();
    }
    this.props.fetchItinerariesHashtag(this.props.location.state.hashtag.item);
    this.setState({
      hashtagitin: this.props.itineraries.itineraries
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params !== this.props.match.params) {
      this.props.fetchItinerariesHashtag(nextProps.location.state.hashtag.item);
      this.setState({
        hashtagitin: this.props.itineraries.itineraries
      });
    }
  }

  render() {
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
            history={this.props.history.location.pathname}
          />
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
    auth: state.auth,
    profile: state.profile,
    itineraries: state.itineraries,

    favid: state.favid
  };
};

export default connect(
  mapStateToProps,
  {
    fetchItinerariesHashtag,
    getCurrentProfile
  }
)(Hashtag);
