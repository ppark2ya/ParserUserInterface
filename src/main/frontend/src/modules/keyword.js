import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { getKeywordListApi, toggleUsageApi } from '../lib/api';
import { applyPenders } from 'redux-pender/lib/utils';

const SET_PAGE= 'keyword/SET_PAGE';
const SET_ROWS_PER_PAGE= 'keyword/SET_ROWS_PER_PAGE';
const GET_KEYWORDLIST = 'keyword/GET_KEYWORDLIST';
const TOGGLE_USAGE = 'keyword/TOGGLE_USAGE';
const SORT_ROWS = 'keyword/SORT_ROWS';

export const setPage = createAction(SET_PAGE);
export const setRowsPerPage = createAction(SET_ROWS_PER_PAGE);
export const getKeywordList = createAction(GET_KEYWORDLIST, getKeywordListApi);
export const toggleUsage = createAction(TOGGLE_USAGE, toggleUsageApi);
export const compareFunction = createAction(SORT_ROWS);

const initialState = {
    data: {
        result: 'FAIL',
        checkServerList : [],
        sefilcareList : [],
        zabbixList : [],
        postmanList : [],
        page: 0,
        rowsPerPage: 10,
    },
};

const reducer = handleActions({
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
    [SORT_ROWS]: (state, { payload }) => {
        return produce(state, draft => {
            const serviceCd = payload[0].serviceCd;
            
            let sortedRows;
            if(payload[0].useCl === "1") {
                sortedRows = [...payload.sort((a, b) => a.useCl < b.useCl ? -1 : a.useCl < b.useCl ? 1: 0)];
            } else {
                sortedRows = [...payload.sort((a, b) => a.useCl > b.useCl ? -1 : a.useCl > b.useCl ? 1: 0)];
            }
            
            if(serviceCd === "00") {
                draft.data.zabbixList = sortedRows;
            } else if(serviceCd === "01") {
                draft.data.postmanList = sortedRows;
            } else if(serviceCd === "02") {
                draft.data.sefilcareList = sortedRows;
            } else if(serviceCd === "03") {
                draft.data.checkServerList = sortedRows;
            }
        });
    },
}, initialState);

export default applyPenders(reducer, [
    {
        type: GET_KEYWORDLIST,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, checkServerList, sefilcareList, zabbixList, postmanList } = data;

            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            } else {
                return produce(state, draft => {
                    draft.data.result = result;
                    draft.data.checkServerList = checkServerList;
                    draft.data.sefilcareList = sefilcareList;
                    draft.data.zabbixList = zabbixList;
                    draft.data.postmanList = postmanList;
                });
            }

        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        }, 
    }, 
    {
        type: TOGGLE_USAGE,
        onSuccess: (state, { payload: { data } }) => { 
            const { result, serviceCd, chgKeywordInfo } = data;
            
            if(result === "FAIL") {
                alert('서버 에러! 관리자에게 문의하세요');
            } else {
                return produce(state, draft => {
                    if(serviceCd === '00') {
                        draft.data.zabbixList = chgKeywordInfo;
                    } else if(serviceCd === '01') {
                        draft.data.postmanList = chgKeywordInfo;
                    } else if(serviceCd === '02') {
                        draft.data.sefilcareList = chgKeywordInfo;
                    } else if(serviceCd === '03') {
                        draft.data.checkServerList = chgKeywordInfo;
                    }
                    draft.data.result = result;
                });
            }

        },
        onFailure: (state, { payload: { response } }) => { 
            alert('서버 에러! 관리자에게 문의하세요');
        }, 
    }, 
]);