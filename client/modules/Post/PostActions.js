import callApi from '../../util/apiCaller';

// Export Constants
export const SET_ORDERS = 'SET_ORDERS';

export const setOrders = (orders) => {
    return {
        type: SET_ORDERS,
        orders,
    };
};

export const getCombinedOrderBookRequest = () => {
    return (dispatch) => {
        return callApi({route: 'orders'}).then(({orders}) => dispatch(setOrders(orders)));
    };
};
