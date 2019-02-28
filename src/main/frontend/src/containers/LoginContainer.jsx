import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../modules/login';
import LoginTemplate from '../components/Login/LoginTemplate';

class LoginContainer extends Component {

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
        const { LoginActions, id, pw } = this.props;
        try {
            const p = LoginActions.loginProc({id, pw});
            const result = await p;
            console.log(result);
        } catch(e) {
            console.log(e);
        }
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
        id: state.login.get('id'),
        pw: state.login.get('pw'),
        //result: state.data.result,
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch),
    })
)(LoginContainer);