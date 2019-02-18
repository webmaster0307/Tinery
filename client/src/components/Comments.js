import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import moment from "moment";
import { fetchAxiosComments } from "../actions/fetchComments";
import { postAxiosComments } from "../actions/postComments";

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

  // onSubmit = e => {
  //   e.preventDefault();
  //   let comments = {
  //     user: this.state.user,
  //     message: this.state.message,
  //     // timestamp: moment(Date.now()).format("lll"),
  //     timestamp: moment(Date.now()).format("LLLL"),
  //     activitykey: this.props.activityKey
  //   };
  //   // console.log(comments);
  //   axios.post("/api/comment", comments).then(res => console.log(res.data));
  //   this.setState({
  //     user: "",
  //     message: "",
  //     timestamp: "",
  //     activitykey: ""
  //   });
  //   // let eventTargetId = this.onChange.target.id;
  //   this.props.fetchAxiosComments(this.props.activityKey);
  // };

  render() {
    //COMMENT LIST
    const commentList = this.props.comments.comments.map(comment => (
      <div className="comments col" key={comment._id + comment.user}>
        <p>
          <span className="commentUser">{comment.user}</span> :{comment.message}
        </p>
        <p className="commentTimestamp">
          {/* <p>{moment(comment.timestamp).format("LTS")}</p> */}
          {/* {moment.utc(comment.timestamp).format("LLLL")} */}
          {comment.timestamp}
        </p>
      </div>
    ));

    //COMMENT FORM
    const commentForm = (
      <div className="commentForm card z-depth-2">
        <form onSubmit={this.onSubmit}>
          <label className="center-align" htmlFor="">
            Please enter your username:
          </label>
          <input
            type="text"
            name="user"
            value={this.state.user}
            onChange={this.onChange}
          />
          <label className="center-align" htmlFor="">
            Leave a Comment:
          </label>
          <textarea
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.onChange}
          />
          <div>
            <button className="viewActivityBtn" type="submit" value="Submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );

    return (
      <div className="Comments texta-lign">
        <p className="card center-align z-depth-2">Comments:</p>
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
