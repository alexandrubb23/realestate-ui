import React, { Fragment } from "react";
import { GoogleMap as Map, Marker, LoadScript } from "@react-google-maps/api";
import { googleMap } from "../../config.json";

/**
 * GoogleMap.
 *
 * Set apiKey inside of config.json
 *
 * @param {object} param0
 */
function GoogleMap({ lat, lng, onDrag }) {
  /**
   * Map style.
   *
   * @const
   */
  const mapContainerStyle = {
    height: "400px",
    width: "100%"
  };

  /**
   * Position on map.
   *
   * @const
   */
  const position = {
    lat: parseFloat(lat) || 0,
    lng: parseFloat(lng) || 0
  };

  const apiKey = googleMap.apiKey;
  if (!apiKey)
    return (
      <div className="alert alert-danger">GoogleMap API key is missing.</div>
    );

  return (
    <Fragment>
      <LoadScript id="script-loader" googleMapsApiKey={apiKey}>
        <Map
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={2}
          center={position}
        >
          <Marker
            position={position}
            draggable={true}
            onDrag={e => {
              onDrag(e.latLng);
            }}
          />
        </Map>
      </LoadScript>
    </Fragment>
  );
}

export default GoogleMap;
