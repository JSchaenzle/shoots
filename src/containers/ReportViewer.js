import { connect } from 'react-redux';
import Reports from '../components/Reports.jsx';
import { requestRetrieveReport } from '../actions/reportActions.js';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getYearlyReport: (year) => {
      const reportRequest = {
        url: `/api/reports/annual_summary/${year}`,
        identifier: `annual_summary-${year}`
      };
      return dispatch(requestRetrieveReport(reportRequest));
    }
  };
};

export const ReportViewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports);
