import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import {
  ADD_PHOTOSHOOT_START,
  ADD_PHOTOSHOOT_SUCCESS,
  ADD_PHOTOSHOOT_ERROR,
  UPDATE_PHOTOSHOOT_START,
  UPDATE_PHOTOSHOOT_SUCCESS,
  UPDATE_PHOTOSHOOT_ERROR } from './actionTypes.js';

const addPhotoshootStarted = () => {
  return {
    type: ADD_PHOTOSHOOT_START,
    payload: {}
  };
};

const addPhotoshootSuccess = (details) => {
  return {
    type: ADD_PHOTOSHOOT_SUCCESS,
    payload: details
  };
};

const addPhotoshootError = (errorInfo) => {
  return {
    type: ADD_PHOTOSHOOT_ERROR,
    payload: {errorInfo}
  };
};

const convertJsonToPhotoshoot = (json) => {
  return Object.assign({}, json, {price: new Number(json.price)});
};

export function requestAddPhotoshoot(details) {
  return (dispatch) => {
    dispatch(addPhotoshootStarted());

    let newPost = Object.assign({}, details);

    return $.post('/photoshoots', JSON.stringify(newPost))
      .then(
        (response) => {
          return JSON.parse(response);
        },
        (xhr, status, error) => {
          console.log("Error received while adding photoshoot");
          addPhotoshootError(error);
        })
      .then(json => {
        return convertJsonToPhotoshoot(json);
      })
      .then(shoot => {
        dispatch(addPhotoshootSuccess(shoot));
        browserHistory.push('/');
      });
  };
};

export const updatePhotoshootStarted = () => {
  return {
    type: UPDATE_PHOTOSHOOT_START,
    payload: {}
  };
};

const updatePhotoshootSuccess = (details) => {
  return {
    type: UPDATE_PHOTOSHOOT_SUCCESS,
    payload: details
  };
};

const updatePhotoshootError = (errorInfo) => {
  return {
    type: UPDATE_PHOTOSHOOT_ERROR,
    payload: {errorInfo}
  };
};

export function requestUpdatePhotoshoot(details) {
  return (dispatch) => {
    dispatch(updatePhotoshootStarted());

    let updatedPost = Object.assign({}, details);
    let id = updatedPost.id;
    // Don't send the ID in the body. Only send it in url.
    delete updatedPost.id;

    return $.ajax({
      url: `/photoshoots/${id}`,
      type: 'PUT',
      contentType: "application/json; charset=utf-8",
      dataType   : "json",
      data: JSON.stringify(updatedPost)
    })
    .then(
      (response) => {
        return response;
      },
      (xhr, status, error) => {
        console.log("Error received while updating photoshoot");
        updatePhotoshootError(error);
      })
    .then(json => {
      return convertJsonToPhotoshoot(json);
    })
    .then(shoot => {
      dispatch(updatePhotoshootSuccess(shoot));
      browserHistory.push('/');
    });
  };
};

