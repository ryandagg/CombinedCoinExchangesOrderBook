/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-intl");

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var port = process.env.PORT || 8000;
	var socketPort = process.env.SOCKET_PORT || 3000;
	var localHost = 'http://localhost';
	var isDevMode = process.env.NODE_ENV === 'development';
	var baseUrl = isDevMode ? '' : 'https://combinedcoinexchanges.herokuapp.com';
	
	console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
	console.log('process.env.BASE_URL: ', process.env.BASE_URL);
	
	exports.default = {
	    port: port,
	    socketPort: socketPort,
	    baseUrl: baseUrl || localHost + ':' + port,
	    socketUrl: (baseUrl || localHost) + ':' + socketPort
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PLX_DEFAULT_MARKET = exports.PLX_DEFAULT_MARKET = 'BTC_ETH';
	var BTX_DEFAULT_MARKET = exports.BTX_DEFAULT_MARKET = 'BTC-ETH';
	var BTX = exports.BTX = 'BTX';
	var PLX = exports.PLX = 'PLX';
	
	// todo: set these dynamically from user input
	var exchangeA = exports.exchangeA = PLX;
	var exchangeB = exports.exchangeB = BTX;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getCombinedOrderBookRequest = exports.setOrders = exports.SET_ORDERS = undefined;
	
	var _apiCaller = __webpack_require__(18);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var SET_ORDERS = exports.SET_ORDERS = 'SET_ORDERS';
	
	var setOrders = exports.setOrders = function setOrders(orders) {
	    return {
	        type: SET_ORDERS,
	        orders: orders
	    };
	};
	
	var getCombinedOrderBookRequest = exports.getCombinedOrderBookRequest = function getCombinedOrderBookRequest() {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)({ route: 'orders' }).then(function (_ref) {
	            var orders = _ref.orders;
	            return dispatch(setOrders(orders));
	        });
	    };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var buildOrdersMapReducer = exports.buildOrdersMapReducer = function buildOrdersMapReducer(result, _ref) {
	    var rate = _ref.rate,
	        exchangeKey = _ref.exchangeKey,
	        quantity = _ref.quantity,
	        sum = _ref.sum;
	
	    result.set(rate, { exchangeKey: exchangeKey, quantity: quantity, sum: sum });
	    return result;
	};
	
	var buildOrdersMap = exports.buildOrdersMap = function buildOrdersMap(orders, activeExchanges) {
	    return orders.reduce(function (result, _ref2, index) {
	        var bids = _ref2.bids,
	            asks = _ref2.asks;
	
	        var key = activeExchanges[index];
	
	        var ordersMap = new Map();
	        var bidsMap = bids.reduce(buildOrdersMapReducer, new Map());
	        var asksMap = asks.reduce(buildOrdersMapReducer, new Map());
	
	        ordersMap.set('asks', asksMap);
	        ordersMap.set('bids', bidsMap);
	        result[key] = ordersMap;
	
	        return result;
	    }, {});
	};
	
	var buildOrderWithSum = function buildOrderWithSum(order, sum) {
	    return _extends({}, buildOrder(order), { sum: sum });
	};
	
	var mergeExchanges = exports.mergeExchanges = function mergeExchanges(_ref3) {
	    var _ref4 = _slicedToArray(_ref3, 2),
	        firstDataMap = _ref4[0],
	        secondDataMap = _ref4[1];
	
	    var orders = [];
	    var sum = 0;
	    var secondDataKeys = secondDataMap.keys();
	    var secondNext = secondDataKeys.next();
	
	    firstDataMap.forEach(function (fOrder, fRate) {
	        var didMerge = false;
	        while (!secondNext.done && fRate >= secondNext.value) {
	            var sRate = secondNext.value;
	            var sOrder = secondDataMap.get(sRate);
	            if (fRate === sOrder.rate) {
	                didMerge = true;
	                var exchanges = [fOrder.exchangeKey, sOrder.exchangeKey];
	                exchanges.sort();
	                var mergedOrder = buildOrder({
	                    rate: fRate,
	                    quantity: fOrder.quantity + sOrder.quantity,
	                    exchangeKey: exchanges.join('/')
	                });
	                mergedOrder.sum = sum += mergedOrder.quantity;
	
	                orders.push(mergedOrder);
	            } else {
	                orders.push(buildOrderWithSum(_extends({}, sOrder, { rate: sRate }), sum += sOrder.quantity));
	            }
	
	            secondNext = secondDataKeys.next();
	        }
	
	        if (!didMerge) {
	            orders.push(buildOrderWithSum(_extends({}, fOrder, { rate: fRate }), sum += fOrder.quantity));
	        }
	    });
	
	    // add the end of the second array
	    while (!secondNext.done) {
	        var newOrder = secondDataMap.get(secondNext.value);
	        orders.push(buildOrderWithSum(_extends({}, newOrder, { rate: secondNext.value }), sum += newOrder.quantity));
	        secondNext = secondDataKeys.next();
	    }
	
	    return orders;
	};
	
	var mergeNewOrders = function mergeNewOrders(_ref5) {
	    var newOrders = _ref5.newOrders,
	        orders = _ref5.orders,
	        exchangeKey = _ref5.exchangeKey;
	
	    // initializing insertions to make sure sums always get updated below
	    var insertions = { asks: [], bids: [] };
	
	    var exchange = orders[exchangeKey];
	
	    newOrders.forEach(function (_ref6) {
	        var type = _ref6.type,
	            _ref6$data = _ref6.data,
	            rate = _ref6$data.rate,
	            quantity = _ref6$data.quantity,
	            exchangeKey = _ref6$data.exchangeKey,
	            orderType = _ref6$data.type;
	
	        var lookUpKey = orderType === 'ask' ? 'asks' : 'bids';
	        var side = exchange.get(lookUpKey);
	        var order = side.get(rate);
	
	        if (type === 'orderBookModify') {
	            if (order != null) {
	                order.quantity = quantity;
	
	                side.set(rate, order);
	            } else {
	                var insertionArr = insertions[lookUpKey];
	                insertionArr.push(buildOrder({
	                    quantity: quantity,
	                    rate: rate,
	                    exchangeKey: exchangeKey
	                }));
	                insertions[lookUpKey] = insertionArr;
	            }
	        } else {
	            side.delete(rate);
	        }
	
	        exchange.set(lookUpKey, side);
	    });
	
	    // insert brand new order rates in correct order and update sums
	    Object.keys(insertions).forEach(function (lookUpKey) {
	        var toInsert = insertions[lookUpKey];
	        var modifier = lookUpKey === 'ask' ? 1 : -1;
	        toInsert.sort(function (a, b) {
	            return a.rate - b.rate * modifier;
	        });
	        var side = exchange.get(lookUpKey);
	        var newSide = new Map();
	        var toInsertIndex = 0;
	        var sumCounter = 0;
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = side.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _step$value = _slicedToArray(_step.value, 2),
	                    rate = _step$value[0],
	                    value = _step$value[1];
	
	                var _ref7 = toInsert[toInsertIndex] || {},
	                    newRate = _ref7.rate,
	                    rest = _objectWithoutProperties(_ref7, ['rate']);
	
	                if (rate > newRate) {
	                    rest.sum = sumCounter += rest.quantity;
	                    newSide.set(newRate, rest);
	                    toInsertIndex++;
	                }
	
	                value.sum = sumCounter += value.quantity;
	                newSide.set(rate, value);
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	
	        exchange.set(lookUpKey, newSide);
	    });
	
	    orders[exchangeKey] = exchange;
	
	    return orders;
	};
	
	exports.mergeNewOrders = mergeNewOrders;
	var buildOrder = exports.buildOrder = function buildOrder(_ref8) {
	    var rate = _ref8.rate,
	        quantity = _ref8.quantity,
	        exchangeKey = _ref8.exchangeKey;
	
	    // only throwing these errors because I don't have time to write tests with the limited time available to me
	    if (rate == null) {
	        throw new Error('buildOrder missing data: ' + { rate: rate });
	    }
	    if (quantity == null) {
	        throw new Error('buildOrder missing data: ' + { quantity: quantity });
	    }
	    if (exchangeKey == null) {
	        throw new Error('buildOrder missing data: ' + { exchangeKey: exchangeKey });
	    }
	
	    quantity = +quantity;
	    return {
	        // rate: +(rate.toString().slice(0, 7)), // Only doing this to show off the combined exchange rows. Collisions rarely occur otherwise.
	        rate: +rate,
	        quantity: quantity,
	        exchangeKey: exchangeKey
	    };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.localizationData = exports.enabledLanguages = undefined;
	
	var _reactIntl = __webpack_require__(2);
	
	var _intl = __webpack_require__(48);
	
	var _intl2 = _interopRequireDefault(_intl);
	
	var _intlLocalesSupported = __webpack_require__(49);
	
	var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);
	
	__webpack_require__(50);
	
	var _en = __webpack_require__(58);
	
	var _en2 = _interopRequireDefault(_en);
	
	var _en3 = __webpack_require__(35);
	
	var _en4 = _interopRequireDefault(_en3);
	
	__webpack_require__(51);
	
	var _fr = __webpack_require__(59);
	
	var _fr2 = _interopRequireDefault(_fr);
	
	var _fr3 = __webpack_require__(36);
	
	var _fr4 = _interopRequireDefault(_fr3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// list of available languages
	var enabledLanguages = exports.enabledLanguages = ['en', 'fr'];
	
	// this object will have language-specific data added to it which will be placed in the state when that language is active
	// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
	var localizationData = exports.localizationData = {};
	
	// here you bring in 'intl' browser polyfill and language-specific polyfills
	// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
	// as well as react-intl's language-specific data
	// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)
	
	
	// need Intl polyfill, Intl not supported in Safari
	
	
	if (global.Intl) {
	  // Determine if the built-in `Intl` has the locale data we need.
	  if (!(0, _intlLocalesSupported2.default)(enabledLanguages)) {
	    // `Intl` exists, but it doesn't have the data we need, so load the
	    // polyfill and patch the constructors we need with the polyfill's.
	    global.Intl.NumberFormat = _intl2.default.NumberFormat;
	    global.Intl.DateTimeFormat = _intl2.default.DateTimeFormat;
	  }
	} else {
	  // No `Intl`, so use and load the polyfill.
	  global.Intl = _intl2.default;
	}
	
	// use this to allow nested messages, taken from docs:
	// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
	function flattenMessages() {
	  var nestedMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	  return Object.keys(nestedMessages).reduce(function (messages, key) {
	    var value = nestedMessages[key];
	    var prefixedKey = prefix ? prefix + '.' + key : key;
	
	    if (typeof value === 'string') {
	      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
	    } else {
	      Object.assign(messages, flattenMessages(value, prefixedKey));
	    }
	
	    return messages;
	  }, {});
	}
	
	// bring in intl polyfill, react-intl, and app-specific language data
	
	(0, _reactIntl.addLocaleData)(_en2.default);
	localizationData.en = _en4.default;
	localizationData.en.messages = flattenMessages(localizationData.en.messages);
	
	(0, _reactIntl.addLocaleData)(_fr2.default);
	localizationData.fr = _fr4.default;
	localizationData.fr.messages = flattenMessages(localizationData.fr.messages);

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.toggleAddPost = toggleAddPost;
	// Export Constants
	var TOGGLE_ADD_POST = exports.TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
	
	// Export Actions
	function toggleAddPost() {
	    return {
	        type: TOGGLE_ADD_POST
	    };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxDevtools = __webpack_require__(61);
	
	var _reduxDevtoolsLogMonitor = __webpack_require__(63);
	
	var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);
	
	var _reduxDevtoolsDockMonitor = __webpack_require__(62);
	
	var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _reduxDevtools.createDevTools)(_jsx(_reduxDevtoolsDockMonitor2.default, {
	    toggleVisibilityKey: 'ctrl-h',
	    changePositionKey: 'ctrl-w'
	}, void 0, _jsx(_reduxDevtoolsLogMonitor2.default, {})));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SWITCH_LANGUAGE = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.switchLanguage = switchLanguage;
	
	var _setup = __webpack_require__(11);
	
	// Export Constants
	var SWITCH_LANGUAGE = exports.SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';
	
	function switchLanguage(newLang) {
	    return _extends({
	        type: SWITCH_LANGUAGE
	    }, _setup.localizationData[newLang]);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _PostActions = __webpack_require__(7);
	
	// Initial State
	var initialState = { data: [] };
	
	var PostReducer = function PostReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case _PostActions.SET_ORDERS:
	            return {
	                orders: action.orders
	            };
	        default:
	            return state;
	    }
	};
	
	// Export Reducer
	exports.default = PostReducer;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	exports.PostDetailPage = PostDetailPage;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(1);
	
	var _reactHelmet = __webpack_require__(5);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _reactIntl = __webpack_require__(2);
	
	var _PostListItem = {
	    "single-post": "_3B15Q62CNe0LaxJ8BUZr5W",
	    "post-title": "_3mZF-WLrnBUxaWr9zFi6Q_",
	    "author-name": "_1cSDPptMi8rvUEB2tAonlW",
	    "post-desc": "_3D8Fgk2edKTkFyBDsUEZ2u",
	    "post-action": "_3S84cKmlvGO49pK1biPlXr",
	    "divider": "y2SIF3ydn02JYMgeklO7S",
	    "post-detail": "_3W9vrxIdnQ93EmH-x2UgJR"
	};
	
	var _PostListItem2 = _interopRequireDefault(_PostListItem);
	
	var _PostActions = __webpack_require__(7);
	
	var _PostReducer = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	    id: 'by'
	});
	
	function PostDetailPage(props) {
	    return _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	        title: props.post.title
	    }), _jsx('div', {
	        className: _PostListItem2.default['single-post'] + ' ' + _PostListItem2.default['post-detail']
	    }, void 0, _jsx('h3', {
	        className: _PostListItem2.default['post-title']
	    }, void 0, props.post.title), _jsx('p', {
	        className: _PostListItem2.default['author-name']
	    }, void 0, _ref, ' ', props.post.name), _jsx('p', {
	        className: _PostListItem2.default['post-desc']
	    }, void 0, props.post.content)));
	}
	
	// Actions required to provide data for this component to render in server side.
	PostDetailPage.need = [function (params) {
	    return (0, _PostActions.fetchPost)(params.cuid);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	    return {
	        post: (0, _PostReducer.getPost)(state, props.params.cuid)
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PostDetailPage);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(1);
	
	var _OrderTables = __webpack_require__(42);
	
	var _OrderTables2 = _interopRequireDefault(_OrderTables);
	
	var _PostActions = __webpack_require__(7);
	
	var _ServicesConstants = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PostListPage = function (_Component) {
	    _inherits(PostListPage, _Component);
	
	    function PostListPage() {
	        _classCallCheck(this, PostListPage);
	
	        return _possibleConstructorReturn(this, (PostListPage.__proto__ || Object.getPrototypeOf(PostListPage)).apply(this, arguments));
	    }
	
	    _createClass(PostListPage, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // this.props.dispatch(fetchPosts());
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, _jsx(_OrderTables2.default, {
	                staticOrders: this.props.orders,
	                activeExchanges: [_ServicesConstants.exchangeA, _ServicesConstants.exchangeB] /* this will eventually be passed in as a prop and not injected here */,
	                currencyPair: _ServicesConstants.PLX_DEFAULT_MARKET
	            }));
	        }
	    }]);
	
	    return PostListPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	PostListPage.need = [_PostActions.getCombinedOrderBookRequest];
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	    return {
	        orders: state.posts.orders
	    };
	}
	
	// PostListPage.propTypes = {
	//     orders: PropTypes.arrayOf(PropTypes.shape({
	//         name: PropTypes.string.isRequired,
	//         title: PropTypes.string.isRequired,
	//         content: PropTypes.string.isRequired,
	//     })).isRequired,
	//     showAddPost: PropTypes.bool.isRequired,
	//     dispatch: PropTypes.func.isRequired,
	// };
	
	PostListPage.contextTypes = {
	    router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PostListPage);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.API_URL = undefined;
	exports.default = callApi;
	
	var _isomorphicFetch = __webpack_require__(52);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _config = __webpack_require__(3);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* globals process */
	var API_URL = exports.API_URL = _config2.default.baseUrl + '/api';
	
	function callApi(_ref) {
	    var route = _ref.route,
	        _ref$method = _ref.method,
	        method = _ref$method === undefined ? 'get' : _ref$method,
	        body = _ref.body,
	        fullUrl = _ref.fullUrl;
	
	    return (0, _isomorphicFetch2.default)(fullUrl ? fullUrl : API_URL + '/' + route, {
	        headers: { 'content-type': 'application/json' },
	        method: method,
	        body: JSON.stringify(body)
	    }).then(function (response) {
	        return response.json().then(function (json) {
	            return { json: json, response: response };
	        });
	    }).then(function (_ref2) {
	        var json = _ref2.json,
	            response = _ref2.response;
	
	        if (!response.ok) {
	            return Promise.reject(json);
	        }
	
	        return json;
	    }).then(function (response) {
	        return response;
	    }, function (error) {
	        return error;
	    });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.transformBtxUpdate = exports.getBittrexOrderBook = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _nodeBittrexApi = __webpack_require__(53);
	
	var _nodeBittrexApi2 = _interopRequireDefault(_nodeBittrexApi);
	
	var _ServicesConstants = __webpack_require__(4);
	
	var _apiCaller = __webpack_require__(18);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _OrderUtils = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var init = function init() {
	    return new Promise(function (resolve) {
	        _nodeBittrexApi2.default.options({
	            websockets: {
	                onConnect: function onConnect() {
	                    console.log('Websocket connected');
	                    resolve(_nodeBittrexApi2.default);
	                },
	                onDisconnect: function onDisconnect() {
	                    console.log('Websocket disconnected');
	                }
	            }
	        });
	
	        _nodeBittrexApi2.default.websockets.client();
	    });
	};
	
	var bittrexInstance = void 0;
	
	var getBittrex = function getBittrex() {
	    if (bittrexInstance) {
	        return Promise.resolve(bittrexInstance);
	    } else {
	        return init().then(function (bittrex) {
	            bittrexInstance = bittrex;
	            return bittrex;
	        });
	    }
	};
	
	exports.default = getBittrex;
	
	
	var GET_ORDER_BOOK_URL = 'https://bittrex.com/api/v1.1/public/getorderbook?market=' + _ServicesConstants.BTX_DEFAULT_MARKET + '&type=both';
	
	var getBittrexOrderBook = exports.getBittrexOrderBook = function getBittrexOrderBook() {
	    return getBittrex().then(function () {
	        return (0, _apiCaller2.default)({ fullUrl: GET_ORDER_BOOK_URL }).then(function (_ref) {
	            var _ref$result = _ref.result,
	                buy = _ref$result.buy,
	                sell = _ref$result.sell;
	
	            var asks = sell.map(function (_ref2) {
	                var Quantity = _ref2.Quantity,
	                    Rate = _ref2.Rate;
	                return (0, _OrderUtils.buildOrder)({
	                    quantity: Quantity,
	                    exchangeKey: _ServicesConstants.BTX,
	                    rate: Rate
	                });
	            });
	
	            // we want to go in reverse order for bids to get the sums correct.
	            var bids = buy.reduceRight(function (result, _ref3) {
	                var Quantity = _ref3.Quantity,
	                    Rate = _ref3.Rate;
	
	                result.push((0, _OrderUtils.buildOrder)({
	                    quantity: Quantity,
	                    exchangeKey: _ServicesConstants.BTX,
	                    rate: Rate
	                }));
	                return result;
	            }, []);
	
	            return { asks: asks, bids: bids };
	        });
	    });
	};
	
	var btxOrderUpdateAdaptor = function btxOrderUpdateAdaptor(_ref4) {
	    var _ref4$updateType = _ref4.updateType,
	        updateType = _ref4$updateType === undefined ? 'orderBookModify' : _ref4$updateType,
	        OrderType = _ref4.OrderType,
	        Quantity = _ref4.Quantity,
	        Rate = _ref4.Rate,
	        type = _ref4.type;
	
	    return {
	        type: updateType,
	        orderType: OrderType,
	        data: _extends({}, (0, _OrderUtils.buildOrder)({
	            rate: Rate,
	            quantity: Quantity,
	            exchangeKey: _ServicesConstants.BTX
	        }), {
	            type: type
	        })
	    };
	};
	
	var transformBtxUpdate = exports.transformBtxUpdate = function transformBtxUpdate(data) {
	    var Fills = data.Fills,
	        Sells = data.Sells,
	        Buys = data.Buys;
	
	    var newOrders = [];
	    Fills.forEach(function (order) {
	        var newOrder = btxOrderUpdateAdaptor(order);
	        newOrders.push(_extends({}, newOrder, { type: 'bid' }));
	        newOrders.push(_extends({}, newOrder, { type: 'ask' }));
	    });
	
	    Sells.forEach(function (order) {
	        newOrders.push(btxOrderUpdateAdaptor(_extends({}, order, { type: 'bid' })));
	    });
	
	    Buys.forEach(function (order) {
	        newOrders.push(btxOrderUpdateAdaptor(_extends({}, order, { type: 'ask' })));
	    });
	    return newOrders;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.transformPlxUpdate = exports.getPoloniexOrderBook = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _ServicesConstants = __webpack_require__(4);
	
	var _OrderUtils = __webpack_require__(8);
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var init = function init() {
	    return new Promise(function (resolve) {
	        var Poloniex = __webpack_require__(54);
	
	        var poloniex = new Poloniex();
	
	        // poloniex.subscribe(1001);
	        // poloniex.subscribe(1002);
	        // poloniex.subscribe(1003);
	        poloniex.subscribe(_ServicesConstants.PLX_DEFAULT_MARKET);
	
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
	
	        poloniex.on('open', function () {
	            console.log('Poloniex WebSocket connection open');
	            resolve(poloniex);
	        });
	
	        poloniex.on('close', function (reason, details) {
	            console.log('Poloniex WebSocket connection disconnected for: (' + reason + '). Details: ' + details);
	        });
	
	        poloniex.on('error', function (error) {
	            console.log('An error has occured : ' + error);
	        });
	
	        poloniex.openWebSocket({ version: 2 });
	    });
	};
	
	var poloniexInstance = void 0;
	
	var getPoloniex = function getPoloniex() {
	    if (poloniexInstance) {
	        return Promise.resolve(poloniexInstance);
	    } else {
	        return init().then(function (poloniex) {
	            poloniexInstance = poloniex;
	            return poloniex;
	        });
	    }
	};
	
	exports.default = getPoloniex;
	var getPoloniexOrderBook = exports.getPoloniexOrderBook = function getPoloniexOrderBook() {
	    return getPoloniex().then(function (poloniex) {
	        return poloniex.returnOrderBook(_ServicesConstants.PLX_DEFAULT_MARKET, 100).then(function (orders) {
	            var asks = orders.asks.map(function (_ref) {
	                var _ref2 = _slicedToArray(_ref, 2),
	                    rate = _ref2[0],
	                    quantity = _ref2[1];
	
	                return (0, _OrderUtils.buildOrder)({
	                    rate: rate,
	                    quantity: quantity,
	                    exchangeKey: _ServicesConstants.PLX
	                });
	            });
	
	            // we want to go in reverse order for bids to get the sums correct.
	            var bids = orders.bids.reduceRight(function (result, _ref3) {
	                var _ref4 = _slicedToArray(_ref3, 2),
	                    rate = _ref4[0],
	                    quantity = _ref4[1];
	
	                result.push((0, _OrderUtils.buildOrder)({
	                    rate: rate,
	                    quantity: quantity,
	                    exchangeKey: _ServicesConstants.PLX
	                }));
	                return result;
	            }, []);
	
	            return { asks: asks, bids: bids };
	        });
	    });
	};
	
	var transformPlxUpdate = function transformPlxUpdate(newOrders) {
	    return newOrders.map(function (_ref5) {
	        var data = _ref5.data,
	            rest = _objectWithoutProperties(_ref5, ['data']);
	
	        return _extends({}, rest, {
	            data: _extends({
	                type: data.type
	            }, (0, _OrderUtils.buildOrder)({
	                rate: data.rate,
	                quantity: data.amount,
	                exchangeKey: _ServicesConstants.PLX
	            }))
	        });
	    });
	};
	exports.transformPlxUpdate = transformPlxUpdate;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IntlWrapper = IntlWrapper;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(2);
	
	var _reactRedux = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function IntlWrapper(props) {
	    return _react2.default.createElement(
	        _reactIntl.IntlProvider,
	        props.intl,
	        props.children
	    );
	}
	
	// Retrieve data from store as props
	function mapStateToProps(store) {
	    return {
	        intl: store.intl
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(IntlWrapper);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /* eslint-disable global-require */
	
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _App = __webpack_require__(37);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// require.ensure polyfill for node
	if (false) {
	    require.ensure = function requireModule(deps, callback) {
	        callback(require);
	    };
	}
	
	/* Workaround for async react routes to work with react-hot-reloader till
	  https://github.com/reactjs/react-router/issues/2182 and
	  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	    // Require async routes only in development for react-hot-reloader to work.
	    __webpack_require__(17);
	    __webpack_require__(16);
	}
	
	// react-router setup with code-splitting
	// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
	exports.default = _jsx(_reactRouter.Route, {
	    path: '/',
	    component: _App2.default
	}, void 0, _jsx(_reactRouter.IndexRoute, {
	    getComponent: function getComponent(nextState, cb) {
	        Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	            cb(null, __webpack_require__(17).default);
	        }).bind(null, __webpack_require__));
	    }
	}), _jsx(_reactRouter.Route, {
	    path: '/posts/:slug-:cuid',
	    getComponent: function getComponent(nextState, cb) {
	        Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	            cb(null, __webpack_require__(16).default);
	        }).bind(null, __webpack_require__));
	    }
	}));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.configureStore = configureStore;
	
	var _redux = __webpack_require__(21);
	
	var _reduxThunk = __webpack_require__(64);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _DevTools = __webpack_require__(13);
	
	var _DevTools2 = _interopRequireDefault(_DevTools);
	
	var _reducers = __webpack_require__(43);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global window */
	/**
	 * Main store function
	 */
	function configureStore() {
	    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    // Middleware and store enhancers
	    var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];
	
	    if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
	        // Enable DevTools only when rendering on client and during development.
	        enhancers.push(window.devToolsExtension ? window.devToolsExtension() : _DevTools2.default.instrument());
	    }
	
	    var store = (0, _redux.createStore)(_reducers2.default, initialState, _redux.compose.apply(undefined, enhancers));
	
	    // For hot reloading reducers
	    if (false) {
	        // Enable Webpack hot module replacement for reducers
	        module.hot.accept('./reducers', function () {
	            var nextReducer = require('./reducers').default; // eslint-disable-line global-require
	            store.replaceReducer(nextReducer);
	        });
	    }
	
	    return store;
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(9);
	
	var _orders = __webpack_require__(44);
	
	var router = new _express.Router();
	
	// Get all Orders
	router.route('/orders').get(_orders.getCombinedOrderBookRequest);
	
	exports.default = router;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initSockets = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _socket = __webpack_require__(65);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _PoloniexServices = __webpack_require__(20);
	
	var _PoloniexServices2 = _interopRequireDefault(_PoloniexServices);
	
	var _BittrexServices = __webpack_require__(19);
	
	var _BittrexServices2 = _interopRequireDefault(_BittrexServices);
	
	var _ServicesConstants = __webpack_require__(4);
	
	var _config = __webpack_require__(3);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var server = _socket2.default.listen(_config2.default.socketPort);
	
	// todo: use namespaces and subscriptions properly instead of this hack
	var sequenceNumberByClient = new Map();
	
	// event fired every time a new client connects:
	server.on('connection', function (socket) {
	    console.info('Client connected [id=' + socket.id + ']');
	    // initialize this client's sequence number
	    sequenceNumberByClient.set(socket, 1);
	
	    // when socket disconnects, remove it from the list:
	    socket.on('disconnect', function () {
	        sequenceNumberByClient.delete(socket);
	        console.info('Client gone [id=' + socket.id + ']');
	    });
	});
	
	var notify = function notify(event, message) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = sequenceNumberByClient.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _slicedToArray(_step.value, 1),
	                client = _step$value[0];
	
	            client.emit(event, message);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	};
	
	var initSockets = exports.initSockets = function initSockets() {
	    (0, _PoloniexServices2.default)().then(function (poloniex) {
	        poloniex.on('message', function (channelName, data, seq) {
	            if (channelName === _ServicesConstants.PLX_DEFAULT_MARKET && data[0] && data[0].type !== 'orderBook') {
	                notify(_ServicesConstants.PLX_DEFAULT_MARKET + '-' + _ServicesConstants.PLX, { data: (0, _PoloniexServices.transformPlxUpdate)(data), seq: seq });
	            }
	        });
	    });
	
	    (0, _BittrexServices2.default)().then(function (bittrex) {
	        bittrex.websockets.subscribe([_ServicesConstants.BTX_DEFAULT_MARKET], function (data) {
	            if (data.M === 'updateExchangeState') {
	                if (data.A && data.A[0]) {
	                    notify(_ServicesConstants.PLX_DEFAULT_MARKET + '-' + _ServicesConstants.BTX, { data: (0, _BittrexServices.transformBtxUpdate)(data.A[0]) });
	
	                    if (data.A[1] != null) {
	                        throw new Error('*** Assumption about Bittrex ws data structure is WRONG ***');
	                    }
	                }
	            }
	        });
	    });
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fetchComponentData = fetchComponentData;
	
	var _promiseUtils = __webpack_require__(47);
	
	function fetchComponentData(store, components, params) {
	    var needs = components.reduce(function (prev, current) {
	        return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	    }, []);
	
	    return (0, _promiseUtils.sequence)(needs, function (need) {
	        return store.dispatch(need(params, store.getState()));
	    });
	} /*
	  Utility function to fetch required data for component to render in server side.
	  This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
	  */

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var webpack = __webpack_require__(10);
	var cssnext = __webpack_require__(55);
	var postcssFocus = __webpack_require__(56);
	var postcssReporter = __webpack_require__(57);
	
	module.exports = {
	  devtool: 'cheap-module-eval-source-map',
	
	  entry: {
	    app: ['eventsource-polyfill', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/index.js'],
	    vendor: ['react', 'react-dom']
	  },
	
	  output: {
	    path: __dirname,
	    filename: 'app.js',
	    publicPath: 'http://0.0.0.0:8000/'
	  },
	
	  resolve: {
	    extensions: ['', '.js', '.jsx'],
	    modules: ['client', 'node_modules']
	  },
	
	  module: {
	    loaders: [{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
	    }, {
	      test: /\.css$/,
	      include: /node_modules/,
	      loaders: ['style-loader', 'css-loader']
	    }, {
	      test: /\.jsx*$/,
	      exclude: [/node_modules/, /.+\.config.js/],
	      loader: 'babel'
	    }, {
	      test: /\.(jpe?g|gif|png|svg)$/i,
	      loader: 'url-loader?limit=10000'
	    }, {
	      test: /\.json$/,
	      loader: 'json-loader'
	    }]
	  },
	
	  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: Infinity,
	    filename: 'vendor.js'
	  }), new webpack.DefinePlugin({
	    'process.env': {
	      CLIENT: JSON.stringify(true),
	      'NODE_ENV': JSON.stringify('development')
	    }
	  })],
	
	  postcss: function postcss() {
	    return [postcssFocus(), cssnext({
	      browsers: ['last 2 versions', 'IE > 10']
	    }), postcssReporter({
	      clearMessages: true
	    })];
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'en',
	  messages: {
	    siteTitle: 'BTC_ETH Combined Order Books'
	  }
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'fr',
	  messages: {
	    siteTitle: 'MERN blog de démarrage',
	    addPost: 'Ajouter Poster',
	    switchLanguage: 'Changer de langue',
	    twitterMessage: 'Nous sommes sur Twitter',
	    by: 'Par',
	    deletePost: 'Supprimer le message',
	    createNewPost: 'Créer un nouveau message',
	    authorName: 'Nom de l\'auteur',
	    postTitle: 'Titre de l\'article',
	    postContent: 'Contenu après',
	    submit: 'Soumettre',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} (in real app this would be translated to French)',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t} (in real app this would be translated to French)',
	    nestedDateComment: 'user {name} {value, plural,\n  \t\t  =0 {does not have any comments}\n  \t\t  =1 {has # comment}\n  \t\t  other {has # comments}\n  \t\t} as of {date} (in real app this would be translated to French)'
	  }
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.App = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(1);
	
	var _App = {
	    "container": "_4uEyKcd5WHob5qPzotT7"
	};
	
	var _App2 = _interopRequireDefault(_App);
	
	var _reactHelmet = __webpack_require__(5);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _DevTools = __webpack_require__(13);
	
	var _DevTools2 = _interopRequireDefault(_DevTools);
	
	var _Header = __webpack_require__(40);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _Footer = __webpack_require__(39);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _AppActions = __webpack_require__(12);
	
	var _IntlActions = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals window process */
	
	
	var _ref = _jsx(_DevTools2.default, {});
	
	var _ref2 = _jsx(_Footer2.default, {});
	
	var App = exports.App = function (_Component) {
	    _inherits(App, _Component);
	
	    function App(props) {
	        _classCallCheck(this, App);
	
	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	
	        _this.toggleAddPostSection = function () {
	            _this.props.dispatch((0, _AppActions.toggleAddPost)());
	        };
	
	        _this.state = { showDevTools: false };
	        return _this;
	    }
	
	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.setState({ showDevTools: !window.devToolsExtension && process.env.NODE_ENV === 'development' });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return _jsx('div', {}, void 0, this.state.showDevTools && _ref, _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	                title: 'MERN Starter - Blog App',
	                titleTemplate: '%s - Blog App',
	                meta: [{ charset: 'utf-8' }, {
	                    'http-equiv': 'X-UA-Compatible',
	                    content: 'IE=edge'
	                }, {
	                    name: 'viewport',
	                    content: 'width=device-width, initial-scale=1'
	                }]
	            }), _jsx(_Header2.default, {
	                switchLanguage: function switchLanguage(lang) {
	                    return _this2.props.dispatch((0, _IntlActions.switchLanguage)(lang));
	                },
	                intl: this.props.intl,
	                toggleAddPost: this.toggleAddPostSection
	            }), _jsx('div', {
	                className: _App2.default.container
	            }, void 0, this.props.children), _ref2));
	        }
	    }]);
	
	    return App;
	}(_react.Component);
	
	// Retrieve data from store as props
	function mapStateToProps(store) {
	    return {
	        intl: store.intl
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getShowAddPost = undefined;
	
	var _AppActions = __webpack_require__(12);
	
	// Initial State
	var initialState = {
	    showAddPost: false
	}; // Import Actions
	
	
	var AppReducer = function AppReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case _AppActions.TOGGLE_ADD_POST:
	            return {
	                showAddPost: !state.showAddPost
	            };
	
	        default:
	            return state;
	    }
	};
	
	/* Selectors */
	
	// Get showAddPost
	var getShowAddPost = exports.getShowAddPost = function getShowAddPost(state) {
	    return state.app.showAddPost;
	};
	
	// Export Reducer
	exports.default = AppReducer;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	// Import Images
	
	
	exports.Footer = Footer;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(2);
	
	var _Footer = {
	    "footer": "_3vPEi87A1wyh1iLR3bsBGf"
	};
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _headerBk = '/' + "bbaeb5f32b7042f0def39648a1d111b9.png";
	
	var _headerBk2 = _interopRequireDefault(_headerBk);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx('p', {}, void 0, '\xA9 2016 \xB7 Hashnode \xB7 LinearBytes Inc.');
	
	var _ref2 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'twitterMessage'
	}), ' : ', _jsx('a', {
	    href: 'https://twitter.com/@mern_io',
	    target: '_Blank'
	}, void 0, '@mern_io'));
	
	function Footer() {
	    return _jsx('div', {
	        style: { background: '#FFF url(' + _headerBk2.default + ') center' },
	        className: _Footer2.default.footer
	    }, void 0, _ref, _ref2);
	}
	
	exports.default = Footer;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	exports.Header = Header;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactIntl = __webpack_require__(2);
	
	var _Header = {
	    "header": "_2sEZYfHlvDy9uXqVIXG1aM",
	    "content": "_1eavAvnySzoZc5rld6Q4pa",
	    "site-title": "UfFn6muOcOBjkVI5_yltp",
	    "add-post-button": "CkTz6a2gQTJjwXIEAlTSk",
	    "language-switcher": "_3bviQya5ZWCvWr6lGdfO9h",
	    "selected": "_3IRlmCpgSZBcTGVIGHvgaI"
	};
	
	var _Header2 = _interopRequireDefault(_Header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx(_reactRouter.Link, {
	    to: '/'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'siteTitle'
	}));
	
	function Header() {
	    return _jsx('div', {
	        className: _Header2.default.header
	    }, void 0, _jsx('div', {
	        className: _Header2.default.content
	    }, void 0, _jsx('h1', {
	        className: _Header2.default['site-title']
	    }, void 0, _ref)));
	}
	
	exports.default = Header;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _setup = __webpack_require__(11);
	
	var _IntlActions = __webpack_require__(14);
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var initLocale = global.navigator && global.navigator.language || 'en';
	
	var initialState = _extends({
	    locale: initLocale,
	    enabledLanguages: _setup.enabledLanguages
	}, _setup.localizationData[initLocale] || {});
	
	var IntlReducer = function IntlReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case _IntlActions.SWITCH_LANGUAGE:
	            {
	                var type = action.type,
	                    actionWithoutType = _objectWithoutProperties(action, ['type']); // eslint-disable-line
	
	
	                return _extends({}, state, actionWithoutType);
	            }
	
	        default:
	            return state;
	    }
	};
	
	exports.default = IntlReducer;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _recompose = __webpack_require__(60);
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _socket = __webpack_require__(66);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _OrderUtils = __webpack_require__(8);
	
	var _config = __webpack_require__(3);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref2 = _jsx('thead', {}, void 0, _jsx('tr', {}, void 0, _jsx('th', {
	    scope: 'col'
	}, void 0, 'sum'), _jsx('th', {
	    scope: 'col'
	}, void 0, 'rate'), _jsx('th', {
	    scope: 'col'
	}, void 0, 'quantity'), _jsx('th', {
	    scope: 'col'
	}, void 0, 'exchange')));
	
	var OrderTable = function OrderTable(_ref) {
	    var ordersBody = _ref.ordersBody,
	        title = _ref.title,
	        className = _ref.className,
	        sum = _ref.sum;
	
	    return _jsx('div', {
	        className: className
	    }, void 0, _jsx('h2', {
	        style: { float: 'left' }
	    }, void 0, title), _jsx('h3', {
	        style: { float: 'right' }
	    }, void 0, 'Total: ' + sum), _jsx('table', {
	        className: 'table table-sm table-striped table-bordered font-size-h6'
	    }, void 0, _ref2, _jsx('tbody', {}, void 0, ordersBody)));
	};
	
	function OrderTables(_ref3) {
	    var asksBody = _ref3.asksBody,
	        bidsBody = _ref3.bidsBody,
	        asksSum = _ref3.asksSum,
	        bidsSum = _ref3.bidsSum;
	
	    return _jsx('div', {
	        className: 'row'
	    }, void 0, _jsx(OrderTable, {
	        className: 'col-6',
	        ordersBody: asksBody,
	        sum: asksSum,
	        title: 'Asks'
	    }), _jsx(OrderTable, {
	        className: 'col-6',
	        ordersBody: bidsBody,
	        sum: bidsSum,
	        title: 'Bids'
	    }));
	}
	
	var buildRow = function buildRow(_ref4) {
	    var rate = _ref4.rate,
	        exchangeKey = _ref4.exchangeKey,
	        quantity = _ref4.quantity,
	        sum = _ref4.sum;
	
	    return _jsx('tr', {}, rate + '-' + quantity, _jsx('td', {}, void 0, sum.toString().slice(0, 8)), _jsx('td', {}, void 0, rate.toString().slice(0, 8)), _jsx('td', {}, void 0, quantity.toString().slice(0, 8)), _jsx('td', {}, void 0, exchangeKey));
	};
	
	exports.default = (0, _recompose.compose)(
	// avoiding redux round trip for expected speed gains. Also, showing off what I know about recompose.
	(0, _recompose.withState)('orders', 'setOrders', function (_ref5) {
	    var staticOrders = _ref5.staticOrders,
	        activeExchanges = _ref5.activeExchanges;
	    return (0, _OrderUtils.buildOrdersMap)(staticOrders, activeExchanges);
	}), (0, _recompose.withProps)(function (_ref6) {
	    var setOrders = _ref6.setOrders,
	        orders = _ref6.orders,
	        activeExchanges = _ref6.activeExchanges;
	
	    var asks = (0, _OrderUtils.mergeExchanges)(activeExchanges.map(function (key) {
	        return orders[key].get('asks');
	    }));
	    var bids = (0, _OrderUtils.mergeExchanges)(activeExchanges.map(function (key) {
	        return orders[key].get('bids');
	    }));
	
	    return {
	        updateOrders: function updateOrders(newOrders, exchangeKey) {
	            setOrders((0, _OrderUtils.mergeNewOrders)({ newOrders: newOrders, orders: orders, exchangeKey: exchangeKey }));
	        },
	        asksBody: asks.slice(0, 50).map(buildRow),
	        asksSum: asks[asks.length - 1].sum.toString().slice(0, 8),
	        bidsBody: bids.slice(0, 50).map(buildRow),
	        bidsSum: bids[bids.length - 1].sum.toString().slice(0, 8)
	    };
	}), (0, _recompose.lifecycle)({
	    componentDidMount: function componentDidMount() {
	        var _props = this.props,
	            updateOrders = _props.updateOrders,
	            activeExchanges = _props.activeExchanges,
	            currencyPair = _props.currencyPair;
	
	        var socket = (0, _socket2.default)(_config2.default.socketUrl);
	
	        activeExchanges.forEach(function (exchangeKey) {
	            socket.on(currencyPair + '-' + exchangeKey, function (msg) {
	                // console.info(JSON.stringify(msg, null, 2));
	                updateOrders(msg.data, exchangeKey);
	            });
	        });
	    }
	}))(OrderTables);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _redux = __webpack_require__(21);
	
	var _AppReducer = __webpack_require__(38);
	
	var _AppReducer2 = _interopRequireDefault(_AppReducer);
	
	var _PostReducer = __webpack_require__(15);
	
	var _PostReducer2 = _interopRequireDefault(_PostReducer);
	
	var _IntlReducer = __webpack_require__(41);
	
	var _IntlReducer2 = _interopRequireDefault(_IntlReducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Combine all reducers into one root reducer
	/**
	 * Root Reducer
	 */
	exports.default = (0, _redux.combineReducers)({
	    app: _AppReducer2.default,
	    posts: _PostReducer2.default,
	    intl: _IntlReducer2.default
	});
	
	// Import Reducers

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getCombinedOrderBookRequest = getCombinedOrderBookRequest;
	
	var _CombinedExchangeServices = __webpack_require__(46);
	
	function getCombinedOrderBookRequest(req, res) {
	    (0, _CombinedExchangeServices.getCombinedOrderBook)().then(function (orders) {
	        res.json({ orders: orders });
	    }).catch(function (err) {
	        res.status(500).send(err);
	    });
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Webpack Requirements
	
	
	var _express = __webpack_require__(9);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(30);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _bodyParser = __webpack_require__(29);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _path = __webpack_require__(31);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _IntlWrapper = __webpack_require__(22);
	
	var _IntlWrapper2 = _interopRequireDefault(_IntlWrapper);
	
	var _SocketService = __webpack_require__(26);
	
	var _webpack = __webpack_require__(10);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _webpackConfig = __webpack_require__(28);
	
	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);
	
	var _webpackDevMiddleware = __webpack_require__(33);
	
	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);
	
	var _webpackHotMiddleware = __webpack_require__(34);
	
	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);
	
	var _store = __webpack_require__(24);
	
	var _reactRedux = __webpack_require__(1);
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(32);
	
	var _reactRouter = __webpack_require__(6);
	
	var _reactHelmet = __webpack_require__(5);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _routes = __webpack_require__(23);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _fetchData = __webpack_require__(27);
	
	var _order = __webpack_require__(25);
	
	var _order2 = _interopRequireDefault(_order);
	
	var _config = __webpack_require__(3);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Initialize the Express App
	var app = new _express2.default();
	
	// Set Development modes checks
	var isDevMode = process.env.NODE_ENV === 'development' || false;
	var isProdMode = process.env.NODE_ENV === 'production' || false;
	
	// Run Webpack dev server in development mode
	if (isDevMode) {
	    var compiler = (0, _webpack2.default)(_webpackConfig2.default);
	    app.use((0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: _webpackConfig2.default.output.publicPath }));
	    app.use((0, _webpackHotMiddleware2.default)(compiler));
	}
	
	// React And Redux Setup
	
	
	// Import required modules
	
	
	// Apply body Parser and server public assets and routes
	app.use((0, _compression2.default)());
	app.use(_bodyParser2.default.json({ limit: '20mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist/client')));
	app.use('/api', _order2.default);
	
	// Render Initial HTML
	var renderFullPage = function renderFullPage(html, initialState) {
	    var head = _reactHelmet2.default.rewind();
	
	    // Import Manifests
	    var assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
	    var chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);
	
	    return '\n    <!doctype html>\n    <html>\n      <head>\n        ' + head.base.toString() + '\n        ' + head.title.toString() + '\n        ' + head.meta.toString() + '\n        ' + head.link.toString() + '\n        ' + head.script.toString() + '\n\n        ' + (isProdMode ? '<link rel=\'stylesheet\' href=\'' + assetsManifest['/app.css'] + '\' />' : '') + '\n        <link href=\'https://fonts.googleapis.com/css?family=Lato:400,300,700\' rel=\'stylesheet\' type=\'text/css\'/>\n        <link href=\'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\' rel=\'stylesheet\' type=\'text/css\'/>\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + ';\n          ' + (isProdMode ? '//<![CDATA[\n          window.webpackManifest = ' + JSON.stringify(chunkManifest) + ';\n          //]]>' : '') + '\n        </script>\n        <script src=\'' + (isProdMode ? assetsManifest['/vendor.js'] : '/vendor.js') + '\'></script>\n        <script src=\'' + (isProdMode ? assetsManifest['/app.js'] : '/app.js') + '\'></script>\n      </body>\n    </html>\n  ';
	};
	
	var renderError = function renderError(err) {
	    var softTab = '&#32;&#32;&#32;&#32;';
	    var errTrace = isProdMode ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
	    return renderFullPage('Server Error' + errTrace, {});
	};
	
	// Server Side Rendering based on routes matched by React-router.
	app.use(function (req, res, next) {
	    (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirectLocation, renderProps) {
	        if (err) {
	            return res.status(500).end(renderError(err));
	        }
	
	        if (redirectLocation) {
	            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	        }
	
	        if (!renderProps) {
	            return next();
	        }
	
	        var store = (0, _store.configureStore)();
	
	        return (0, _fetchData.fetchComponentData)(store, renderProps.components, renderProps.params).then(function () {
	            var initialView = (0, _server.renderToString)(_jsx(_reactRedux.Provider, {
	                store: store
	            }, void 0, _jsx(_IntlWrapper2.default, {}, void 0, _react2.default.createElement(_reactRouter.RouterContext, renderProps))));
	            var finalState = store.getState();
	
	            res.set('Content-Type', 'text/html').status(200).end(renderFullPage(initialView, finalState));
	        }).catch(function (error) {
	            return next(error);
	        });
	    });
	});
	
	// start app
	app.listen(_config2.default.port, function (error) {
	    if (!error) {
	        console.log('MERN is running on port: ' + _config2.default.port + '! Build something amazing!'); // eslint-disable-line
	    }
	});
	
	(0, _SocketService.initSockets)();
	
	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getCombinedOrderBook = getCombinedOrderBook;
	
	var _PoloniexServices = __webpack_require__(20);
	
	var _BittrexServices = __webpack_require__(19);
	
	function getCombinedOrderBook() {
	    return Promise.all([(0, _PoloniexServices.getPoloniexOrderBook)(), (0, _BittrexServices.getBittrexOrderBook)()])
	    // .then(([firstData, secondData]) => {
	    //     const asks = mergeNewOrders(firstData.asks, secondData.asks);
	    //     const bids = mergeNewOrders(firstData.bids, secondData.bids);
	    //     return Promise.resolve({asks, bids});
	    // })
	    .catch(function (err) {
	        return console.log(err);
	    });
	}

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.sequence = sequence;
	/**
	 * Throw an array to it and a function which can generate promises
	 * and it will call them sequentially, one after another
	 */
	function sequence(items, consumer) {
	    var results = [];
	    var runner = function runner() {
	        var item = items.shift();
	        if (item) {
	            return consumer(item).then(function (result) {
	                results.push(result);
	            }).then(runner);
	        }
	
	        return Promise.resolve(results);
	    };
	
	    return runner();
	}

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("intl");

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("intl-locales-supported");

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/en");

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/fr");

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("node-bittrex-api");

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("poloniex-api-node");

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = require("postcss-focus");

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("postcss-reporter");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/en");

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/fr");

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = require("recompose");

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools");

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-dock-monitor");

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-log-monitor");

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = require("socket.io-client");

/***/ }
/******/ ]);