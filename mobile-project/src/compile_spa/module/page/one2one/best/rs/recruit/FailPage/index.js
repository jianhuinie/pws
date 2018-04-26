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
            title: '抱歉\uFF0C您的报名审核没有通过',
            reason: '由于一期名额限制等原因\uFF0C本次审核暂时没有通过\uFF0C请您耐心等待后续名额开放哦~',
            serviceTitle: '如有问题请随时联系客服\uFF1A4000-910-910'
        });
    }
    ;
    exports.default = FailPage;
});