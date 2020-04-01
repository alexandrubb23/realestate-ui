import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import currencies from "../utils/currencies";
import { getCategories } from "../services/CategoryService";
import { getProperty, saveProperty } from "../services/PropertiesService";
import { toast } from "react-toastify";
import GoogleMap from "./common/GoogleMap";
import MediaUpload from "./common/MediaUpload";

class PropertyForm extends Form {
  /**
   * Current state.
   *
   * @property {object}
   */
  state = {
    data: {
      title: "",
      categoryId: "",
      description: "",
      price: "",
      currency: "",
      lng: "",
      lat: "",
      images: []
    },
    categories: [],
    currencies: [],
    errors: {},
    images: []
  };

  /**
   * Schema.
   *
   * @property {object}
   */
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    categoryId: Joi.string()
      .required()
      .label("Category"),
    description: Joi.string()
      .required()
      .label("Description"),
    price: Joi.number()
      .required()
      .min(1)
      .max(1000000000)
      .label("Price"),
    currency: Joi.string()
      .required()
      .label("Currency"),
    lng: Joi.number()
      .required()
      .label("Longitude"),
    lat: Joi.number()
      .required()
      .label("Latitude"),
    images: Joi.any().required()
  };

  /**
   * Populate categories.
   *
   * @async
   * @returns
   */
  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  /**
   * Populate properties.
   *
   * @async
   * @returns
   */
  async populateProperty() {
    try {
      const propertyId = this.props.match.params.id;
      if (propertyId === "new") return;

      const { data: property } = await getProperty(propertyId);
      this.setState({ data: this.mapToViewProperty(property) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  /**
   * Component is mounted.
   *
   * @returns
   */
  async componentDidMount() {
    await this.populateCategories();
    await this.populateProperty();
  }

  /**
   * Map property to view.
   *
   * @param {object} property
   * @returns {object}
   */
  mapToViewProperty(property) {
    const { lat, lng } = property.location.coordinates;

    return {
      _id: property._id,
      title: property.title,
      categoryId: property.category._id,
      description: property.description,
      price: property.price,
      currency: property.currency,
      lat,
      lng,
      images: property.images
    };
  }

  /**
   * Save property.
   *
   * @returns
   */
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await saveProperty(data);

      toast.success(`${data.title} was saved.`);

      this.props.history.push("/properties");
    } catch (ex) {
      return null;
    }
  };

  /**
   * Handle images data state.
   *
   * @param {array}
   * @returns
   */
  handleDataImages = images => {
    const data = { ...this.state.data };
    data.images = images;

    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Property Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("categoryId", "Category", this.state.categories)}
          {this.renderTextArea("description", "Description")}
          {this.renderInput("price", "Price")}
          {this.renderSelect(
            "currency",
            "Currency",
            currencies(),
            "name",
            "name"
          )}
          <GoogleMap
            lat={data.lat || 0}
            lng={data.lng || 0}
            onDrag={this.onDrag}
          />
          {this.renderInput("lat", "Latitude")}
          {this.renderInput("lng", "Longitude")}
          <MediaUpload
            dataImages={data.images}
            onHandleDataImage={this.handleDataImages}
            showImageGallery={true}
          />
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default PropertyForm;
