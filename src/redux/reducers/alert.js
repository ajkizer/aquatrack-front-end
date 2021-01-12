import { SHOW_ALERT, REMOVE_ALERT, RESET_ALERTS } from "../constants/alerts";

const initialState = {
  loginAlert: false,
  registerAlert: false,
  addAquariumAlert: false,
  editAquariumAlert: false,
  aquariumSectionAlert: false,
  editInventoryAlert: false,
  addInventoryAlert: false,
  addWaterchangeAlert: false,
  addMaintenanceTaskAlert: false,
  maintenanceSectionAlert: false,
  msg: "",
  variant: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESET_ALERTS:
      return {
        ...state,
        loginAlert: false,
        registerAlert: false,
        addAquariumAlert: false,
        aquariumSectionAlert: false,
        editInventoryAlert: false,
        addInventoryAlert: false,
        addInventorySuccess: false,
        editAquariumAlert: false,
        addWaterchangeAlert: false,
        maintenanceSectionAlert: false,
        addMaintenanceTaskAlert: false,
      };
    case SHOW_ALERT:
      return {
        ...state,
        [payload.alert]: true,
        msg: payload.msg,
        variant: payload.variant,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        [payload]: false,
        msg: "",
        variant: "",
      };
    default:
      return state;
  }
}
