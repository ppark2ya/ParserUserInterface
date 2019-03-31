import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { loadingBarReducer } from 'react-redux-loading-bar';
import login from './login';
import stats from './stats';
import service from './service';
import device from './device';

export default combineReducers({
    login,
    stats,
    service,
    device,
    pender: penderReducer,
    loadingBar: loadingBarReducer,
})