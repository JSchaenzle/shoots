import React from 'react';
import EditShootForm from "./EditShootForm.jsx"

export default class NewShoot extends React.Component {
  constructor(props) {
    super(props);
    this.handleDetailChanged = this.handleDetailChanged.bind(this);
    this.handleCreatePhotoshoot = this.handleCreatePhotoshoot.bind(this);
    this.state = {
      photoshootDetails: {
        date: this.tomorrow()
      }
    }
  }

  tomorrow() {
    let d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString();
  }

  handleDetailChanged(detail) {
    console.log("NewShoot detail changed. Detail: ", detail);
    const updatedDetails = Object.assign({}, this.state.photoshootDetails, detail);
    console.log("Updted details: ", updatedDetails);
    this.setState({photoshootDetails: updatedDetails});
  }

  handleCreatePhotoshoot() {
    this.props.onAddPhotoshootClick(this.state.photoshootDetails);
  }

  render() {
    return (
      <div>
        <h2>New Photoshoot</h2>
        <EditShootForm {...this.state.photoshootDetails}
                       onDetailChanged={this.handleDetailChanged} />
        <section>
          <p>
            <input type="submit" value="Create" onClick={this.handleCreatePhotoshoot}></input>
          </p>
        </section>
      </div>
    );
  }
}

NewShoot.propTypes = {
  onAddPhotoshootClick: React.PropTypes.func.isRequired
}

