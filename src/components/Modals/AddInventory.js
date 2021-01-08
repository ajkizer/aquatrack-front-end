import React, { useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";

const AddInventory = ({ aquariumId, submit, property }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 1.99,
    quantity: 1,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { name, description, quantity, price } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleClose();
    submit(aquariumId, formData);
  };

  return (
    <>
      <span className="_text-small barlow pointer" onClick={handleShow}>
        +add
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add {property}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId={`add${property}Name`}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>

            <Form.Group controlId={`add${property}Quantity`}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                name="quantity"
                type="text"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group controlId={`addAquariumSize`}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="text"
                value={price}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group controlId={`add${property}SciName`}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                as="textarea"
                placeholder="Description"
                onChange={(e) => changeHandler(e)}
                value={description}
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

export default AddInventory;
