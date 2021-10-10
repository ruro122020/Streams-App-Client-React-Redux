import React, { Component } from "react";

class GoogleAuth extends Component {
  state = { isSignedIn: null };
  componentDidMount() {
    //the callback in the second argument will be called when the additional javascript code has been succesfully
    //loaded up into gapi
    window.gapi.load("client:auth2", () => {
      //initiates async network request to google's api server and returns a promise
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_KEY,
          //scope is about the info you are wanting access to
          scope: "email",
        })
        .then(() => {
          //this.auth has a reference to the auth object from google and can be accessed throughout the component
          this.auth = window.gapi.auth2.getAuthInstance();
          console.log("this.auth", this.auth);
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          //listen for changes for isSignedIn property in the this.auth object.
          //call onAuthChange any time the users authentication status changes.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //we used an arrow function here so we don't lose the context of 'this'
  //since it is being passed as reference to the even listener
  onAuthChange = () => {
    //update state isSignedIn when user authentication status changes
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
