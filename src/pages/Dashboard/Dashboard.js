import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getAquariums, addAquarium } from "../../redux/actions/aquariums";
import { loadUser } from "../../redux/actions/auth";
import { connect } from "react-redux";
import AquariumCard from "../../components/Cards/AquariumCard";
import AddAquarium from "../../components/Modals/AddAquarium";

const Dashboard = ({
  getAquariums,
  general,
  plants,
  livestock,
  loading,
  loadUser,
  addAquarium,
}) => {
  useEffect(() => {
    loadUser();
    getAquariums();
  }, []);
  return (
    <Container>
      <h2>
        Aquariums <AddAquarium addAquarium={addAquarium} />
      </h2>
      {loading ? (
        "loading"
      ) : (
        <Row>
          {general &&
            general.map((aquarium) => (
              <AquariumCard
                key={aquarium._id}
                aquarium={aquarium}
                livestock={livestock[aquarium._id]}
                plants={plants[aquarium._id]}
              />
            ))}
        </Row>
      )}
    </Container>
  );
};

Dashboard.propTypes = {
  getAquariums: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  addAquarium: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  general: state.aquariums.general,
  plants: state.aquariums.plants,
  livestock: state.aquariums.livestock,
  loading: state.aquariums.loading,
});
export default connect(mapStateToProps, {
  getAquariums,
  loadUser,
  addAquarium,
})(Dashboard);
