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
      return "Never";
    }
    if (daysSince <= 0) {
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
    due: checkIfMaintenanceDue(
      aquarium.lastMaintenance,
      aquarium.maintenanceReminder
    ),
  };

  return (
    <Col xs={{ span: 12 }} md={{ span: 8 }}>
      <Card className="light-box-shadow mb-2 pl-4 pr-4">
        <Card.Body>
          <Row>
            <Col xs={{ span: 6 }}>
              <h5 className="_text-subtitle skinny">{aquarium.name}</h5>
            </Col>
            <Col xs={{ offset: 3, span: 1 }}>
              <AddWaterchange
                aquariumId={aquarium._id}
                addMaintenanceEvent={addMaintenanceEvent}
                due={wc.due}
              />
            </Col>
            <Col xs={{ span: 1 }}>
              <AddParameterCheck
                aquariumId={aquarium._id}
                addMaintenanceEvent={addMaintenanceEvent}
                due={pc.due}
              />
            </Col>
            <Col xs={{ span: 1 }}>
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
