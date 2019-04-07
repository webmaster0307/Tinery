import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../actions/profileActions";
import { removeFavorites } from "../actions/profileActions";
import { fetchAxiosItinerariesID } from "../actions/profileActions";

import IconCity from "../components/layout/IconCity";
import Header from "../components/layout/Header";
import ItinCard from "../components/layout/ItinCard";

import Card from "@material-ui/core/Card";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      itineraries: [],
      favid: [],
      favitin: [],
      profile: []
    };
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

  render() {
    const { user } = this.props.auth;
    let favitin = this.props.profile.favitin;

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

    const listFavoriteIDs = favitin.map((itinerary, i) => (
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
          history={this.props.history.location.pathname}
        />
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
