import {getCombinedOrderBook} from '../services/CombinedExchangeServices';

export function getCombinedOrderBookRequest(req, res) {
    getCombinedOrderBook()
        .then((orders) => {
            res.json({ orders });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}
