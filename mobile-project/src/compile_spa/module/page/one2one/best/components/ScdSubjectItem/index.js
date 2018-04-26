define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
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
    var ScdSubjectItem = function (_React$Component) {
        _inherits(ScdSubjectItem, _React$Component);
        function ScdSubjectItem(props) {
            _classCallCheck(this, ScdSubjectItem);
            var _this = _possibleConstructorReturn(this, (ScdSubjectItem.__proto__ || Object.getPrototypeOf(ScdSubjectItem)).call(this, props));
            _this.state = { item: {} };
            return _this;
        }
        _createClass(ScdSubjectItem, [
            {
                key: 'clickHandler',
                value: function clickHandler(item) {
                    _reactRouter.hashHistory.push('one2one/best/se/search?subject_id=' + item.id);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var data = self.props.item;
                    var subjectComponet = data.child.map(function (item) {
                        return _react2.default.createElement('span', {
                            className: 'item',
                            key: item.name,
                            onClick: self.clickHandler.bind(this, item)
                        }, item.name);
                    });
                    return _react2.default.createElement('div', { className: 'scd-subject-item' }, _react2.default.createElement('div', { className: 'title' }, data.name), _react2.default.createElement('div', { className: 'detail' }, subjectComponet));
                }
            }
        ]);
        return ScdSubjectItem;
    }(_react2.default.Component);
    exports.default = ScdSubjectItem;
});