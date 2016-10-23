import React from 'react';
import { Link } from 'react-router';

export class Expenses extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="centered">
          <Link className="button" to="/expenses/new-expense">New Expense...</Link>
        </div>
        <h4>Expenses</h4>
      </div>
    )
  }
}
