import React, { useState } from "react";
import { Modal, Card } from "react-bootstrap";

const ViewNotes = ({ date, notes }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <span onClick={handleShow}>Notes</span>
      <Modal show={show} onHide={handleClose}>
        <Card>
          <Card.Header closeButton>{date}</Card.Header>
          <Card.Body>
            <Card.Text>{notes}</Card.Text>
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
};

export default ViewNotes;
