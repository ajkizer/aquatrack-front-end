import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, Form, Table } from "react-bootstrap";
import Header from "../Typography/Header";

const ParameterChecks = ({ general, parameters }) => {
  const [aquarium, setAquarium] = useState("");
  const [currentData, setCurrentData] = useState();
  const changeHandler = (e) => {
    setAquarium(e.target.value);
  };

  useEffect(() => {
    let URL;
    if (!aquarium.length) {
      URL = `https://aquatrack-api-v1.herokuapp.com/api/v1/parameters`;
    } else {
      URL = `https://aquatrack-api-v1.herokuapp.com/api/v1/aquariums/${aquarium}/parameters`;
    }
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
        setCurrentData(res.data);
      })
      .catch((error) => console.log(error));
  }, [aquarium, parameters]);

  const genDate = (date) => {
    const d = new Date(date);
    return <>{d.toLocaleDateString()}</>;
  };

  return (
    <>
      <Header>
        <Col md={{ span: 6 }}>
          Parameters{" "}
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
              <th>Ammonia</th>
              <th>Nitrite</th>
              <th>Nitrate</th>
              <th>pH</th>
              <th>Aquarium</th>
            </tr>
          </thead>

          <tbody>
            {currentData &&
              currentData.data.length &&
              currentData.data.map((item, idx) => (
                <tr>
                  <td className="text-center">{genDate(item.createdAt)}</td>
                  <td className="text-center">{item.ammonia}</td>
                  <td className="text-center">{item.nitrite}</td>
                  <td className="text-center">{item.nitrate}</td>
                  <td className="text-center">{item.pH}</td>
                  <td className="text-center">{item.aquarium.name}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </>
  );
};

ParameterChecks.propTypes = {
  general: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  general: state.aquariums.general,
  parameters: state.aquariums.parameters,
});
export default connect(mapStateToProps, {})(ParameterChecks);
