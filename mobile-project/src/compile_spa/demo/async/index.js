define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var service = require('common/service');
    (require('compile_spa/common/polyfill'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        }
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }
                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step('next', value);
                        }, function (err) {
                            step('throw', err);
                        });
                    }
                }
                return step('next');
            });
        };
    }
    var getStockPriceByName = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            var symbol, stockPrice;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return service.post('/area/list', {});
                    case 2:
                        symbol = _context.sent;
                        _context.next = 5;
                        return service.post('/article/support', {});
                    case 5:
                        stockPrice = _context.sent;
                        return _context.abrupt('return', symbol + stockPrice);
                    case 7:
                    case 'end':
                        return _context.stop();
                    }
                }
            }, _callee, this);
        }));
        return function getStockPriceByName() {
            return _ref.apply(this, arguments);
        };
    }();
    var AsyncDemo = function (_React$Component) {
        _inherits(AsyncDemo, _React$Component);
        function AsyncDemo(props) {
            _classCallCheck(this, AsyncDemo);
            var _this = _possibleConstructorReturn(this, (AsyncDemo.__proto__ || Object.getPrototypeOf(AsyncDemo)).call(this, props));
            _this.state = { childDom: _react2.default.createElement('span', null, 'hello') };
            return _this;
        }
        _createClass(AsyncDemo, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    getStockPriceByName().then(function () {
                        _this2.setState({ childDom: _react2.default.createElement('div', null, 'hello world') });
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', null, this.state.childDom);
                }
            }
        ]);
        return AsyncDemo;
    }(_react2.default.Component);
    exports.default = AsyncDemo;
    ;
});