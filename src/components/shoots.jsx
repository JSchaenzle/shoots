import React from 'react';
import { Link } from 'react-router'

export const Shoots = (props) => {

  var photoshoots = props.photoshoots.list.map((s) => {
    return (
      <li key={s.id} >
        <Link to={`/edit-shoot/${s.id}`} >{s.name} - {s.date}</Link>
      </li>
    )
  });

  return (
    <div style={{backgroundColor: "rgba(255, 255, 255, 0.95)", width: "500px", marginRight: "auto", marginLeft: "auto", padding: "15px"}}>
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

