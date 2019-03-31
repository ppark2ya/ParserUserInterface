import React, { PureComponent } from 'react';
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
    cursor: 'pointer',
    marginTop: '14px',
    marginRight: '10px',
    border: '1px solid #000',
}

class ApiPageContainer extends PureComponent {

    static propTypes = {
        zabbix: PropTypes.any,
        postman: PropTypes.any,
        sefilcare: PropTypes.any,
        checkserver: PropTypes.any,
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

    handleClick = async () => {
        const { uid, auth } = sessionStorage;

        try {
            const { ServiceActions, zabbix, postman, sefilcare, checkserver } = this.props;
            const response = await ServiceActions.setServerControl({ uid, auth, zabbix, postman, sefilcare, checkserver });

            if(response.data.result === "SUCCESS") {
                alert("수정되었습니다.");
            }
        } catch(e) {
            console.error(e);
        }
    }

    componentDidMount = async() => {
        const { uid, auth } = sessionStorage;

        try {
            const { ServiceActions } = this.props;
            await ServiceActions.getUsingServers({ uid, auth });
        } catch(e) {
            console.error(e);
        }
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