import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class ItinCardtitle extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid item xs={9}>
          <div className="activtytitle">
            <h3>{this.props.title}</h3>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ItinCardtitle;
