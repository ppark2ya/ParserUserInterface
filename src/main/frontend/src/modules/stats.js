import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import { getLogStats } from '../lib/api';

const SET_SERVICE = 'stats/SET_SERVICE';
const SET_STATUS = 'stats/SET_STATUS';
const SET_PERIOD = 'stats/SET_PERIOD';
const GET_LOGDATA = 'stats/GET_LOGDATA';

export const setServiceCd = createAction(SET_SERVICE);
export const setStatus = createAction(SET_STATUS);
export const setPeriod = createAction(SET_PERIOD);
export const getLogData = createAction(GET_LOGDATA, getLogStats);

const initialState = {
    serviceCd: '',
    status: '',
    period: '',
    data: {
        result: 'FAIL'
    },
};

export default handleActions({
    [SET_SERVICE]: (state, { payload }) => {
        return produce(state, draft => {
            draft.id = payload;
        })
    },
    [SET_STATUS]: (state, { payload }) => {
        return produce(state, draft => {
            draft.pw = payload;
        });
    },
    ...pender({
        type: GET_LOGDATA,
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