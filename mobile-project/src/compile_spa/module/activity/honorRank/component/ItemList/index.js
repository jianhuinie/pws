define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('./ItemCard/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
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
    var ItemListContainer = function (_React$Component) {
        _inherits(ItemListContainer, _React$Component);
        function ItemListContainer(props) {
            _classCallCheck(this, ItemListContainer);
            var _this = _possibleConstructorReturn(this, (ItemListContainer.__proto__ || Object.getPrototypeOf(ItemListContainer)).call(this, props));
            _this.state = { list: [] };
            return _this;
        }
        _createClass(ItemListContainer, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ list: nextProps.list });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var list = this.state.list;
                    var type = this.props.type;
                    return _react2.default.createElement('div', { className: 'box-list' }, list.map(function (item, index) {
                        return _react2.default.createElement(_index2.default, {
                            key: item.rank_order + type,
                            item: item,
                            type: type
                        });
                    }));
                }
            }
        ]);
        return ItemListContainer;
    }(_react2.default.Component);
    ItemListContainer.propTypes = {
        list: _react.PropTypes.array.isRequired,
        type: _react.PropTypes.string.isRequired
    };
    ;
    exports.default = ItemListContainer;
});