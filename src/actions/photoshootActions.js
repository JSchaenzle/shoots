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

export function requestAddPhotoshoot(name, date) {
  return (dispatch) => {
    dispatch(addPhotoshootStarted());

    let newPost = {name: name, date: date};
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
        dispatch(addPhotoshootSuccess(json));
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

export function requestUpdatePhotoshoot(id, name, date) {
  return (dispatch) => {
    dispatch(updatePhotoshootStarted());

    let updatedPost = {name: name, date: date};

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
      dispatch(updatePhotoshootSuccess(json));
      browserHistory.push('/');
    });
  };
};

