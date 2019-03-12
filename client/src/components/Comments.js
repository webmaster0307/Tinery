import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import {
  fetchAxiosComments,
  postAxiosComments
} from "../actions/commentActions";
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
      errors: {},
      comments: [],
      input: ""

      // activitykey: this.props.comments.comment.activitykey
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount() {
    // console.log("unmount");
    // this.setState(state => ({
    //   errors: null
    // }));
    // if (this.props.errors) {
    //   this.setState({ errors: null });
    // }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      input: e.target.value
    });
    // console.log(e.target.name);
    // console.log(e.target.value);
    // console.log(this.state.input);
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
    // console.log(comments);
    this.props.postAxiosComments(comments);
    this.setState({
      user: "",
      avatar: "",
      message: "",
      timestamp: "",
      activitykey: ""
    });
    // REFRESH COMMENTS (NOT NEEDED)
    // this.props.fetchAxiosComments(this.props.activityKey);
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
    // console.log(comments);
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
    // const { isAuthenticated, user } = this.props.auth;
    const { isAuthenticated } = this.props.auth;
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
    const commentFormGuest = (
      <Card raised className="commentForm">
        <form onSubmit={this.onSubmit}>
          <div>
            {/* <span>Please enter your username:</span> */}
            <TextField
              className="commentFormInput"
              id="outlined-with-placeholder"
              label="Please enter your Username:"
              placeholder=""
              margin="normal"
              variant="outlined"
              type="text"
              name="user"
              value={this.state.user}
              onChange={this.onChange}
              errorform={errors.user}
            />
            {errors.user && (
              <div className="invalid-feedback">{errors.user}</div>
            )}
          </div>
          {/* minlength="10"
              maxlength="300" */}
          <div>
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
          </div>
          <div>
            {/* TERN */}
            <button className="submitCommentBtn" type="submit" value="Submit">
              Submit
            </button>
          </div>
        </form>
      </Card>
    );

    const commentFormLoggedIn = (
      <Card raised className="commentForm">
        <form onSubmit={this.onSubmitLoggedIn}>
          <div>
            {/* <div>{user.username}</div> */}
            <div>{this.props.auth.user.username}</div>
          </div>

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
              <button className="submitCommentBtn" type="submit" value="Submit">
                Submit
              </button>
            ) : (
              <button
                disabled
                className="loginButtonDisabled"
                type="submit"
                value="Submit"
              >
                *minimum 8 characters required
              </button>
            )}
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
        <div>{isAuthenticated ? commentFormLoggedIn : commentFormGuest}</div>
        {/* <div>{commentForm}</div> */}
        <div>{commentList.reverse()}</div>
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

// const mapDispatchToProps = dispatch => {
//   return {
//     onSubmit: comment => {
//       dispatch(postAxiosComments(comment));
//     }
//   };
// };

export default connect(
  mapStateToProps,
  { fetchAxiosComments, postAxiosComments }
)(Comments);
