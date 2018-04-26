define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var $ = require('zepto');
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
    var Suggestion = function (_React$Component) {
        _inherits(Suggestion, _React$Component);
        function Suggestion(props) {
            _classCallCheck(this, Suggestion);
            var _this = _possibleConstructorReturn(this, (Suggestion.__proto__ || Object.getPrototypeOf(Suggestion)).call(this, props));
            _this.onSelected = _this.onSelected.bind(_this);
            _this.state = { isOpen: false };
            return _this;
        }
        _createClass(Suggestion, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var me = this;
                    $(document.body).on('click', function () {
                        me.setState({ isOpen: false });
                    });
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps() {
                    var isOpen = false;
                    if (Array.isArray(this.props.dataSource) && this.props.dataSource.length) {
                        isOpen = true;
                    }
                    this.setState({ isOpen: isOpen });
                }
            },
            {
                key: 'onSelected',
                value: function onSelected(event) {
                    var target = $(event.target);
                    if (typeof this.props.onSelectedHandler === 'function') {
                        this.props.onSelectedHandler({
                            value: target.data('val'),
                            title: target.text()
                        });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', {
                        className: 'suggestion ' + this.props.className + ' ' + (this.state.isOpen ? '' : 'hidden'),
                        onClick: this.onSelected
                    }, this.props.dataSource && this.props.dataSource.map(function (item) {
                        return _react2.default.createElement('div', {
                            key: item.value,
                            className: 'item',
                            'data-val': item.value
                        }, item.title);
                    }));
                }
            }
        ]);
        return Suggestion;
    }(_react2.default.Component);
    Suggestion.propTypes = {
        dataSource: _react.PropTypes.array,
        onSelectedHandler: _react.PropTypes.func.isRequired,
        className: _react.PropTypes.string
    };
    Suggestion.defaultProps = {
        dataSource: null,
        className: ''
    };
    ;
    exports.default = Suggestion;
});