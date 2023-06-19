import { getLocalAccessToken, setLocalAccessToken, removeLocalAccessToken } from './tokenService';
import api from './index';

// Register User
export const registerUser = async (userData) => {
    let result;

    try {
        const res = await api.post('/auth/register', userData);

        result = res.data;
    } catch (err) {
        result = err.response.data;
    }

    return result;
};

// Login - Get User Token
export const loginUser = async (userData) => {
    let result;

    try {
        const res = await api.post('/auth/login', userData);

        result = res.data;

        setLocalAccessToken(result.token);
    } catch (err) {
        result = err.response.data;
    }

    return result;
};

// Log user out
export const logoutUser = () => {
    removeLocalAccessToken();
    window.location.href = '/';
};

// Log user out
export const currentUser = async () => {
    let result;

    try {
        const res = await api.get('/auth/current');

        result = res.data;
    } catch (err) {
        result = err.response.data;
    }

    return result;
};
