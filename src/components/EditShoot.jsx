import React from 'react';
import EditShootForm from "./EditShootForm.jsx"

export default class EditShoot extends React.Component {

  constructor(props) {
    super(props);
    this.handleDetailChanged = this.handleDetailChanged.bind(this);
    this.handleUpdatePhotoshoot = this.handleUpdatePhotoshoot.bind(this);
    this.handleDeletePhotoshoot = this.handleDeletePhotoshoot.bind(this);
    this.state = {
      details: props.photoshoot
    };
  }

  handleDetailChanged(detail) {
    const updatedDetails = Object.assign({}, this.state.details, detail);
    this.setState({details: updatedDetails});
  }

  handleUpdatePhotoshoot(event) {
    event.preventDefault();
    this.props.onUpdatePhotoshootClick(this.state.details);
  }

  handleDeletePhotoshoot(event) {
    event.preventDefault();
    this.props.onDeletePhotoshootClick(this.state.details.id);
  }

  render() {
    return (
      <div className="container">
        <form>
          <fieldset>
            <h4>Edit Photoshoot</h4>
            <section>
              <input type="submit" value="Delete Photoshoot" onClick={this.handleDeletePhotoshoot}></input>
            </section>
            <EditShootForm {...this.state.details}
                          onDetailChanged={this.handleDetailChanged} />
            <section>
              <input type="submit" value="Save Changes" onClick={this.handleUpdatePhotoshoot}></input>
            </section>
          </fieldset>
        </form>
      </div>
    );
  }

}

EditShoot.propTypes = {
  onUpdatePhotoshootClick: React.PropTypes.func.isRequired,
  onDeletePhotoshootClick: React.PropTypes.func.isRequired
}

