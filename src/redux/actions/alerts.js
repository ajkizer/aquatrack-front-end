import { SHOW_ALERT, REMOVE_ALERT } from "../constants/alerts";

export const handleAlert = (msg, variant, alert) => async (dispatch) => {
  dispatch({ type: SHOW_ALERT, payload: { msg, variant, alert } });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: alert }), 3000);
};
