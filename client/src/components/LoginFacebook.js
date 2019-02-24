import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

export default class LoginFacebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  responseFacebook = response => {
    console.log(response);

    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  logoutFacebook = response => {
    console.log(response);

    this.setState({
      isLoggedIn: false,
      userID: "",
      name: "",
      email: "",
      picture: ""
    });
  };

  componentClicked = () => console.log("clicked");

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
          <button onClick={this.logoutFacebook} icon="fa-facebook">
            Logout of Facebook
          </button>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="284220635589707"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          cssClass="fb-login-button"
          icon="fa-facebook"
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}
