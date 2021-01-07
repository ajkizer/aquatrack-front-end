import React from "react";
import { Card, Col } from "react-bootstrap";
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
            <h5 className="_text-subtitle skinny">{aquarium.name}</h5>{" "}
            <EditAquarium aquarium={aquarium} />{" "}
            <DeleteAquariums aquarium={aquarium} />
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
