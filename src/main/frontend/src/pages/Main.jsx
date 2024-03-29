import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withCheckAuth from '../lib/withCheckAuth';
import MainTemplate from '../components/Main/MainTemplate';
import Header from '../components/Main/Header';
import { Home, Graph, Statistics, Setting } from './main/';
import { NotFound } from 'pages';

const Main = () => {
    return (
        <MainTemplate header={<Header/>}>
            <Switch>
                <Route path="/main/home" component={Home}></Route>
                <Route path="/main/graph" component={Graph}></Route>
                <Route path="/main/stats" component={Statistics}></Route>
                <Route path="/main/setting" component={Setting}></Route>
                <Route component={NotFound}/>
            </Switch>
        </MainTemplate>
    );
};

export default withCheckAuth(Main);