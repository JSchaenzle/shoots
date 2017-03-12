import {
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  CLEAR_LOG_IN_CREATE_ACCOUNT_SERVER_ERROR
} from './actionTypes.js';
import { webRequestAction } from './webRequestAction.js';

const createAccountStarted = () => {
  return {
    type: CREATE_ACCOUNT_START,
    payload: {}
  };
};

const createAccountSuccess = (session) => {
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
    payload: errorInfo
  };
};

const logInStarted = () => {
  return {
    type: LOG_IN_START,
    payload: {}
  };
};

const logInSuccess = (session) => {
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
    payload: errorInfo
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
    onSuccess: createAccountSuccess
  });
}

export function requestSignIn(accountInfo) {
  return webRequestAction("/api/sessions", {
    method: "POST",
    data: JSON.stringify(accountInfo),
    preRequest: logInStarted,
    onError: logInError,
    processResponseData: convertJsonToSession,
    onSuccess: logInSuccess
  });
}

export function clearLogInCreateAccountServerError() {
  return {
    type: CLEAR_LOG_IN_CREATE_ACCOUNT_SERVER_ERROR,
    payload: {}
  };
}

