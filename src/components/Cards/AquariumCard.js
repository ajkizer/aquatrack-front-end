import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Inventory from "./Card-Sections/Inventory";

const AquariumCard = ({ aquarium, livestock, plants }) => {
  return (
    <Col md={{ span: 4 }}>
      <Card>
        <Card.Header>
          <Card.Title>{aquarium.name}</Card.Title>
          <Card.Subtitle>{aquarium.size} gallons</Card.Subtitle>
        </Card.Header>
        <Card.Body>
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
