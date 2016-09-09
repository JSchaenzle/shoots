import React from 'react';
import { Link } from 'react-router'

export const Shoots = (props) => {

  var photoshoots = props.photoshoots.list.map((s) => {
    return (
      <Link to="/edit-shoot" details={s} >{s.name} - {s.date}</Link>
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

