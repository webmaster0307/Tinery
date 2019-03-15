// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// // import { getCurrentProfile } from "../actions/profileActions";
// // import { fetchFavorites } from "../actions/profileActions";
// // import { fetchAxiosItineraries } from "../actions/fetchItineraries";
// import { removeFavorites } from "../actions/profileActions";
// import { fetchAxiosItinerariesID } from "../actions/profileActions";

// // import Card from "@material-ui/core/Card";
// // import CardContent from "@material-ui/core/CardContent";

// // import Typography from "@material-ui/core/Typography";
// // import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// // import Favorite from "@material-ui/icons/Favorite";

// class Favorites extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       favid: [],
//       favitin: [],
//       profile: []

//       // activities: [],
//       // comments: [],
//       // open: false
//     };
//     this.removeFav = this.removeFav.bind(this);
//   }
//   componentDidMount() {
//     // let favoritesArray = this.props.id;
//     let favoritesArray = this.props.profile.favid;
//     // console.log("cdm favorites", favoritesArray);
//     // console.log("cdm favorites", this.props.profile.favid);

//     this.props.fetchAxiosItinerariesID(favoritesArray);
//     // this.setState({

//     // });
//   }

//   removeFav = event => {
//     let eventTargetId = event;
//     let favData = {
//       favorites: eventTargetId
//     };
//     let userID = this.props.auth.user.id;

//     this.props.removeFavorites(userID, favData.favorites);
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <p>Favorites App</p>
//         {this.props.id}
//         {this.props.profile.favid}
//         {console.log("from fav state", this.state)}
//         {console.log("from fav props", this.props)}
//       </React.Fragment>
//     );
//   }
// }

// Favorites.propTypes = {
//   // getCurrentProfile: PropTypes.func.isRequired,
//   // deleteAccount: PropTypes.func.isRequired,
//   favorites: PropTypes.array,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => {
//   return {
//     favid: state.favid,

//     // errors: state.errors,
//     profile: state.profile,
//     auth: state.auth
//   };
// };

// // export default Favorites;

// export default connect(
//   mapStateToProps,
//   { fetchAxiosItinerariesID, removeFavorites }
// )(Favorites);
