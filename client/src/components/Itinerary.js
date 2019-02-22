import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { fetchAxiosItineraries } from "../actions/fetchItineraries";
import { fetchAxiosActivities } from "../actions/fetchActivities";
import { fetchAxiosComments } from "../actions/fetchComments";
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
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";

class Itinerary extends Component {
  // state = {
  //   container: {
  //     display: "grid"
  //   },
  //   paper: {
  //     textAlign: "center",
  //     whiteSpace: "nowrap"
  //   },
  //   bigAvatar: {
  //     margin: 10,
  //     width: 60,
  //     height: 60
  //   }
  // };

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

    this.setState(state => ({
      eventId: eventTargetId,
      isBtn: !state.isBtn
    }));
  }
  render() {
    const listItin = this.props.itineraries.itineraries.map(itinerary => (
      <div className="" key={itinerary.title}>
        <div className="itineraryCard">
          <Card raised>
            {/* <CardMedia
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              /> */}
            <CardContent>
              <Typography
                className="activtytitle"
                gutterBottom
                variant="h4"
                component="h2"
              >
                {itinerary.title}
              </Typography>
              {/* AVATAR */}
              {/* <Grid item xs={3}> */}
              {/* <Avatar src={itinerary.authorimage} /> */}
              {/* </Grid> */}
              <div>
                <Grid container spacing={24}>
                  <Grid item xs={3}>
                    <div>
                      <Avatar
                        className="authorIcon"
                        src={itinerary.authorimage}
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
                    <Typography>{itinerary.hashtag + " "}</Typography>
                  </Grid>
                </Grid>
              </div>

              {/* <div className="activitycard"> */}
              {/* <Grid item xs={6}>
                <Paper className="">Likes : {itinerary.likes}</Paper>
              </Grid> */}
              {/* <div className="">Likes : {itinerary.likes}</div> */}
              {/* <div className="">{itinerary.duration} Hours</div>
                <div className="">${itinerary.divrice}</div>
                <div> Rating : {itinerary.rating} out of 5 </div>
                <div className="">{itinerary.hashtag + " "}</div> */}
              {/* </div> */}
            </CardContent>
          </Card>

          {/* OLD CARD */}

          {/* <Grid container justify="center" alignItems="center">
            <i className="material-icons medium icons authorIcon">person</i>
            <Avatar className="authorIcon">{itinerary.authorimage} </Avatar>
          </Grid> */}
          {/* <div className="col s12 m8 l9"> */}
          {/* <div className="">
            <div>
              <p className="">{itinerary.title}</p>
              <span className="">Likes : {itinerary.likes}</span>
              <span className="">{itinerary.duration} Hours</span>
              <span className="">${itinerary.price}</span>
              <span> Rating : {itinerary.rating} out of 5 </span>
              <span className="">{itinerary.hashtag + " "}</span>
            </div> */}
          {/* <p> Key : {itinerary.activitykey}</p> */}
          {/* </div> */}
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
  comment: PropTypes.array
};

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
