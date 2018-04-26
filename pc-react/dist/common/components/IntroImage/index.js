define(function (require, exports) {
    'use strict';
    var _react = require('react');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = IntroImage;
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function IntroImage(props) {
        return _react2.default.createElement('div', { className: 'intro-image' }, _react2.default.createElement('img', {
            src: props.url,
            alt: 'tag',
            className: 'intro-image-picture'
        }), _react2.default.createElement('a', {
            onClick: function onClick() {
                props.onDelete(props.seq);
            },
            className: 'intro-image-delete'
        }, _react2.default.createElement('span', { className: 'icon-carousel-delete' }, _react2.default.createElement('span', { className: 'path1' }), _react2.default.createElement('span', { className: 'path2' }))));
    }
});