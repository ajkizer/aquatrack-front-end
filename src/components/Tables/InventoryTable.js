import React from "react";
import { Table } from "react-bootstrap";

const InventoryTable = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.aquarium.name}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default InventoryTable;
