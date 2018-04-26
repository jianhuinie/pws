define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('common/components/RichEditor/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
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
    var RichEditorIndex = function (_PageController) {
        _inherits(RichEditorIndex, _PageController);
        function RichEditorIndex() {
            _classCallCheck(this, RichEditorIndex);
            var _this = _possibleConstructorReturn(this, (RichEditorIndex.__proto__ || Object.getPrototypeOf(RichEditorIndex)).call(this));
            _this.onContentChange = function (editorList) {
                console.log(editorList);
            };
            _this.state = {
                editorList: [
                    {
                        type: 'title',
                        options: { text: 'hello kitty' }
                    },
                    {
                        type: 'body',
                        options: {
                            text: 'hello tom',
                            fontWeight: 'normal',
                            fontSize: '15px',
                            textAlign: 'left',
                            color: '#000000'
                        }
                    },
                    {
                        type: 'photo',
                        options: {
                            storageId: '121212',
                            url: 'https://imgs.genshuixue.com/2018/4/6806e65c3b.png',
                            referUrl: 'asasa'
                        }
                    },
                    {
                        type: 'video',
                        options: {
                            storageId: 'qqqwq',
                            coverUrl: 'https://imgs.genshuixue.com/2018/4/6806e65c3b.png'
                        }
                    },
                    {
                        type: 'audio',
                        options: {
                            storageId: 'qqqwq',
                            url: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57b693e1e3815.png'
                        }
                    }
                ]
            };
            return _this;
        }
        _createClass(RichEditorIndex, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: 'rich-editor-container' }, _react2.default.createElement(_index2.default, {
                        editorList: self.state.editorList,
                        onContentChange: self.onContentChange
                    }));
                }
            }]);
        return RichEditorIndex;
    }(_PageController3.default);
    exports.default = RichEditorIndex;
});