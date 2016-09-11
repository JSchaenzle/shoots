import { combineReducers } from 'redux';
import photoshoots from './reducers/photoshoots.js';

const shootsApp = combineReducers({
  photoshoots
});

export default shootsApp;

