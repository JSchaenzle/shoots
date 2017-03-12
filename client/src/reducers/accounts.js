import {
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  CLEAR_LOG_IN_CREATE_ACCOUNT_SERVER_ERROR
} from '../actions/actionTypes.js';
import update from 'immutability-helper';


const initialState = {
  activeSession: {},
  showSpinner: false
};

const accounts = (state = initialState, action) => {
  console.log("Account state is: ", state);
  switch(action.type) {
    case CREATE_ACCOUNT_START:
    case LOG_IN_START:
      return update(state, {
        showSpinner: {$set: true},
        logInCreateAccountServerError: {$set: null}
      });

    case CREATE_ACCOUNT_SUCCESS:
    case LOG_IN_SUCCESS:
      return update(state, {
        activeSession: {$set: action.payload.session},
        showSpinner: {$set: false}
      });

    case CREATE_ACCOUNT_ERROR:
    case LOG_IN_ERROR:
      return update(state, {
        logInCreateAccountServerError: {$set: action.payload}
      });

    case CLEAR_LOG_IN_CREATE_ACCOUNT_SERVER_ERROR:
      return update(state, {
        logInCreateAccountServerError: {$set: null}
      });

    default:
    return state;
  }
};

export default accounts;

