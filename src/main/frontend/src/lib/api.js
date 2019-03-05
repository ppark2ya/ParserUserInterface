import axios from './defaultClient';

export const loginProcApi = ({id, pw}) => {
    return axios.post(`/auth/loginProc`, {
        id,
        pw,
    });
}

export const getHomeDashboard = ({uid, auth}) => {
    return axios.get(`/home/dashboard`, { params: {uid, auth} });
}