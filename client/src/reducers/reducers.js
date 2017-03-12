import { combineReducers } from 'redux';
import photoshoots from './photoshoots.js';
import accounts from './accounts.js';

const shootsApp = combineReducers({
  photoshoots,
  accounts
});

export default shootsApp;

