import React, { PureComponent } from 'react';
import { SettingForm } from '../components/Main/Setting/SettingForm/';
import { SettingButton } from '../components/Main/Setting/SettingButton/';
import PropTypes from 'prop-types';
import * as loginActions from '../modules/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

const PageContainer = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
`;

class  MypageContainer extends PureComponent {

    static propTypes = {
        id: PropTypes.string.isRequired,
        pw: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        tel: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        result: PropTypes.string,
        LoginActions: PropTypes.object.isRequired,
    }

    // 패스워드 변경
    handleChange = (e) => {
        const { value } = e.target;
        const { LoginActions } = this.props;
        LoginActions.setPw(value);
    }

    // 변경 버튼 클릭
    handleClick = () => {
        document.getElementById("pw").readOnly = false;
    }

    handleConfirm = async () => {
        const { uid } = sessionStorage;
        let pwDom = document.getElementById("pw");
        const { value : pw } = pwDom;
        
        try {
            const { LoginActions } = this.props;
            const res = await LoginActions.userUpdate({ uid, pw });

            if(res.data.result === "SUCCESS") {
                alert('패스워드가 변경되었습니다!. ');
                pwDom.readOnly = true;
            }
        } catch(e) {
            console.error(e);
        }
    }

    // 초기 사용자 데이터 get
    componentDidMount = async () => {
        const { uid } = sessionStorage;
        try {
            const { LoginActions } = this.props;
            await LoginActions.getUserInfo(uid);
        } catch(e) {
            console.error(e);
        }
    }
    
    render() {
        const { handleChange, handleClick, handleConfirm, props: { id, pw, name, tel, email } } = this;
        return (
            <PageContainer>
                <SettingForm
                    handleChange={handleChange}
                    handleClick={handleClick}
                    id={id}
                    pw={pw}
                    name={name}
                    tel={tel}
                    email={email}
                />
                <SettingButton
                    handleConfirm={handleConfirm}
                />
            </PageContainer>
        );
    }
}

export default connect(
    (state) => ({
        id: state.login.id,
        pw: state.login.pw,
        name: state.login.name,
        tel: state.login.tel,
        email: state.login.email,
        result: state.login.data.result
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch),
    })
)(MypageContainer);