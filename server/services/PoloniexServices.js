import { PLX_DEFAULT_MARKET, PLX, BTX } from './ServicesConstants';
import { buildOrder, buildOrderUpdate } from '../util/OrderUtils';

const init = () => new Promise(resolve => {
    const Poloniex = require('poloniex-api-node');

    let poloniex = new Poloniex();

    // poloniex.subscribe(1001);
    // poloniex.subscribe(1002);
    // poloniex.subscribe(1003);
    poloniex.subscribe(PLX_DEFAULT_MARKET);


    // poloniex.on('message', (channelName, data, seq) => {
    //     if (channelName === 'ticker') {
    //         console.log(`Ticker: ${data}`);
    //     }
    //
    //     if (channelName === PLX_DEFAULT_MARKET) {
    //         console.log(`order book and trade updates received for currency pair ${channelName}`);
    //         console.log(`data sequence number is ${seq}`);
    //     }
    // });

    poloniex.on('open', () => {
        console.log(`Poloniex WebSocket connection open`);
        resolve(poloniex);
    });

    poloniex.on('close', (reason, details) => {
        console.log(`Poloniex WebSocket connection disconnected for: (${reason}). Details: ${details}`);
    });

    poloniex.on('error', (error) => {
        console.log(`An error has occured : ${error}`);
    });

    poloniex.openWebSocket({ version: 2 });
});

let poloniexInstance;

const getPoloniex = () => {
    if (poloniexInstance) {
        return Promise.resolve(poloniexInstance);
    } else {
        return init().then(poloniex => {
            poloniexInstance = poloniex;
            return poloniex;
        });
    }
};

export default getPoloniex;

export const getPoloniexOrderBook = () => {
    return getPoloniex().then((poloniex) => {
        return poloniex.returnOrderBook(PLX_DEFAULT_MARKET, 100).then(orders => {
            const asks = orders.asks.map(([rate, quantity]) => buildOrder({
                rate,
                quantity,
                exchangeKey: PLX,
            }));

            // we want to go in reverse order for bids to get the sums correct.
            const bids = orders.bids.reduceRight((result, [rate, quantity]) => {
                result.push(buildOrder({
                    rate,
                    quantity,
                    exchangeKey: PLX,
                }));
                return result;
            },[]);

            return {asks, bids};
        });
    });
};


export const transformPlxUpdate = (newOrders) => {
    return newOrders.map(({data, ...rest}) => ({
        ...rest,
        data: {
            type: data.type,
            ...buildOrder({
                rate: data.rate,
                quantity: data.amount,
                exchangeKey: PLX,
            }),
        },
    }));
};
