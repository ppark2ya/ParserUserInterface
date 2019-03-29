import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LeftMenu } from '../../components/Main/LeftMenu/';
import { MyPage, ApiPage, Device, KeywordPage } from './settings';
import { NotFound } from 'pages';

class Setting extends Component {
    state = {
        navList : [
            {idx: 0, link: "/main/setting/myPage", name: "My Page", highlighted: true},
            {idx: 1, link: "/main/setting/apiPage", name: "API", highlighted: false},
            {idx: 2, link: "/main/setting/device", name: "Device", highlighted: false},
            {idx: 3, link: "/main/setting/keywordPage", name: "Keyword Value", highlighted: false}
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
                    <Route path="/main/setting/myPage" component={MyPage}></Route>
                    <Route path="/main/setting/apiPage" component={ApiPage}></Route>
                    <Route path="/main/setting/device" component={Device}></Route>
                    <Route path="/main/setting/keywordPage" component={KeywordPage}></Route>
                    <Route component={NotFound}/>
                </Switch>
            </Fragment>
        );
    }
}

export default Setting;