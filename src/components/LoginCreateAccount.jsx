import React from 'react';

export const LOGIN_MODE = "LOGIN";
export const CREATE_MODE = "CREATE";

class OptionallyDisplayed extends React.Component {
  render() {
    return (this.props.display == true) ? <div>{this.props.children}</div> : null;
  }
}

export default class LoginCreateAccount extends React.Component {

  constructor(props) {
    super(props);
    this.handleFieldChanged = this.handleFieldChanged.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.handleToggleMode = this.handleToggleMode.bind(this);
    this.state = {
      mode: props.mode
    };
  }

  handleFieldChanged(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmitClicked() {
    const formData = Object.assign({}, this.state);
    delete formData.mode;
    if (this.state.mode == LOGIN_MODE) {
      return this.props.onLogIn(formData);
    } else {
      return this.props.onCreateAccount(formData);
    }
  }

  handleToggleMode() {
    let newMode = this.state.mode == CREATE_MODE ? LOGIN_MODE : CREATE_MODE;
    this.setState({mode: newMode});
  }

  render() {

    let style = {
      backgroundColor: "rgba(169,199,192,0.9)",
      width: "500px", marginRight: "auto",
      marginLeft: "auto", padding: "15px",
      borderRadius: "20px", marginTop: "30px"
    };

    let inCreateMode = () => this.state.mode == CREATE_MODE;
    let title = inCreateMode() ? "Create a new account" : "Log in to your account";
    let submitButtonText = inCreateMode() ? "Create Account" : "Log In";

    let toggleModeQuestion = inCreateMode() ? "Already have an account?" : "Don't have an account?";
    let toggleModeButtonText = inCreateMode() ? "Log in..." : "Create one now...";

    return (
      <div style={style}>
        <h3>{title}</h3>
        <OptionallyDisplayed display={inCreateMode()}>
          <input type="text" placeholder="Name" onChange={this.handleFieldChanged("name")} />
        </OptionallyDisplayed>
        <div>
          <input type="text" placeholder="Email address" onChange={this.handleFieldChanged("emailAddress")} />
        </div>
        <div>
          <input type="text" placeholder="Password" onChange={this.handleFieldChanged("password1")} />
        </div>
        <OptionallyDisplayed display={inCreateMode()}>
          <input type="text" placeholder="Confirm password" onChange={this.handleFieldChanged("password2")} />
        </OptionallyDisplayed>
        <div>
          <input type='submit' value={submitButtonText} onClick={this.handleSubmitClicked} ></input>
        </div>

        <h4>{toggleModeQuestion}</h4>
        <div>
          <input type='submit' value={toggleModeButtonText} onClick={this.handleToggleMode} ></input>
        </div>

      </div>
    );
  }
}

LoginCreateAccount.propTypes = {
  onCreateAccount: React.PropTypes.func.isRequired,
  onLogIn: React.PropTypes.func.isRequired
};

