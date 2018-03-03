import {compose, lifecycle, withState, withProps} from 'recompose';
import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import {mergeNewOrders, buildOrdersMap, mergeExchanges} from '../../../../server/util/OrderUtils';

const TABLE_MAX_ROWS = 90;

const OrderRow = ({rate, exchangeKey, quantity, sum}) => {
    return (
        <tr key={`${rate}-${quantity}`}>
            <td>{sum.toString().slice(0, 8)}</td>
            <td>{rate.toString().slice(0, 8)}</td>
            <td>{quantity.toString().slice(0, 8)}</td>
            <td>{exchangeKey}</td>
        </tr>
    );
};

const OrderTable = ({ordersBody, title, className, sum}) => {
    return (
        <div className={className}>
            <h2 style={{float: 'left'}}>{title}</h2>
            <h3 style={{float: 'right'}}>{`Total: ${sum}`}</h3>
            <table className="table table-sm table-striped table-bordered font-size-h6">
                <thead>
                <tr>
                    <th scope="col">Sum (ETH)</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity (ETH)</th>
                    <th scope="col">Exchange</th>
                </tr>
                </thead>
                <tbody>
                    {ordersBody.map(OrderRow)}
                </tbody>
            </table>
        </div>
    );
};

function OrderTables({asksBody, bidsBody, asksSum, bidsSum, canArbitrage}) {
    return (
        <div>
            <div style={{height: '15px', color: 'green'}}>{canArbitrage ? 'Arbitrage opportunity between exchanges' : ''}</div>
            <div className="row">
                <OrderTable className="col-6" ordersBody={asksBody} sum={asksSum} title="Asks"/>
                <OrderTable className="col-6" ordersBody={bidsBody} sum={bidsSum} title="Bids"/>
            </div>
        </div>
    );
}

const orderPropShape = PropTypes.shape({
    sum: PropTypes.number.isRequired,
    exchangeKey: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
});

OrderTables.propTypes = {
    asksBody: PropTypes.arrayOf(orderPropShape).isRequired,
    bidsBody: PropTypes.arrayOf(orderPropShape).isRequired,
    bidsSum: PropTypes.string.isRequired,
    asksSum: PropTypes.string.isRequired,
    updateOrders: PropTypes.func.isRequired,
    canArbitrage: PropTypes.bool.isRequired,

};

export default compose(
    // avoiding redux round trip for expected speed gains. Also, showing off what I know about recompose.
    withState('orders', 'setOrders', ({staticOrders, activeExchanges}) => buildOrdersMap(staticOrders, activeExchanges)),
    withProps(({setOrders, orders, activeExchanges}) => {
        const asks = mergeExchanges(activeExchanges.map(key => orders[key].get('asks')));
        const bids = mergeExchanges(activeExchanges.map(key => orders[key].get('bids')));

        return {
            updateOrders: (newOrders, exchangeKey) => {
                setOrders(mergeNewOrders({newOrders, orders, exchangeKey}));
            },
            asksBody: asks.slice(0, TABLE_MAX_ROWS),
            asksSum: asks[asks.length - 1].sum.toString().slice(0, 8),
            bidsBody: bids.slice(0, TABLE_MAX_ROWS),
            bidsSum: bids[bids.length - 1].sum.toString().slice(0, 8),
            canArbitrage: asks[0].rate < bids[0].rate,
        };
    }),
    lifecycle({
        componentDidMount() {
            const {updateOrders, activeExchanges, currencyPair} = this.props;
            const socket = io();

            activeExchanges.forEach(exchangeKey => {
                socket.on(`${currencyPair}-${exchangeKey}`, (msg) => {
                    // console.info(JSON.stringify(msg, null, 2));
                    updateOrders(msg.data, exchangeKey);
                });
            });
        },
    })
)(OrderTables);
