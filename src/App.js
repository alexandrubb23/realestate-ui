import React, { Fragment, useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import Properties from "./components/Properties";
import PropertyForm from "./components/PropertyForm";
import NotFound from "./components/NotFound";
import Customers from "./components/Customers";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import auth from "./services/AuthService";
import FirebaseProvider from "./contexts/Firebase";
import UserContext from "./contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

/**
 * React-toastify.
 */
toast.configure();

function App() {
  /**
   * Current user state.
   *
   * @const
   */
  const [currentUser, setCurrentUser] = useState({});

  /**
   * Change user state.
   *
   * @returns
   */
  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
  }, [setCurrentUser]);

  /**
   * Instead injecting current user in different
   * components, I used "context" just for demonstration
   */
  return (
    <Fragment>
      <FirebaseProvider>
        <UserContext.Provider value={currentUser}>
          <NavBar name="Alex" />
          <main className="container">
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <ProtectedRoute path="/properties/:id" component={PropertyForm} />
              <Route
                path="/properties"
                render={props => <Properties {...props} />}
              />
              <Route path="/customers" component={Customers} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/properties" />
              <Redirect to="/not-found"></Redirect>
            </Switch>
          </main>
        </UserContext.Provider>
      </FirebaseProvider>
    </Fragment>
  );
}

export default App;
