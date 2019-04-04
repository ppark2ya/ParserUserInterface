import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CheckServer } from '../components/Main/Keyword/CheckServer';
import { Sefilcare } from '../components/Main/Keyword/Sefilcare';
import { Zabbix } from '../components/Main/Keyword/Zabbix';
import { Postman } from '../components/Main/Keyword/Postman';
import { NotFound } from 'pages';
import { Header } from '../components/Main/Keyword/Header';
import PropTypes from 'prop-types';
import * as keywordActions from '../modules/keyword';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    width: 100%;
`;

const links = [
    "/main/setting/keywordPage/checkserver",
    "/main/setting/keywordPage/sefilcare",
    "/main/setting/keywordPage/zabbix",
    "/main/setting/keywordPage/postman",
];

class KeywordContainer extends PureComponent {

    state = {
        navList : [
            {idx: 0, link: links[0], name: "체크서버", highlighted: true},
            {idx: 1, link: links[1], name: "세필케어", highlighted: false},
            {idx: 2, link: links[2], name: "자빅스", highlighted: false},
            {idx: 3, link: links[3], name: "포스트맨", highlighted: false}
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

    static propTypes = {
        result: PropTypes.string,
        KeywordActions: PropTypes.object.isRequired,
    }

    render() {
        return (
            <StyledWrapper>
                <Header
                    navList={this.state.navList}
                    activeMenu={this.activeMenu}
                    handleActive={this.handleActive}
                />
                <Switch>
                    <Route path={links[0]} component={CheckServer}></Route>
                    <Route path={links[1]} component={Sefilcare}></Route>
                    <Route path={links[2]} component={Zabbix}></Route>
                    <Route path={links[3]} component={Postman}></Route>
                    <Route component={NotFound}/>
                </Switch>
            </StyledWrapper>
        );
    }
}

export default connect(
    (state) => ({
        result: state.service.data.result
    }),
    (dispatch) => ({
        KeywordActions: bindActionCreators(keywordActions, dispatch),
    })
)(KeywordContainer);