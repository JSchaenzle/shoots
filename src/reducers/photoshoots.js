import { ADD_PHOTOSHOOT } from '../actions/actionTypes.js';

const photoshoots = (state = [], action) => {
  switch(action.type) {
    case ADD_PHOTOSHOOT:
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
};

export default photoshoots;

