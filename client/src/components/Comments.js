import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { fetchAxiosComments } from "../actions/fetchComments";
import { postAxiosComments } from "../actions/postComments";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class Comments extends Component {
  componentDidMount() {
    // console.log(this.props);
  }
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      user: "",
      timestamp: "",
      activitykey: "",
      comments: []
      // activitykey: this.props.comments.comment.activitykey
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let comments = {
      user: this.state.user,
      message: this.state.message,
      timestamp: moment(Date.now()).format("LLLL"),
      activitykey: this.props.activityKey
    };
    console.log(comments);
    this.props.postAxiosComments(comments);
    this.setState({
      user: "",
      message: "",
      timestamp: "",
      activitykey: ""
    });
    // REFRESH COMMENTS (NOT NEEDED)
    // this.props.fetchAxiosComments(this.props.activityKey);
  };

  render() {
    //COMMENT LIST
    const commentList = this.props.comments.comments.map(comment => (
      <div className="comments" key={comment._id + comment.user}>
        {/* <Paper elevation={3}> */}
        <p>
          <span className="commentUser">{comment.user}</span> :{comment.message}
        </p>
        <p className="commentTimestamp">{comment.timestamp}</p>
        {/* </Paper> */}
      </div>
    ));

    //COMMENT FORM
    const commentForm = (
      <Card raised className="commentForm">
        <form onSubmit={this.onSubmit}>
          <div>
            {/* <span>Please enter your username:</span> */}
            <TextField
              className="commentFormTA"
              id="outlined-with-placeholder"
              label="Please enter your username:"
              placeholder=""
              margin="normal"
              variant="outlined"
              type="text"
              name="user"
              value={this.state.user}
              onChange={this.onChange}
            />
          </div>

          <TextField
            className="commentFormTA"
            id="outlined-with-placeholder"
            label="Leave a Comment:"
            placeholder=""
            margin="normal"
            variant="outlined"
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.onChange}
          />

          <div>
            <button className="submitCommentBtn" type="submit" value="Submit">
              Submit
            </button>
          </div>
        </form>
      </Card>
    );

    return (
      <div className="Comments">
        <Typography
          component="h2"
          variant="display1"
          gutterBottom
          className="activtytitle"
        >
          Comments:
        </Typography>
        <div>{commentForm}</div>
        <div>{commentList.reverse()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onSubmit: comment => {
//       dispatch(postAxiosComments(comment));
//     }
//   };
// };

// export default connect(
//   mapDispatchToProps,
//   mapStateToProps,
//   { fetchAxiosComments, postAxiosComments }
// )(Comments);

export default connect(
  mapStateToProps,
  { fetchAxiosComments, postAxiosComments }
)(Comments);
