const port = process.env.PORT || 8000;
const baseUrl = process.env.BASE_URL;
const socketPort = process.env.SOCKET_PORT || 3000;
const localHost = 'http://localhost';

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
console.log('process.env.baseUrl: ', process.env.baseUrl)

export default {
    port,
    socketPort: process.env.SOCKET_PORT || 3000,
    baseUrl: baseUrl || `${localHost}:${port}`,
    socketUrl: `${baseUrl || localHost}:${socketPort}`,
};

