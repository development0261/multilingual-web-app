import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { db } from "../firebase";
function UserlistData(props) {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    db.collection("user-data").onSnapshot((snapshot) => {
      setUserData(
        snapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
  }, []);
  const deleteUSerData = (id) => {
    let deleteQuery = db.collection("user-data").where("id", "==", id);
    deleteQuery.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.latitude}</td>
              <td>{user.longitude}</td>
              <td>
                <button onClick={() => deleteUSerData(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserlistData;
