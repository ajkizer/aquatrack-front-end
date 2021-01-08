import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Nav, Tab, Row } from "react-bootstrap";
import InventoryTable from "../Tables/InventoryTable";
import Header from "../Typography/Header";

const Inventory = ({ aquariums, livestock, plants, addAquarium, loading }) => {
  const [sortProp, setSortProp] = useState("name");
  const aquariumIds = aquariums.map((item) => item._id).sort();
  const livestockItems = aquariumIds
    .map((id) => livestock[id])
    .sort((item) => item[sortProp]);
  const plantItems = aquariumIds
    .map((id) => plants[id])
    .sort((item) => item[sortProp]);

  const sortDisplay = (items) => {
    if (sortProp === "name") {
      return items.flat().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortProp === "aquarium") {
      return items
        .flat()
        .sort((a, b) => a.aquarium.name.localeCompare(b.aquarium.name));
    } else {
      return items.flat().sort((a, b) => a[sortProp] - b[sortProp]);
    }
  };

  const livestockDisplay = sortDisplay(livestockItems);
  const plantDisplay = sortDisplay(plantItems);

  const allDisplay = sortDisplay(livestockDisplay.concat(plantDisplay));

  return (
    <>
      <Header>
        Inventory{" "}
        <p className="info-text _text-medium skinny">
          View inventory list and values, sort results...
        </p>
      </Header>

      {loading ? (
        "loading"
      ) : (
        <Tab.Container id="left-tabs-inv" defaultActiveKey="first">
          <Row className="pt-4">
            <Col>
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
                  <InventoryTable data={allDisplay} setSortProp={setSortProp} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <InventoryTable
                    data={plantDisplay}
                    setSortProp={setSortProp}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <InventoryTable
                    data={livestockDisplay}
                    setSortProp={setSortProp}
                  />
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
