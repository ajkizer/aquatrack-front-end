import { SHOW_ALERT, REMOVE_ALERT } from "../constants/error";

const initialState = {
  showAlert: false,
  msg: "",
  variant: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        msg: payload.msg,
        variant: payload.variant,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        showAlert: false,
        msg: "",
        variant: "",
      };
    default:
      return state;
  }
}
