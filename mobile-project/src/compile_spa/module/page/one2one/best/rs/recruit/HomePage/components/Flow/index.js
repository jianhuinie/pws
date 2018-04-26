define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('./Item/index');
    var _index3 = require('../StepTitle/index');
    var _config = require('../../config');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _config2 = _interopRequireDefault(_config);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function Rights() {
        return _react2.default.createElement('div', { className: 'recruit-home-rights' }, _react2.default.createElement(_index4.default, { title: '只需4步加入优选1对1' }), _config2.default.FLOW_ITEMS.map(function (item) {
            return _react2.default.createElement(_index2.default, {
                key: item.index,
                index: item.index,
                title: item.title,
                subTitle: item.subTitle
            });
        }));
    }
    exports.default = Rights;
});