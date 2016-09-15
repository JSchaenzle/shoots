/* ;import '../lib/app/public/styles.css';*/
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { PhotoshootsList } from './containers/photoshootsList.js';
import { PhotoshootCreator } from './containers/photoshootCreator.js';
import { PhotoshootEditor } from './containers/PhotoshopEditor.js';
import { ReportViewer } from './containers/ReportViewer.js';
import shootsApp from './reducers.js';
import App from './App.jsx';

import {requestRetrieveAllPhotoshoots} from "./actions/photoshootActions.js";


const loggerMiddleware = createLogger();

console.log("Creating initial redux store...");
let store = createStore(
  shootsApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware));

/* console.log("initial state:", store.getState());
 *
 * let unsubscribe = store.subscribe(() => {
 *   console.log("updated redux state:", store.getState());
 * });*/

/* console.log("PhotoshootCreator: ", PhotoshootCreator );*/


store.dispatch(requestRetrieveAllPhotoshoots());

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PhotoshootsList} />

        <Route path="/photoshoots" component={PhotoshootsList} />
        <Route path="/photoshoots/new-shoot" component={PhotoshootCreator} />
        <Route path="/photoshoots/edit-shoot/:photoshootId" component={PhotoshootEditor} />
        <Route path="/reports" component={ReportViewer} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))