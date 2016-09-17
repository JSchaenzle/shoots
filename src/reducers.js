import { combineReducers } from 'redux';
import photoshoots from './reducers/photoshoots.js';
import accounts from './reducers/accounts.js';

const shootsApp = combineReducers({
  photoshoots,
  accounts
});

export default shootsApp;

