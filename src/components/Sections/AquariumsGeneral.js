import React from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import AquariumCard from "../Cards/AquariumCard";
import AddAquarium from "../Modals/AddAquarium";
import Header from "../Typography/Header";

import { addAquarium, editAquarium } from "../../redux/actions/aquariums";

const AquariumsGeneral = ({
  aquariums,
  livestock,
  plants,
  addAquarium,
  loading,
}) => {
  return (
    <>
      <Header>
        Aquariums <AddAquarium addAquarium={addAquarium} />
      </Header>
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
});

export default connect(mapStateToProps, { addAquarium })(AquariumsGeneral);
