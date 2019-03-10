import React, { Fragment } from 'react';
import { Title } from '../../components/Main/Home/';
import StatisticsContainer from '../../containers/StatisticsContainer';

const Statistics = () => {
    return (
        <Fragment>
            <Title>도착한 메시지 전체 로그</Title>
            <StatisticsContainer />
        </Fragment>
    );
};

export default Statistics;