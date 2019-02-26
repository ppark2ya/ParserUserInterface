import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Login } from 'pages';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Login}/>
      </div>
    );
  }
}

export default App;
