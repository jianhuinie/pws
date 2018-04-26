define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('compile_spa/common/components/TAppDownload/index');
    var _index3 = require('compile_spa/common/components/ResultTips/index');
    var _analysis = require('compile_spa/common/util/analysis');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _analysis2 = _interopRequireDefault(_analysis);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function SuccPage() {
        _analysis2.default.pgv();
        return _react2.default.createElement('div', { className: 'recruit-page-success' }, _react2.default.createElement(_index4.default, { title: '已成功报名\uFF0C等待跟谁学审核' }), _react2.default.createElement('div', { className: 'body' }, _react2.default.createElement('p', { className: 'title' }, '首批仅1000个名额\uFF0C我们会审核以下信息\uFF0C请您重新检查信息以便提高通过几率哦'), _react2.default.createElement('div', { className: 'item' }, _react2.default.createElement('p', null, '1\u3001视频\u3001图片\u3001过往经历\u3001教学经历是否填写完整\uFF0C且有亮点'), _react2.default.createElement('p', null, '2\u3001常用教学地点是否正确'), _react2.default.createElement('p', null, '3\u3001可用授课时间是否更新'), _react2.default.createElement('p', null, '4\u3001一对一不同上课方式的价格是否更新'))), _react2.default.createElement(_index2.default, null));
    }
    exports.default = SuccPage;
});