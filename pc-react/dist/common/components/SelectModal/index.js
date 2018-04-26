define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = SelectModal;
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function SelectModal(props) {
        return _react2.default.createElement(_antd.Modal, {
            footer: null,
            visible: props.isShow,
            onCancel: props.onModalClose,
            className: 'select-modal ' + props.className,
            title: props.title,
            closable: props.closable !== undefined ? props.closable : true,
            maskClosable: props.maskClosable !== undefined ? props.maskClosable : true
        }, props.children);
    }
});