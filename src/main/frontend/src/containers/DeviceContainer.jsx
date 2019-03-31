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
        plainEmail: PropTypes.string.isRequired,
        plainTel: PropTypes.string.isRequired,
        result: PropTypes.string,
        DeviceActions: PropTypes.object.isRequired,
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
            const response = (name === 'email') ? await DeviceActions.deleteEmailAddr(uid) : await DeviceActions.deleteTelNum(uid);
            
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
            const { DeviceActions, email, tel } = this.props;
            const response = (name === 'email') ? await DeviceActions.addEmailAddr({uid, email}) : await DeviceActions.addTelNum({uid, tel});

            if(response.data.result === "SUCCESS") {
                alert('추가(수정) 되었습니다!');
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
        const { handleChange, handleRemove, handleAdd, props: { plainEmail, plainTel } } = this;

        return (
            <StyledContainer>
                <Title>전송받을 디바이스</Title>
                <DeviceForm
                    uid={uid}
                    plainEmail={plainEmail}
                    plainTel={plainTel}
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
        plainEmail: state.device.plainEmail,
        plainTel: state.device.plainTel,
        result: state.service.data.result
    }),
    (dispatch) => ({
        DeviceActions: bindActionCreators(deviceActions, dispatch),
    })
)(DeviceContainer);