import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Title } from '../components/Main/Home/';
import { StatsBox, StatsSelect, StatsCalendar, StatsButton, StatsDataGrid } from '../components/Main/Stats';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as statsActions from '../modules/stats';
import * as moment from 'moment';

class StatisticsContainer extends Component {
    static propTypes = {
        serviceCd: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        startDt: PropTypes.object.isRequired,
        endDt: PropTypes.object.isRequired,
        StatsActions: PropTypes.object.isRequired,
    }

    handleSelChange = (event) => {
        const { name, value } = event.target
        const { StatsActions } = this.props;
        (name === "serviceCd") ? StatsActions.setServiceCd(value) : StatsActions.setStatus(value);
    }

    handleCalChange = name => date => {
        const { StatsActions } = this.props;
        (name === 'startDt') ? StatsActions.setStartDt(date) : StatsActions.setEndDt(date);
    }

    handleChangePage = (event, page) => {
        const { StatsActions } = this.props;
        StatsActions.setPage(page);
    }
    
    handleChangeRowsPerPage = event => {
        const { StatsActions } = this.props;
        StatsActions.setRowsPerPage({ page: 0, rowsPerPage: event.target.value });
    }

    handleClick = async () => {
        const { uid, auth } = sessionStorage;
        const { StatsActions, serviceCd, status, startDt, endDt } = this.props;
        try {
            let params = {
                uid,
                auth,
                serviceCd,
                status,
                startDt: moment(startDt).format('YYYYMMDD'),
                endDt: moment(endDt).format('YYYYMMDD'),
            }
    
            // 현재 일자의 로그 데이터 호출
            await StatsActions.getLogData(params);
        } catch(e) {
            console.error(e);
            alert("관리자에게 문의하세요!");
        }
    }

    toggleOpen = (no) => {
        const { StatsActions } = this.props;
        StatsActions.toggleOpen(no);
    }

    componentDidMount = async () => {
        const { uid, auth } = sessionStorage;
        const { StatsActions, serviceCd, status, startDt, endDt } = this.props;
        try {
            // 사용 중인 서버리스트 데이터 호출
            await StatsActions.getServiceList({uid, auth});

            let params = {
                uid,
                auth,
                serviceCd,
                status,
                startDt: moment(startDt).format('YYYYMMDD'),
                endDt: moment(endDt).format('YYYYMMDD'),
            }
            // 현재 일자의 로그 데이터 호출
            await StatsActions.getLogData(params);
        } catch(e) {
            console.error(e);
            alert("관리자에게 문의하세요!");
        }
    }

    render() {
        const { handleSelChange, handleCalChange, handleChangePage, handleChangeRowsPerPage, handleClick, toggleOpen } = this;
        const { serviceList, serviceCd, status, startDt, endDt, rows, page, rowsPerPage } = this.props;

        return (
            <Fragment>
                <Title>도착한 메시지 전체 로그</Title>
                <StatsBox>
                    <StatsSelect
                        labelPlaceholder="Service"
                        name="serviceCd"
                        menu={serviceList}
                        value={serviceCd}
                        handleSelChange={handleSelChange}
                    />
                    <StatsSelect
                        labelPlaceholder="Status"
                        name="status"
                        value={status}
                        handleSelChange={handleSelChange}
                    />
                    <StatsCalendar
                        name="startDt"
                        label="Start Date"
                        value={startDt}
                        handleChange={handleCalChange}
                    />
                    <StatsCalendar
                        name="endDt"
                        label="End Date"
                        value={endDt}
                        handleChange={handleCalChange}
                    />
                    <StatsButton handleClick={handleClick}/>
                    <StatsDataGrid
                        rows={rows}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        toggleOpen={toggleOpen}
                    />
                </StatsBox>
            </Fragment>
        )
    }
}

export default connect(
    (state) => ({
        serviceList: state.stats.serviceList, 
        serviceCd: state.stats.serviceCd,
        status: state.stats.status,
        startDt: state.stats.startDt,
        endDt: state.stats.endDt,
        rows: state.stats.data.logList,
        page: state.stats.data.page,
        rowsPerPage: state.stats.data.rowsPerPage,
    }),
    (dispatch) => ({
        StatsActions: bindActionCreators(statsActions, dispatch),
    })
)(StatisticsContainer);