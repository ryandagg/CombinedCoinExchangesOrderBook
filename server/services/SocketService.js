import io from 'socket.io';
import initPoloniex,  {transformPlxUpdate}from './PoloniexServices';
import initBittrex, {transformBtxUpdate} from './BittrexServices';
import {PLX_DEFAULT_MARKET, BTX_DEFAULT_MARKET, BTX, PLX} from './ServicesConstants';

const server = io.listen(3000);

// todo: use namespaces and subscriptions properly instead of this hack
let sequenceNumberByClient = new Map();


// event fired every time a new client connects:
server.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on('disconnect', () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});

const notify = (event, message) => {
    for (const [client] of sequenceNumberByClient.entries()) {
        client.emit(event, message);
    }
};

export const initSockets = () => {
    initPoloniex().then((poloniex) => {
        poloniex.on('message', (channelName, data, seq) => {
            if (channelName === PLX_DEFAULT_MARKET && data[0] && data[0].type !== 'orderBook') {
                notify(`${PLX_DEFAULT_MARKET}-${PLX}`, {data: transformPlxUpdate(data), seq});
            }
        });
    });

    initBittrex().then(bittrex => {
        bittrex.websockets.subscribe([BTX_DEFAULT_MARKET], (data) => {
            if (data.M === 'updateExchangeState') {
                if (data.A && data.A[0]) {
                    notify(`${PLX_DEFAULT_MARKET}-${BTX}`, {data: transformBtxUpdate(data.A[0])});

                    if (data.A[1] != null) {
                        throw new Error('*** Assumption about Bittrex ws data structure is WRONG ***');
                    }
                }

            }
        });
    });
};
