import React, { useState } from "react";

import { Modal, Form, Button, Col } from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { handleAlert } from "../../redux/actions/alerts";
import AlertBar from "../../components/Alerts/Alert";

const AddInventory = ({
  aquariumId,
  submit,
  property,
  handleAlert,
  addInventoryAlert,
}) => {
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
        "addInventoryAlert"
      );
    }
    handleClose();
    submit(aquariumId, formData);
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

  return (
    <>
      <span className="text-primary barlow pointer" onClick={handleShow}>
        +
      </span>

      <Modal show={show} onHide={handleClose} className="text-center">
        <Modal.Header closeButton>
          <Modal.Title>Add {property}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Col>
            <Form onSubmit={(e) => submitHandler(e)}>
              {addInventoryAlert && <AlertBar />}
              <Form.Group controlId={`add${property}Quantity`}>
                <Form.Label>Quantity</Form.Label>
                <Form.Text className="d-flex align-items-center justify-content-center">
                  <span
                    onClick={() => subtractQuantity(10, "quantity")}
                    className="m-1 _text-subtitle mr-4 bold pointer"
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
                    className="m-1 _text-subtitle ml-4 bold pointer mt-2"
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
                    className="m-1 mr-4 _text-subtitle bold pointer"
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
                    className="m-1 ml-4 _text-subtitle bold pointer mt-2"
                  >
                    +
                  </span>
                </Form.Text>
              </Form.Group>
              <Form.Group
                controlId={`add${property}Name`}
                className="text-left"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => changeHandler(e)}
                />
              </Form.Group>
              <Form.Group
                controlId={`add${property}SciName`}
                className="text-left"
              >
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
              <div className="text-left">
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </div>
            </Form>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

AddInventory.propTypes = {
  handleAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  addInventoryAlert: state.alert.addInventoryAlert,
});

export default connect(mapStateToProps, { handleAlert })(AddInventory);
