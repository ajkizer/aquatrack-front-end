import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { register } from "../../redux/actions/auth";

import styles from "./auth.module.css";

const Register = ({ register, isAuthenticated }) => {
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

    register({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Button variant="success" className={styles.btnNew} onClick={handleShow}>
        Create New Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)} className="p-4">
          <Form.Group controlId="registerFormEmail">
            <Form.Control
              name="name"
              value={name}
              type="text"
              placeholder="Enter Username"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="registerFormEmail">
            <Form.Control
              name="email"
              value={email}
              type="email"
              placeholder="Enter Email"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="loginFormPassword">
            <Form.Control
              name="password"
              value={password}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="loginFormPassword">
            <Form.Control
              name="password2"
              value={password2}
              type="password"
              placeholder="Confirm Password"
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
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
