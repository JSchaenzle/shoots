import React from 'react';

export class Expenses extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="centered">
          <a className="button" href="/expenses/new-expense">New Expense...</a>
        </div>
        <h4>Expenses</h4>
      </div>
    )
  }
}
