import React from 'react';
import OptionallyDisplayed from './helperViews/OptionallyDisplayed.jsx';
import TextView from './helperViews/TextView.jsx';
import { Link } from 'react-router';
import { required, mustMatch, minLength } from '../utils/validation/rules.js';
import { ruleRunner, run } from '../utils/validation/ruleRunner.js';
import { unwrapErrorMessage } from '../utils/webRequestErrorHelper.js';
import $ from 'jquery';
import update from 'immutability-helper';

export const LOGIN_MODE = "LOGIN";
export const CREATE_MODE = "CREATE";

const fieldValidations = (mode) => mode === CREATE_MODE ? [
  ruleRunner("name", "Name", required),
  ruleRunner("emailAddress", "Email Address", required),
  ruleRunner("password1", "Password", required, minLength(6)),
  ruleRunner("password2", "Password Confirmation", mustMatch("password1", "Password"))
] : [
  ruleRunner("emailAddress", "Email Address", required),
  ruleRunner("password1", "Password", required, minLength(6))
];


export default class LoginCreateAccount extends React.Component {

  constructor(props) {
    super(props);
    this.handleFieldChanged = this.handleFieldChanged.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.handleToggleMode = this.handleToggleMode.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.state = {
      mode: props.mode,
      name: "",
      showErrors: false,
      validationErrors: {}
    };

    // Run validations on initial state
    this.state.validationErrors = run(this.state, fieldValidations(this.state.mode));
  }

  componentWillMount() {
    this.props.onClearErrors();
  }

  handleFieldChanged(field) {
    return (e) => {
      let newState = update(this.state, {
        [field]: {$set: e.target.value}
      });
      newState.validationErrors = run(newState, fieldValidations(this.state.mode));
      this.setState(newState);
    };
  }

  handleSubmitClicked() {
    this.setState({showErrors: true});
    if($.isEmptyObject(this.state.validationErrors) === false) return null;

    const formData = Object.assign({}, this.state);
    delete formData.mode;
    if (this.state.mode === LOGIN_MODE) {
      return this.props.onLogIn(formData);
    } else {
      return this.props.onCreateAccount(formData);
    }
  }

  errorFor(field) {
    return this.state.validationErrors[field] || "";
  }

  handleToggleMode() {
    this.props.onClearErrors();

    let newMode = this.state.mode === CREATE_MODE ? LOGIN_MODE : CREATE_MODE;
    this.setState({mode: newMode});
  }

  render() {

    let inCreateMode = () => this.state.mode === CREATE_MODE;
    let title = inCreateMode() ? "Create a new account" : "Log in to your account";
    let submitButtonText = inCreateMode() ? "Create Account" : "Log In";

    let toggleModeQuestion = inCreateMode() ? "Already have an account?" : "Don't have an account?";
    let toggleModeButtonText = inCreateMode() ? "Log in..." : "Create one now...";

    let errorBody = unwrapErrorMessage(this.props.serverError);
    // if (errorBody) {
    //   debugger;
    // }

    return (
      <div className="wrapper">
        <nav className="navigation centered">
          <div className="container">
            <a className="navigation-title ">Shootz</a>
          </div>
        </nav>
        <div className="header container login-create-account">
          <h3>{title}</h3>
          <OptionallyDisplayed display={!!errorBody}>
            <div className="server-error-message">
              {errorBody}
            </div>
          </OptionallyDisplayed>
          <OptionallyDisplayed display={inCreateMode()}>
            <TextView placeholder="Name" showError={this.state.showErrors}
                      text={this.props.name} onFieldChanged={this.handleFieldChanged("name")}
                      errorText={this.errorFor("name")} />
          </OptionallyDisplayed>
          <div>
            <TextView placeholder="Email address" showError={this.state.showErrors}
                      text={this.props.emailAddress} onFieldChanged={this.handleFieldChanged("emailAddress")}
                      errorText={this.errorFor("emailAddress")} />
          </div>
          <div>
            <TextView placeholder="Password" showError={this.state.showErrors} type="password"
                      text={this.props.password1} onFieldChanged={this.handleFieldChanged("password1")}
                      errorText={this.errorFor("password1")} />
          </div>

          <OptionallyDisplayed display={inCreateMode()}>
            <TextView placeholder="Confirm Password" showError={this.state.showErrors} type="password"
                      text={this.props.password2} onFieldChanged={this.handleFieldChanged("password2")}
                      errorText={this.errorFor("password2")} />
          </OptionallyDisplayed>
          <div>
            <input type='submit' value={submitButtonText} onClick={this.handleSubmitClicked} ></input>
          </div>

          <h4>{toggleModeQuestion}</h4>
          <div>
            <input type='submit' value={toggleModeButtonText} onClick={this.handleToggleMode} ></input>
          </div>
        </div>


      </div>
    );
  }
}

LoginCreateAccount.propTypes = {
  onCreateAccount: React.PropTypes.func.isRequired,
  onLogIn: React.PropTypes.func.isRequired,
  onClearErrors: React.PropTypes.func.isRequired
};

