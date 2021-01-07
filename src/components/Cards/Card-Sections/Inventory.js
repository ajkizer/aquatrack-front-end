import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import AddInventory from "../../Modals/AddInventory";
import {
  addLivestock,
  addPlant,
  editLivestock,
  editPlant,
} from "../../../redux/actions/aquariums";
import PropTypes from "prop-types";

import EditInventoryModal from "../../Modals/EditInventoryModal";

const Inventory = ({
  type,
  data,
  addLivestock,
  addPlant,
  aquariumId,
  editLivestock,
  editPlant,
}) => {
  console.log(type, data);
  let variant;
  let submitAction;
  if (type === "livestock") {
    variant = "primary";
    submitAction = editLivestock;
  } else {
    variant = "success";
    submitAction = editPlant;
  }

  return (
    <div className="mb-4">
      {data && (
        <>
          <Card.Text className="_text-medium text-capitalize mt-2">
            {type}{" "}
            <AddInventory
              aquariumId={aquariumId}
              property={type}
              submit={type === "livestock" ? addLivestock : addPlant}
            />
          </Card.Text>
          {data.length === 0 ? (
            <>No {type}</>
          ) : (
            data.map((item, idx) => (
              <EditInventoryModal
                item={item}
                key={idx}
                submit={submitAction}
                btnvariant={variant}
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
  editLivestock: PropTypes.func.isRequired,
  editPlant: PropTypes.func.isRequired,
};

export default connect(null, {
  addLivestock,
  addPlant,
  editLivestock,
  editPlant,
})(Inventory);
