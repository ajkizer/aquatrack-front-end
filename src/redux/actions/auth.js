import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  LOGOUT_FAIL,
  AUTH_ERROR,
} from "../constants/auth";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/v1/auth/me");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    dispatch({ type: REGISTER_START });
    const res = await axios.post("/api/v1/auth/register", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    dispatch({ type: LOGIN_START });
    const res = await axios.post("/api/v1/auth/login", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => console.log(error));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => async (dispatch) => {
  window.location.href = "/login";
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL });
  }
};
