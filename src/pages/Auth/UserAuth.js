import React, { useEffect, useState } from "react";
import Login from "../../components/Auth/Login";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

const UserAuth = ({ loading }) => {
  return <Container>{!loading && <Login />}</Container>;
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(UserAuth);
