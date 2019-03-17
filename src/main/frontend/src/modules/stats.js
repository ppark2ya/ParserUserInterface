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
const SET_PAGE= 'stats/SET_PAGE';
const SET_ROWS_PER_PAGE= 'stats/SET_ROWS_PER_PAGE';
const TOGGLE_OPEN= 'stats/TOGGLE_OPEN';

export const setServiceCd = createAction(SET_SERVICE);
export const setStatus = createAction(SET_STATUS);
export const setStartDt = createAction(SET_STARTDT);
export const setEndDt = createAction(SET_ENDDT);
export const getServiceList = createAction(GET_SERVICE_LIST, getServiceListApi);
export const getLogData = createAction(GET_LOGDATA, getLogStatsApi);
export const setPage = createAction(SET_PAGE);
export const setRowsPerPage = createAction(SET_ROWS_PER_PAGE);
export const toggleOpen = createAction(TOGGLE_OPEN);

const initialState = {
    serviceList: [],
    serviceCd: '',
    status: '',
    startDt: new Date(),
    endDt: new Date(),
    data: {
        result: 'FAIL',
        logList: [],
        page: 0,
        rowsPerPage: 10,
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
    [SET_PAGE]: (state, { payload }) => {
        return produce(state, draft => {
            draft.data.page = payload;
        });
    },
    [SET_ROWS_PER_PAGE]: (state, { payload }) => {
        return produce(state, draft => {
            const { page, rowsPerPage } = payload;
            draft.data.page = page;
            draft.data.rowsPerPage = rowsPerPage;
        });
    },
    [TOGGLE_OPEN]: (state, { payload }) => {
        return produce(state, draft => {
            const idx = payload - 1;
            draft.data.logList[idx].open = (draft.data.logList[idx].open === 1)? 0 : 1;
        });
    },
    ...pender({
        type: GET_SERVICE_LIST,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, message, ZABBIX, POSTMAN, SEFILCARE, CHECK_SERVER } = data;

            return produce(state, draft => {
                if(result === "SUCCESS") {
                    // 초기에 렌더링이 여러번 되면서 list에 값이 중첩으로 들어가면서 sort 에러가 발생함.
                    // push전에 배열을 초기화해서 중첩방지
                    draft.serviceList = [];
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
                    draft.serviceCd = '';
                    draft.status = '';
                    draft.startDt = new Date();
                    draft.endDt = new Date();
                    draft.page = 0;
                    draft.rowsPerPage = 10;
                }
                draft.data.result = result;
                draft.data.logList = logList.map(log => {
                    return {
                        ...log,
                        open: (log.open === 1)? true: false
                    }
                });
            });
        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        },
    })
}, initialState);