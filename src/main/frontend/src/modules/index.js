import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import login from './login';

export default combineReducers({
    login,
    pender: penderReducer
})