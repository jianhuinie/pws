define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('compile_spa/common/components/ResultTips/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function SuccInfo() {
        return _react2.default.createElement('div', { className: 'sign-result-success' }, _react2.default.createElement(_index2.default, { title: '恭喜您\uFF0C已签约成功' }), _react2.default.createElement('p', { className: 'intro' }, '您已成为优选1对1签约老师\uFF0C1对1页面已升级\uFF0C您可以去PC网页查看并补充信息哦'));
    }
    exports.default = SuccInfo;
});