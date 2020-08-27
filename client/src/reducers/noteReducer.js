import { GET_NOTES, ADD_NOTES, DELETE_NOTE } from "../actions/types";

const initialState = {
  notes: [
    {
      Title: "something",
      date: Date.now,
      Note: "Lore ipsum something something",
      id: 1,
    },
    {
      Title: "something2",
      date: Date.now,
      Note: "Lore ipsum something something2",
      id: 2,
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
      };
    default:
      return state;
  }
};
