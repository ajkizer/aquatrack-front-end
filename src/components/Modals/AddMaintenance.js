import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addMaintenanceEvent } from "../../redux/actions/aquariums";
const AddGenMaintenance = ({ addMaintenanceEvent, aquariumId }) => {
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
    handleClose();
    addMaintenanceEvent(aquariumId, formData, "maintenanceTasks");
  };

  return (
    <>
      <Button onClick={handleShow}>
        <i className="fas fa-hand-sparkles"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Maintenance</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId={`addMaintenanceDescription`}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="name"
                as="textarea"
                placeholder="Describe what you did..."
                value={description}
                onChange={(e) => changeHandler(e)}
              />
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

export default AddGenMaintenance;
