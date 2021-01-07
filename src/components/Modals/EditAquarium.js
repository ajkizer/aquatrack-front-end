import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editAquarium } from "../../redux/actions/aquariums";

const EditAquarium = ({ aquarium, editAquarium }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: aquarium.name,
    size: aquarium.size,
    description: aquarium.description,
    parameterCheckReminder: aquarium.parameterCheckReminder,
    waterchangeReminder: aquarium.waterchangeReminder,
    generalMaintenanceReminder: aquarium.generalMaintenanceReminder,
  });

  const reminderOptions = [1, 3, 5, 7, 14, 21, 28];
  const reminderText = [
    "Daily",
    "Every 3 Days",
    "Every 5 Days",
    "Weekly",
    "Every 2 Weeks",
    "Every 3 Weeks",
    "Once a Month",
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    editAquarium(formData, aquarium._id);
    handleClose();
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, size, description, waterchangeReminder } = formData;
  return (
    <>
      <span onClick={handleShow}>
        <i className="fas fa-pencil-alt"></i>
      </span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Aquarium</Modal.Title>
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
            <Form.Group controlId={`addAquariumDescription`}>
              <Form.Label>Water Change Schedule</Form.Label>
              <Form.Control
                name="waterchangeReminder"
                type="text"
                as="select"
                value={waterchangeReminder}
                onChange={(e) => changeHandler(e)}
              >
                {reminderOptions.map((option, index) => (
                  <option key={`waterchangeReminder${option}`} value={option}>
                    {reminderText[index]}
                  </option>
                ))}
              </Form.Control>
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

EditAquarium.propTypes = {
  editAquarium: PropTypes.func.isRequired,
};

export default connect(null, { editAquarium })(EditAquarium);
