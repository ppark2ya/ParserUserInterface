import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as statsActions from '../modules/stats';

class StatisticsContainer extends Component {
    static propTypes = {
        serviceCd: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        period: PropTypes.string.isRequired,
        StatsActions: PropTypes.object.isRequired,
    }

    componentDidMount = async () => {
        const { serviceCd, status, period, StatsActions } = this.props;
        try{
            const response = await StatsActions.getLogData({serviceCd, status, period});
            const { result, message } = response.data;
    
            if(result === "SUCCESS") {
                
            } else {
                console.error(response);
                alert(message);
            }
        } catch(e) {
            console.error(e);
            alert("관리자에게 문의하세요!");
        }
    }

    render() {
        return (
            <Fragment></Fragment>
        )
    }
}

export default connect(
    (state) => ({
        serviceCd: state.stats.serviceCd,
        status: state.stats.serviceCd,
        period: state.stats.period,
    }),
    (dispatch) => ({
        StatsActions: bindActionCreators(statsActions, dispatch),
    })
)(StatisticsContainer);