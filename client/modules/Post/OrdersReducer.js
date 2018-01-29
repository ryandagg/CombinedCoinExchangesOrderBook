import { SET_ORDERS } from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                orders: action.orders,
            };
        default:
            return state;
    }
};

// Export Reducer
export default PostReducer;
