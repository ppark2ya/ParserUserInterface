import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { loadingBarReducer } from 'react-redux-loading-bar';
import login from './login';
import stats from './stats';
import service from './service';

export default combineReducers({
    login,
    stats,
    service,
    pender: penderReducer,
    loadingBar: loadingBarReducer,
})