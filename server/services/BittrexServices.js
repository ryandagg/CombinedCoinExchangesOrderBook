import bittrex from 'node-bittrex-api';
import { BTX_DEFAULT_MARKET, BTX } from './ServicesConstants';
import callApi from '../../client/util/apiCaller';
import { buildOrder } from '../util/OrderUtils';

const init = () => new Promise((resolve) => {
    bittrex.options({
        websockets: {
            onConnect: () => {
                // console.log('Websocket connected');
                resolve(bittrex);
            },
            onDisconnect: () => {
                console.log('Websocket disconnected');
            },
        },
    });

    bittrex.websockets.client();
});

let bittrexInstance;

const getBittrexSingleton = () => {
    if (bittrexInstance) {
        return Promise.resolve(bittrexInstance);
    } else {
        return init().then(bittrex => {
            bittrexInstance = bittrex;
            return bittrex;
        });
    }
};


const GET_ORDER_BOOK_URL = `https://bittrex.com/api/v1.1/public/getorderbook?market=${BTX_DEFAULT_MARKET}&type=both`;

export const getBittrexOrderBook = () => {
    return getBittrexSingleton().then(() => callApi({fullUrl: GET_ORDER_BOOK_URL})
        .then(({result: {buy, sell}}) => {
            const asks = sell.map(({Quantity, Rate}) => buildOrder({
                quantity: Quantity,
                exchangeKey: BTX,
                rate: Rate,
            }));

            // we want to go in reverse order for bids to get the sums correct.
            const bids = buy.reduceRight((result, {Quantity, Rate}) => {
                result.push(buildOrder({
                    quantity: Quantity,
                    exchangeKey: BTX,
                    rate: Rate,
                }));
                return result;
            },[]);

            return {asks, bids};
        })
    );
};

const btxOrderUpdateAdaptor = ({updateType = 'orderBookModify', OrderType, Quantity, Rate, type}) => {
    return {
        type: updateType,
        orderType: OrderType,
        data: {
            ...buildOrder({
                rate: Rate,
                quantity: Quantity,
                exchangeKey: BTX,
            }),
            type,
        },
    };
};

export const transformBtxUpdate = (data) => {
    const {Fills, Sells, Buys} = data;
    const newOrders = [];
    Fills.forEach((order) => {
        const newOrder = btxOrderUpdateAdaptor({...order, updateType: 'orderBookRemove'});
        newOrders.push({...newOrder, type: 'bid'});
        newOrders.push({...newOrder, type: 'ask'});
    });

    Sells.forEach((order) => {
        newOrders.push(btxOrderUpdateAdaptor({...order, type: 'bid'}));
    });

    Buys.forEach((order) => {
        newOrders.push(btxOrderUpdateAdaptor({...order, type: 'ask'}));

    });
    return newOrders;
};

export default getBittrexSingleton;
