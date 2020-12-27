import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Inventory from "./Card-Sections/Inventory";
import EditAquarium from "../Modals/EditAquarium";
import DeleteAquariums from "../Modals/DeleteAquariums";

const AquariumCard = ({ aquarium, livestock, plants }) => {
  return (
    <Col md={{ span: 4 }}>
      <Card>
        <Card.Header>
          <Card.Title>
            {aquarium.name} <EditAquarium aquarium={aquarium} />{" "}
            <DeleteAquariums aquarium={aquarium} />
          </Card.Title>
          <Card.Subtitle></Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle>Size</Card.Subtitle>
          <Card.Text>{aquarium.size} gallons</Card.Text>
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
