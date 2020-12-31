import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import WaterchangeTable from "../Tables/WaterchangeTable";
import { Row } from "react-bootstrap";

const WaterChanges = ({ general }) => {
  return (
    <Row>
      {general.map((item) => (
        <WaterchangeTable
          key={item._id}
          aquariumId={item._id}
          aquariumName={item.name}
        />
      ))}
    </Row>
  );
};

WaterChanges.propTypes = {
  general: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  general: state.aquariums.general,
});
export default connect(mapStateToProps, {})(WaterChanges);
