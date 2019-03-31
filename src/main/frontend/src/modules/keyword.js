import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { getUserInfoApi } from '../lib/api';
import { applyPenders } from 'redux-pender/lib/utils';

const SET_EMAIL = 'device/SET_EMAIL';

export const setEmail = createAction(SET_EMAIL);

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
}, initialState);

export default applyPenders(reducer, [
    {
        type: SET_EMAIL,
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
]);