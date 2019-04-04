import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LeftMenu } from '../../components/Main/LeftMenu/';
import { MyPage, ApiPage, Device, KeywordPage } from './settings';
import { NotFound } from 'pages';

const links = [
    "/main/setting/myPage",
    "/main/setting/apiPage",
    "/main/setting/device",
    "/main/setting/keywordPage",
];
class Setting extends Component {
    state = {
        navList : [
            {idx: 0, link: links[0], name: "My Page", highlighted: true},
            {idx: 1, link: links[1], name: "API", highlighted: false},
            {idx: 2, link: links[2], name: "Device", highlighted: false},
            {idx: 3, link: links[3], name: "Keyword Value", highlighted: false}
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
                    <Route path={links[0]} component={MyPage}></Route>
                    <Route path={links[1]} component={ApiPage}></Route>
                    <Route path={links[2]} component={Device}></Route>
                    <Route path={links[3]} component={KeywordPage}></Route>
                    <Route component={NotFound}/>
                </Switch>
            </Fragment>
        );
    }
}

export default Setting;