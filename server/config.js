const port = process.env.PORT || 8000;
const localHost = 'http://localhost';
const isDevMode = process.env.NODE_ENV === 'development';
const baseUrl = isDevMode ? '' : 'https://combinedcoinexchanges.herokuapp.com';

export default {
    port,
    baseUrl: baseUrl || `${localHost}:${port}`,
};

