import $ from 'jquery';
import {browserHistory} from 'react-router';
import {wrapError} from '../utils/webRequestErrorHelper.js';

export const webRequestAction = (url, config) => {
  return (dispatch, getState) => {
    dispatch(config.preRequest());

    const user = getState().accounts.activeSession.user;
    const authToken = user ? user.auth_token : null;
    let headers = {
      SHOOTS_AUTH_TOKEN: authToken
    };

    return $.ajax(url, {
      method: config.method,
      headers: headers,
      data: config.data,
      statusCode: {
        401: (xhr) => {
          console.log("Redirecting to login due to unauthorized");
          browserHistory.push("/account-access");
        }
      }
    })
      .then(
        (response) => {
          let processFunc = config.processResponseData;
          let result = null;
          if (processFunc) {
            result = processFunc(response, user);
          }
          dispatch(config.onSuccess(result));
        },
        (xhr, status, error) => {
          console.log("webRequestAction: Request resulted in error...");
          let wrappedError = wrapError(xhr, status, error);
          dispatch(config.onError(wrappedError));

          // Not sure why can't user Promise.reject("ERROR") here
          throw new Error(error);
        });
  };
};

