import api from './index';

// Register User
export const grammerCorrection = async (prompt) => {
    try {
        const response = await api.post('/app/grammerCorrection', { prompt });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};

export const improveWriting = async (prompt) => {
    try {
        const response = await api.post('/app/improveWriting', { prompt });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};
export const makeShorter = async (prompt) => {
    try {
        const response = await api.post('/app/makeShorter', { prompt });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};
export const makeLonger = async (prompt) => {
    try {
        const response = await api.post('/app/makeLonger', { prompt });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};
export const changeTone = async (prompt, tone) => {
    try {
        const response = await api.post('/app/changeTone', { prompt, tone });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};
export const simplifyLanguage = async (prompt) => {
    try {
        const response = await api.post('/app/simplifyLanguage', { prompt });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};
export const continueWriting = async (prompt) => {
    try {
        const response = await api.post('/app/continueWriting', { prompt });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};

export const translate = async (prompt, language) => {
    try {
        const response = await api.post('/app/translate', { prompt, language });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};
export const summarize = async (prompt) => {
    try {
        const response = await api.post('/app/summarize', { prompt });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};
export const explain = async (prompt) => {
    try {
        const response = await api.post('/app/explain', { prompt });

        return response.data.text;
    } catch (err) {
        return err.response.data;
    }
};
