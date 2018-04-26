define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = IntroTextArea;
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function IntroTextArea(props) {
        var TextArea = _antd.Input.TextArea;
        return _react2.default.createElement('div', { className: 'intro-text-area' }, _react2.default.createElement(TextArea, {
            defaultValue: props.defaultValue,
            onChange: function onChange(e) {
                props.onChange(props.seq, e.target.value);
            },
            className: 'intro-text-area-input'
        }), _react2.default.createElement('a', {
            onClick: function onClick() {
                props.onDelete(props.seq);
            },
            className: 'intro-text-area-operate'
        }, _react2.default.createElement('span', { className: 'icon-Combined-Shape' })));
    }
});