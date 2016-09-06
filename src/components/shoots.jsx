import React from 'react';
import { Link, browserHistory } from 'react-router'

const Shoots = (props) => {
  console.log("Shoots props: ", props);

  var photoshoots = props.photoshoots.map((s) => {
    return (
      <li>{s.name} - {s.date}</li>
    )
  });

  return (
    <div>
      <div>
        <h2>New Photoshoot</h2>
        <Link to="/new-shoot">Create</Link>
      </div>

      <div>
        <h2>Upcoming Shoots</h2>
        <ul>
          {photoshoots}
        </ul>
      </div>

      <div>
        <h3>Photoshoot history</h3>
      </div>
    </div>
  )
}

const handleCreateShoot = () => {
  console.log("worked");
  browserHistory.push("/");
}

class NewShoot extends React.Component {
  constructor(props) {
    super(props);
    console.log("NewShoot props: ", props);
    this.handleDetailChanged = this.handleDetailChanged.bind(this);
    this.handleCreatePhotoshoot = this.handleCreatePhotoshoot.bind(this);
    this.state = {
      photoshootDetails: {}
    }
  }

  handleDetailChanged(detail) {
    console.log("handling detail changed");
    const updatedDetails = Object.assign({}, this.state.photoshootDetails, detail);
    this.setState({photoshootDetails: updatedDetails}, (s) => {
      console.log("New state: ", this.state);
    });
  }

  handleCreatePhotoshoot() {
    console.log("Create photoshoot clicked. Calling callback mapped to dispatch");
    this.props.onAddPhotoshootClick(this.state.photoshootDetails);
  }

  render() {
    return (
      <div>
        <h2>New Photoshoot</h2>
        <EditShootForm details={this.state.photoshootDetails}
                       onDetailChanged={this.handleDetailChanged} />
        <section>
          <input type="submit" value="Create" onClick={this.handleCreatePhotoshoot}></input>
        </section>
      </div>
    );
  }
}

class EditShootForm extends React.Component {
  constructor() {
    super();
    this.sendChangedDetail = this.sendChangedDetail.bind(this);
  }

  sendChangedDetail(detail) {
    return (event) => {
      console.log("Sending changed detail to parent");
      this.props.onDetailChanged({[detail]: event.target.value});
    }
  }

  render() {
    return (
      <div>
        <section>
          <h4>Client Name:</h4>
          <input type="text" value={this.props.details.name} onChange={this.sendChangedDetail("name")}></input>
        </section>

        <section>
          <h4>Shoot Date:</h4>
          <input type="date" value={this.props.details.date} onChange={this.sendChangedDetail("date")}></input>
        </section>

      </div>
    )
  }
}


export {Shoots, NewShoot}

