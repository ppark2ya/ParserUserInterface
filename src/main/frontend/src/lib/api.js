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