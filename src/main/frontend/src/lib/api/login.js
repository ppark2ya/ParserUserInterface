import axios from '../defaultClient';

export const loginProcApi = ({id, pw}) => {
    return axios.post(`/auth/loginProc`, {
        id,
        pw,
    });
}