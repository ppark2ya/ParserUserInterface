import axios from 'axios';

axios.defaults.withCredentials = true;

const baseURL = (() => {
    if (process.env.NODE_ENV === 'development') return 'http://localhost';
    if (process.env.APP_ENV === 'server' && process.env.LOCAL === 'true') {
    return 'http://localhost';
    }
    // return 'https://146.148.76.237';
    return 'http://localhost';
})();

const defaultClient = axios.create({
    baseURL,
    withCredentials: true,
});

if (process.env.APP_ENV === 'server') {
    defaultClient.defaults.timeout = 3000;
}

export default defaultClient;