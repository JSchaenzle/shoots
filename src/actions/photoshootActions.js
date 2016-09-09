import { ADD_PHOTOSHOOT_START, ADD_PHOTOSHOOT_SUCCESS, ADD_PHOTOSHOOT_ERROR } from './actionTypes.js';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import { browserHistory } from 'react-router';

export const addPhotoshootStarted = () => {
  return {
    type: ADD_PHOTOSHOOT_START,
    payload: {}
  };
};

export const addPhotoshootSuccess = (details) => {
  return {
    type: ADD_PHOTOSHOOT_SUCCESS,
    payload: details
  };
};

export const addPhotoshootError = (errorInfo) => {
  return {
    type: ADD_PHOTOSHOOT_ERROR,
    payload: {errorInfo}
  };
};

export function requestAddPhotoshoot(name, date) {
  return (dispatch) => {
    dispatch(addPhotoshootStarted());

    let newPost = {name: name, date: date};
    return $.post('/photoshoots', JSON.stringify(newPost))
      .then(
        (response) => {
          console.log("Got response", response);
          return JSON.parse(response);
        },
        (xhr, status, error) => {
          console.log("Error received while adding photoshoot");
          addPhotoshootError(error);
        })
      .then(json => {
        dispatch(addPhotoshootSuccess(json));
        browserHistory.push('/');
      });
  };
};

