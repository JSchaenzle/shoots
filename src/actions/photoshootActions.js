import { ADD_PHOTOSHOOT } from './actionTypes.js';

export const addPhotoshoot = (name, date) => {
  return {
    type: ADD_PHOTOSHOOT,
    payload: {
      name: name,
      date: date
    }
  };
};

