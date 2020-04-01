import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/Form";
import FirebaseAuth from "./FirebaseAuth";
import auth from "../services/AuthService";

class LoginForm extends Form {
  /**
   * @inheritdoc
   */
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  /**
   * @inheritdoc
   */
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  /**
   * @inheritdoc
   */
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      // redirect to homepage
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;

        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <FirebaseAuth {...this.props} />
      </div>
    );
  }
}

export default LoginForm;
