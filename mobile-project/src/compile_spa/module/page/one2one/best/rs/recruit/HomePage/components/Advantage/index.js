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
    function Advantage() {
        return _react2.default.createElement('div', { className: 'recruit-home-advantage' }, _react2.default.createElement(_index4.default, { title: '优选1对1的优势' }), _config2.default.ADVANTAGE_ITEMS.map(function (item) {
            return _react2.default.createElement(_index2.default, {
                key: item.id,
                imgUrl: item.url,
                title: item.title,
                subTitle: item.subTitle
            });
        }));
    }
    exports.default = Advantage;
});