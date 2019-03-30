import React, { Fragment, PureComponent } from 'react';
import { Title } from '../components/Main/Home/';
import { ServiceList } from '../components/Main/Service/ServiceList/';
import PropTypes from 'prop-types';
import * as serviceActions from '../modules/service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledContainer = styled.div`
    width: 80%;
`;

const ButtonStyle = {
    float: 'right',
    width: '4rem',
    height: '50%',
    background: 'transparent',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '14px',
    marginRight: '10px',
    border: '1px solid #000',
}
class ApiPageContainer extends PureComponent {

    static propTypes = {
        zabbix: PropTypes.bool.isRequired,
        postman: PropTypes.bool.isRequired,
        sefilcare: PropTypes.bool.isRequired,
        checkserver: PropTypes.bool.isRequired,
        result: PropTypes.string,
        ServiceActions: PropTypes.object.isRequired,
    }

    handleChange = (e) => {
        const { name } = e.target;
        const { ServiceActions } = this.props;

        (name === 'checkserver') ? ServiceActions.setCheckserver() :
        (name === 'sefilcare') ? ServiceActions.setSefilcare() :
        (name === 'zabbix') ? ServiceActions.setZabbix() :
        (name === 'postman') ? ServiceActions.setPostman() : console.error('잘못된 이벤트!');
    }

    handleClick = () => {

    }

    componentDidMount = async() => {
        /* 
            ** TODO **
            sessionStorage에 저장된 uid, auth를 이용하여 현재 사용중인 service들 체크
            저장버튼 클릭 시 해당 계정의 auth update치고, 바뀐 auth 가져와서 service들 체크 && sessionStorage에 저장된 auth값도 갱신
        */
    }

    render() {
        const { handleChange, handleClick, props: { zabbix, postman, sefilcare, checkserver } } = this;

        return (
            <StyledContainer>
                <Title>
                    애플리케이션 선택 
                    <button type="button" onClick={handleClick} style={ButtonStyle}>저장</button>
                </Title>
                <ServiceList
                    handleChange={handleChange}
                    zabbix={zabbix}
                    postman={postman}
                    sefilcare={sefilcare}
                    checkserver={checkserver}
                />
            </StyledContainer>
        );
    }
}

export default connect(
    (state) => ({
        zabbix: state.service.zabbix,
        postman: state.service.postman,
        sefilcare: state.service.sefilcare,
        checkserver: state.service.checkserver,
        result: state.service.data.result
    }),
    (dispatch) => ({
        ServiceActions: bindActionCreators(serviceActions, dispatch),
    })
)(ApiPageContainer);