export const getLocalAccessToken = () => {
    return window.localStorage.getItem('accessToken');
};

export const setLocalAccessToken = (accessToken) => {
    window.localStorage.setItem('accessToken', accessToken);
};

export const removeLocalAccessToken = () => {
    window.localStorage.removeItem('accessToken');
};
