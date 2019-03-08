import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profileActions";
import { fetchFavorites } from "../actions/profileActions";
import { fetchAxiosItineraries } from "../actions/fetchItineraries";
import { removeFavorites } from "../actions/profileActions";

// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";

// import Typography from "@material-ui/core/Typography";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// import Favorite from "@material-ui/icons/Favorite";

// REMOVE FAVORITES

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isBtn: false,
      // eventId: "",
      itineraries: [],
      favoriteIDs: this.props.auth.user.favorites,
      favorites: [],
      profile: []
      // activities: [],
      // comments: [],
      // open: false
    };
    this.removeFav = this.removeFav.bind(this);
  }
  componentDidMount() {
    // let favoritesArr = this.props.auth.user.favorites;
    // // this.props.fetchFavorites("5c6162cee7179a22d682ef84");
    // favoritesArr.forEach(favorite => {
    //   this.props.fetchFavorites(favorite);
    //   // console.log(favorite);
    // });
    // this.setState({
    //   cities: this.props.cities.cities
    // });
    // console.log(this.state.profile);
    // console.log(this.props);
  }

  componentWillUnmount() {
    // console.log("will unmount");
  }

  removeFav = event => {
    let eventTargetId = event;
    let favData = {
      favorites: eventTargetId
    };
    let userID = this.props.auth.user.id;
    console.log("user id", userID);
    console.log("itin id", favData);
    // console.log(eventTargetId);
    // this.props.removeFavorites();
    this.props.removeFavorites(userID, favData);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props;
    // console.log("props", this.props.auth);
    console.log("props.profile", this.props);
    console.log("state.profile", this.state);
    // console.log("path", this.props.auth.user.favorites);

    // const listFavorites = this.props.profile.favorites
    //   .toString()
    //   .map(favorites => (
    //     <Card key={favorites}>
    //       <div>{favorites}</div>
    //       <FavoriteBorder onClick={this.removeFav.bind(this, favorites)} />
    //     </Card>
    //   ));

    // const listFavorites = this.props.auth.user.favorites.map(favorites => (
    //   <Card key={favorites}>
    //     <div>{favorites}</div>
    //     <FavoriteBorder onClick={this.removeFav.bind(this, favorites)} />
    //   </Card>
    // ));

    // const favorites = (
    //   <div>
    //   <p>Favorites App</p>

    //   </div>
    // );
    return (
      <React.Fragment>
        <p>Favorites App</p>
        {/* {this.state.favoriteIDs} */}
      </React.Fragment>
    );
  }
}

Favorites.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  // deleteAccount: PropTypes.func.isRequired,
  favorites: PropTypes.array,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth,
    errors: state.errors,
    itineraries: state.itineraries,
    favorites: state.favorites
  };
};

// export default Favorites;

export default connect(
  mapStateToProps,
  { getCurrentProfile, fetchFavorites, removeFavorites, fetchAxiosItineraries }
)(Favorites);
