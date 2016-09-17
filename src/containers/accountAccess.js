import { connect } from 'react-redux';
import LoginCreateAccount, {CREATE_MODE, LOGIN_MODE} from '../components/LoginCreateAccount.jsx';
import { requestCreateAccountAndSignIn } from '../actions/accountActions.js';

const mapStateToProps = (state, ownProps) => {
  return {mode: CREATE_MODE};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (accountInfo) => {
      console.log("Requesting create account");
      dispatch(requestCreateAccountAndSignIn(accountInfo));
    },
    onLogin: (credentials) => {
      console.log("Requestion log in");
    }
  };
};

export const AccountAccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCreateAccount);
