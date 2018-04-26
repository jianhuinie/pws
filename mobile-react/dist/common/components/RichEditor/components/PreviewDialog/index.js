define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _PageController2 = require('common/controller/PageController');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        }
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var PreviewDialog = function (_PageController) {
        _inherits(PreviewDialog, _PageController);
        function PreviewDialog() {
            _classCallCheck(this, PreviewDialog);
            return _possibleConstructorReturn(this, (PreviewDialog.__proto__ || Object.getPrototypeOf(PreviewDialog)).apply(this, arguments));
        }
        _createClass(PreviewDialog, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    var colorClassMap = {
                        '#000000': 'black',
                        '#999999': 'grey',
                        '#FC5C5A': 'pink',
                        '#FF6C00': 'yellow',
                        '#0F86E8': 'blue',
                        '#43B244': 'green',
                        '#3D618A': 'brown',
                        '#9900CC': 'purple'
                    };
                    return _react2.default.createElement('div', null, _react2.default.createElement(_antd.Modal, {
                        visible: self.props.showDialog,
                        closable: false,
                        footer: null,
                        width: 780,
                        wrapClassName: 'preview-dialog'
                    }, _react2.default.createElement('div', {
                        className: 'exit-btn',
                        onClick: self.props.onExit
                    }, '退出预览'), _react2.default.createElement('div', { className: 'preview-content' }, self.props.editorList.map(function (item) {
                        var curItem = void 0;
                        switch (item.type) {
                        case 'title':
                            curItem = _react2.default.createElement('div', {
                                className: 'preview-title',
                                key: item.uniqueId
                            }, item.options.text);
                            break;
                        case 'body':
                            curItem = _react2.default.createElement('div', {
                                key: item.uniqueId,
                                className: 'preview-body ' + colorClassMap[item.options.color] + (item.options.fontWeight === 'bold' ? ' font-bold' : '') + (item.options.fontSize === '17px' ? ' font-big' : '') + (item.options.textAlign === 'center' ? ' align-center' : '')
                            }, item.options.text);
                            break;
                        case 'photo':
                            curItem = _react2.default.createElement('div', {
                                className: 'preview-photo',
                                key: item.uniqueId
                            }, _react2.default.createElement('img', { src: item.options.url }));
                            break;
                        case 'video':
                            curItem = _react2.default.createElement('div', {
                                className: 'preview-video',
                                key: item.uniqueId
                            }, _react2.default.createElement('span', { className: 'video-icon' }), _react2.default.createElement('img', { src: item.options.coverUrl }));
                            break;
                        case 'audio':
                            curItem = _react2.default.createElement('div', {
                                className: 'preview-audio',
                                key: item.uniqueId
                            }, _react2.default.createElement('span', { className: 'voice-icon' }), _react2.default.createElement('img', { src: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57b693e1e3815.png' }));
                            break;
                        default:
                            break;
                        }
                        return curItem;
                    }))));
                }
            }]);
        return PreviewDialog;
    }(_PageController3.default);
    ;
    exports.default = PreviewDialog;
});