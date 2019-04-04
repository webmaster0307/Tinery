import React, { Component } from "react";

// import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Icon from "@material-ui/core/Icon";
// import Fab from "@material-ui/core/Fab";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";

class ItinCard extends Component {
  render() {
    return (
      <React.Fragment>
        <CardContent>
          <Grid container spacing={32} direction="row">
            <Grid item xs={5}>
              <img
                alt="profile"
                src={this.props.authorimage}
                className="dashboardImg"
              />
            </Grid>
            <Grid item xs={7}>
              <Grid item xs={8}>
                <div>• Time: {this.props.duration} Hours</div>
              </Grid>
              <Grid item xs={8}>
                <div>• Cost: {this.props.price}</div>
              </Grid>
              <Grid item xs={8}>
                <div>• Likes: {this.props.likes}</div>
              </Grid>
              <Grid item xs={8}>
                <div>• Rating: {this.props.rating}/5</div>
              </Grid>
              <Grid item xs={8}>
                <div>• Hashtags: {this.props.hashtag}</div>
              </Grid>

              <Grid item xs={8}>
                <br />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <div>By: {this.props.author}</div>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  }
}

export default ItinCard;
