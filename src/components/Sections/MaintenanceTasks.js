import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import SectionTable from "../Tables/SectionTable";
import Header from "../Typography/Header";

const MaintenanceTasks = ({ general }) => {
  const fields = {
    labels: ["Description"],
    formdata: ["description"],
  };
  return (
    <>
      <Header>
        Maintenance Tasks{" "}
        <p className="info-text _text-medium skinny">
          View most recent general maintenance for each aquarium...
        </p>
      </Header>

      <Row className="pt-4">
        {general.map((item) => (
          <SectionTable
            key={item._id}
            aquariumId={item._id}
            aquariumName={item.name}
            route="maintenanceTasks"
            header="Maintenance Tasks"
            fields={fields}
          />
        ))}
      </Row>
    </>
  );
};

MaintenanceTasks.propTypes = {
  general: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  general: state.aquariums.general,
});
export default connect(mapStateToProps, {})(MaintenanceTasks);
