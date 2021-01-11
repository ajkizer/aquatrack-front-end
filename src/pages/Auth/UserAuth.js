import React, { useEffect, useState } from "react";
import Login from "../../components/Auth/Login";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

const UserAuth = () => {
  return (
    <Container>
      <Login />
    </Container>
  );
};

export default UserAuth;
