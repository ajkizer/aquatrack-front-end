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
  REMOVE_LIVESTOCK,
  REMOVE_PLANT,
} from "../constants/aquariums";

import { handleAlert } from "./alerts";
import { jsonHeader } from "../../utils/jsonHeader";

const root = "https://aquatrack-api-v1.herokuapp.com";

export const getAquariums = () => async (dispatch) => {
  const URL = {
    getAquariums: `${root}/api/v1/aquariums`,
    getLivestock: `${root}/api/v1/livestock`,
    getPlants: `${root}/api/v1/plants`,
    getWaterchanges: `${root}/api/v1/waterchanges`,
    getParameters: `${root}/api/v1/parameters`,
    getMaintenance: `${root}/api/v1/maintenanceTasks`,
  };

  try {
    dispatch({ type: START_REQUEST });

    const aquariums = await axios.get(URL.getAquariums);
    const livestock = await axios.get(URL.getLivestock);
    const plants = await axios.get(URL.getPlants);
    const waterchanges = await axios.get(URL.getWaterchanges);
    const parameters = await axios.get(URL.getParameters);
    const maintenanceTasks = await axios.get(URL.getMaintenance);

    let normalizedData = {
      general: [],
      livestock: {},
      plants: {},
      waterchanges: {},
      parameters: {},
      maintenanceTasks: {},
    };

    normalizedData.general = aquariums.data.data;

    normalizedData.general.forEach((item) => {
      let matchingLivestock = livestock.data.data.filter(
        (livestock) => item._id === livestock.aquarium._id
      );
      let matchingPlants = plants.data.data.filter(
        (plant) => item._id === plant.aquarium._id
      );
      let matchingWaterchanges = waterchanges.data.data.filter(
        (waterchange) => item._id === waterchange.aquarium._id
      );

      let matchingParameters = parameters.data.data.filter(
        (parameter) => item._id === parameter.aquarium._id
      );

      let matchingMaintenance = maintenanceTasks.data.data.filter(
        (task) => item._id === task.aquarium._id
      );
      normalizedData.livestock[item._id] = matchingLivestock;
      normalizedData.plants[item._id] = matchingPlants;
      normalizedData.waterchanges[item._id] = matchingWaterchanges;
      normalizedData.parameters[item._id] = matchingParameters;
      normalizedData.maintenanceTasks[item._id] = matchingMaintenance;
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
  const URL = `${root}/api/v1/aquariums`;

  try {
    const res = await axios.post(URL, formData, jsonHeader);

    dispatch(handleAlert("Added Aquarium", "success", "aquariumSectionAlert"));
    dispatch({ type: ADD_AQUARIUM, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const editAquarium = (formData, aquariumId) => async (dispatch) => {
  const URL = `${root}/api/v1/aquariums/${aquariumId}`;
  console.log(URL);
  try {
    const res = await axios.put(URL, formData);

    dispatch({ type: EDIT_AQUARIUM, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const deleteAquarium = (aquariumId) => async (dispatch) => {
  const URL = `${root}/api/v1/aquariums/${aquariumId}`;
  try {
    await axios.delete(URL);
    dispatch(getAquariums());
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};
export const addLivestock = (aquariumId, formData) => async (dispatch) => {
  const URL = `${root}/api/v1/aquariums/${aquariumId}/livestock`;

  try {
    const res = await axios.post(URL, formData, jsonHeader);
    const aquarium = await axios.get(`${root}/api/v1/aquariums/${aquariumId}`);

    console.log(aquarium);
    res.data.data.aquarium = {
      _id: res.data.data.aquarium,
      name: aquarium.data.data.name,
    };
    const payloadObj = {
      data: res.data.data,
      _id: aquariumId,
    };
    dispatch(
      handleAlert("Added Livestock Item", "success", "aquariumSectionAlert")
    );

    dispatch({ type: ADD_LIVESTOCK, payload: payloadObj });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const addPlant = (aquariumId, formData) => async (dispatch) => {
  const URL = `${root}/api/v1/aquariums/${aquariumId}/plants`;

  try {
    const res = await axios.post(URL, formData, jsonHeader);

    const payloadObj = {
      data: res.data.data,
      _id: aquariumId,
    };

    dispatch(handleAlert("Added Plant", "success", "aquariumSectionAlert"));
    dispatch({ type: ADD_PLANT, payload: payloadObj });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const addMaintenanceEvent = (aquariumId, formData, type) => async (
  dispatch
) => {
  const URL = `${root}/api/v1/aquariums/${aquariumId}/${type}`;

  let property;
  let text;

  if (type === "waterchanges") {
    property = "lastWaterchange";
    text = "Water change added";
  } else if (type === "parameters") {
    property = "lastParameterCheck";
    text = "Parameter check added";
  } else if (type === "maintenanceTasks") {
    property = "lastMaintenance";
    text = "General maintenance task added";
  }

  try {
    const res = await axios.post(URL, formData, jsonHeader);

    const payloadObj = {
      property: property,
      type: type,
      data: res.data.data,
      _id: aquariumId,
    };

    dispatch(handleAlert(text, "success", "maintenanceSectionAlert"));

    dispatch({ type: ADD_MAINTENANCE_EVENT, payload: payloadObj });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const editLivestock = (formData, livestockId) => async (dispatch) => {
  const URL = `${root}/api/v1/livestock/${livestockId}`;

  try {
    const res = await axios.put(URL, formData, jsonHeader);
    dispatch({ type: EDIT_LIVESTOCK, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const editPlant = (formData, plantId) => async (dispatch) => {
  const URL = `${root}/api/v1/plants/${plantId}`;

  try {
    const res = await axios.put(URL, formData, jsonHeader);
    dispatch({ type: EDIT_PLANT, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const removePlant = (plantId, aquariumId) => async (dispatch) => {
  const URL = `${root}/api/v1/plants/${plantId}`;
  try {
    await axios.delete(URL);

    const data = {
      aquariumId,
      plantId,
    };
    dispatch({ type: REMOVE_PLANT, payload: data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};

export const removeLivestock = (livestockId, aquariumId) => async (
  dispatch
) => {
  const URL = `${root}/api/v1/livestock/${livestockId}`;
  try {
    await axios.delete(URL);

    const data = {
      aquariumId,
      livestockId,
    };
    dispatch({ type: REMOVE_LIVESTOCK, payload: data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILED });
  }
};
