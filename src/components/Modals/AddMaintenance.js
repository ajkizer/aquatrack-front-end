import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { handleAlert } from "../../redux/actions/alerts";
import AlertBar from "../Alerts/Alert";

const AddGenMaintenance = ({
  addMaintenanceEvent,
  aquariumId,
  handleAlert,
  maintenanceTaskAlert,
}) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { description } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (description.length === 0) {
      return handleAlert(
        "Please add a description for this task",
        "danger",
        "maintenanceTaskAlert"
      );
    }
    handleClose();
    addMaintenanceEvent(aquariumId, formData, "maintenanceTasks");
  };

  return (
    <>
      <Button onClick={handleShow} className="light-box-shadow">
        <i className="fas fa-wrench"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Maintenance</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => submitHandler(e)}>
            {maintenanceTaskAlert && <AlertBar />}
            <Form.Group controlId={`addMaintenanceDescription`}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="select"
                placeholder="Describe what you did..."
                value={description}
                onChange={(e) => changeHandler(e)}
              >
                <option></option>
                <option value="Cleaned Glass">Cleaned Glass</option>
                <option value="Vacuumed Substrate">Vacuumed Substrate</option>
                <option value="Trimmed Plants">Trimmed Plants</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  maintenanceTaskAlert: state.alert.maintenanceTaskAlert,
});

export default connect(mapStateToProps, { handleAlert })(AddGenMaintenance);
