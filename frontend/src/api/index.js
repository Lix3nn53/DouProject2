import axios from 'axios';
import { getLocalAccessToken, setLocalAccessToken, removeLocalAccessToken } from './tokenService';

const baseURL = 'http://localhost:5000';

const instance = axios.create({
    baseURL
});

instance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            /* eslint-disable-next-line no-param-reassign */
            config.headers.Authorization = token; // for Spring Boot back-end
            // config.headers['x-access-token'] = token; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
