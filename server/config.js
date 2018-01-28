const port = process.env.PORT || 8000;
const baseUrl = process.env.BASE_URL;
const socketPort = process.env.SOCKET_PORT || 3000;

export default {
    port,
    socketPort: process.env.SOCKET_PORT || 3000,
    baseUrl: baseUrl || `http://localhost:${port}`,
    socketUrl: baseUrl ? `${baseUrl}:${socketPort}` : `http://localhost:${socketPort}`,
};

