import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Main, NotFound } from 'pages';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/main" component={Main}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
