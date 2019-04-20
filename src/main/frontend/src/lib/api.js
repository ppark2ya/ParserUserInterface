import axios from './defaultClient';

export const loginProcApi = ({id, pw}) => {
    return axios.post(`/auth/loginProc`, {
        uid: id,
        pw,
    });
}

export const updateUserApi = ({uid, pw}) => {
    return axios.patch(`/auth/updateUser`, {
        uid,
        pw,
    });
}

export const getUserInfoApi = (uid) => {
    return axios.post(`/auth/getUserInfo`, {
        uid,
    });
}

export const signUpApi = ({id, pw, name, tel, email}) => {
    return axios.post(`/auth/signUp`, {
        uid: id,
        pw,
        name,
        tel,
        email
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

/**
    @param : uid
    @param : auth
    @param : serviceCd
    @param : status
    @param : startDt: moment(startDt).format('YYYYMMDD')
    @param : endDt: moment(endDt).format('YYYYMMDD')
 */
export const getLogStatsApi = (selOptions) => {
    return axios.post(`/stats/log`, selOptions);
}

export const getServiceListApi = ({uid, auth}) => {
    return axios.get(`/api/serviceList`, { params: {uid, auth} });
}

/**
    @param : uid
    @param : auth
    @param : zabbix
    @param : posmant 
    @param : sefilcare 
    @param : checkserver
 */
export const setServerControlApi = (selOptions) => {
    return axios.patch(`/api/authUpdate`, selOptions);
}

export const deleteEmailAddrApi = (uid) => {
    return axios.delete(`/api/deleteEmailAddr`, { params: { uid } });
}

export const addEmailAddrApi = ({uid, email}) => {
    return axios.post(`/api/addEmailAddr`, {
        uid,
        email
    });
}

export const deleteTelNumApi = (uid) => {
    return axios.delete(`/api/deleteTelNum`, { params: { uid } });
}

export const addTelNumApi = ({uid, tel}) => {
    return axios.post(`/api/addTelNum`, {
        uid,
        tel
    });
}

export const getCriticalServerList = () =>{
    return axios.get(`/api/getCriticalServerData`);
}

export const getKeywordListApi = ({uid, auth}) =>{
    return axios.get(`/api/getKeywordList`, { params: {uid, auth} });
}

export const toggleUsageApi = (keyword, serviceCd, useCl) =>{
    return axios.patch(`/api/toggleUsage`, { keyword, serviceCd, useCl } );
}