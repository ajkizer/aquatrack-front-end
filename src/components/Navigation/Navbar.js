import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Navigation = ({ auth, logout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">AquaTrack</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {auth.isAuthenticated && (
            <Nav.Link href="/" onClick={() => logout()}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navigation);
