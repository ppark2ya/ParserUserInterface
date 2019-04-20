import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../modules/login';
import LoginTemplate from '../components/Login/LoginTemplate';

class LoginContainer extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        pw: PropTypes.string.isRequired,
        result: PropTypes.string,
        LoginActions: PropTypes.object.isRequired,
    }

    /**
     * 아이디, 패스워드값을 redux store에 저장한다.
     * @param e: chnage event
     */
    handleChange = (e) => {
        const { name, value } = e.target;
        const { LoginActions } = this.props;
        (name === 'id') ? LoginActions.setId(value) : LoginActions.setPw(value);
    }

    /**
     * 패스워드 입력후 엔터를 누르면 버튼 click이벤트를 발생시킨다.
     * @param e: chnage event
     */
    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleClick();
        }
    }

    /**
     * 로그인 이벤트를 발생시킨다.
     */
    handleClick = async () => {
        const { LoginActions, id, pw, history } = this.props;
        try {
            // 서버에 아이디, 패스워드값을 보내 로그인 인증처리
            const response = await LoginActions.loginProc({id, pw});
            const { result, uid, auth, expired } = response.data;

            if(result === "SUCCESS") {
                // 필요한 사용자 정보를 세션 스토리지에 담는다.
                sessionStorage.uid = uid;
                sessionStorage.auth = auth;
                sessionStorage.expired = expired;
                history.push('/main');
            } else {
                alert('아이디와 패스워드를 확인해주세요');
                this.setClearForm();
                sessionStorage.clear();
            }
        } catch(e) {
            console.error(e);
        }
    }

    toggleOpen = () => {
        const { LoginActions } = this.props;
        LoginActions.toggleOpen();
    }

    // 입력창 clear
    setClearForm = () => {
        let { id, pw } = document.getElementsByTagName('input');
        id.value = '';
        pw.value = '';

        id.focus();
    }

    render() {
        const { handleKeyPress, handleClick, handleChange, toggleOpen } = this;
        return (
            <LoginTemplate onKeyPress={handleKeyPress} onClick={handleClick} onChange={handleChange} toggleOpen={toggleOpen} open={this.props.open}/>
        );
    }
}

export default connect(
    (state) => ({
        id: state.login.id,
        pw: state.login.pw,
        open: state.login.open,
        result: state.login.data.result
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch),
    })
)(LoginContainer);