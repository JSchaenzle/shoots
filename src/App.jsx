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
            <ul className="navigation-list float-right">
              <li className="navigation-item">
                <Link className="navigation-link" to="/photoshoots">Photoshoots</Link>
              </li>
              <li className="navigation-item">
                <Link className="navigation-link" to="/reports">Reports</Link>
              </li>
              <li className="navigation-item">
                <input type='submit' value="Log out" onClick={this.handleLogOut} ></input>
              </li>
            </ul>
          </div>
        </nav>
        <div className="header container"></div>
        {this.props.children}
      </div>
    );
  }
}

