import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import { loginProcApi, getUserInfoApi, updateUserApi, signUpApi } from '../lib/api';

const SET_ID = 'login/SET_ID';
const SET_PW = 'login/SET_PW';
const LOGIN_PROC = 'login/LOGIN_PROC';
const GET_USERINFO = 'login/GET_USERINFO';
const USER_UPDATE = 'login/USER_UPDATE';
const TOGGLE_OPEN = 'login/TOGGLE_OPEN';
const SET_FORM_DATA = 'login/SET_FORM_DATA';
const SIGN_UP = 'login/SIGN_UP';

export const setId = createAction(SET_ID);
export const setPw = createAction(SET_PW);
export const loginProc = createAction(LOGIN_PROC, loginProcApi);
export const getUserInfo = createAction(GET_USERINFO, getUserInfoApi);
export const userUpdate = createAction(USER_UPDATE, updateUserApi);
export const toggleOpen = createAction(TOGGLE_OPEN);
export const setFormData = createAction(SET_FORM_DATA);
export const signUp = createAction(SIGN_UP, signUpApi);

const initialState = {
    id: '',
    pw: '',
    name: '',
    tel: '',
    email: '',
    open: false,
    data: {
        result: 'FAIL'
    },
    form: {
        id: '',
        pw: '',
        name: '',
        tel: '',
        email: '',
    }
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
    [TOGGLE_OPEN] : (state) => {
        return produce(state, draft => {
            draft.open = !state.open;
        });
    },
    [SET_FORM_DATA] : (state, { payload : {name, value} }) => {
        return produce(state, draft => {
            draft.form[name] = value;
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
    }),
    ...pender({
        type: GET_USERINFO,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, uid, pw, name, telNum, email } = data;

            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            }

            return produce(state, draft => {
                draft.id = uid;
                draft.pw = pw;
                draft.name = name;
                draft.tel = telNum;
                draft.email = email;
                draft.data.result = result;
            });
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        },
    }),
    ...pender({
        type: USER_UPDATE,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, uid, pw, name, telNum, email } = data;

            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            }
            
            return produce(state, draft => {
                draft.id = uid;
                draft.pw = pw;
                draft.name = name;
                draft.tel = telNum;
                draft.email = email;
                draft.data.result = result;
            });
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        },
    }),
    ...pender({
        type: SIGN_UP,
        onSuccess: (state, { payload: { data } }) => { 
            const { result } = data;

            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            }
            
            return produce(state, draft => {
                draft.form.id = '';
                draft.form.pw = '';
                draft.form.name = '';
                draft.form.tel = '';
                draft.form.email = '';
                draft.data.result = result;
            });
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        },
    })
}, initialState);