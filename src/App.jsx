import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {

    let style = {
      backgroundColor: "rgba(169,199,192,0.9)",
      width: "500px", marginRight: "auto",
      marginLeft: "auto", padding: "15px",
      borderRadius: "20px", marginTop: "30px"
    };

    return (
      <div style={style}>
        <h1>Shootz</h1>
        <ul role="nav">
          <li><Link to="/photoshoots">Shoots</Link></li>
          <li><Link to="/reports">Reports</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

