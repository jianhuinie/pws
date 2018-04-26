define(function (require, exports) {
    'use strict';
    var _react = require('react');
    (require('css-loader!./index.styl'))
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
    var LevelTwoItem = function (_React$Component) {
        _inherits(LevelTwoItem, _React$Component);
        function LevelTwoItem(props) {
            _classCallCheck(this, LevelTwoItem);
            var _this = _possibleConstructorReturn(this, (LevelTwoItem.__proto__ || Object.getPrototypeOf(LevelTwoItem)).call(this, props));
            _this.state = {
                item: {
                    name: _this.props.item.name,
                    value: _this.props.item.value,
                    children: _this.props.item.children
                },
                index: _this.props.finalIndex
            };
            return _this;
        }
        _createClass(LevelTwoItem, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var item = nextProps.item;
                    if (!item.children) {
                        item.children = [];
                    }
                    this.setState({
                        item: item,
                        index: nextProps.finalIndex
                    });
                }
            },
            {
                key: 'chooseSubjectItem',
                value: function chooseSubjectItem(item) {
                    this.setState({ index: +item.value });
                    if (typeof this.props.callback === 'function') {
                        this.props.callback({
                            index: +item.value,
                            name: item.name
                        });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: 'level-two-content' }, _react2.default.createElement('div', { className: 'first-line' }, _react2.default.createElement('span', { className: 'line' }), _react2.default.createElement('span', { className: 'subject-name' }, self.state.item.name)), _react2.default.createElement('div', { className: 'second-line' }, self.state.item.children.map(function (item, index) {
                        if (item.name !== '全部') {
                            return _react2.default.createElement('span', {
                                key: index,
                                onClick: self.chooseSubjectItem.bind(self, item),
                                className: self.state.index === +item.value ? 'subject-item-active' : 'subject-item-noraml'
                            }, item.name);
                        }
                    })));
                }
            }
        ]);
        return LevelTwoItem;
    }(_react2.default.Component);
    LevelTwoItem.propTypes = {
        item: _react.PropTypes.object.isRequired,
        finalIndex: _react.PropTypes.number.isRequired,
        callback: _react.PropTypes.func.isRequired
    };
    exports.default = LevelTwoItem;
});