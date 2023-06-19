import api from './index';

export const createDocument = async (title, value) => {
    let result;

    try {
        const res = await api.post('/documents/create', { title, value });

        result = res.data;
    } catch (err) {
        result = err.response.data;
    }

    return result;
};

export const getDocuments = async (data) => {
    let result;

    try {
        const res = await api.get('/documents/list', data);

        result = res.data;
    } catch (err) {
        result = err.response.data;
    }

    return result;
};

export const deleteDocument = async (id) => {
    let result;

    try {
        const res = await api.post('/documents/delete/' + id, {});

        result = res.data;
    } catch (err) {
        result = err.response.data;
    }

    return result;
};

export const updateDocument = async (id, title, value) => {
    let result;

    try {
        const res = await api.post('/documents/update/' + id, { title, value });

        result = res.data;
    } catch (err) {
        result = err.response.data;
    }

    return result;
};

export const getDocument = async (id) => {
    let result;

    try {
        const res = await api.get('/documents/' + id);

        result = res.data;
    } catch (err) {
        result = err.response.data;
    }

    return result;
};
