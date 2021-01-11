import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

const AlertBar = ({ msg, variant }) => {
  return <Alert variant={variant}>{msg}</Alert>;
};

const mapStateToProps = (state) => ({
  msg: state.alert.msg,
  variant: state.alert.variant,
});

export default connect(mapStateToProps, {})(AlertBar);
