import React from 'react';

export default class Reports extends React.Component {

  componentWillMount() {
    this.props.getYearlyReport(2016);
  }

  render() {
    return (
      <div>
        Reports Go Here:
        <ul>
          <li>Annual Reports</li>
          <li>Report</li>
          <li>Report</li>
        </ul>
      </div>
    );
  }
}

