import $ from 'jquery';
import {
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR
} from './actionTypes.js';
import { webRequestAction } from './webRequestAction.js';

const createAccountStarted = () => {
  return {
    type: CREATE_ACCOUNT_START,
    payload: {}
  };
};

const createAccountSucess = (session) => {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    payload: {
      session: session
    }
  };
};

const createAccountError = (errorInfo) => {
  return {
    type: CREATE_ACCOUNT_ERROR,
    payload: {errorInfo}
  };
};

const logInStarted = () => {
  return {
    type: LOG_IN_START,
    payload: {}
  };
};

const logInSucess = (session) => {
  return {
    type: LOG_IN_SUCCESS,
    payload: {
      session: session
    }
  };
};

const logInError = (errorInfo) => {
  return {
    type: LOG_IN_ERROR,
    payload: {errorInfo}
  };
};

const convertJsonToSession = (json) => {
  return Object.assign({}, json);
};

export function requestCreateAccountAndSignIn(accountInfo) {
  return webRequestAction("/api/users", {
    method: "POST",
    data: JSON.stringify(accountInfo),
    preRequest: createAccountStarted,
    onError: createAccountError,
    processResponseData: convertJsonToSession,
    onSuccess: createAccountSucess
  });
}

export function requestSignIn(accountInfo) {
  return webRequestAction("/api/sessions", {
    method: "POST",
    data: JSON.stringify(accountInfo),
    preRequest: logInStarted,
    onError: logInError,
    processResponseData: convertJsonToSession,
    onSuccess: logInSucess
  });
}
