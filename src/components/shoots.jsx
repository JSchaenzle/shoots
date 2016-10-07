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
    var photoshoots = this.props.photoshoots.map((s) => {
      return (
        <tr onClick={this.handleRowSelected(s.id)} key={s.id}>
          <td>{s.name}</td>
          <td>{s.date}</td>
        </tr>
      );
    });

    return (
      <div className="container">
        <div>
          <a className="button" href="/photoshoots/new-shoot">New Photoshoot...</a>
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
            {photoshoots}
            </tbody>
          </table>
        </div>

        <div>
          <h4>Photoshoot history</h4>
        </div>
      </div>
    );
  }

}

