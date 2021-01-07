import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAquarium } from "../../redux/actions/aquariums";

const DeleteAquarium = ({ aquarium, deleteAquarium }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    removeAq: "",
  });
  const [disabled, setDisabled] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteAquarium(aquarium._id);
    handleClose();
  };

  const changeHandler = (e) => {
    if (e.target.value === "DELETE") {
      console.log("true");
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { removeAq } = formData;
  return (
    <>
      <span onClick={handleShow}>
        <i className="fas fa-trash-alt"></i>
      </span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Aquarium</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId={`deleteAquarium`} autocomplete="false">
              <Form.Label>Type "DELETE" below to confirm</Form.Label>
              <Form.Control
                name="removeAq"
                type="text"
                placeholder="DELETE"
                value={removeAq}
                onChange={(e) => changeHandler(e)}
                autoComplete="off"
              />
            </Form.Group>
            <Button variant="primary" disabled={disabled} type="submit">
              Delete
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

DeleteAquarium.propTypes = {
  deleteAquarium: PropTypes.func.isRequired,
};

export default connect(null, { deleteAquarium })(DeleteAquarium);
