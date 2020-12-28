import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, Col, Nav, Tab, Row, Table } from "react-bootstrap";
import InventoryTable from "../Tables/InventoryTable";

const Inventory = ({ aquariums, livestock, plants, addAquarium, loading }) => {
  const aquariumIds = aquariums.map((item) => item._id);
  const livestockItems = aquariumIds.map((id) => livestock[id]);
  const plantItems = aquariumIds.map((id) => plants[id]);

  const livestockDisplay = livestockItems
    .flat()
    .sort((a, b) => a.name.localeCompare(b.name));

  const plantDisplay = plantItems
    .flat()
    .sort((a, b) => a.name.localeCompare(b.name));

  const allDisplay = livestockDisplay
    .concat(plantDisplay)
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(allDisplay);
  return (
    <>
      <h2>Inventory</h2>
      {loading ? (
        "loading"
      ) : (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Plants</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Livestock</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <InventoryTable data={allDisplay} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <InventoryTable data={plantDisplay} />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <InventoryTable data={livestockDisplay} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  aquariums: state.aquariums.general,
  livestock: state.aquariums.livestock,
  plants: state.aquariums.plants,
  loading: state.aquariums.loading,
});

export default connect(mapStateToProps, {})(Inventory);
