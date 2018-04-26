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
    var LevelOne = function (_React$Component) {
        _inherits(LevelOne, _React$Component);
        function LevelOne(props) {
            _classCallCheck(this, LevelOne);
            var _this = _possibleConstructorReturn(this, (LevelOne.__proto__ || Object.getPrototypeOf(LevelOne)).call(this, props));
            _this.state = {
                index: _this.props.index,
                name: '',
                level1: _this.props.level1
            };
            return _this;
        }
        _createClass(LevelOne, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({
                        level1: nextProps.level1,
                        index: nextProps.index
                    });
                }
            },
            {
                key: 'subjectOne',
                value: function subjectOne(item) {
                    this.setState({ index: +item.value });
                    if (typeof this.props.callback === 'function') {
                        this.props.callback({ value: +item.value });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: this.props.cssType === 'all' ? 'left-content-all' : 'left-content' }, self.state.level1.map(function (item) {
                        return _react2.default.createElement('div', {
                            className: self.state.index === Number(item.value) ? 'subject-item-active' : 'subject-item-normal',
                            onClick: self.subjectOne.bind(self, item),
                            key: item.value
                        }, item.name);
                    }));
                }
            }
        ]);
        return LevelOne;
    }(_react2.default.Component);
    LevelOne.propTypes = {
        index: _react.PropTypes.number.isRequired,
        level1: _react.PropTypes.array.isRequired,
        callback: _react.PropTypes.func.isRequired,
        cssType: _react.PropTypes.string.isRequired
    };
    exports.default = LevelOne;
});