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
import { webRequestAction } from './webRequestAction.js';

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
    payload: errorInfo
  };
};

const convertJsonToPhotoshoot = (json) => {
  return Object.assign({}, json, {
    price: Number(json.price).valueOf()
  });
};

const convertJsonToPhotoshoots = (json) => {
  return json.map(convertJsonToPhotoshoot);
};

export function requestAddPhotoshoot(details) {
  let newPost = Object.assign({}, details);

  return webRequestAction(`/api/photoshoots`, {
    method: 'POST',
    data: JSON.stringify(newPost),
    preRequest: addPhotoshootStarted,
    onError: addPhotoshootError,
    processResponseData: (resp, user) => {
      return {
        photoshoot: convertJsonToPhotoshoot(resp),
        userId: user.id
      };
    },
    onSuccess: addPhotoshootSuccess
  });
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
    payload: errorInfo
  };
};

export function requestUpdatePhotoshoot(details) {

  let updatedPost = Object.assign({}, details);
  let id = updatedPost.id;
  // Don't send the ID in the body. Only send it in url.
  delete updatedPost.id;

  return webRequestAction(`/api/photoshoots/${id}`, {
    method: 'PUT',
    data: JSON.stringify(updatedPost),
    preRequest: updatePhotoshootStarted,
    onError: updatePhotoshootError,
    processResponseData: (resp, user) => {
      return {
        photoshoot: convertJsonToPhotoshoot(resp),
        userId: user.id
      };
    },
    onSuccess: updatePhotoshootSuccess
  });
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
    payload: errorInfo
  };
};


export function requestRetrieveAllPhotoshoots() {
  return webRequestAction(`/api/photoshoots`, {
    method: 'GET',
    preRequest: retrieveAllPhotoshootsStarted,
    onError: retrieveAllPhotoshootsError,
    processResponseData: (resp, user) => {
      return {
        photoshoots: convertJsonToPhotoshoots(resp),
        userId: user.id
      };
    },
    onSuccess: retrieveAllPhotoshootsSuccess
  });
}

export const deletePhotoshootStarted = () => {
  return {
    type: DELETE_PHOTOSHOOT_START,
    payload: {}
  };
};

const deletePhotoshootSuccess = (details) => {
  return {
    type: DELETE_PHOTOSHOOT_SUCCESS,
    payload: details
  };
};

const deletePhotoshootError = (errorInfo) => {
  return {
    type: DELETE_PHOTOSHOOT_ERROR,
    payload: errorInfo
  };
};

export function requestDeletePhotoshoot(id) {
  return webRequestAction(`/api/photoshoots/${id}`, {
    method: 'DELETE',
    preRequest: deletePhotoshootStarted,
    onError: deletePhotoshootError,
    processResponseData: (resp, user) => {
      return {
        photoshootId: id,
        userId: user.id
      };
    },
    onSuccess: deletePhotoshootSuccess
  });
}

