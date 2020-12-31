import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Col, Button } from "react-bootstrap";

const ParameterCheckTable = ({ aquariumId, aquariumName }) => {
  const [parameterChecks, setParameterChecks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/v1/aquariums/${aquariumId}/parameters?limit=5&page=${page}`)
      .then((res) => {
        setParameterChecks(res.data);
      })
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <Col xs={{ span: 12 }}>
      {parameterChecks.data && (
        <>
          <h4>
            {aquariumName}{" "}
            <Button
              size="sm"
              disabled={!parameterChecks.pagination.prev}
              onClick={() => setPage(page - 1)}
            >
              <i class="fas fa-arrow-left"></i>
            </Button>{" "}
            <Button
              size="sm"
              disabled={!parameterChecks.pagination.next}
              onClick={() => setPage(page + 1)}
            >
              <i class="fas fa-arrow-right"></i>
            </Button>
          </h4>
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Ammonia</th>
                <th>Nitrite</th>
                <th>Nitrate</th>
                <th>pH</th>
              </tr>
            </thead>
            <tbody>
              {parameterChecks.data.map((item) => {
                const date = new Date(item.createdAt);
                return (
                  <tr key={item._id}>
                    <td>{date.toDateString()}</td>
                    <td>{item.ammonia}</td>
                    <td>{item.nitrite}</td>
                    <td>{item.nitrate}</td>
                    <td>{item.pH}</td>
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

export default ParameterCheckTable;
