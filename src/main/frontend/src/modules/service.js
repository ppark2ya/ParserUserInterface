import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import { getServiceListApi, setServerControlApi } from '../lib/api';

const SET_ZABBIX = 'service/SET_ZABBIX';
const SET_POSTMAN = 'service/SET_POSTMAN';
const SET_SEFILCARE = 'service/SET_SEFILCARE';
const SET_CHECKSERVER = 'service/SET_CHECKSERVER';
const SET_SERVER_CONTROL = 'service/SET_SERVER_CONTROL';
const GET_USING_SERVERS = 'service/GET_USING_SERVERS';

export const setZabbix = createAction(SET_ZABBIX);
export const setPostman = createAction(SET_POSTMAN);
export const setSefilcare = createAction(SET_SEFILCARE);
export const setCheckserver = createAction(SET_CHECKSERVER);
export const getUsingServers = createAction(GET_USING_SERVERS, getServiceListApi);
export const setServerControl = createAction(SET_SERVER_CONTROL, setServerControlApi);

const initialState = {
    zabbix: undefined,
    postman: undefined,
    sefilcare: undefined,
    checkserver: undefined,
    data: {
        result: 'FAIL',
    },
};

export default handleActions({
    [SET_ZABBIX] : (state) => {
        return produce(state, draft => {
            draft.zabbix = !state.zabbix;
        })
    },
    [SET_POSTMAN] : (state) => {
        return produce(state, draft => {
            draft.postman = !state.postman;
        })
    },
    [SET_SEFILCARE] : (state) => {
        return produce(state, draft => {
            draft.sefilcare = !state.sefilcare;
        })
    },
    [SET_CHECKSERVER] : (state) => {
        return produce(state, draft => {
            draft.checkserver = !state.checkserver;
        })
    },
    ...pender({
        type: GET_USING_SERVERS,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, message, ZABBIX, POSTMAN, SEFILCARE, CHECK_SERVER } = data;

            return produce(state, draft => {
                if(result === "SUCCESS") {
                    draft.zabbix = ZABBIX && true;
                    draft.postman = POSTMAN && true;
                    draft.sefilcare = SEFILCARE && true;
                    draft.checkserver = CHECK_SERVER && true;
                } else {
                    alert(message);
                }
            });
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        },
    }),
    ...pender({
        type: SET_SERVER_CONTROL,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, message, auth, ZABBIX, POSTMAN, SEFILCARE, CHECK_SERVER } = data;

            return produce(state, draft => {
                if(result === "SUCCESS") {
                    sessionStorage.auth = auth;
                    draft.zabbix = ZABBIX && true;
                    draft.postman = POSTMAN && true;
                    draft.sefilcare = SEFILCARE && true;
                    draft.checkserver = CHECK_SERVER && true;
                } else {
                    alert(message);
                }
            });
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        },
    })
}, initialState);