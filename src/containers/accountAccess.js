import { connect } from 'react-redux';
// import NewShoot from '../components/NewShoot.jsx';
// import { requestAddPhotoshoot } from '../actions/photoshootActions.js';
import LoginCreateAccount, {CREATE_MODE, LOGIN_MODE} from '../components/LoginCreateAccount.jsx';

const mapStateToProps = (state, ownProps) => {
  return {mode: CREATE_MODE};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (accountInfo) => {
      console.log("Requesting create account");
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
