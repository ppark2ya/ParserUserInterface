import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import { loginProcApi } from '../lib/api';

const SET_ID = 'login/SET_ID';
const SET_PW = 'login/SET_PW';
const LOGIN_PROC = 'login/LOGIN_PROC';

export const setId = createAction(SET_ID);
export const setPw = createAction(SET_PW);
export const loginProc = createAction(LOGIN_PROC, loginProcApi);

const initialState = {
    id: '',
    pw: '',
    data: {
        result: 'FAIL'
    },
};

export default handleActions({
    [SET_ID]: (state, { payload }) => {
        return produce(state, draft => {
            draft.id = payload;
        })
    },
    [SET_PW]: (state, { payload }) => {
        return produce(state, draft => {
            draft.pw = payload;
        });
    },
    ...pender({
        type: LOGIN_PROC,
        onSuccess: (state, { payload: { data } }) => { 
            const { result } = data;

            return produce(state, draft => {
                if(result === "FAIL") {
                    draft.id = '';
                    draft.pw = '';
                }
                draft.data.result = result;
            });
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        },
    })
}, initialState);