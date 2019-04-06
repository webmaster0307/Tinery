import React, { Component } from "react";
import { Link } from "react-router-dom";

import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

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

              {/* HASHTAG WITH LINK PROPS */}
              <Grid item xs={12}>
                <div>
                  • Hashtags:{" "}
                  {this.props.hashtag.map(item => {
                    return (
                      <React.Fragment key={item + item}>
                        {" "}
                        <Link
                          to={{
                            pathname:
                              "/hashtag/" + item.toLowerCase().replace("#", ""),
                            state: {
                              hashtag: { item }
                            }
                          }}
                        >
                          <span className="hashtagTags">{item}</span>
                        </Link>{" "}
                      </React.Fragment>
                    );
                  })}
                </div>
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
