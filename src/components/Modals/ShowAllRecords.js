import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Row } from "react-bootstrap";

const ShowAllRecords = ({ url }) => {
  const [responseData, setResponseData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setResponseData(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <span onClick={handleShow}>Notes</span>
      <Modal show={show} onHide={handleClose}></Modal>
    </>
  );
};

export default ShowAllRecords;
