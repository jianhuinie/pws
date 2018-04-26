define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('../../../components/FailPage/index');
    var _analysis = require('compile_spa/common/util/analysis');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _analysis2 = _interopRequireDefault(_analysis);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function FailPage() {
        _analysis2.default.pgv();
        return _react2.default.createElement(_index2.default, {
            title: '抱歉\uFF0C您暂时无权限查看此页面',
            reason: '只有通过优选1对1审核的老师才能查看\uFF0C优选1对1招募名额不定期开放\uFF0C请关注老师端APP的招募通知哦',
            serviceTitle: '如有问题请随时联系客服\uFF1A4000-910-910'
        });
    }
    ;
    exports.default = FailPage;
});