import React from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import AquariumCard from "../Cards/AquariumCard";
import AddAquarium from "../Modals/AddAquarium";
import Header from "../Typography/Header";
import AlertBar from "../Alerts/Alert";

import { addAquarium } from "../../redux/actions/aquariums";

const AquariumsGeneral = ({
  aquariums,
  livestock,
  plants,
  addAquarium,
  loading,
  aquariumSectionAlert,
}) => {
  return (
    <>
      <Header>
        Aquariums <AddAquarium addAquarium={addAquarium} />
      </Header>
      {aquariumSectionAlert && <AlertBar />}
      {loading ? (
        "loading"
      ) : (
        <Row>
          {aquariums &&
            aquariums.map((aquarium) => (
              <AquariumCard
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
  aquariumSectionAlert: state.alert.aquariumSectionAlert,
});

export default connect(mapStateToProps, { addAquarium })(AquariumsGeneral);
