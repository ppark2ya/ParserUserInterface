import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LeftMenu } from '../../components/Main/Graph/';
import { Synthesis, CheckServer, SefilCare, Zabbix } from './graphs';
import { NotFound } from 'pages';
class Graph extends Component {
    render() {
        return (
            <Fragment>
                <LeftMenu />
                <Switch>
                    <Route path="/main/graph/synthesis" component={Synthesis}></Route>
                    <Route path="/main/graph/checkserver" component={CheckServer}></Route>
                    <Route path="/main/graph/sefilcare" component={SefilCare}></Route>
                    <Route path="/main/graph/zabbix" component={Zabbix}></Route>
                    <Route component={NotFound}/>
                </Switch>
            </Fragment>
        );
    }
}

export default Graph;