import React from 'react';

export default class AnnualBusinessSummary extends React.Component {
  render() {
    <div>
      <ul>
        <li> {`Dollars Earned: $${this.props.income}`} </li>
        <li> {`Time Editing: ${this.props.hoursEditing} hours`} </li>
        <li> {`Time Shooting: ${this.props.hoursShooting} hours`} </li>
        <li> {`Distance Travelled: ${this.props.milesTravelled} miles`} </li>
      </ul>
    </div>
  }
}

AnnualBusinessSummary.propTypes = {
  income: React.PropTypes.number.isRequired,
  hoursEditing: React.PropTypes.number.isRequired,
  hoursShooting: React.PropTypes.number.isRequired,
  milesTravelled: React.PropTypes.number.isRequired
};

