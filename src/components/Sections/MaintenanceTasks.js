import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MaintenanceTaskTable from "../Tables/MaintenanceTaskTable";
import { Row } from "react-bootstrap";

const MaintenanceTasks = ({ general }) => {
  return (
    <Row>
      {general.map((item) => (
        <MaintenanceTaskTable
          key={item._id}
          aquariumId={item._id}
          aquariumName={item.name}
        />
      ))}
    </Row>
  );
};

MaintenanceTasks.propTypes = {
  general: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  general: state.aquariums.general,
});
export default connect(mapStateToProps, {})(MaintenanceTasks);
