import React, { Component } from "react";
// import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";

const responseGoogle = response => {
  console.log(response);
};

export default class LoginGoogle extends Component {
  render() {
    return (
      <div>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        ,
      </div>
    );
  }
}
