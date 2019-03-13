import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import { getServiceListApi, getLogStatsApi } from '../lib/api';

const SET_SERVICE = 'stats/SET_SERVICE';
const SET_STATUS = 'stats/SET_STATUS';
const SET_STARTDT = 'stats/SET_STARTDT';
const SET_ENDDT = 'stats/SET_ENDDT';
const GET_SERVICE_LIST = 'stats/GET_SERVICE_LIST';
const GET_LOGDATA = 'stats/GET_LOGDATA';

export const setServiceCd = createAction(SET_SERVICE);
export const setStatus = createAction(SET_STATUS);
export const setStartDt = createAction(SET_STARTDT);
export const setEndDt = createAction(SET_ENDDT);
export const getServiceList = createAction(GET_SERVICE_LIST, getServiceListApi);
export const getLogData = createAction(GET_LOGDATA, getLogStatsApi);

const initialState = {
    serviceList: [],
    serviceCd: '',
    status: '',
    startDt: new Date(),
    endDt: new Date(),
    data: {
        result: 'FAIL',
        logList: []
    },
};

export default handleActions({
    [SET_SERVICE]: (state, { payload }) => {
        return produce(state, draft => {
            draft.serviceCd = payload;
        })
    },
    [SET_STATUS]: (state, { payload }) => {
        return produce(state, draft => {
            draft.status = payload;
        });
    },
    [SET_STARTDT]: (state, { payload }) => {
        return produce(state, draft => {
            draft.startDt = payload;
        });
    },
    [SET_ENDDT]: (state, { payload }) => {
        return produce(state, draft => {
            draft.endDt = payload;
        });
    },
    ...pender({
        type: GET_SERVICE_LIST,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, message, ZABBIX, POSTMAN, SEFILCARE, CHECK_SERVER } = data;

            return produce(state, draft => {
                if(result === "SUCCESS") {
                    if(ZABBIX) {
                        draft.serviceList.push({
                            serviceNm: 'Zabbix',
                            serviceCd: ZABBIX,
                        });
                    }
                    if(POSTMAN) {
                        draft.serviceList.push({
                            serviceNm: 'Postman',
                            serviceCd: POSTMAN,
                        });
                    }
                    if(SEFILCARE) {
                        draft.serviceList.push({
                            serviceNm: 'SefilCare',
                            serviceCd: SEFILCARE,
                        });
                    }
                    if(CHECK_SERVER) {
                        draft.serviceList.push({
                            serviceNm: 'CheckServer',
                            serviceCd: CHECK_SERVER,
                        });
                    }
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
        type: GET_LOGDATA,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, logList } = data;

            return produce(state, draft => {
                if(result === "FAIL") {
                    draft.id = '';
                    draft.pw = '';
                }
                draft.data.result = result;
                draft.data.logList = logList;
            });
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        },
    })
}, initialState);