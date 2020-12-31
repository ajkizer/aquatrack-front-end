import React, { useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import PropTypes from "prop-types";
import { getAquariums } from "../../redux/actions/aquariums";
import { loadUser } from "../../redux/actions/auth";
import { connect } from "react-redux";

import AquariumsGeneral from "../../components/Sections/AquariumsGeneral";
import Maintenance from "../../components/Sections/Maintenance";
import Inventory from "../../components/Sections/Inventory";
import WaterChanges from "../../components/Sections/WaterChanges";
import ParameterChecks from "../../components/Sections/ParameterChecks";
import MaintenanceTasks from "../../components/Sections/MaintenanceTasks";

const Dashboard = ({ getAquariums }) => {
  useEffect(() => {
    loadUser();
    getAquariums();
  }, []);
  return (
    <Container>
      <Tabs defaultActiveKey="aquariums" id="dashboard-tabs">
        <Tab eventKey="aquariums" title="Aquariums">
          <AquariumsGeneral />
        </Tab>
        <Tab eventKey="maintenance" title="Maintenance">
          <Maintenance />
        </Tab>
        <Tab eventKey="inventory" title="Inventory">
          <Inventory />
        </Tab>
        <Tab eventKey="waterchanges" title="Water Changes">
          <WaterChanges />
        </Tab>
        <Tab eventKey="parameters" title="Parameters">
          <ParameterChecks />
        </Tab>
        <Tab eventKey="generalMaintenance" title="Maintenance Tasks">
          <MaintenanceTasks />
        </Tab>
      </Tabs>
    </Container>
  );
};

Dashboard.propTypes = {
  getAquariums: PropTypes.func.isRequired,

  loadUser: PropTypes.func.isRequired,
};

export default connect(null, {
  getAquariums,
  loadUser,
})(Dashboard);
