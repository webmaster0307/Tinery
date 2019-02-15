import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Comments extends Component {
  componentDidMount() {
    console.log(this.props);
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
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  //AXIOS EXAMPLE
  onSubmit(e) {
    e.preventDefault();
    const serverport = {
      name: this.state.name,
      port: this.state.port
    };
    axios
      .post("http://localhost:4000/serverport/add", serverport)
      .then(res => console.log(res.data));

    this.setState({
      name: "",
      port: ""
    });
  }

  postMessage = event => {
    event.preventDefault();
    const comments = {
      user: this.state.user,
      message: this.state.message,
      timestamp: Date.now(),
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
          <span className="commentUser"> {comment.user} </span> :
          <span className="commentTimestamp">{comment.timestamp}</span> :
          {comment.message}
        </p>
      </div>
    ));
    // const inputForm = (
    //   <form className="send-message-form">
    //     {/* <input
    //   onChange={this.handleChange}
    //   value={this.state.message}
    //   placeholder="Type your message and hit ENTER"
    //   type="text"
    // /> */}
    //     <input placeholder="Type your message and hit ENTER" type="text" />
    //   </form>
    // );
    const inputForm = (
      <div>
        <form onSubmit={this.postMessage}>
          <label htmlFor="">Please enter your username:</label>
          <input
            type="text"
            name="user"
            value={this.state.user}
            onChange={this.handleChange}
          />
          <label htmlFor="">Leave a Comment:</label>
          <textarea
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <div>
            <button type="submit" value="Submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );

    return (
      <div className="Comments">
        <h3>Comments:</h3>
        <div>{inputForm}</div>
        <div>{commentList}</div>
        {/* <div>{inputForm}</div> */}
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
