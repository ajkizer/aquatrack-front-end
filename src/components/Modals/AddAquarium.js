import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const AddAquarium = ({ addAquarium }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: 1,
    parameterCheckReminder: 7,
    waterchangeReminder: 7,
    generalMaintenanceReminder: 7,
  });

  const {
    name,
    description,
    waterchangeReminder,
    parameterCheckReminder,
    generalMaintenanceReminder,
  } = formData;

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
    addAquarium(formData);
    handleClose();
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <span className="text-primary" onClick={handleShow}>
        +
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Aquarium</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId={`addAquariumName`}>
              <p className="_text-subtitle m-0">Info</p>
              <Form.Label className="semi-bold">Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name for this aquarium"
                value={name}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group controlId={`addAquariumDescription`}>
              <Form.Label className="semi-bold">Description</Form.Label>
              <Form.Control
                name="description"
                placeholder="Enter description"
                type="text"
                as="textarea"
                value={description}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <p className="_text-subtitle m-0 pt-3">Maintenance</p>
            <Form.Group controlId={`addAquariumDescription`}>
              <Form.Label className="semi-bold">
                Water Change Schedule
              </Form.Label>
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
            <Form.Group controlId={`addAquariumDescription`}>
              <Form.Label className="semi-bold">
                Parameter Check Schedule
              </Form.Label>
              <Form.Control
                name="parameterCheckReminder"
                type="text"
                as="select"
                value={parameterCheckReminder}
                onChange={(e) => changeHandler(e)}
              >
                {reminderOptions.map((option, index) => (
                  <option
                    key={`parameterCheckReminder${option}`}
                    value={option}
                  >
                    {reminderText[index]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={`addAquariumDescription`}>
              <Form.Label className="semi-bold">
                General Maintenance Schedule
              </Form.Label>
              <Form.Control
                name="generalMaintenanceReminder"
                type="text"
                as="select"
                value={generalMaintenanceReminder}
                onChange={(e) => changeHandler(e)}
              >
                {reminderOptions.map((option, index) => (
                  <option
                    key={`generalMaintenanceReminder${option}`}
                    value={option}
                  >
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

export default AddAquarium;
