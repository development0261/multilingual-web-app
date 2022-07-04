import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import Geocode from "react-geocode";

import { useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { db } from "../firebase";
import { useTranslation } from "react-i18next";
import Map from "./MapContainer";
export const serverStamp = firebase.firestore.Timestamp;

const AddUserData = (props) => {
  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    latitude: "",
    longitude: "",
    address: "",
    date: serverStamp.now(),
  });
  useEffect(() => {
    allow();
  }, []);

  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const changeFormValue = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    await db
      .collection("user-data")
      .add(formValue)
      .then(() => {
        alert("Successfully Submitted");
        history.push("/userlist");
      })
      .catch((error) => {
        alert("Failed to create record " + error);
      });

    setLoading(false);
  }

  const getReverseGeocodingData = () => {
    // Api key
    Geocode.setApiKey("");

    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");

    // set location_type filter . Its optional.
    // google geocoder returns more that one address for given lat/lng.
    // In some case we need one address as response for which google itself provides a location_type filter.
    // So we can easily parse the result for fetching address components
    // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
    // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
    Geocode.setLocationType("ROOFTOP");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    // Get address from latitude & longitude.
    Geocode.fromLatLng(
      formValue.latitude.toString(),
      formValue.longitude.toString()
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;

        setFormValue((prevState) => ({
          ...prevState,
          ["address"]: address,
        }));
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const allow = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.watchPosition(function (position) {
        setFormValue((prevState) => ({
          ...prevState,
          ["latitude"]: position.coords.latitude,
          ["longitude"]: position.coords.longitude,
        }));
      });
    }
  };

  useEffect(() => {
    getReverseGeocodingData();
  }, [formValue.latitude, formValue.longitude]);

  return (
    <>
      <>
        <div>
          <Map
            latitude={formValue?.latitude}
            longitude={formValue?.longitude}
          />
        </div>
        <div>
          <Card className="mr-5">
            <Card.Body>
              <h2 className="text-center mt-5">{t("Add your detailes")}</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>{t("Name")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formValue.name}
                    onChange={changeFormValue}
                    required
                  />
                </Form.Group>
                <Form.Group id="geoLocation">
                  <Form.Label>{t("Latitude")} </Form.Label>
                  <Form.Control
                    type="text"
                    name="latitude"
                    required
                    value={formValue.latitude}
                    disabled
                  />
                  <Form.Label>{t("Longitude")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="longitude"
                    required
                    value={formValue.longitude}
                    disabled
                  />
                  <Form.Label>{t("Address")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    required
                    value={formValue.address}
                    onChange={changeFormValue}
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  {t("Submit")}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </>
    </>
  );
};

export default AddUserData;
