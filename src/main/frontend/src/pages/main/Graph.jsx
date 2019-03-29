import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LeftMenu } from '../../components/Main/LeftMenu/';
import { Synthesis, CheckServer, SefilCare, Zabbix } from './graphs';
import { NotFound } from 'pages';
class Graph extends Component {
    state = {
        navList : [
            {idx: 0, link: "/main/graph/synthesis", name: "Main", highlighted: true},
            {idx: 1, link: "/main/graph/checkserver", name: "Check Server", highlighted: false},
            {idx: 2, link: "/main/graph/sefilcare", name: "SefilCare", highlighted: false},
            {idx: 3, link: "/main/graph/zabbix", name: "Zabbix", highlighted: false}
        ]
    };

    /**
     * 현재 보여지는 메뉴의 css값 변경
     * @param idx: 선택된 메뉴 인덱스
     * @param pathname: 메뉴 url 
     */
    activeMenu = (idx, pathname="") => {
        const { navList } = this.state;
        const toggledNavList = navList.map(nav => {
            if(nav.idx === idx || ~pathname.indexOf(nav.link)) {
                return {
                    ...nav,
                    highlighted: true
                }
            } else {
                return {
                    ...nav,
                    highlighted: false
                }
            }
        })

        this.setState({
            navList: [...toggledNavList]
        });
    }

    handleActive = (idx) => {
        this.activeMenu(idx);
    }

    render() {
        return (
            <Fragment>
                <LeftMenu 
                    navList={this.state.navList}
                    activeMenu={this.activeMenu}
                    handleActive={this.handleActive}
                />
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