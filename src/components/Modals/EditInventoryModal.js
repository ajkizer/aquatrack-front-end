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

  const subtractQuantity = (amount, type) => {
    const minValue = type === "price" ? 0.09 : 1;
    if (formData[type] <= amount) {
      setFormData({ ...formData, [type]: minValue });
      return;
    }

    let newData = formData[type] - amount;
    if (type === "price") {
      let num = formData[type] * 1;
      const sum = num - amount;
      newData = sum.toFixed(2);
    }

    setFormData({ ...formData, [type]: newData });
  };

  const addQuantity = (amount, type) => {
    let newData = formData[type] + amount;
    if (type === "price") {
      let num = formData[type] * 1;
      const sum = num + amount;
      newData = sum.toFixed(2);
    }

    setFormData({ ...formData, [type]: newData });
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
        <Modal.Body className="text-center">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId={`editQuantity`}>
              <Form.Label>Quantity</Form.Label>
              <Form.Text className="d-flex align-items-center justify-content-center">
                <span
                  onClick={() => subtractQuantity(10, "quantity")}
                  className="m-1 _text-subtitle mr-4 semi-bold pointer"
                >
                  -
                </span>
                <small
                  onClick={() => subtractQuantity(1, "quantity")}
                  className="m-1 _text-medium pointer mr-4"
                >
                  -
                </small>
                <h3 className="m-2 _text-subtitle">{quantity}</h3>

                <small
                  onClick={() => addQuantity(1, "quantity")}
                  className="m-1 _text-medium ml-4 pointer"
                >
                  +
                </small>

                <span
                  onClick={() => addQuantity(10, "quantity")}
                  className="m-1 _text-subtitle ml-4 semi-bold pointer mt-2"
                >
                  +
                </span>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId={`addAquariumSize`}>
              <Form.Label>Price</Form.Label>
              <Form.Text className="d-flex align-items-center justify-content-center">
                <span
                  onClick={() => subtractQuantity(1.0, "price")}
                  className="m-1 mr-4 _text-subtitle semi-bold pointer"
                >
                  -
                </span>
                <small
                  onClick={() => subtractQuantity(0.1, "price")}
                  className="m-1 mr-4 _text-medium pointer"
                >
                  -
                </small>
                <h3 className="_text-subtitle">${price}</h3>

                <small
                  onClick={() => addQuantity(0.1, "price")}
                  className="m-1 ml-4 _text-medium pointer"
                >
                  +
                </small>

                <span
                  onClick={() => addQuantity(1.0, "price")}
                  className="m-1 ml-4 _text-subtitle semi-bold pointer mt-2"
                >
                  +
                </span>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId={`editName`} className="text-left">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group controlId={`editDescription`} className="text-left">
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
