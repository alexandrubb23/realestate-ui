import React, { Fragment, useState, useEffect } from "react";
import _ from "lodash";

import { v4 } from "uuid";
import { getImages, saveImage } from "../../services/ImageService";

function MediaUpload({
  dataImages,
  onHandleDataImage,
  showImageGallery = true,
}) {
  /**
   * Images state.
   *
   * @const
   */
  const [stateImages, setImagesState] = useState([]);

  /**
   * Life cycle (CMD).
   *
   * @function
   * @returns
   */
  useEffect(() => {
    async function getAllImages() {
      const { data: images } = await getImages();

      setImagesState(images);
    }

    getAllImages();
  }, [setImagesState]);

  /**
   * Upload file to the server.
   *
   * @param {object} file
   */
  const uploadFile = async file => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    try {
      const images = [...stateImages];
      const { data: image } = await saveImage(formData);

      images.push(image);
      setImagesState(images);
    } catch (ex) {
      return null;
    }
  };

  /**
   * Append selected file.
   *
   * @param {object}
   */
  const appendPreviewImage = file => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const preview = {
        id: stateImages.length + 1,
        name: file,
        src: reader.result,
        uploadInProgress: true,
      };

      const images = [...stateImages];
      images.push(preview);

      setImagesState(images);
    };

    reader.readAsDataURL(file);
  };

  /**
   * Handle change.
   *
   * @param {object} e
   */
  const handleChange = async e => {
    e.preventDefault();
    const file = e.target.files[0];

    const fileUploaded = await uploadFile(file);
    if (!fileUploaded) return null;

    appendPreviewImage(file);
  };

  /**
   * Handle a selected image.
   *
   * @param {*} image
   * @returns
   */
  const handleSelectedImage = image => {
    image = _.has(image, "src") ? image.src : image;

    if (_.includes(dataImages, image)) {
      const index = dataImages.indexOf(image);
      dataImages.splice(index, 1);
    } else {
      dataImages.push(image);
    }

    onHandleDataImage(dataImages);
  };

  /**
   * Show selected images as a gallery.
   *
   * @returns {string}
   */
  const showGallery = () => {
    return (
      dataImages.length > 0 &&
      showImageGallery && (
        <div className="row text-center text-lg-left">
          {dataImages.map(image => (
            <div key={v4()} className="col-lg-3 col-md-4 col-6">
              <div className="d-block mb-4 h-100 custom-control custom-checkbox image-checkbox">
                <img
                  className="img-fluid img-thumbnail"
                  src={image}
                  alt=""
                  onClick={() => handleSelectedImage(image)}
                />
              </div>
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary m-2"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Media Upload
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Media Files
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row text-center text-lg-left">
                {stateImages.map(image => (
                  <div key={image._id} className="col-lg-3 col-md-4 col-6">
                    <a
                      href="#!"
                      className="d-block mb-4 h-100 custom-control custom-checkbox image-checkbox"
                    >
                      <input
                        type="checkbox"
                        checked={_.includes(dataImages, image.src)}
                        className="custom-control-input"
                        id={image._id}
                        onChange={() => handleSelectedImage(image)}
                      />

                      <label
                        className="custom-control-label"
                        htmlFor={image._id}
                      >
                        <img
                          style={{
                            opacity: _.has(image, "uploadInProgress")
                              ? "0.5"
                              : "1",
                          }}
                          className="img-fluid img-thumbnail"
                          src={image.src}
                          alt=""
                        />
                      </label>
                    </a>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlFile1"></label>
                <input
                  accept="image/*"
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  onChange={handleChange}
                  value={""}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {showGallery()}
    </Fragment>
  );
}

export default MediaUpload;
