import axios from 'axios';
import Config from 'react-native-config';

export const api = axios.create({
    baseURL: Config.API_BASE_URL
});

api.interceptors.request.use(async (config) => {
    config.headers.set('X-Auth-Token', Config.API_TOKEN);
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 429) {
            throw new Error('Превышен лимит запросов к API. Попробуйте позже.');
        }
        if (error.response?.status === 403) {
            throw new Error('Неверный API ключ или нет доступа к ресурсу.');
        }
        if (!error.response) {
            throw new Error('Ошибка получения данных.');
        }
        throw error;
    }
);
