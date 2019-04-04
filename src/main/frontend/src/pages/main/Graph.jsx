import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LeftMenu } from '../../components/Main/LeftMenu/';
import { Synthesis, CheckServer, SefilCare, Zabbix } from './graphs';
import { NotFound } from 'pages';

const links = [
    "/main/graph/synthesis",
    "/main/graph/checkserver",
    "/main/graph/sefilcare",
    "/main/graph/zabbix",
];
class Graph extends Component {
    state = {
        navList : [
            {idx: 0, link: links[0], name: "Main", highlighted: true},
            {idx: 1, link: links[1], name: "Check Server", highlighted: false},
            {idx: 2, link: links[2], name: "SefilCare", highlighted: false},
            {idx: 3, link: links[3], name: "Zabbix", highlighted: false}
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
                    <Route path={links[0]} component={Synthesis}></Route>
                    <Route path={links[1]} component={CheckServer}></Route>
                    <Route path={links[2]} component={SefilCare}></Route>
                    <Route path={links[3]} component={Zabbix}></Route>
                    <Route component={NotFound}/>
                </Switch>
            </Fragment>
        );
    }
}

export default Graph;