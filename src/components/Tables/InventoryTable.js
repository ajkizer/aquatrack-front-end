import React from "react";
import { Table } from "react-bootstrap";

const InventoryTable = ({ data, setSortProp }) => {
  return (
    <Table size="sm" striped bordered className="light-box-shadow">
      <thead>
        <tr>
          <th>
            Name{" "}
            <i className="fas fa-sort" onClick={() => setSortProp("name")}></i>
          </th>
          <th>
            Quantity{" "}
            <i
              className="fas fa-sort"
              onClick={() => setSortProp("quantity")}
            ></i>
          </th>
          <th>
            Price{" "}
            <i className="fas fa-sort" onClick={() => setSortProp("price")}></i>
          </th>
          <th>
            Location{" "}
            <i
              className="fas fa-sort"
              onClick={() => setSortProp("aquarium")}
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
