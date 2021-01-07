import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../Typography/Header";

import SectionTable from "../Tables/SectionTable";
import { Row } from "react-bootstrap";

const ParameterChecks = ({ general }) => {
  console.log(general);
  const fields = {
    labels: ["Ammonia", "Nitrite", "Nitrate", "pH"],
    formdata: ["ammonia", "nitrite", "nitrate", "pH"],
  };
  return (
    <>
      <Header>
        Parameter Checks{" "}
        <p className="info-text _text-medium skinny">
          View most recent parameter checks for each aquarium...
        </p>
      </Header>

      <Row className="pt-4">
        {general.map((item) => (
          <SectionTable
            key={item._id}
            aquariumId={item._id}
            aquariumName={item.name}
            route="parameters"
            header="Parameter Checks"
            fields={fields}
          />
        ))}
      </Row>
    </>
  );
};

ParameterChecks.propTypes = {
  general: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  general: state.aquariums.general,
});
export default connect(mapStateToProps, {})(ParameterChecks);
