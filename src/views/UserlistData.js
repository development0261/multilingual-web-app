import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button, InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { db } from "../firebase";
import { useTranslation } from "react-i18next";

function UserlistData(props) {
  const { t } = useTranslation();
  const [userData, setUserData] = useState([]);
  const [searchStatus, setSearchStatus] = useState(true);
  const [searchField, setSearchField] = useState("");
  useEffect(() => {
    db.collection("user-data").onSnapshot((snapshot) => {
      setUserData(
        snapshot.docs.map((doc) => {
          return { uid: doc.id, ...doc.data() };
        })
      );
    });
  }, []);

  const deleteUSerData = (id) => {
    db.collection("user-data").doc(id).delete();
  };

  function handleChange(e) {
    setSearchField(e.target.value);
    if (e.target.value !== "") {
      setSearchStatus(false);
    }
  }

  const searchHandle = () => {
    const filteredPersons = userData.filter((person) => {
      return (
        person.name.toLowerCase().includes(searchField.toLowerCase()) ||
        person.address.toLowerCase().includes(searchField.toLowerCase())
      );
    });
    setUserData(filteredPersons);
  };
  return (
    <>
      <h2 className="mt-2"> {t("Users data")}</h2>
      <InputGroup size="lg" className="mt-5">
        <InputGroup.Text id="inputGroup-sizing-lg">Q</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="search"
          placeholder={t("Search by name or Search by address")}
          onChange={handleChange}
        />
        <Button
          variant="outline-primary"
          disabled={searchStatus}
          onClick={searchHandle}
        >
          {t("Search")}
        </Button>
      </InputGroup>

      <Table striped bordered hover className="mt-5" responsive>
        <thead>
          <tr>
            <th>{t("Id")}</th>
            <th>{t("Name")}</th>
            <th>{t("Latitude")}</th>
            <th>{t("Longitude")}</th>
            <th>{t("Address")}</th>
            <th>{t("Action")}</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.latitude}</td>
              <td>{user.longitude}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => deleteUSerData(user.uid)}>
                  {t("Delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserlistData;
