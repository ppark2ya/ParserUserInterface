import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { loadingBarReducer } from 'react-redux-loading-bar';
import login from './login';
import stats from './stats';

export default combineReducers({
    login,
    stats,
    pender: penderReducer,
    loadingBar: loadingBarReducer,
})