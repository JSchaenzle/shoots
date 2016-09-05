import React from 'react';
import { Link, browserHistory } from 'react-router'

const Shoots = () => (
  <div>
    <div>
      <h2>New Photoshoot</h2>
      <Link to="/new-shoot">Create</Link>
    </div>
    <div>
      <h2>Upcoming Shoots</h2>
    </div>
    <div>
      <h3>Photoshoot history</h3>
    </div>
  </div>
)

const handleCreateShoot = () => {
  console.log("worked");
  browserHistory.push("/");
}

const NewShoot = () => (
  <div>
    <h2>New Photoshoot</h2>
    <EditShootForm />
    <section>
      <input type="submit" value="Create" onClick={handleCreateShoot}></input>
    </section>
  </div>
)

const EditShootForm = () => (
  <div>
    <section>
      <h4>Client Name:</h4>
      <input type="text"></input>
    </section>

    <section>
      <h4>Shoot Date:</h4>
      <input type="date"></input>
    </section>

  </div>
)


export {Shoots, NewShoot}

