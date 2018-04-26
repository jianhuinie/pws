define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('./LevelTwoItem/index');
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
    var LevelTwo = function (_React$Component) {
        _inherits(LevelTwo, _React$Component);
        function LevelTwo(props) {
            _classCallCheck(this, LevelTwo);
            var _this = _possibleConstructorReturn(this, (LevelTwo.__proto__ || Object.getPrototypeOf(LevelTwo)).call(this, props));
            _this.state = {
                level2: _this.props.level2,
                finalIndex: _this.props.selected[2]
            };
            _this.getFinalIndex = _this.getFinalIndex.bind(_this);
            return _this;
        }
        _createClass(LevelTwo, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({
                        level2: nextProps.level2,
                        finalIndex: nextProps.selected[2]
                    });
                }
            },
            {
                key: 'getFinalIndex',
                value: function getFinalIndex(data) {
                    this.setState({ finalIndex: +data.index });
                    if (typeof this.props.callback === 'function') {
                        this.props.callback(data);
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: this.props.cssType === 'all' ? 'right-content-all' : 'right-content' }, self.state.level2.map(function (item) {
                        return _react2.default.createElement(_index2.default, {
                            key: item.value,
                            item: item,
                            finalIndex: self.state.finalIndex,
                            callback: self.getFinalIndex
                        });
                    }));
                }
            }
        ]);
        return LevelTwo;
    }(_react2.default.Component);
    LevelTwo.propTypes = {
        level2: _react.PropTypes.array.isRequired,
        callback: _react.PropTypes.func.isRequired,
        cssType: _react.PropTypes.string.isRequired,
        selected: _react.PropTypes.array.isRequired
    };
    exports.default = LevelTwo;
});