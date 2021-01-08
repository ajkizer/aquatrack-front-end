import React, { useState } from "react";
import { Modal, Form, Button, Badge } from "react-bootstrap";

const EditInventory = ({ item, submit, btnvariant, deleteFn }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    price: item.price,
  });

  const [confirmTriggered, toggleConfirm] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(formData, item._id);
    handleClose();
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, quantity, price, description } = formData;
  return (
    <>
      <Button
        variant={btnvariant}
        className="mr-1 mt-1 mb-1 light-box-shadow"
        size="sm"
        key={item._id}
        onClick={handleShow}
      >
        {item.name} <Badge variant="light">{item.quantity}</Badge>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item </Modal.Title>
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
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                name="quantity"
                placeholder="Enter size in gallons"
                type="text"
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
            {confirmTriggered ? (
              <>
                <Button
                  variant="primary"
                  className="light-box-shadow ml-1"
                  onClick={() => toggleConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  className="light-box-shadow ml-1"
                  onClick={() => {
                    deleteFn(item._id, item.aquarium);
                    handleClose();
                  }}
                >
                  Confirm
                </Button>
              </>
            ) : (
              <Button
                variant="danger"
                className="light-box-shadow ml-1"
                onClick={() => toggleConfirm(true)}
              >
                Delete
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditInventory;
