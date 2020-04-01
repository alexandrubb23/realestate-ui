import { useContext, useEffect } from "react";
import auth from "../services/AuthService";
import { FirebaseContext } from "../contexts/Firebase";

/**
 * Logout.
 *
 * @param {object} props
 */
function Logout(props) {
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    auth.logout();
    firebase.auth().signOut();

    window.location = "/";
  }, [firebase]);

  return null;
}

export default Logout;
