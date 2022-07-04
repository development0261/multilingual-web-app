import React from "react";
import Signup from "./Signup";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import AddUserData from "./AddUserData";
import UserlistData from "./UserlistData";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">Multilingual web app</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
          </Navbar.Collapse>
          <Nav>
            <Form.Control as="select" onChange={changeLanguageHandler}>
              <option>Select language</option>
              <option value="en">English</option>
              <option value="hn">हिन्दी</option>
            </Form.Control>
          </Nav>
        </Container>
      </Navbar>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/add-userdata" component={AddUserData} />
                <Route path="/userlist" component={UserlistData} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  );
}

export default App;
