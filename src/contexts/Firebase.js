import React from "react";
import app from "firebase";
import { firebase } from "../config.json";

/**
 * Create firebase context
 *
 * @const {object}
 */
const FirebaseContext = React.createContext(null);

export { FirebaseContext };

export default ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: firebase.apiKey || "default",
      authDomain: firebase.authDomain
    });
  }

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};
