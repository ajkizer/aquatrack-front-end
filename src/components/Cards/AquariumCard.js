import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Inventory from "./Card-Sections/Inventory";
import EditAquarium from "../Modals/EditAquarium";
import DeleteAquariums from "../Modals/DeleteAquariums";
import Reminders from "./Card-Sections/Reminders";

const AquariumCard = ({ aquarium, livestock, plants }) => {
  return (
    <Col md={{ span: 4 }}>
      <Card className="light-box-shadow row-spacing__large">
        <Card.Body>
          <h5 className="_text-subtitle skinny">{aquarium.name}</h5>{" "}
          <Inventory
            type="livestock"
            data={livestock}
            aquariumId={aquarium._id}
          />
          <Inventory type="plants" data={plants} aquariumId={aquarium._id} />
          <EditAquarium aquarium={aquarium} />{" "}
          <DeleteAquariums aquarium={aquarium} />
        </Card.Body>
      </Card>
    </Col>
  );
};

AquariumCard.propTypes = {};

export default connect(null, {})(AquariumCard);
