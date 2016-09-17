import { ADD_PHOTOSHOOT_START,
         ADD_PHOTOSHOOT_SUCCESS,
         ADD_PHOTOSHOOT_ERROR,
         UPDATE_PHOTOSHOOT_START,
         UPDATE_PHOTOSHOOT_SUCCESS,
         UPDATE_PHOTOSHOOT_ERROR,
         RETRIEVE_ALL_PHOTOSHOOTS_START,
         RETRIEVE_ALL_PHOTOSHOOTS_SUCCESS,
         RETRIEVE_ALL_PHOTOSHOOTS_ERROR,
         DELETE_PHOTOSHOOT_START,
         DELETE_PHOTOSHOOT_SUCCESS,
         DELETE_PHOTOSHOOT_ERROR
       } from '../actions/actionTypes.js';
var update = require('react-addons-update');

const initialState = {
  retrieving: false,
  list: []
};

const photoshoots = (state = initialState, action) => {
  switch(action.type) {

    case ADD_PHOTOSHOOT_START:
    case UPDATE_PHOTOSHOOT_START:
    case RETRIEVE_ALL_PHOTOSHOOTS_START:
    case DELETE_PHOTOSHOOT_START:
      return update(state, {retrieving: {$set: true}});

    case ADD_PHOTOSHOOT_SUCCESS:
      return update(state, {
        retrieving: {$set: false},
        list: {$push: [action.payload]}
      });

    case UPDATE_PHOTOSHOOT_SUCCESS:
      let copy = Object.assign({}, state, {retrieving: false});
      let shoot = copy.list.find(s => {
        return s.id == action.payload.id;
      });
      Object.assign(shoot, action.payload);
      return copy;

    case RETRIEVE_ALL_PHOTOSHOOTS_SUCCESS:
      let newState = update(state, {
        list: {$set: action.payload},
        retrieving: {$set: false}
      });
      return newState;

    case DELETE_PHOTOSHOOT_SUCCESS: {
      let copy = Object.assign({}, state, {retrieving: false});
      let index = copy.list.findIndex(s => s.id == action.payload.id);
      if (index > -1) {
        copy.list.splice(index, 1);
      }
      return copy;
    }

    default:
      return state;
  }
};

export default photoshoots;

