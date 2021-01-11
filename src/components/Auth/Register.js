import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { register } from "../../redux/actions/auth";
import { handleAlert } from "../../redux/actions/alerts";
import AlertBar from "../../components/Alerts/Alert";

import styles from "./auth.module.css";

const Register = ({
  register,
  isAuthenticated,
  handleAlert,
  registerAlert,
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      return handleAlert("Name is required", "danger", "registerAlert");
    } else if (email.length === 0) {
      return handleAlert("Email is required", "danger", "registerAlert");
    } else if (password.length === 0) {
      return handleAlert("Password is required", "danger", "registerAlert");
    } else if (password !== password2) {
      return handleAlert("Passwords must match", "danger", "registerAlert");
    }
    register({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Button
        variant="success"
        className={`${styles.btnNew} mx-auto`}
        onClick={handleShow}
      >
        Create New Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)} className="p-4">
          {registerAlert && <AlertBar />}

          <Form.Group controlId="registerFormEmail">
            <Form.Control
              name="name"
              value={name}
              type="text"
              placeholder="Username"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="registerFormEmail">
            <Form.Control
              name="email"
              value={email}
              type="email"
              placeholder="Email"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="loginFormPassword">
            <Form.Control
              name="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="loginFormPassword">
            <Form.Control
              name="password2"
              value={password2}
              type="password"
              placeholder="Password"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Button type="submit">Create Account</Button>
        </Form>
      </Modal>
    </>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  registerAlert: state.alert.registerAlert,
});

export default connect(mapStateToProps, { register, handleAlert })(Register);
