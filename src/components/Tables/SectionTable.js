import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Col, Row } from "react-bootstrap";

const SectionTable = ({ aquariumId, aquariumName, route, fields, limit }) => {
  const [responseData, setResponseData] = useState([]);
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);

  if (!limit || limit.length === 0) {
    limit = 5;
  }

  useEffect(() => {
    axios
      .get(
        `https://aquatrack-api-v1.herokuapp.com/api/v1/aquariums/${aquariumId}/${route}?limit=${limit}&page=${page}`
      )
      .then((res) => {
        setResponseData(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [page, flag]);
  return (
    <Col xs={{ span: 12 }} md={{ span: 9 }}>
      {responseData.data && (
        <>
          <Row>
            <Col xs={{ span: 6 }}>
              <p className="_text-subtitle skinny">
                {aquariumName}
                <span
                  className="_text-small ml-2"
                  onClick={() => setFlag(!flag)}
                >
                  <i className="fas fa-redo"></i>
                </span>
              </p>
            </Col>
          </Row>
          <Table size="sm" className="light-box-shadow" striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                {fields.labels.map((field, idx) => {
                  return <th key={`${field}__${idx}`}>{field}</th>;
                })}
              </tr>
            </thead>

            <tbody>
              {responseData.data.length ? (
                responseData.data.map((item) => {
                  const date = new Date(item.createdAt);
                  return (
                    <tr key={item._id}>
                      <td>{date.toDateString()}</td>
                      {fields.formdata.map((field) => {
                        return <td key={field}>{item[field]}</td>;
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={fields.labels.length + 1}>No history</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </Col>
  );
};

export default SectionTable;
