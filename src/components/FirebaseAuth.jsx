import React, { useState, useEffect, useContext } from "react";
import { loginWithJwt } from "../services/AuthService";
import { FirebaseContext } from "../contexts/Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function FirebaseAuth(props) {
  /**
   * User firebase context.
   *
   * @const {object}
   */
  const firebase = useContext(FirebaseContext);

  /**
   * Current location.
   *
   * @const {object}
   */
  const { state } = props.location;

  /**
   * Ui config.
   *
   * @const {object}
   */
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: state ? state.from.pathname : "/",
    callbacks: {
      signInSuccessWithAuthResult: async result => {
        const user = result.user;
        const jwt = await user.getIdToken();

        loginWithJwt(jwt);
      }
    }
  };

  const [isSignedIn, setIsSignedIn] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn({ user });
    });
  }, [firebase, setIsSignedIn]);

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}

export default FirebaseAuth;
