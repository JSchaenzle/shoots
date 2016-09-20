import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import {
  ADD_PHOTOSHOOT_START,
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
} from './actionTypes.js';

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

const convertJsonToPhotoshoots = (json) => {
  return json.map(convertJsonToPhotoshoot);
};

const convertJsonToPhotoshoot = (json) => {
  return Object.assign({}, json, {
    price: new Number(json.price).valueOf()
  });
};

export function requestAddPhotoshoot(details) {
  let newPost = Object.assign({}, details);

  return webRequestAction(`/api/photoshoots`, {
    method: 'POST',
    data: JSON.stringify(newPost),
    preRequest: addPhotoshootStarted,
    onError: addPhotoshootError,
    processResponseData: convertJsonToPhotoshoot,
    onSuccess: addPhotoshootSuccess
  });

  // return (dispatch) => {
  //   dispatch(addPhotoshootStarted());

  //   let newPost = Object.assign({}, details);

  //   return $.post('/api/photoshoots', JSON.stringify(newPost))
  //     .then(
  //       (response) => {
  //         let json = JSON.parse(response);
  //         let shoot = convertJsonToPhotoshoot(json);
  //         dispatch(addPhotoshootSuccess(shoot));
  //         browserHistory.push('/photoshoots');
  //       },
  //       (xhr, status, error) => {
  //         console.log("Error received while adding photoshoot: ", error);
  //         dispatch(addPhotoshootError(error));
  //       }
  //     );
  // };
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
      url: `/api/photoshoots/${id}`,
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
      browserHistory.push('/photoshoots');
    });
  };
};


export const retrieveAllPhotoshootsStarted = () => {
  return {
    type: RETRIEVE_ALL_PHOTOSHOOTS_START,
    payload: {}
  };
};

const retrieveAllPhotoshootsSuccess = (photoshoots) => {
  return {
    type: RETRIEVE_ALL_PHOTOSHOOTS_SUCCESS,
    payload: photoshoots
  };
};

const retrieveAllPhotoshootsError = (errorInfo) => {
  return {
    type: RETRIEVE_ALL_PHOTOSHOOTS_ERROR,
    payload: {errorInfo}
  };
};

function webRequestAction(url, config) {
  return (dispatch, getState) => {
    dispatch(config.preRequest());

    console.log("Starting web request. State: ", getState());
    const user = getState().accounts.activeSession.user;
    const authToken = user ? user.auth_token : null;
    let headers = {
      SHOOTS_AUTH_TOKEN: authToken
    };
    console.log("Headers: ", headers);

    return $.ajax(url, {
      method: config.method,
      headers: headers,
      data: config.data,
      statusCode: {
        401: (xhr) => {
          console.log("Attempting to redirect");
          browserHistory.push("/account-access");
        }
      }
    })
      .then(
        (response) => {
          let result = config.processResponseData(response);
          dispatch(config.onSuccess(result));
        },
        (xhr, status, error) => {
          dispatch(config.onError(error));
          console.log("status: ", status, error);
        });
  };
}

export function requestRetrieveAllPhotoshoots(details) {
  return webRequestAction(`/api/photoshoots`, {
    method: 'GET',
    preRequest: retrieveAllPhotoshootsStarted,
    onError: retrieveAllPhotoshootsError,
    processResponseData: convertJsonToPhotoshoots,
    onSuccess: retrieveAllPhotoshootsSuccess
  });
};

export const deletePhotoshootStarted = () => {
  return {
    type: DELETE_PHOTOSHOOT_START,
    payload: {}
  };
};

const deletePhotoshootSuccess = (id) => {
  return {
    type: DELETE_PHOTOSHOOT_SUCCESS,
    payload: {id}
  };
};

const deletePhotoshootError = (errorInfo) => {
  return {
    type: DELETE_PHOTOSHOOT_ERROR,
    payload: {errorInfo}
  };
};

export function requestDeletePhotoshoot(id) {
  return (dispatch) => {
    dispatch(deletePhotoshootStarted());

    return $.ajax({
      url: `/api/photoshoots/${id}`,
      type: 'DELETE'
    })
    .then(
      (response) => {
        dispatch(deletePhotoshootSuccess(id));
        browserHistory.push('/photoshoots');
      },
      (xhr, status, error) => {
        console.log("Error received while deleting photoshoot");
        dispatch(deletePhotoshootError(error));
      });
  };
}

