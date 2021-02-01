import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddParameterCheck = ({ addMaintenanceEvent, aquariumId, due }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    ammonia: 0,
    nitrate: 0,
    nitrite: 0,
    pH: 7.0,
    notes: "",
  });

  const ammoniaOptions = [0, 0.25, 0.5, 1.0, 2.0, 4.0, 8.0];
  const nitrateOptions = [0, 5, 10, 20, 40, 80, 160];
  const nitriteOptions = [0, 0.25, 0.5, 1.0, 2.0, 5.0];
  const pH_Options = [
    6.0,
    6.4,
    6.6,
    6.8,
    7.0,
    7.2,
    7.4,
    7.6,
    7.8,
    8.0,
    8.2,
    8.4,
    8.8,
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { ammonia, nitrate, nitrite, pH } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleClose();
    addMaintenanceEvent(aquariumId, formData, "parameters");
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant={due ? "warning" : "primary"}
        className="light-box-shadow"
      >
        <i className="fas fa-vial"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Parameter Check</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId={`addAmmonia`}>
              <Form.Label>Ammonia</Form.Label>
              <Form.Control
                as="select"
                name="ammonia"
                value={ammonia}
                onChange={(e) => changeHandler(e)}
              >
                <option></option>
                {ammoniaOptions.map((option) => (
                  <option key={`ammonia${option}`} value={option}>
                    {option}ppm
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={`addNitrate`}>
              <Form.Label>Nitrate</Form.Label>
              <Form.Control
                as="select"
                name="nitrate"
                value={nitrate}
                onChange={(e) => changeHandler(e)}
              >
                <option></option>
                {nitrateOptions.map((option) => (
                  <option key={`nitrate${option}`} value={option}>
                    {option}ppm
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={`addNitrite`}>
              <Form.Label>Nitrite</Form.Label>
              <Form.Control
                as="select"
                name="nitrite"
                value={nitrite}
                onChange={(e) => changeHandler(e)}
              >
                <option></option>
                {nitriteOptions.map((option) => (
                  <option key={`nitrite${option}`} value={option}>
                    {option}ppm
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={`addpH`}>
              <Form.Label>pH</Form.Label>
              <Form.Control
                as="select"
                value={pH}
                name="pH"
                onChange={(e) => changeHandler(e)}
              >
                <option></option>
                {pH_Options.map((option) => (
                  <option key={`pH${option}`} value={option}>
                    {option}
                  </option>
                ))}
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

export default AddParameterCheck;
