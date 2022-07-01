import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
export const serverStamp = firebase.firestore.Timestamp;
export default function AddUserData() {
  //   const idRef = useRef();
  //   const nameRef = useRef();
  //   const geoLocationRef = useRef();
  //   const longitude =useState()
  //   const dateRef = useRef();
  const UserData = db.collection("users-data");
  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    latitude: "",
    longitude: "",
    date: serverStamp.now(),
  });
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    allowToGeoLocation();
  }, []);

  const changeFormValue = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const allowToGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setFormValue((prevState) => ({
          ...prevState,
          ["latitude"]: position.coords.latitude,
          ["longitude"]: position.coords.longitude,
        }));

      });
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
 

    // await setDoc(doc(db, "users-data"), formValue);

    await db
      .collection("user-data")
      .add(formValue)
      .then(() => {
        alert("Successfully Submitted");
      })
      .catch((error) => {
        alert("Failed to create record " + error);
      });
    // setLoading(true)
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match");
    // }

    // try {
    //   setError("");
    //   setLoading(true);
    //   await signup(emailRef.current.value, passwordRef.current.value);
    //   history.push("/");
    // } catch {
    //   setError("Failed to create an account");
    // }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add your detailes</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="id">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="number"
                name="id"
                value={formValue.id}
                onChange={changeFormValue}
                required
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValue.name}
                onChange={changeFormValue}
                required
              />
            </Form.Group>
            {/* <Form.Group id="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date"  required />
            </Form.Group> */}
            <Form.Group id="geoLocation">
              <Form.Label>Latitude </Form.Label>
              <Form.Control
                type="text"
                name="latitude"
                required
                value={formValue.latitude}
                onChange={changeFormValue}
              />

              <Form.Label>Longitude </Form.Label>
              <Form.Control
                type="text"
                name="longitude"
                required
                value={formValue.longitude}
                onChange={changeFormValue}
              />

              {/* <Button className="w-100" type="button" onClick={allowToGeoLocation}>
                Click to allow geo location
              </Button> */}
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
