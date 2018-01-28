import {getPoloniexOrderBook} from '../services/PoloniexServices';
import {getBittrexOrderBook} from '../services/BittrexServices';


export function getCombinedOrderBook() {
    return Promise.all([getPoloniexOrderBook(), getBittrexOrderBook()])
        // .then(([firstData, secondData]) => {
        //     const asks = mergeNewOrders(firstData.asks, secondData.asks);
        //     const bids = mergeNewOrders(firstData.bids, secondData.bids);
        //     return Promise.resolve({asks, bids});
        // })
        .catch(err => console.log(err));
}
