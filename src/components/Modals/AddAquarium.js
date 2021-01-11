import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { handleAlert } from "../../redux/actions/alerts";

import AlertBar from "../../components/Alerts/Alert";

const AddAquarium = ({ addAquarium, handleAlert, addAquariumAlert }) => {
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

    let fieldEmpty = false;
    Object.keys(formData).map((item) => {
      if (formData[item].length === 0) {
        fieldEmpty = true;
      }
    });

    if (fieldEmpty) {
      return handleAlert(
        "Please fill out all fields",
        "danger",
        "addAquariumAlert"
      );
    }
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
            {addAquariumAlert && <AlertBar />}
            <Form.Group controlId={`addAquariumName`}>
              <p className="_text-medium semi-bold m-0">Info</p>
              <Form.Label className="mt-2">Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name for this aquarium"
                value={name}
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
            <p className="_text-medium bold m-0 pt-3">Maintenance</p>
            <Form.Group controlId={`addAquariumDescription`}>
              <Form.Label className="mt-2">Water Change Schedule</Form.Label>
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
              <Form.Label>Parameter Check Schedule</Form.Label>
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
              <Form.Label>General Maintenance Schedule</Form.Label>
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
            <Button variant="primary" className="mt-4" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  addAquariumAlert: state.alert.addAquariumAlert,
});
export default connect(mapStateToProps, { handleAlert })(AddAquarium);
