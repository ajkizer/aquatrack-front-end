import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Inventory from "./Card-Sections/Inventory";
import EditAquarium from "../Modals/EditAquarium";
import DeleteAquariums from "../Modals/DeleteAquariums";
import Reminders from "./Card-Sections/Reminders";

const AquariumCard = ({ aquarium, livestock, plants }) => {
  return (
    <Col xs={{ span: 12 }} md={{ span: 8 }}>
      <Card className="light-box-shadow mb-4">
        <Card.Body>
          <Row>
            <Col xs={{ span: 9 }}>
              <h5 className="_text-subtitle skinny">{aquarium.name}</h5>{" "}
            </Col>
            <Col xs={{ offset: 1, span: 2 }}>
              <EditAquarium aquarium={aquarium} />{" "}
              <DeleteAquariums aquarium={aquarium} />
            </Col>
          </Row>
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
