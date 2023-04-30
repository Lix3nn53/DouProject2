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
