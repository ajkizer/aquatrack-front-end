import React, { useState } from "react";
import { Button, Badge, Modal, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { editAquarium } from "../../redux/actions/aquariums";

const InventoryItemDetails = ({ item, type, btnvariant, editAquarium }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <Card>
          <Card.Header closeButton>
            <Card.Title>
              {item.name}
              {item.breeding && (
                <Button variant="warning" size="sm">
                  Breeding
                </Button>
              )}
              {item.quarantine && (
                <Button variant="danger" size="sm">
                  Quarantine
                </Button>
              )}
            </Card.Title>
            <Card.Subtitle>
              <div>Price: {item.price}</div>
              <div> Qty: {item.quantity}</div>
            </Card.Subtitle>
          </Card.Header>

          <Card.Body>
            <Card.Text>{item.description}</Card.Text>
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
};

export default connect(null, { editAquarium })(InventoryItemDetails);
