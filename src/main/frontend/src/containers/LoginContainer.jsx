import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as loginActions from '../modules/login';
import LoginTemplate from '../components/Login/LoginTemplate';

class LoginContainer extends Component {

    handleKeyUp = (e) => {
        const { LoginActions } = this.props;
        (e.target.name === 'id') ? LoginActions.setId(e.target.value) : LoginActions.setPw(e.target.value);
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
        return (
            <LoginTemplate onKeyPress={this.handleKeyPress} onClick={this.handleClick} onKeyUp={this.handleKeyUp}/>
        );
    }
}

export default connect(
    (state) => ({
        id: state.id,
        pw: state.pw,
        //result: state.data.result,
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch),
    })
)(LoginContainer);