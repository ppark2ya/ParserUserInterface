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

    handleChange = (e) => {
        const { name, value } = e.target;
        const { LoginActions } = this.props;
        (name === 'id') ? LoginActions.setId(value) : LoginActions.setPw(value);
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleClick();
        }
    }

    handleClick = async () => {
        const { LoginActions, id, pw, history } = this.props;
        try {
            const response = await LoginActions.loginProc({id, pw});
            const { result, uid, auth, expired } = response.data;

            if(result === "SUCCESS") {
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

    setClearForm = () => {
        let { id, pw } = document.getElementsByTagName('input');
        id.value = '';
        pw.value = '';

        id.focus();
    }

    render() {
        const { handleKeyPress, handleClick, handleChange} = this;
        return (
            <LoginTemplate onKeyPress={handleKeyPress} onClick={handleClick} onChange={handleChange}/>
        );
    }
}

export default connect(
    (state) => ({
        id: state.login.id,
        pw: state.login.pw,
        result: state.login.data.result
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch),
    })
)(LoginContainer);