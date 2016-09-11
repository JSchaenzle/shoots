import React from 'react';
import EditShootForm from "./EditShootForm.jsx"

export default class EditShoot extends React.Component {

  constructor(props) {
    super(props);
    this.handleDetailChanged = this.handleDetailChanged.bind(this);
    this.handleUpdatePhotoshoot = this.handleUpdatePhotoshoot.bind(this);
    // Find the matching photoshoot
    let id = Number(props.routeParams.photoshootId);
    let shoot = props.photoshoots.list.find(s => { return (s.id == id) } );
    this.state = {
      details: shoot
    };
  }

  handleDetailChanged(detail) {
    const updatedDetails = Object.assign({}, this.state.details, detail);
    this.setState({details: updatedDetails});
  }

  handleUpdatePhotoshoot() {
    this.props.onUpdatePhotoshootClick(this.state.details);
  }

  render() {
    return (
      <div>
        <h2>Edit Photoshoot</h2>
        <EditShootForm {...this.state.details}
                       onDetailChanged={this.handleDetailChanged} />
        <section>
          <input type="submit" value="Save Changes" onClick={this.handleUpdatePhotoshoot}></input>
        </section>
      </div>
    );
  }

}

EditShoot.propTypes = {
  onUpdatePhotoshootClick: React.PropTypes.func.isRequired
}

