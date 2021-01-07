import {
  START_REQUEST,
  REQUEST_FAILED,
  GET_AQUARIUMS,
  ADD_AQUARIUM,
  ADD_LIVESTOCK,
  ADD_PLANT,
  EDIT_AQUARIUM,
  EDIT_LIVESTOCK,
  ADD_MAINTENANCE_EVENT,
  EDIT_PLANT,
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
    case EDIT_AQUARIUM: {
      const updateIndex = state.general
        .map((item) => item._id)
        .indexOf(payload.data._id);

      console.log({ updateIndex });
      console.log({ payload });
      return {
        ...state,
        general: [
          ...state.general.slice(0, updateIndex),
          { ...state.general[updateIndex], ...payload.data },
          ...state.general.slice(updateIndex + 1),
        ],
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

    case EDIT_LIVESTOCK: {
      const updateIndex = state.livestock[payload.data.aquarium]
        .map((item) => item._id)
        .indexOf(payload.data._id);

      return {
        ...state,
        livestock: {
          ...state.livestock,
          [payload.data.aquarium]: [
            ...state.livestock[payload.data.aquarium].slice(0, updateIndex),
            {
              ...state.livestock[payload.data.aquarium][updateIndex],
              name: payload.data.name,
              description: payload.data.description,
              quantity: payload.data.quantity,
              price: payload.data.price,
            },
            ...state.livestock[payload.data.aquarium].slice(updateIndex + 1),
          ],
        },
      };
    }

    case EDIT_PLANT: {
      const updateIndex = state.plants[payload.data.aquarium]
        .map((item) => item._id)
        .indexOf(payload.data._id);

      return {
        ...state,
        plants: {
          ...state.plants,
          [payload.data.aquarium]: [
            ...state.plants[payload.data.aquarium].slice(0, updateIndex),
            {
              ...state.plants[payload.data.aquarium][updateIndex],
              name: payload.data.name,
              description: payload.data.description,
              quantity: payload.data.quantity,
              price: payload.data.price,
            },
            ...state.plants[payload.data.aquarium].slice(updateIndex + 1),
          ],
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
    case ADD_MAINTENANCE_EVENT: {
      const updateIndex = state.general
        .map((item) => item._id)
        .indexOf(payload._id);

      console.log(updateIndex);
      return {
        ...state,
        general: [
          ...state.general.slice(0, updateIndex),
          {
            ...state.general[updateIndex],
            [payload.property]: payload.data.createdAt,
          },
          ...state.general.slice(updateIndex + 1),
        ],
      };
    }

    default:
      return state;
  }
}
