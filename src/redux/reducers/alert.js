import { SHOW_ALERT, REMOVE_ALERT } from "../constants/alerts";

const initialState = {
  loginAlert: false,
  registerAlert: false,
  addAquariumAlert: false,
  msg: "",
  variant: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
