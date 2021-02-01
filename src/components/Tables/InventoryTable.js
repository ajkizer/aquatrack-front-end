import React from "react";
import { Table } from "react-bootstrap";

const InventoryTable = ({ data, setSortProp, handleReverse }) => {
  return (
    <Table size="sm" striped bordered className="light-box-shadow">
      <thead>
        <tr>
          <th>
            Name{" "}
            <i
              className="fas fa-sort"
              onClick={() => {
                setSortProp("name");
                handleReverse();
              }}
            ></i>
          </th>
          <th>
            Quantity{" "}
            <i
              className="fas fa-sort"
              onClick={() => {
                setSortProp("quantity");
                handleReverse();
              }}
            ></i>
          </th>
          <th>
            Price{" "}
            <i
              className="fas fa-sort"
              onClick={() => {
                setSortProp("price");
                handleReverse();
              }}
            ></i>
          </th>
          <th>
            Location{" "}
            <i
              className="fas fa-sort"
              onClick={() => {
                setSortProp("aquarium");
                handleReverse();
              }}
            ></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.name} </td>
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
