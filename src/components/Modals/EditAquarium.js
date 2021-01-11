import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import AlertBar from "../Alerts/Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editAquarium } from "../../redux/actions/aquariums";
import { handleAlert } from "../../redux/actions/alerts";

const EditAquarium = ({
  aquarium,
  editAquarium,
  handleAlert,
  editAquariumAlert,
}) => {
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
        "editAquariumAlert"
      );
    }
    editAquarium(formData, aquarium._id);
    handleClose();
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    name,
    description,
    waterchangeReminder,
    parameterCheckReminder,
    generalMaintenanceReminder,
  } = formData;
  return (
    <>
      <Button
        size="sm"
        variant="info"
        className="light-box-shadow"
        onClick={handleShow}
      >
        <i className="fas fa-pencil-alt"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Aquarium</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            {editAquariumAlert && <AlertBar />}
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

EditAquarium.propTypes = {
  editAquarium: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  editAquariumAlert: state.alert.editAquariumAlert,
});

export default connect(mapStateToProps, { editAquarium, handleAlert })(
  EditAquarium
);
