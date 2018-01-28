export const buildOrdersMapReducer = (result, {rate, exchangeKey, quantity, sum}) => {
    result.set(rate, { exchangeKey, quantity, sum});
    return result;
};

export const buildOrdersMap = (orders, activeExchanges) => {
    return orders.reduce((result, {bids, asks}, index) => {
        const key = activeExchanges[index];

        const ordersMap = new Map();
        const bidsMap = bids.reduce(buildOrdersMapReducer, new Map());
        const asksMap = asks.reduce(buildOrdersMapReducer, new Map());

        ordersMap.set('asks', asksMap);
        ordersMap.set('bids', bidsMap);
        result[key] = ordersMap;

        return result;
    }, {}) ;
};

const buildOrderWithSum = (order, sum) => {
    return {...buildOrder(order), sum};
};

export const mergeExchanges = ([firstDataMap, secondDataMap]) => {
    let orders = [];
    let sum = 0;
    let secondDataKeys = secondDataMap.keys();
    let secondNext = secondDataKeys.next();

    firstDataMap.forEach((fOrder, fRate) => {
        let didMerge = false;
        while (!secondNext.done && fRate >= secondNext.value) {
            const sRate = secondNext.value;
            const sOrder = secondDataMap.get(sRate);
            if (fRate === sOrder.rate) {
                didMerge = true;
                let exchanges = [fOrder.exchangeKey, sOrder.exchangeKey];
                exchanges.sort();
                const mergedOrder = buildOrder({
                    rate: fRate,
                    quantity: fOrder.quantity + sOrder.quantity,
                    exchangeKey: exchanges.join('/'),
                });
                mergedOrder.sum = sum += mergedOrder.quantity;

                orders.push(mergedOrder);
            } else {
                orders.push(buildOrderWithSum({...sOrder, rate: sRate}, sum += sOrder.quantity));
            }

            secondNext = secondDataKeys.next();
        }

        if (!didMerge) {
            orders.push(buildOrderWithSum({...fOrder, rate: fRate}, sum += fOrder.quantity));
        }
    });

    // add the end of the second array
    while (!secondNext.done) {
        const newOrder = secondDataMap.get(secondNext.value);
        orders.push(buildOrderWithSum({...newOrder, rate: secondNext.value}, sum += newOrder.quantity));
        secondNext = secondDataKeys.next();
    }

    return orders;
};

export const mergeNewOrders = ({newOrders, orders, exchangeKey}) => {
    // initializing insertions to make sure sums always get updated below
    const insertions = {asks: [], bids: []};

    const exchange = orders[exchangeKey];

    newOrders.forEach(({type, data: {rate, quantity, exchangeKey, type: orderType}}) => {
        const lookUpKey = orderType === 'ask' ? 'asks' : 'bids';
        const side = exchange.get(lookUpKey);
        const order = side.get(rate);

        if (type === 'orderBookModify') {
            if (order != null) {
                order.quantity = quantity;

                side.set(rate, order);
            } else {
                const insertionArr = insertions[lookUpKey];
                insertionArr.push(buildOrder({
                    quantity: quantity,
                    rate,
                    exchangeKey,
                }));
                insertions[lookUpKey] = insertionArr;
            }
        } else {
            side.delete(rate);
        }

        exchange.set(lookUpKey, side);
    });

    // insert brand new order rates in correct order and update sums
    Object.keys(insertions).forEach((lookUpKey) => {
        const toInsert = insertions[lookUpKey];
        const modifier = lookUpKey === 'ask' ? 1 : -1;
        toInsert.sort((a, b) => {
            return a.rate - b.rate * modifier;
        });
        const side = exchange.get(lookUpKey);
        const newSide = new Map();
        let toInsertIndex = 0;
        let sumCounter = 0;

        for (const [rate, value] of side.entries()) {
            const {rate: newRate, ...rest} = toInsert[toInsertIndex] || {};
            if (rate > newRate) {
                rest.sum = sumCounter += rest.quantity;
                newSide.set(newRate, rest);
                toInsertIndex++;
            }

            value.sum = sumCounter += value.quantity;
            newSide.set(rate, value);
        }

        exchange.set(lookUpKey, newSide);
    });

    orders[exchangeKey] = exchange;

    return orders;
};


export const buildOrder = ({rate, quantity, exchangeKey}) => {
    // only throwing these errors because I don't have time to write tests with the limited time available to me
    if (rate == null) {
        throw new Error(`buildOrder missing data: ${{rate}}`);
    }
    if (quantity == null) {
        throw new Error(`buildOrder missing data: ${{quantity}}`);
    }
    if (exchangeKey == null) {
        throw new Error(`buildOrder missing data: ${{exchangeKey}}`);
    }

    quantity = +quantity;
    return {
        // rate: +(rate.toString().slice(0, 7)), // Only doing this to show off the combined exchange rows. Collisions rarely occur otherwise.
        rate: +rate,
        quantity,
        exchangeKey,
    };
};


