define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
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
    var Title = function (_PageController) {
        _inherits(Title, _PageController);
        function Title() {
            var _ref;
            var _temp, _this, _ret;
            _classCallCheck(this, Title);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Title.__proto__ || Object.getPrototypeOf(Title)).call.apply(_ref, [this].concat(args))), _this), _this.onTextChange = function (e) {
                var newVal = e.target.value;
                var self = _this;
                self.props.onContentChange({
                    index: self.props.index,
                    curItem: {
                        uniqueId: self.props.uniqueId,
                        type: 'title',
                        options: { text: newVal }
                    }
                });
            }, _this.onDeleteItem = function (e) {
                var flag = false;
                if (_this.props.options.text) {
                    flag = true;
                }
                _this.props.onDeleteItem(+e.currentTarget.dataset.index, flag);
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(Title, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', {
                        className: 'editor-title editor-item',
                        'data-index': self.props.index
                    }, _react2.default.createElement('i', { className: 'icon icon-item icon-text' }), _react2.default.createElement('input', {
                        className: 'title-input',
                        value: self.props.options.text,
                        placeholder: '编辑段落标题\uFF0C最多10个字',
                        maxLength: '10',
                        onChange: self.onTextChange
                    }), _react2.default.createElement('span', {
                        type: 'close',
                        className: 'icon-close',
                        'data-index': self.props.index,
                        onClick: self.onDeleteItem
                    }));
                }
            }]);
        return Title;
    }(_PageController3.default);
    ;
    exports.default = Title;
});