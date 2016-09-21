import React from 'react';
import { Link } from 'react-router';

export const Shoots = (props) => {

  var photoshoots = props.photoshoots.map((s) => {
    return (
      <li key={s.id} >
        <Link to={`/photoshoots/edit-shoot/${s.id}`} >{s.name} - {s.date}</Link>
      </li>
    );
  });

  return (
    <div >
      <div>
        <h2>New Photoshoot</h2>
        <Link to="/photoshoots/new-shoot">Create</Link>
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
  );
}

