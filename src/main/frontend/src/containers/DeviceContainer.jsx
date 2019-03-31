import React, { PureComponent } from 'react';
import { Title } from '../components/Main/Home/';
import { DeviceForm } from '../components/Main/Device/';
import PropTypes from 'prop-types';
import * as deviceActions from '../modules/device';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledContainer = styled.div`
    width: 80%;
`;

class DeviceContainer extends PureComponent {

    static propTypes = {
        email: PropTypes.string.isRequired,
        tel: PropTypes.string.isRequired,
        result: PropTypes.string,
        ServiceActions: PropTypes.object.isRequired,
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const { DeviceActions } = this.props;

        (name === 'email') ? DeviceActions.setEmail(value) : DeviceActions.setTelNum(value);
    }

    handleRemove = async (e) => {
        const { uid } = sessionStorage;
        const { name } = e.target;

        try {
            const { DeviceActions } = this.props;
            const response = (name === 'email') ? await DeviceActions.deleteEmail(uid) : await DeviceActions.deleteTelNum(uid);
            
            if(response.data.result === "SUCCESS") {
                alert('삭제되었습니다!');
            }
        } catch(e) {
            console.error(e);
        }
    }

    handleAdd = async (e) => {
        const { uid } = sessionStorage;
        const { name } = e.target;

        try {
            const { DeviceActions } = this.props;
            const response = (name === 'email') ? await DeviceActions.addEmail(uid) : await DeviceActions.addTelNum(uid);

            if(response.data.result === "SUCCESS") {
                alert('추가되었습니다!');
            }
        } catch(e) {
            console.error(e);
        }
    }

    componentDidMount = async() => {
        const { uid } = sessionStorage;

        try {
            const { DeviceActions } = this.props;
            await DeviceActions.getUserInfo(uid);
        } catch(e) {
            console.error(e);
        }
    }

    render() {
        const { uid } = sessionStorage;
        const { handleChange, handleRemove, handleAdd, props: { email, tel } } = this;

        return (
            <StyledContainer>
                <Title>전송받을 디바이스</Title>
                <DeviceForm
                    uid={uid}
                    email={email}
                    tel={tel}
                    handleChange={handleChange}
                    handleRemove={handleRemove}
                    handleAdd={handleAdd}
                />
            </StyledContainer>
        );
    }
}

export default connect(
    (state) => ({
        email: state.device.email,
        tel: state.device.tel,
        result: state.service.data.result
    }),
    (dispatch) => ({
        DeviceActions: bindActionCreators(deviceActions, dispatch),
    })
)(DeviceContainer);