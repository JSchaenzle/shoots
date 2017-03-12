import { connect } from 'react-redux';
import LoginCreateAccount, {CREATE_MODE, LOGIN_MODE} from '../components/LoginCreateAccount.jsx';
import {
  requestCreateAccountAndSignIn,
  requestSignIn,
  clearLogInCreateAccountServerError
} from '../actions/accountActions.js';
import { browserHistory } from 'react-router';

const mapStateToProps = (state, ownProps) => {
  return {
    mode: CREATE_MODE,
    serverError: state.accounts.logInCreateAccountServerError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (accountInfo) => {
      console.log("Requesting create account");
      dispatch(requestCreateAccountAndSignIn(accountInfo))
        .then(() => browserHistory.push("/photoshoots"),
              (err) => console.log("Caught error: ", err));
    },
    onLogIn: (credentials) => {
      console.log("Requesting log in now");
      dispatch(requestSignIn(credentials))
        .then(() => {
          browserHistory.push("/photoshoots");
        }, (err) => {
          console.log("Caught error: ", err);
        });
    },
    onClearErrors: () => dispatch(clearLogInCreateAccountServerError())
  };
};

export const AccountAccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCreateAccount);
