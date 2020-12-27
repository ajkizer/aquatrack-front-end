import React from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import MaintenanceCard from "../Cards/MaintenanceCard";

const Maintenance = ({
  aquariums,
  livestock,
  plants,

  loading,
}) => {
  return (
    <>
      <h2>Maintenance</h2>
      {loading ? (
        "loading"
      ) : (
        <Row>
          {aquariums &&
            aquariums.map((aquarium) => (
              <MaintenanceCard
                key={aquarium._id}
                aquarium={aquarium}
                livestock={livestock[aquarium._id]}
                plants={plants[aquarium._id]}
              />
            ))}
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  aquariums: state.aquariums.general,
  livestock: state.aquariums.livestock,
  plants: state.aquariums.plants,
  loading: state.aquariums.loading,
});

export default connect(mapStateToProps, {})(Maintenance);
