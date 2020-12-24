import {
  START_REQUEST,
  REQUEST_FAILED,
  GET_AQUARIUMS,
  ADD_AQUARIUM,
  ADD_LIVESTOCK,
  ADD_PLANT,
} from "../constants/aquariums";

const initialState = {
  loading: true,
  general: [],
  livestock: {},
  plants: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case START_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_AQUARIUMS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case REQUEST_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case ADD_AQUARIUM: {
      console.log(payload);
      return {
        ...state,
        general: [payload.data, ...state.general],
        livestock: { ...state.livestock, [payload.data._id]: [] },
        plants: { ...state.plants, [payload.data._id]: [] },
      };
    }
    case ADD_LIVESTOCK: {
      return {
        ...state,
        livestock: {
          ...state.livestock,
          [payload._id]: [payload.data, ...state.livestock[payload._id]],
        },
      };
    }
    case ADD_PLANT: {
      return {
        ...state,
        plants: {
          ...state.plants,
          [payload._id]: [payload.data, ...state.plants[payload._id]],
        },
      };
    }
    default:
      return state;
  }
}
