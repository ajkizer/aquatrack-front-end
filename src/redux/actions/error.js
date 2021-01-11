import { SHOW_ALERT, REMOVE_ALERT } from "../constants/error";

export const handleError = (msg, variant) => async (dispatch) => {
  dispatch({ type: SHOW_ALERT, payload: { msg, variant } });
  setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
};
