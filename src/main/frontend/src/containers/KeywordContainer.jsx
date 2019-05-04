import React, { PureComponent } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
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
    width: 80%;
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

    static propTypes = {
        result: PropTypes.string,
        KeywordActions: PropTypes.object.isRequired,
    }

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

    handleChangePage = (event, page) => {
        const { KeywordActions } = this.props;
        KeywordActions.setPage(page);
    }
    
    handleChangeRowsPerPage = event => {
        const { KeywordActions } = this.props;
        KeywordActions.setRowsPerPage({ page: 0, rowsPerPage: event.target.value });
    }

    toggleUsage = async (keyword, serviceCd, useCl) => {
        const { KeywordActions } = this.props;

        if(window.confirm('상태를 바꾸시겠습니까? ')) {
            await KeywordActions.toggleUsage(keyword, serviceCd, (useCl === '1')? '0' : '1');
        }
    }

    sortTable = (rows) => {
        const { KeywordActions } = this.props;
        KeywordActions.compareFunction(rows);
        // 사용 중이 위 일때
        // if(rows[0].useCl === "1") {
        //     KeywordActions.compareFunction(rows);
        // } else {
        //     KeywordActions.compareFunction(rows);
        // }
    }

    // compareFunction = (rows, order) => {
    //     let sortedRows;
    //     if(order) {
    //         sortedRows = [...rows.sort((a, b) => a.useCl < b.useCl ? -1 : a.useCl < b.useCl ? 1: 0)];
    //     } else {
    //         sortedRows = [...rows.sort((a, b) => a.useCl > b.useCl ? -1 : a.useCl > b.useCl ? 1: 0)];
    //     }
    //     return sortedRows;
    // }

    componentDidMount = async () => {
        const { location: {pathname}, history } = this.props;
        const { KeywordActions } = this.props;

        await KeywordActions.getKeywordList(sessionStorage);

        // 로그인 직후 /main 경로로 redirect되면 home component를 보여준다.
        if(pathname === '/main/setting/keywordPage') {
            history.push(links[0]);

        } else { // 새로고침시에도 path따라 css를 바꿔준다.
            this.activeMenu(undefined, pathname);
        }
    }

    render() {
        const { 
            handleChangePage,
            handleChangeRowsPerPage,
            toggleUsage,
            activeMenu,
            handleActive,
            sortTable,
            state : { navList },
            props : { checkServerList, sefilcareList, zabbixList, postmanList, page, rowsPerPage }
        } = this;

        return (
            <StyledWrapper>
                <Header
                    navList={navList}
                    activeMenu={activeMenu}
                    handleActive={handleActive}
                />
                <Switch>
                    <Route 
                        path={links[0]} 
                        render={ 
                            props => 
                            <CheckServer 
                                rows={checkServerList}
                                handleChangePage={handleChangePage} 
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                                toggleUsage={toggleUsage}
                                sortTable={sortTable}
                                page={page}
                                rowsPerPage={rowsPerPage}
                            /> 
                        } 
                    />
                    <Route 
                        path={links[1]} 
                        render={ 
                            props => 
                            <Sefilcare 
                                rows={sefilcareList}
                                handleChangePage={handleChangePage} 
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                                toggleUsage={toggleUsage}
                                sortTable={sortTable}
                                page={page}
                                rowsPerPage={rowsPerPage}
                            /> 
                        } 
                    />
                    <Route 
                        path={links[2]} 
                        render={ 
                            props => 
                            <Zabbix 
                                rows={zabbixList}
                                handleChangePage={handleChangePage} 
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                                toggleUsage={toggleUsage}
                                sortTable={sortTable}
                                page={page}
                                rowsPerPage={rowsPerPage}
                            /> 
                        } 
                    />
                    <Route 
                        path={links[3]} 
                        render={ 
                            props => 
                            <Postman 
                                rows={postmanList}
                                handleChangePage={handleChangePage} 
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                                toggleUsage={toggleUsage}
                                sortTable={sortTable}
                                page={page}
                                rowsPerPage={rowsPerPage}
                            /> 
                        } 
                    />
                    <Route component={NotFound}/>
                </Switch>
            </StyledWrapper>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        result: state.keyword.data.result,
        checkServerList : state.keyword.data.checkServerList,
        sefilcareList : state.keyword.data.sefilcareList,
        zabbixList : state.keyword.data.zabbixList,
        postmanList : state.keyword.data.postmanList,
        page: state.keyword.data.page,
        rowsPerPage: state.keyword.data.rowsPerPage,
    }),
    (dispatch) => ({
        KeywordActions: bindActionCreators(keywordActions, dispatch),
    })
)(KeywordContainer));