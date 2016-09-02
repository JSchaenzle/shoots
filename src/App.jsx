/* ;import '../lib/app/public/styles.css';*/
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx';

var App = React.createClass({

  render: function() {
    return (
      <Login />
    );
  }

});

ReactDOM.render(<App name='World'/>, document.getElementById('root'))

