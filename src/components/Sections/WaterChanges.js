import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SectionTable from "../Tables/SectionTable";
import { Row } from "react-bootstrap";
import Header from "../Typography/Header";

const WaterChanges = ({ general }) => {
  const fields = {
    labels: ["Percent Change", "Notes"],
    formdata: ["percentChange", "notes"],
  };
  return (
    <>
      <Header>Water Changes</Header>
      <Row className="pt-4">
        {general.map((item) => (
          <SectionTable
            key={item._id}
            aquariumId={item._id}
            aquariumName={item.name}
            route="waterchanges"
            header="Water Changes"
            fields={fields}
          />
        ))}
      </Row>
    </>
  );
};

WaterChanges.propTypes = {
  general: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  general: state.aquariums.general,
});
export default connect(mapStateToProps, {})(WaterChanges);
