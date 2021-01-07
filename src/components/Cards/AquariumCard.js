import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Inventory from "./Card-Sections/Inventory";
import EditAquarium from "../Modals/EditAquarium";
import DeleteAquariums from "../Modals/DeleteAquariums";

const AquariumCard = ({ aquarium, livestock, plants }) => {
  return (
    <Col md={{ span: 4 }}>
      <Card className="light-box-shadow row-spacing__large">
        <Card.Header>
          <Card.Title>
            <Row>
              <Col xs={{ span: 9 }}>
                <h5 className="_text-subtitle skinny">{aquarium.name}</h5>{" "}
              </Col>
              <Col xs={{ span: 1 }} className="mr-1">
                <EditAquarium aquarium={aquarium} />{" "}
              </Col>
              <Col xs={{ span: 1 }}>
                <DeleteAquariums aquarium={aquarium} />
              </Col>
            </Row>
          </Card.Title>
          <Card.Subtitle></Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text className="_text-medium">Size</Card.Text>
          <Card.Text className="_text-small mb-4">
            {aquarium.size} gallons
          </Card.Text>
          <Inventory
            type="livestock"
            data={livestock}
            aquariumId={aquarium._id}
          />
          <Inventory type="plants" data={plants} aquariumId={aquarium._id} />
        </Card.Body>
      </Card>
    </Col>
  );
};

AquariumCard.propTypes = {};

export default connect(null, {})(AquariumCard);
