import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";

class Comments extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  constructor() {
    super();
    this.state = {
      message: "",
      user: "",
      timestamp: "",
      activitykey: ""
      // activitykey: this.props.comments.comment.activitykey
    };
  }

  handleChange = event => {
    // console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  postMessage = event => {
    event.preventDefault();
    let comments = {
      user: this.state.user,
      message: this.state.message,
      // timestamp: this.state.timestamp,
      timestamp: moment(Date.now()).format("lll"),
      activitykey: this.props.activityKey
    };
    console.log(comments);
    axios.post("/api/comment", comments).then(res => console.log(res.data));
    this.setState({
      user: "",
      message: "",
      timestamp: "",
      activitykey: ""
    });
    // fetch(URL, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     user: this.state.user,
    //     message: this.state.message,
    //     timestamp: Date.now(),
    //     activitykey: this.activitykey
    //   })
    // })
    // .then(res => {
    //   if (res.status === 200) {
    //     //   console.log('Request success: ', res)
    //     this.setState({
    //       user: "",
    //       message: "",
    //       timestamp: ""
    //       // activitykey: ""
    //     });
    //   } else {
    //     //   console.log('Request failure: ', res)
    //   }
    // })
    // .catch(error => {
    //   // console.log('Request failure: ', error)
    // });
  };

  render() {
    // console.log("from comments", this.props.comments);
    // console.log("from comments", this.props.comments.comments);
    const commentList = this.props.comments.comments.map(comment => (
      <div className="comments col" key={comment.message}>
        <p>
          <span className="commentUser">{comment.user}</span> :{comment.message}
        </p>
        {/* <p>{moment(comment.timestamp).format("LTS")}</p> */}
        <p className="commentTimestamp">
          {moment(comment.timestamp).format("LLLL")}
        </p>
      </div>
    ));
    const commentForm = (
      <div className="commentForm card z-depth-2">
        <form onSubmit={this.postMessage}>
          <label className="center-align" htmlFor="">
            Please enter your username:
          </label>
          <input
            type="text"
            name="user"
            value={this.state.user}
            onChange={this.handleChange}
          />
          <label className="center-align" htmlFor="">
            Leave a Comment:
          </label>
          <textarea
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
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
        <div>{commentList}</div>
        {/* <div>{commentForm}</div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // // let id = ownProps.match.params.city_name;
  return {
    // itineraries: state.itineraries,
    comments: state.comments
  };
};

export default connect(
  mapStateToProps,
  {}
)(Comments);
