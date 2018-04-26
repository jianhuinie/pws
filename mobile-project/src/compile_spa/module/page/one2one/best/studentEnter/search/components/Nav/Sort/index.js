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
    var Sort = function (_React$Component) {
        _inherits(Sort, _React$Component);
        function Sort(props) {
            _classCallCheck(this, Sort);
            var _this = _possibleConstructorReturn(this, (Sort.__proto__ || Object.getPrototypeOf(Sort)).call(this, props));
            _this.state = { index: _this.props.sortWayIndex };
            return _this;
        }
        _createClass(Sort, [
            {
                key: 'chooseSort',
                value: function chooseSort(item) {
                    var data = {
                        sortName: item.name,
                        id: item.id
                    };
                    this.setState({ index: item.id });
                    if (typeof this.props.callback === 'function') {
                        this.props.callback(data);
                    }
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ index: nextProps.sortWayIndex });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: this.props.show ? 'sort-content' : 'sort-content hide' }, this.props.sortWayArray.map(function (item, index) {
                        return _react2.default.createElement('div', {
                            className: 'item',
                            onClick: self.chooseSort.bind(self, item),
                            key: index
                        }, _react2.default.createElement('span', { className: self.state.index === item.id ? 'text text-active' : 'text' }, item.name), _react2.default.createElement('i', { className: self.state.index === item.id ? 'icon icon-checkmark' : 'icon icon-checkmark hide' }));
                    }));
                }
            }
        ]);
        return Sort;
    }(_react2.default.Component);
    Sort.propTypes = {
        callback: _react.PropTypes.func.isRequired,
        sortWayIndex: _react.PropTypes.string.isRequired,
        sortWayArray: _react.PropTypes.array.isRequired,
        show: _react.PropTypes.number.isRequired
    };
    exports.default = Sort;
});