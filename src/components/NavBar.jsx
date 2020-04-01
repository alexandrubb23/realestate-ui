import React, { useContext, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function NavBar(props) {
  /**
   * Use user context.
   *
   * @const {object}
   */
  const currentUser = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <i className="realestate-icon"></i> Real Estate
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/properties">
            Properties <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          {!currentUser && (
            <Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </Fragment>
          )}
          {currentUser && (
            <Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {currentUser.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
