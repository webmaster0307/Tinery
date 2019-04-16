import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import {
  fetchAxiosComments,
  postAxiosComments
} from "../actions/commentActions";

import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

class Comments extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      user: "",
      timestamp: "",
      activitykey: "",
      errors: {},
      comments: [],
      input: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount() {}

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      input: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let comments = {
      user: this.state.user,
      avatar:
        "http://www.gravatar.com/avatar/bd1eeb9418cdb0186fe316df129fc146?s=200&r=pg&d=mm",
      message: this.state.message,
      timestamp: moment(Date.now()).format("LLLL"),
      activitykey: this.props.activityKey
    };
    this.props.postAxiosComments(comments);
    this.setState({
      user: "",
      avatar: "",
      message: "",
      timestamp: "",
      activitykey: ""
    });
  };

  onSubmitLoggedIn = e => {
    e.preventDefault();
    let comments = {
      user: this.props.auth.user.username,
      avatar: this.props.auth.user.avatar,
      message: this.state.message,
      timestamp: moment(Date.now()).format("LLLL"),
      activitykey: this.props.activityKey
    };
    this.props.postAxiosComments(comments);
    this.setState({
      user: "",
      avatar: "",
      message: "",
      timestamp: "",
      activitykey: ""
    });
  };

  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    //COMMENT LIST
    const commentList = this.props.comments.comments.map(comment => (
      <div className="comments" key={comment._id + comment.user}>
        <Grid container spacing={0} direction="row">
          <Grid item xs={2} sm={6}>
            <div className="commentAvatar">
              <Avatar
                alt={comment.name}
                src={comment.avatar}
                title="Gravatar and Image Files supported."
              />
            </div>
          </Grid>
          <Grid item xs={10} sm={6}>
            <div className="commentUsername">
              <span className="commentUser">{comment.user}</span>
              <span className="commentTimestamp">
                {" "}
                on : {comment.timestamp}
              </span>
            </div>
            <div className="commentContent">• {comment.message}</div>
          </Grid>
        </Grid>
      </div>
    ));

    //COMMENT FORM
    const commentFormGuest = (
      <React.Fragment>
        <div className="commentForm">
          <form onSubmit={this.onSubmit}>
            <div className="chatUserName">Guest</div>

            <TextField
              disabled
              className="commentFormInput"
              id="outlined-with-placeholder"
              label="Leave a Comment:"
              placeholder=""
              margin="normal"
              variant="outlined"
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.onChange}
              errorform={errors.message}
            />
            {errors.message && (
              <div className="invalid-feedback">{errors.message}</div>
            )}

            <Link to="/login">
              <button
                className="loginButtonDisabled"
                type="submit"
                value="Submit"
              >
                Please Login to Comment
              </button>
            </Link>
          </form>
        </div>
      </React.Fragment>
    );

    const commentFormLoggedIn = (
      <React.Fragment>
        <div className="commentForm">
          <form onSubmit={this.onSubmitLoggedIn}>
            <div className="chatUserName">{this.props.auth.user.username}</div>

            <TextField
              className="commentFormInput"
              id="outlined-with-placeholder"
              label="Leave a Comment:"
              placeholder=""
              margin="normal"
              variant="outlined"
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.onChange}
              errorform={errors.message}
            />
            {errors.message && (
              <div className="invalid-feedback">{errors.message}</div>
            )}

            <div>
              {this.state.input.length > 7 && this.state.input.length < 300 ? (
                <button
                  className="submitCommentBtn"
                  type="submit"
                  value="Submit"
                >
                  Submit
                </button>
              ) : (
                <button
                  disabled
                  className="loginButtonDisabled"
                  type="submit"
                  value="Submit"
                >
                  *Minimum 8 characters required
                </button>
              )}
            </div>
          </form>
        </div>
      </React.Fragment>
    );

    return (
      <div className="Comments">
        {/* <Header title={"Comments"} /> */}
        <div className="commentHeading">Comments</div>
        <React.Fragment>{commentList.reverse()}</React.Fragment>
        <React.Fragment>
          {isAuthenticated ? commentFormLoggedIn : commentFormGuest}
        </React.Fragment>
      </div>
    );
  }
}

Comments.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    comments: state.comments,
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { fetchAxiosComments, postAxiosComments }
)(Comments);
