import axios from 'axios';
import bootData from './bootData';

const api = axios.create();

api.interceptors.request.use(config => {

    config.baseURL = bootData('baseApiUrl', '/api/');
    config.headers['Content-Type'] = 'application/vnd.api+json';

    if (bootData('usePatchForUpdate') && config.method === 'put') {
        config.method = 'patch';
    }

    return config;

});

export default api;
