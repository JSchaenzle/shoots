import { RETRIEVE_REPORT_START } from './actionTypes.js';
import { RETRIEVE_REPORT_SUCCESS } from './actionTypes.js';
import { RETRIEVE_REPORT_ERROR } from './actionTypes.js';
import { webRequestAction } from './webRequestAction.js';

const retrieveReportStarted = () => {
  return {
    type: RETRIEVE_REPORT_START,
    payload: {}
  };
};

const retrieveReportSuccess = (reportInfo) => {
  return {
    type: RETRIEVE_REPORT_SUCCESS,
    payload: reportInfo
  };
};

const retrieveReportError = (errorInfo) => {
  return {
    type: RETRIEVE_REPORT_ERROR,
    payload: {}
  };
};

const convertJsonToReport = (json) => json;

export function requestRetrieveReport(reportRequest) {
  return webRequestAction(reportRequest.url, {
    method: 'GET',
    preRequest: retrieveReportStarted,
    onError: retrieveReportError,
    processResponseData: (resp, user) => {
      return {
        reportIdentifier: reportRequest.identifier,
        report: convertJsonToReport(resp),
        userId: user.id
      };
    },
    onSuccess: retrieveReportSuccess
  });
}

