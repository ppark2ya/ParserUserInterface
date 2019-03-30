import axios from './defaultClient';

export const loginProcApi = ({id, pw}) => {
    return axios.post(`/auth/loginProc`, {
        uid: id,
        pw,
    });
}

export const updateUserApi = ({uid, pw}) => {
    return axios.post(`/auth/updateUser`, {
        uid,
        pw,
    });
}

export const getUserInfoApi = (uid) => {
    return axios.post(`/auth/getUserInfo`, {
        uid,
    });
}

export const getHomeDashboard = ({uid, auth}) => {
    return axios.get(`/home/dashboard`, { params: {uid, auth} });
}

export const getSynthesisGraph = ({uid, auth}) => {
    return axios.get(`/graph/synthesis`, { params: {uid, auth} });
}

export const getCheckServerGraph = ({uid, auth}) => {
    return axios.get(`/graph/checkserver`, { params: {uid, auth} });
}

export const getSefilCareGraph = ({uid, auth}) => {
    return axios.get(`/graph/sefilcare`, { params: {uid, auth} });
}

export const getZabbixGraph = ({uid, auth}) => {
    return axios.get(`/graph/zabbix`, { params: {uid, auth} });
}

export const getLogStatsApi = (selOptions) => {
    return axios.post(`/stats/log`, selOptions);
}

export const getServiceListApi = ({uid, auth}) => {
    return axios.get(`/api/serviceList`, { params: {uid, auth} });
}

export const setServerControlApi = ({uid, auth}) => {
    return axios.get(`/api/serviceList`, { params: {uid, auth} });
}