define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('compile_spa/common/components/SubjectChoose/index');
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
    var Subject = function (_React$Component) {
        _inherits(Subject, _React$Component);
        function Subject(props) {
            _classCallCheck(this, Subject);
            var _this = _possibleConstructorReturn(this, (Subject.__proto__ || Object.getPrototypeOf(Subject)).call(this, props));
            _this.state = { selected: _this.props.selected };
            _this.confirmSubject = _this.confirmSubject.bind(_this);
            return _this;
        }
        _createClass(Subject, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ selected: nextProps.selected });
                }
            },
            {
                key: 'confirmSubject',
                value: function confirmSubject(data) {
                    if (typeof this.props.callback === 'function') {
                        this.props.callback(data);
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: this.props.show ? 'subject-content' : 'subject-content hide' }, _react2.default.createElement(_index2.default, {
                        cssType: 'mask',
                        selected: this.state.selected,
                        callback: this.confirmSubject
                    }));
                }
            }
        ]);
        return Subject;
    }(_react2.default.Component);
    Subject.propTypes = {
        show: _react.PropTypes.number.isRequired,
        selected: _react.PropTypes.array.isRequired,
        callback: _react.PropTypes.func.isRequired
    };
    exports.default = Subject;
});