import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Col, Button } from "react-bootstrap";

const WaterchangeTable = ({ aquariumId, aquariumName }) => {
  const [waterchanges, setWaterchanges] = useState([]);
  const [page, setPage] = useState(1);

  console.log(waterchanges);
  useEffect(() => {
    axios
      .get(`/api/v1/aquariums/${aquariumId}/waterchanges?limit=5&page=${page}`)
      .then((res) => {
        setWaterchanges(res.data);
      })
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <Col xs={{ span: 12 }}>
      {waterchanges.data && (
        <>
          <h4>
            {aquariumName}{" "}
            <Button
              size="sm"
              disabled={!waterchanges.pagination.prev}
              onClick={() => setPage(page - 1)}
            >
              <i class="fas fa-arrow-left"></i>
            </Button>{" "}
            <Button
              size="sm"
              disabled={!waterchanges.pagination.next}
              onClick={() => setPage(page + 1)}
            >
              <i class="fas fa-arrow-right"></i>
            </Button>
          </h4>
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Percent</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {waterchanges.data.map((item) => {
                const date = new Date(item.createdAt);
                return (
                  <tr key={item._id}>
                    <td>{date.toDateString()}</td>
                    <td>{item.percentChange}</td>
                    <td>{item.notes.length ? item.notes : "no notes"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </Col>
  );
};

export default WaterchangeTable;
