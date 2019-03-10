import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import login from './login';
import stats from './stats';

export default combineReducers({
    login,
    stats,
    pender: penderReducer
})