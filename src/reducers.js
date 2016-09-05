import { combineReducers } from 'redux';
import photoshoots from './reducers/photoshoots.js';

console.log("photoshoots reducer:", photoshoots);

const shootsApp = combineReducers({
  photoshoots
});

export default shootsApp;

