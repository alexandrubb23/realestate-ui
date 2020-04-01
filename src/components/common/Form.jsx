import React, { Component } from "react";
import _ from "lodash";
import Joi from "joi-browser";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "../common/Select";

class Form extends Component {
  /**
   * Initial state.
   *
   * @property {object}
   */
  state = {
    data: {},
    errors: {}
  };

  /**
   * Handle change.
   *
   * @method {object}
   * @param {object} Current event
   * @returns
   */
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  /**
   * Change data state based on a callback.
   *
   * @method
   * @returns
   */
  onDrag = callback => {
    const data = { ...this.state.data };

    for (let prop in data) {
      if (_.has(callback, prop))
        data[prop] = _.isFunction(callback[prop])
          ? callback[prop]()
          : callback[prop];
    }

    this.setState({ data });
  };

  /**
   * Handle submit.
   *
   * @method
   * @param {object}
   * @returns
   */
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  /**
   * Validate.
   *
   * @method
   * @returns {object}
   */
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    return error.details.reduce(
      (errors, error) => ({ ...errors, [error.path[0]]: error.message }),
      {}
    );
  };

  /**
   * Validate property.
   *
   * @method
   * @param object
   */
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  /**
   * Render submit button.
   *
   * @param {string}
   * @returns string
   */
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  /**
   * Render select.
   *
   * @param {strin} name
   * @param {string} label
   * @param {array} options
   */
  renderSelect(name, label, options, textProperty, valueProperty) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
        textProperty={textProperty}
        valueProperty={valueProperty}
      />
    );
  }

  /**
   *  Render input.
   *
   * @param {string} name
   * @param {string} label
   * @param {string} type
   */
  renderInput(name, label, type = "text", className = "form-group") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        className={className}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  /**
   * Render textarea/
   *
   * @param {string} name
   * @param {string} label
   */
  renderTextArea(name, label) {
    const { data, errors } = this.state;
    return (
      <Textarea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
