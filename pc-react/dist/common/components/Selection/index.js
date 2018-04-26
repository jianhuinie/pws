define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = Selection;
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function Selection(props) {
        var Option = _antd.Select.Option;
        return _react2.default.createElement('div', { className: 'selection' }, _react2.default.createElement(_antd.Select, {
            className: 'selection-content',
            placeholder: props.placeholder,
            dropdownClassName: 'seletion-content-item',
            onChange: props.onSelectionChange,
            getPopupContainer: function getPopupContainer(triggerNode) {
                return triggerNode.parentNode;
            },
            defaultValue: props.defaultValue
        }, props.options.map(function (item) {
            return _react2.default.createElement(Option, {
                value: item.id,
                key: item.id
            }, item.name);
        })));
    }
});