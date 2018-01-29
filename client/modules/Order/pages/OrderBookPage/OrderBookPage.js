import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import PostList from '../../components/OrderTables';
import { getCombinedOrderBookRequest } from '../../OrderActions';
import { exchangeA, exchangeB, PLX_DEFAULT_MARKET } from '../../../../../server/services/ServicesConstants';

class PostListPage extends Component {
    componentDidMount() {
        // this.props.dispatch(fetchPosts());
    }

    render() {
        return (
            <div>
                <PostList
                    staticOrders={this.props.orders}
                    activeExchanges={[exchangeA, exchangeB] /* this will eventually be passed in as a prop and not injected here */}
                    currencyPair={PLX_DEFAULT_MARKET}
                />
            </div>
        );
    }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [getCombinedOrderBookRequest];

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        orders: state.orders.orders,
    };
}

// OrderBookPage.propTypes = {
//     orders: PropTypes.arrayOf(PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired,
//         content: PropTypes.string.isRequired,
//     })).isRequired,
//     showAddPost: PropTypes.bool.isRequired,
//     dispatch: PropTypes.func.isRequired,
// };

PostListPage.contextTypes = {
    router: React.PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
