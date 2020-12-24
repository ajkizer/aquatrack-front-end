import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const AddAquarium = ({ addAquarium }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    description: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAquarium(formData);
    handleClose();
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, size, description } = formData;
  return (
    <>
      <Button
        size="sm"
        variant="outline-primary
      "
        onClick={handleShow}
      >
        Add <i className="fas fa-plus-circle"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Aquarium</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId={`addAquariumName`}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name for this aquarium"
                value={name}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group controlId={`addAquariumSize`}>
              <Form.Label>Size</Form.Label>
              <Form.Control
                name="size"
                placeholder="Enter size in gallons"
                type="text"
                value={size}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group controlId={`addAquariumDescription`}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                placeholder="Enter description"
                type="text"
                as="textarea"
                value={description}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddAquarium;
