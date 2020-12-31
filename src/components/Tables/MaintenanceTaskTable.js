import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Col, Button } from "react-bootstrap";

const MaintenanceTaskTable = ({ aquariumId, aquariumName }) => {
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `/api/v1/aquariums/${aquariumId}/maintenanceTasks?limit=5&page=${page}`
      )
      .then((res) => {
        setMaintenanceTasks(res.data);
      })
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <Col xs={{ span: 12 }}>
      {maintenanceTasks.data && (
        <>
          <h4>
            {aquariumName}{" "}
            <Button
              size="sm"
              disabled={!maintenanceTasks.pagination.prev}
              onClick={() => setPage(page - 1)}
            >
              <i class="fas fa-arrow-left"></i>
            </Button>{" "}
            <Button
              size="sm"
              disabled={!maintenanceTasks.pagination.next}
              onClick={() => setPage(page + 1)}
            >
              <i class="fas fa-arrow-right"></i>
            </Button>
          </h4>
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceTasks.data.map((item) => {
                const date = new Date(item.createdAt);
                return (
                  <tr key={item._id}>
                    <td>{date.toDateString()}</td>
                    <td>{item.description}</td>
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

export default MaintenanceTaskTable;
