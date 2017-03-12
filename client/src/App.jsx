// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React with JSX</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

import React from 'react';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

export default class App extends React.Component {

  handleLogOut() {
    browserHistory.push("/account-access");
  }

  render() {
    return (
      <div className="wrapper">
        <nav className="navigation">
          <div className="container">
            <a className="navigation-title">Shootz</a>
            <input id="logout-button" className="button-outline" type='submit' value="Log out" onClick={this.handleLogOut} ></input>
          </div>
          <div className="navigation-list">
            <ul >
              <li className="navigation-item">
                <strong>
                  <u><Link className="navigation-link" to="/photoshoots">Photoshoots</Link></u>
                </strong>
              </li>
              <li className="navigation-item">
                <strong>
                  <u><Link className="navigation-link" to="/expenses">Expenses</Link></u>
                </strong>
              </li>
              <li className="navigation-item">
                <strong>
                  <u><Link className="navigation-link" to="/reports">Reports</Link></u>
                </strong>
              </li>
            </ul>
          </div>
        </nav>
        <div className="nav-spacer"></div>
        {this.props.children}
      </div>
    );
  }
}

