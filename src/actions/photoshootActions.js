import { ADD_PHOTOSHOOT, RECEIVE_CREATED_PHOTOSHOOT } from './actionTypes.js';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';

export const addPhotoshoot = (name, date) => {
  return {
    type: ADD_PHOTOSHOOT,
    payload: {
      name: name,
      date: date
    }
  };
};

export const receiveCreatedPhotoshoot = (json) => {
  return {
    type: RECEIVE_CREATED_PHOTOSHOOT,
    payload: json
  };
};

export function requestAddPhotoshoot(name, date) {
  return (dispatch) => {
    // dispatch(addPhotoshoot(name,date));

    let newPost = {name: name, date: date};
    return $.post('/photoshoots', JSON.stringify(newPost))
      .then(response => {
        console.log("Got response", response);
        return JSON.parse(response);
      })
      .then(json => {
        dispatch(receiveCreatedPhotoshoot(json));
      });
  };
};

