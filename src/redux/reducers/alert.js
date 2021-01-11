import { SHOW_ALERT, REMOVE_ALERT } from "../constants/alerts";

const initialState = {
  login: false,
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
        [payload.alert]: false,
        msg: "",
        variant: "",
      };
    default:
      return state;
  }
}
