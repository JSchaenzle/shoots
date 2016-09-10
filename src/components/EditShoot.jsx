import React from 'react';
import EditShootForm from "./EditShootForm.jsx"

export default class EditShoot extends React.Component {

  constructor(props) {
    super(props);
    let id = Number(props.routeParams.photoshootId);
    let shoot = props.photoshoots.list.find(s => { return (s.id == id) } );
    this.state = {
      details: shoot
    };
  }

  handleDetailChanged() {
  }

  handleUpdatePhotoshoot() {
  }

  render() {
    return (
      <div>
        <h2>Edit Photoshoot</h2>
        <EditShootForm details={this.state.details}
                       onDetailChanged={this.handleDetailChanged} />
        <section>
          <input type="submit" value="Save Changes" onClick={this.handleUpdatePhotoshoot}></input>
        </section>
      </div>
    );
  }

}

