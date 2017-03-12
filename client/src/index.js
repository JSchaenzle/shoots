// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './styles/index.css';
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

// -------------------------------------------------------
// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { PhotoshootsList } from './containers/photoshootsList.js';
import { PhotoshootCreator } from './containers/photoshootCreator.js';
import { PhotoshootEditor } from './containers/PhotoshootEditor.js';
import { ExpenseList } from './containers/expenseList.js';
import { ExpenseCreator } from './containers/expenseCreator.js';
import { ReportViewer } from './containers/ReportViewer.js';
import { AccountAccess } from './containers/accountAccess.js';
import shootsApp from './reducers/reducers.js';
import App from './App.jsx';
import {requestRetrieveAllPhotoshoots} from "./actions/photoshootActions.js";

require('./styles/milligram/milligram.min.css');
import './styles/generated/styles/main.css';

const loggerMiddleware = createLogger();

const savedAccountState = localStorage.getItem("account");
const initialState = savedAccountState ?
                     {accounts: JSON.parse(savedAccountState)} :
                     {};

console.log("Creating initial redux store...");
let store = createStore(
  shootsApp,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware));


let unsubscribe = store.subscribe(() => {
  let state = store.getState();
  localStorage.setItem("account", JSON.stringify(state.accounts));
});


// Start initial retrieval for all shoots
store.dispatch(requestRetrieveAllPhotoshoots());

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/account-access" component={AccountAccess} />

      <Route path="/" component={App}>
        <IndexRoute component={PhotoshootsList} />

        <Route path="/photoshoots" component={PhotoshootsList} />
        <Route path="/photoshoots/new-shoot" component={PhotoshootCreator} />
        <Route path="/photoshoots/edit-shoot/:photoshootId" component={PhotoshootEditor} />

        <Route path="/expenses" component={ExpenseList} />
        <Route path="/expenses/new-expense" component={ExpenseCreator} />

        <Route path="/reports" component={ReportViewer} />
      </Route>

    </Router>
  </Provider>
), document.getElementById('root'));

