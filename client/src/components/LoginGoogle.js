import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";

const responseGoogle = response => {
  console.log(response);
};

const logoutGoogle = response => {
  console.log(response);

  this.setState({
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  });
};

export default class LoginGoogle extends Component {
  render() {
    return (
      <div>
        <GoogleLogin
          clientId="24280000651-bvmpenmvj4p7dila2kni75utafi5sqc4.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        {/* CUSTOM BUTTON */}
        {/* <GoogleLogin
          clientId="24280000651-bvmpenmvj4p7dila2kni75utafi5sqc4.apps.googleusercontent.com"
          render={renderProps => (
            <button onClick={renderProps.onClick}>
              This is my custom Google button
            </button>
          )}
          buttonText="Logout"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        /> */}
        <GoogleLogout buttonText="Logout" onLogoutSuccess={logoutGoogle} />
        {/* <GoogleLogout buttonText="Logout" /> */}
      </div>
    );
  }
}
