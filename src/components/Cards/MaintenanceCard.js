import React from "react";
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

  // let waterchangeDate = new Date(aquarium.lastWaterchange);
  // let maintenanceDate = new Date(aquarium.lastMaintenance);
  // let parameterDate = new Date(aquarium.lastParameterCheck);

  const checkIfMaintenanceDue = (date, reminder) => {
    if (!date || date.length === 0) {
      return true;
    }

    let daysSince = calculateDaysSince(date);

    console.log(daysSince);

    console.log({ date, reminder });

    if (daysSince >= reminder) {
      return true;
    }

    console.log(daysSince > reminder);
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
    maintenance: calculateDaysSince(
      aquarium.lastMaintenance,
      aquarium.maintenanceReminder
    ),
  };

  const wc = {
    text: generateReminderText(daysSince.waterchange),
    due: checkIfMaintenanceDue(
      aquarium.lastWaterchange,
      aquarium.waterchangeReminder
    ),
  };

  const pc = {
    text: generateReminderText(daysSince.parameterCheck),
    due: checkIfMaintenanceDue(
      aquarium.lastParameterCheck,
      aquarium.parameterCheckReminder
    ),
  };
  const mt = {
    text: generateReminderText(daysSince.maintenance),
    due: checkIfMaintenanceDue(aquarium.lastMaintenance),
  };

  const ReminderDue = () => <Badge variant="warning">Due</Badge>;

  return (
    <Col md={{ span: 4 }}>
      <Card className="light-box-shadow row-spacing__large">
        <Card.Header>
          <Card.Title>
            <h5 className="_text-subtitle skinny">{aquarium.name}</h5>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className="_text-small mb-1">
            Water Change <small>{wc.text} </small>
            {wc.due && <ReminderDue />}
          </Card.Text>
          <Card.Text className="_text-small mb-1">
            Parameter Check <small>{pc.text} </small>
            {pc.due && <ReminderDue />}
          </Card.Text>
          <Card.Text>
            General Maintenance <small>{mt.text} </small>
            {mt.due && <ReminderDue />}
          </Card.Text>
          <Row>
            <Col xs={{ span: 2 }}>
              <AddWaterchange
                aquariumId={aquarium._id}
                addMaintenanceEvent={addMaintenanceEvent}
              />
            </Col>
            <Col xs={{ span: 2 }}>
              <AddParameterCheck
                aquariumId={aquarium._id}
                addMaintenanceEvent={addMaintenanceEvent}
              />
            </Col>
            <Col xs={{ span: 2 }}>
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
