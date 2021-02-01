import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";

const AddWaterchange = ({ addMaintenanceEvent, aquariumId, due }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    percentChange: 50,
    notes: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { percentChange, notes } = formData;

  const changeHandler = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleClose();
    addMaintenanceEvent(aquariumId, formData, "waterchanges");
  };

  const options = [5, 10, 20, 25, 30, 40, 50, 75, 90];

  return (
    <>
      <Button
        onClick={handleShow}
        className="light-box-shadow"
        variant={due ? "warning" : "primary"}
      >
        <i className="fas fa-faucet"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Water Change</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId={`addWaterchangePercent`}>
              <Form.Label>Percent Changed</Form.Label>
              <Form.Control
                as="select"
                name="percentChange"
                value={percentChange}
                onChange={(e) => changeHandler(e)}
              >
                <option></option>
                {options.map((option, index) => (
                  <option key={`percentChange${option}`} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={`addWaterchangeNotes`}>
              <Form.Label>Notes (optional)</Form.Label>
              <Form.Control
                name="notes"
                as="textarea"
                value={notes}
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

export default AddWaterchange;
