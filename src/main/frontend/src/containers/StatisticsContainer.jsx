import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Title } from '../components/Main/Home/';
//import { StatsBox, StatsSelect, StatsCalendar, StatsButton } from '../components/Main/Stats/StatsOption';
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
        //console.log(date.format('YYYYMMDD'));
        const { StatsActions } = this.props;
        (name === 'startDt') ? StatsActions.setStartDt(date) : StatsActions.setEndDt(date);
    }

    componentDidMount = async () => {
        const { uid, auth } = sessionStorage;
        const { StatsActions } = this.props;
        try {
            await StatsActions.getServiceList({uid, auth});
        } catch(e) {
            console.error(e);
            alert("관리자에게 문의하세요!");
        }
    }

    render() {
        const { handleSelChange, handleCalChange } = this;
        const { serviceList, serviceCd, status, startDt, endDt } = this.props;
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
                    <StatsButton/>
                    <StatsDataGrid/>
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
    }),
    (dispatch) => ({
        StatsActions: bindActionCreators(statsActions, dispatch),
    })
)(StatisticsContainer);