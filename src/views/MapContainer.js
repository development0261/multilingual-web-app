import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "50%",
  height: "50%",
};
const MapContainer = (props) => {
  return (
    <Map className="ml-5" google={props?.google} zoom={10} style={mapStyles}>
      <Marker position={{ lat: props?.latitude, lng: props?.longitude }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "",
})(MapContainer);
