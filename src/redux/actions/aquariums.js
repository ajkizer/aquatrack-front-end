import axios from "axios";
import {
  GET_AQUARIUMS,
  REQUEST_FAILED,
  START_REQUEST,
  ADD_AQUARIUM,
  ADD_LIVESTOCK,
  ADD_PLANT,
  EDIT_AQUARIUM,
  ADD_MAINTENANCE_EVENT,
  EDIT_LIVESTOCK,
  EDIT_PLANT,
} from "../constants/aquariums";

import { jsonHeader } from "../../utils/jsonHeader";

export const getAquariums = () => async (dispatch) => {
  const URL = {
    getAquariums: "/api/v1/aquariums",
    getLivestock: "/api/v1/livestock",
    getPlants: "/api/v1/plants",
  };

  try {
    dispatch({ type: START_REQUEST });

    const aquariums = await axios.get(URL.getAquariums);
    const livestock = await axios.get(URL.getLivestock);
    const plants = await axios.get(URL.getPlants);

    let normalizedData = {
      general: [],
      livestock: {},
      plants: {},
    };

    normalizedData.general = aquariums.data.data;

    normalizedData.general.forEach((item) => {
      let matchingLivestock = livestock.data.data.filter(
        (livestock) => item._id === livestock.aquarium._id
      );
      let matchingPlants = plants.data.data.filter(
        (plant) => item._id === plant.aquarium._id
      );
      normalizedData.livestock[item._id] = matchingLivestock;
      normalizedData.plants[item._id] = matchingPlants;
    });

    dispatch({
      type: GET_AQUARIUMS,
      payload: normalizedData,
    });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const addAquarium = (formData) => async (dispatch) => {
  const URL = "/api/v1/aquariums";

  try {
    const res = await axios.post(URL, formData, jsonHeader);

    dispatch({ type: ADD_AQUARIUM, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const editAquarium = (formData, aquariumId) => async (dispatch) => {
  const URL = `/api/v1/aquariums/${aquariumId}`;
  console.log(URL);
  try {
    const res = await axios.put(URL, formData);

    dispatch({ type: EDIT_AQUARIUM, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const deleteAquarium = (aquariumId) => async (dispatch) => {
  const URL = `/api/v1/aquariums/${aquariumId}`;
  try {
    await axios.delete(URL);
    dispatch(getAquariums());
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};
export const addLivestock = (aquariumId, formData) => async (dispatch) => {
  const URL = `/api/v1/aquariums/${aquariumId}/livestock`;

  try {
    const res = await axios.post(URL, formData, jsonHeader);

    const payloadObj = {
      data: res.data.data,
      _id: aquariumId,
    };

    dispatch({ type: ADD_LIVESTOCK, payload: payloadObj });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const addPlant = (aquariumId, formData) => async (dispatch) => {
  const URL = `/api/v1/aquariums/${aquariumId}/plants`;

  try {
    const res = await axios.post(URL, formData, jsonHeader);

    const payloadObj = {
      data: res.data.data,
      _id: aquariumId,
    };

    console.log(payloadObj);

    dispatch({ type: ADD_PLANT, payload: payloadObj });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const addMaintenanceEvent = (aquariumId, formData, type) => async (
  dispatch
) => {
  const URL = `/api/v1/aquariums/${aquariumId}/${type}`;

  let property;

  if (type === "waterchanges") {
    property = "lastWaterchange";
  } else if (type === "parameters") {
    property = "lastParameterCheck";
  } else if (type === "maintenanceTasks") {
    property = "lastMaintenance";
  }

  try {
    const res = await axios.post(URL, formData, jsonHeader);

    const payloadObj = {
      property: property,
      data: res.data.data,
      _id: aquariumId,
    };

    console.log(payloadObj);

    dispatch({ type: ADD_MAINTENANCE_EVENT, payload: payloadObj });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const editLivestock = (formData, livestockId) => async (dispatch) => {
  const URL = `/api/v1/livestock/${livestockId}`;

  try {
    const res = await axios.put(URL, formData, jsonHeader);
    dispatch({ type: EDIT_LIVESTOCK, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const editPlant = (formData, plantId) => async (dispatch) => {
  const URL = `/api/v1/plants/${plantId}`;

  try {
    const res = await axios.put(URL, formData, jsonHeader);
    dispatch({ type: EDIT_PLANT, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};
