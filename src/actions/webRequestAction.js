import $ from 'jquery';

export const webRequestAction = (url, config) => {
  return (dispatch, getState) => {
    dispatch(config.preRequest());

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
          dispatch(config.onError(error));
          console.log("Error processing api request: ", url, status, error);
        });
  };
}
