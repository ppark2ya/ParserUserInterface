import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import axios from 'axios';

function getPostApi({id, pw}) {
    return axios.post(`/loginProc`, {
        id,
        pw,
    });
}

const SET_ID = 'login/SET_ID';
const SET_PW = 'login/SET_PW';
const LOGIN_PROC = 'login/LOGIN_PROC';

export const setId = createAction(SET_ID);
export const setPw = createAction(SET_PW);
export const loginProc = createAction(LOGIN_PROC, getPostApi);

const initialState = Map({
    data: {
        result: 'fail',
    },
    id: '',
    pw: '',
});

const reducer = handleActions({
    [SET_ID]: (state, action) => {
        return state.set('id', action.payload)
    },
    [SET_PW]: (state, action) => {
        return state.set('pw', action.payload)
    },
}, initialState);

export default applyPenders(reducer, [
    {
        type: LOGIN_PROC,
        onSuccess: (state, action) => {
            const { result } = action.payload.data;
        },
        onFailure: (state, action) => {

        },
    }
]);