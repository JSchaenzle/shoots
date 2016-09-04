/* ;import '../lib/app/public/styles.css';*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import {Shoots, NewShoot} from './components/shoots.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Shoots}/>
    <Route path="/new-shoot" component={NewShoot}/>
  </Router>
), document.getElementById('root'))


