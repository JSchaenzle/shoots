import React from 'react';
import { Link } from 'react-router';

export class Shoots extends React.Component {

  componentWillMount() {
    this.props.refreshList();
  }

  handleRowSelected(shootId) {
    return () => {
      this.props.editPhotoshoot(shootId);
    }
  }

  render() {
    var photoshoots = this.props.photoshoots.reduce((memo, value) => {
      var shootRow = (
        <tr onClick={this.handleRowSelected(value.id)} key={value.id}>
          <td>{value.name}</td>
          <td>{value.date}</td>
        </tr>
      );
      if (value.completed) {
        memo.completed.push(shootRow);
      } else {
        memo.upcoming.push(shootRow);
      }
      return memo;
    }, {upcoming: [], completed: []});


    return (
      <div className="container">
        <div className="centered">
          <Link className="button" to="/photoshoots/new-shoot">New Photoshoot...</Link>
        </div>

        <div>
          <h4>Upcoming Shoots</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {photoshoots.upcoming}
            </tbody>
          </table>
        </div>

        <div>
          <h4>Photoshoot history</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {photoshoots.completed}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

