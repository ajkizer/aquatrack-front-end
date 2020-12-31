import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ParameterCheckTable from "../Tables/ParameterCheckTable";
import { Row } from "react-bootstrap";

const ParameterChecks = ({ general }) => {
  return (
    <Row>
      {general.map((item) => (
        <ParameterCheckTable
          key={item._id}
          aquariumId={item._id}
          aquariumName={item.name}
        />
      ))}
    </Row>
  );
};

ParameterChecks.propTypes = {
  general: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  general: state.aquariums.general,
});
export default connect(mapStateToProps, {})(ParameterChecks);
