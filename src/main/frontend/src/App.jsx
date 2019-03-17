import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Main, NotFound } from 'pages';
import styled from 'styled-components';
import LoadingBar from 'react-redux-loading-bar';

const Wrapper = styled.div`
  background-image: url(https://cdn.ppomppu.co.kr/zboard/data3/2018/0903/20180903000708_lphnknbp.jpg);
  background-size: 100%;
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <LoadingBar/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/main" component={Main}/>
          <Route component={NotFound}/>
        </Switch>
      </Wrapper>
    );
  }
}

export default App;
