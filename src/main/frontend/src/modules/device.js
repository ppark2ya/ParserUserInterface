import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { getUserInfoApi, deleteEmailAddrApi, addEmailAddrApi, deleteTelNumApi, addTelNumApi } from '../lib/api';
import { applyPenders } from 'redux-pender/lib/utils';

const SET_EMAIL = 'device/SET_EMAIL';
const SET_TELNUM = 'device/SET_TELNUM';
const GET_USERINFO = 'device/GET_USERINFO';
const DELETE_EMAILADDR = 'device/DELETE_EMAILADDR';
const ADD_EMAILADDR = 'device/ADD_EMAILADDR';
const DELETE_TELNUM = 'device/DELETE_TELNUM';
const ADD_TELNUM = 'device/ADD_TELNUM';

export const setEmail = createAction(SET_EMAIL);
export const setTelNum = createAction(SET_TELNUM);
export const getUserInfo = createAction(GET_USERINFO, getUserInfoApi);
export const deleteEmailAddr = createAction(DELETE_EMAILADDR, deleteEmailAddrApi);
export const addEmailAddr = createAction(ADD_EMAILADDR, addEmailAddrApi);
export const deleteTelNum = createAction(DELETE_TELNUM, deleteTelNumApi);
export const addTelNum = createAction(ADD_TELNUM, addTelNumApi);

const initialState = {
    plainTel: '',
    plainEmail: '',
    tel: '',
    email: '',
    data: {
        result: 'FAIL'
    },
};

const reducer = handleActions({
    [SET_EMAIL]: (state, { payload }) => {
        return produce(state, draft => {
            draft.email = payload;
        })
    },
    [SET_TELNUM]: (state, { payload }) => {
        return produce(state, draft => {
            draft.tel = payload;
        })
    },
}, initialState);

export default applyPenders(reducer, [
    {
        type: GET_USERINFO,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, telNum, email } = data;

            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            }

            return produce(state, draft => {
                draft.tel = telNum;
                draft.email = email;
                draft.plainTel = telNum;
                draft.plainEmail = email;
                draft.data.result = result;
            });
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        }, 
    }, 
    {
        type: DELETE_EMAILADDR,
        onSuccess: (state, { payload: { data } }) => { 
            const { result } = data;

            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            } else {
                return produce(state, draft => {
                    draft.email = '';
                    draft.plainEmail = '';
                    draft.data.result = result;
                });
            }
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        }, 
    },
    {
        type: ADD_EMAILADDR,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, email } = data;

            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            } else {
                return produce(state, draft => {
                    draft.email = email;
                    draft.plainEmail = email;
                    draft.data.result = result;
                });
            }

        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        }, 
    },
    {
        type: DELETE_TELNUM,
        onSuccess: (state, { payload: { data } }) => { 
            const { result } = data;

            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            } else {
                return produce(state, draft => {
                    draft.tel = '';
                    draft.plainTel = '';
                    draft.data.result = result;
                });
            }

        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        }, 
    },
    {
        type: ADD_TELNUM,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, telNum } = data;

            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            } else {
                return produce(state, draft => {
                    draft.tel = telNum;
                    draft.plainTel = telNum;
                    draft.data.result = result;
                });
            }
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        }, 
    }
]);