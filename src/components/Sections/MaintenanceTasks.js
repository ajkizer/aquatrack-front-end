import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, Form, Table } from "react-bootstrap";
import Header from "../Typography/Header";

const MaintenanceTasks = ({ general, maintenanceTasks }) => {
  const [aquarium, setAquarium] = useState("");
  const [currentData, setCurrentData] = useState();
  const changeHandler = (e) => {
    setAquarium(e.target.value);
  };

  useEffect(() => {
    let URL;
    if (!aquarium.length) {
      URL = `https://aquatrack-api-v1.herokuapp.com/api/v1/maintenanceTasks`;
    } else {
      URL = `https://aquatrack-api-v1.herokuapp.com/api/v1/aquariums/${aquarium}/maintenanceTasks`;
    }
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
        setCurrentData(res.data);
      })
      .catch((error) => console.log(error));
  }, [aquarium, maintenanceTasks]);

  const genDate = (date) => {
    const d = new Date(date);
    return <>{d.toLocaleDateString()}</>;
  };

  return (
    <>
      <Header>
        <Col md={{ span: 6 }}>
          Maintenance Tasks{" "}
          <Form.Control
            as="select"
            name="aquarium"
            value={aquarium}
            onChange={(e) => changeHandler(e)}
          >
            <option>Select an aquarium</option>
            <option value="">All</option>
            {general.map((aquarium) => (
              <option value={aquarium._id}>{aquarium.name}</option>
            ))}
          </Form.Control>
        </Col>
      </Header>

      <Col md={{ span: 8 }}>
        <Table size="sm" className="light-box-shadow" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Date</th>
              <th>Description</th>
              <th>Aquarium</th>
            </tr>
          </thead>

          <tbody>
            {currentData && currentData.data.length ? (
              currentData.data.map((item, idx) => (
                <tr>
                  <td className="text-center">{genDate(item.createdAt)}</td>
                  <td className="text-center">{item.description}</td>
                  <td className="text-center">{item.aquarium.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={3}>
                  No History
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </>
  );
};

MaintenanceTasks.propTypes = {
  general: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  general: state.aquariums.general,
  maintenanceTasks: state.aquariums.maintenanceTasks,
});
export default connect(mapStateToProps, {})(MaintenanceTasks);
