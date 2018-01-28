const port = process.env.PORT || 8000;
const socketPort = process.env.SOCKET_PORT || 3000;
const localHost = 'http://localhost';
const isDevMode = process.env.NODE_ENV === 'development';
const baseUrl = isDevMode ? '' : 'https://combinedcoinexchanges.herokuapp.com';

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('process.env.BASE_URL: ', process.env.BASE_URL);

export default {
    port,
    socketPort,
    baseUrl: baseUrl || `${localHost}:${port}`,
    socketUrl: `${baseUrl || localHost}:${port}`,
};

