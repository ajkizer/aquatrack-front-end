import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navigation/Navbar";
import { Container } from "react-bootstrap";
import UserAuth from "../pages/Auth/UserAuth";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
const Routing = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/" component={UserAuth} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Container>
    </>
  );
};

export default Routing;
