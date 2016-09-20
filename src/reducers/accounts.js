import {
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR
} from '../actions/actionTypes.js';
var update = require('react-addons-update');

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
        showSpinner: {$set: true}
      });

    case CREATE_ACCOUNT_SUCCESS:
    case LOG_IN_SUCCESS:
      return update(state, {
        activeSession: {$set: action.payload.session},
        showSpinner: {$set: false}
      });

    default:
    return state;
  }
};

export default accounts;

