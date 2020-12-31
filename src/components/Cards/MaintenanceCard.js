import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { addMaintenanceEvent } from "../../redux/actions/aquariums";
import AddGenMaintenance from "../Modals/AddMaintenance";
import AddWaterchange from "../Modals/AddWaterchange";
import AddParameterCheck from "../Modals/AddParameterCheck";

const MaintenanceCard = ({ aquarium, addMaintenanceEvent }) => {
  const calculateDaysSince = (date) => {
    if (date === null) {
      return null;
    }
    const parsedDate = Date.parse(date);
    const millisecondsInDay = 86400000;
    const millisecondsSince = Date.now() - parsedDate;
    const daysSince = Math.floor(millisecondsSince / millisecondsInDay);
    return daysSince;
  };

  let waterchangeDate = new Date(aquarium.lastWaterchange);
  let maintenanceDate = new Date(aquarium.lastMaintenance);
  let parameterDate = new Date(aquarium.lastParameterCheck);

  const checkIfMaintenanceDue = (date, reminder) => {
    if (!date || date.length === 0) {
      return true;
    }

    let daysSince = calculateDaysSince(date);

    if (daysSince > reminder) {
      return true;
    }
    return false;
  };

  const generateReminderText = (daysSince) => {
    if (daysSince === null) {
      return "None";
    }
    if (daysSince === 0) {
      return `Today`;
    } else if (daysSince === 1) {
      return `Yesterday`;
    } else {
      return `${daysSince} days ago`;
    }
  };

  const daysSince = {
    waterchange: calculateDaysSince(aquarium.lastWaterchange),
    parameterCheck: calculateDaysSince(aquarium.lastParameterCheck),
    maintenance: calculateDaysSince(aquarium.lastMaintenance),
  };

  const wc = {
    text: generateReminderText(daysSince.waterchange),
    due: checkIfMaintenanceDue(aquarium.lastWaterchange),
  };

  const pc = {
    text: generateReminderText(daysSince.parameterCheck),
    due: checkIfMaintenanceDue(aquarium.lastParameterCheck),
  };
  const mt = {
    text: generateReminderText(daysSince.maintenance),
    due: checkIfMaintenanceDue(aquarium.lastMaintenance),
  };

  const ReminderDue = () => <Badge variant="warning">Due</Badge>;

  return (
    <Col md={{ span: 4 }}>
      <Card>
        <Card.Header>
          <Card.Title>{aquarium.name}</Card.Title>
          <Card.Subtitle>{aquarium.size} gallons</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Last water change:
            <small>
              {wc.text}{" "}
              <em>
                {aquarium.lastWaterchange &&
                  waterchangeDate.toLocaleTimeString()}
              </em>
            </small>
            {wc.due && <ReminderDue />}
          </Card.Text>
          <Card.Text>
            Last parameter check:
            <small>
              {pc.text}{" "}
              <em>
                {aquarium.lastParameterCheck &&
                  parameterDate.toLocaleTimeString()}
              </em>
            </small>
            {pc.due && <ReminderDue />}
          </Card.Text>
          <Card.Text>
            Last cleaning:
            <small>
              <em>
                {" "}
                {mt.text}{" "}
                {aquarium.lastMaintenance &&
                  maintenanceDate.toLocaleTimeString()}
              </em>
            </small>
            {mt.due && <ReminderDue />}
          </Card.Text>
          <Row>
            <Col md={{ span: 2 }}>
              <AddWaterchange
                aquariumId={aquarium._id}
                addMaintenanceEvent={addMaintenanceEvent}
              />
            </Col>
            <Col md={{ span: 2 }}>
              <AddParameterCheck
                aquariumId={aquarium._id}
                addMaintenanceEvent={addMaintenanceEvent}
              />
            </Col>
            <Col md={{ span: 2 }}>
              <AddGenMaintenance
                aquariumId={aquarium._id}
                addMaintenanceEvent={addMaintenanceEvent}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

MaintenanceCard.propTypes = {
  addMaintenanceEvent: PropTypes.func.isRequired,
};

export default connect(null, { addMaintenanceEvent })(MaintenanceCard);
