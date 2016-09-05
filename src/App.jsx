/* ;import '../lib/app/public/styles.css';*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import { createStore } from 'redux';
import {Shoots, NewShoot} from './components/shoots.jsx';
import shootsApp from './reducers.js';

import {addPhotoshoot} from "./actions/photoshootActions.js";

let store = createStore(shootsApp);

console.log("initial state:", store.getState());

let unsubscribe = store.subscribe(() => {
  console.log("updated state:", store.getState());
});

store.dispatch(addPhotoshoot("Bob", "some date"));
store.dispatch(addPhotoshoot("Joe", "some date"));
store.dispatch(addPhotoshoot("Steve", "steves date"));

unsubscribe();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Shoots}/>
    <Route path="/new-shoot" component={NewShoot}/>
  </Router>
), document.getElementById('root'))


