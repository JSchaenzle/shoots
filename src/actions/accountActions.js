import $ from 'jquery';
import {
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR
} from './actionTypes.js';

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

const convertJsonToSession = (json) => {
  return Object.assign({}, json);
};

export function requestCreateAccountAndSignIn(accountInfo) {
  return (dispatch) => {
    dispatch(createAccountStarted());

    return $.post('/api/users', JSON.stringify(accountInfo))
      .then(
        (response) => {
          let json = JSON.parse(response);
          let session = convertJsonToSession(json);
          dispatch(createAccountSucess(session));
          // browserHistory.push('/photoshoots');
        },
        (xhr, status, error) => {
          console.log("Error received while creating account: ", error);
          dispatch(createAccountError(error));
        }
      );
  };
}
