import React from "react";
import PropTypes from "prop-types";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { login } from "../../redux/actions/auth";
import { handleAlert } from "../../redux/actions/alerts";
import Register from "./Register";
import AlertBar from "../Alerts/Alert";
import styles from "./auth.module.css";

const Login = ({ login, loginAlert, isAuthenticated, handleAlert }) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      handleAlert("Email and password are required", "danger", "loginAlert");
    }
    login(email, password);
  };

  return (
    <Row className={styles.login}>
      <Col xs={{ span: 12 }} lg={{ span: 6 }}>
        <h1 className={styles.header}>AquaTrack</h1>
        <p className={styles.subtitle}>Organized Aquarium Keeping</p>
      </Col>
      <Col
        xs={{ span: 12 }}
        lg={{ span: 6 }}
        className="d-flex justify-content-center"
      >
        <Card className={styles.loginForm}>
          <Form onSubmit={(e) => onSubmit(e)}>
            {loginAlert && <AlertBar />}
            <Form.Group controlId="loginFormEmail">
              <Form.Control
                className={styles.input}
                name="email"
                value={email}
                type="email"
                placeholder="Enter Email"
                onChange={(e) => onChange(e)}
                size="lg"
              />
            </Form.Group>
            <Form.Group controlId="loginFormPassword">
              <Form.Control
                className={styles.input}
                name="password"
                value={password}
                type="password"
                placeholder="Enter Password"
                onChange={(e) => onChange(e)}
                size="lg"
              />
            </Form.Group>

            <div className={styles.btnGroup}>
              <Button className={styles.btn} type="submit">
                Login
              </Button>
            </div>
          </Form>
          <Register />
        </Card>
      </Col>
    </Row>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginAlert: state.alert.loginAlert,
});

export default connect(mapStateToProps, { login, handleAlert })(Login);
