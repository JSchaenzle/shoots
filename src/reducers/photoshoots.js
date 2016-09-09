import { ADD_PHOTOSHOOT_START,
         ADD_PHOTOSHOOT_SUCCESS,
         ADD_PHOTOSHOOT_ERROR } from '../actions/actionTypes.js';
var update = require('react-addons-update');

const initialState = {
  retrieving: false,
  list: []
}

const photoshoots = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PHOTOSHOOT_START:
      return update(state, {
        retrieving: {$set: true}
      });
      break;
    case ADD_PHOTOSHOOT_SUCCESS:
      console.log("State before: ", state);
      let result = update(state, {
        retrieving: {$set: false},
        list: {$push: [action.payload]}
      });
      console.log("State after: ", result);
      return result;
    default:
      return state;
  }
};

export default photoshoots;

