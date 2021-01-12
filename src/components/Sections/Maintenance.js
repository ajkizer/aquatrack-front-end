import React from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import MaintenanceCard from "../Cards/MaintenanceCard";
import Header from "../Typography/Header";
import AlertBar from "../Alerts/Alert";

const Maintenance = ({
  aquariums,
  livestock,
  plants,
  loading,
  maintenanceSectionAlert,
}) => {
  return (
    <>
      <Header>
        To Do{" "}
        <p className="info-text _text-medium skinny">
          Perform water changes, parameter checks, and general maintenance...
        </p>
      </Header>

      {maintenanceSectionAlert && <AlertBar />}

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
  maintenanceSectionAlert: state.alert.maintenanceSectionAlert,
});

export default connect(mapStateToProps, {})(Maintenance);
