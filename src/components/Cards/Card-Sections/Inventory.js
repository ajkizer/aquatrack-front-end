import React from "react";
import { Button, Badge, Card } from "react-bootstrap";
import { connect } from "react-redux";
import AddInventory from "../../Modals/AddInventory";
import { addLivestock, addPlant } from "../../../redux/actions/aquariums";
import PropTypes from "prop-types";
import InventoryItemDetails from "../../Modals/InventoryItemDetails";

const Inventory = ({ type, data, addLivestock, addPlant, aquariumId }) => {
  console.log(type, data);
  let variant;

  if (type === "livestock") {
    variant = "primary";
  } else {
    variant = "success";
  }

  return (
    <div>
      {data && (
        <>
          <Card.Subtitle className="mt-2">
            {type}{" "}
            <AddInventory
              aquariumId={aquariumId}
              property={type}
              submit={type === "livestock" ? addLivestock : addPlant}
            />
          </Card.Subtitle>
          {data.length === 0 ? (
            <>No {type}</>
          ) : (
            data.map((item) => (
              <InventoryItemDetails
                key={item._id}
                item={item}
                btnvariant={variant}
                type={type}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

Inventory.propTypes = {
  addLivestock: PropTypes.func.isRequired,
  addPlant: PropTypes.func.isRequired,
};

export default connect(null, { addLivestock, addPlant })(Inventory);
