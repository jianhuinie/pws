define(function (require, exports) {
    'use strict';
    var _react = require('react');
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
    var Body = function (_PageController) {
        _inherits(Body, _PageController);
        function Body(props) {
            _classCallCheck(this, Body);
            var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));
            _this.onContentChange = function (key, val) {
                var self = _this;
                var obj = {
                    text: self.state.text,
                    fontWeight: self.state.fontWeight,
                    fontSize: self.state.fontSize,
                    textAlign: self.state.textAlign,
                    color: self.state.color
                };
                obj[key] = val;
                self.props.onContentChange({
                    index: self.props.index,
                    curItem: {
                        uniqueId: self.props.uniqueId,
                        type: 'body',
                        options: obj
                    }
                });
            };
            _this.onTextChange = function (e) {
                var newVal = e.target.value;
                var self = _this;
                self.setState({ text: newVal });
                self.onContentChange('text', newVal);
            };
            _this.onColorChange = function (e) {
                var self = _this;
                var color = e.target.dataset.color;
                if (color && color !== self.state.color) {
                    self.setState({ color: color });
                    self.onContentChange('color', color);
                }
            };
            _this.setTextAlign = function (e) {
                var self = _this;
                var align = e.target.dataset.align;
                if (align && align !== self.state.textAlign) {
                    self.setState({ textAlign: align });
                    self.onContentChange('textAlign', align);
                }
            };
            _this.setFontWeight = function () {
                var self = _this;
                var fontWeight = self.state.fontWeight;
                if (fontWeight === 'bold') {
                    fontWeight = 'normal';
                } else {
                    fontWeight = 'bold';
                }
                self.setState({ fontWeight: fontWeight });
                self.onContentChange('fontWeight', fontWeight);
            };
            _this.setFontSize = function () {
                var self = _this;
                var fontSize = self.state.fontSize;
                if (fontSize === '17px') {
                    fontSize = '15px';
                } else {
                    fontSize = '17px';
                }
                self.setState({ fontSize: fontSize });
                self.onContentChange('fontSize', fontSize);
            };
            _this.onDeleteItem = function (e) {
                var flag = false;
                if (_this.state.text) {
                    flag = true;
                }
                _this.props.onDeleteItem(+e.currentTarget.dataset.index, flag);
            };
            _this.state = {
                text: '',
                fontWeight: 'normal',
                fontSize: '15px',
                textAlign: 'left',
                color: '#000000'
            };
            return _this;
        }
        _createClass(Body, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    if (self.props.options.text) {
                        var options = this.props.options;
                        self.setState({
                            text: options.text,
                            fontWeight: options.fontWeight,
                            fontSize: options.fontSize,
                            textAlign: options.textAlign,
                            color: options.color
                        });
                    }
                }
            },
            {
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
                    return _react2.default.createElement('div', {
                        className: 'editor-body editor-item',
                        'data-index': self.props.index
                    }, _react2.default.createElement('i', { className: 'icon icon-item icon-text-o' }), _react2.default.createElement('textarea', {
                        className: colorClassMap[self.state.color] + (self.state.fontWeight === 'bold' ? ' font-bold' : '') + (self.state.fontSize === '17px' ? ' font-big' : '') + (self.state.textAlign === 'center' ? ' align-center' : ''),
                        type: 'textarea',
                        value: self.state.text,
                        placeholder: '编辑正文',
                        onChange: self.onTextChange
                    }), _react2.default.createElement('span', {
                        className: 'icon-close',
                        'data-index': self.props.index,
                        onClick: self.onDeleteItem
                    }), _react2.default.createElement('div', { className: 'style-toolbar' }, _react2.default.createElement('span', {
                        className: 'toolbar-item icon-bold' + (self.state.fontWeight === 'bold' ? ' active' : ''),
                        onClick: self.setFontWeight
                    }), _react2.default.createElement('span', {
                        className: 'toolbar-item icon-font' + (self.state.fontSize === '17px' ? ' active' : ''),
                        onClick: self.setFontSize
                    }), _react2.default.createElement('span', {
                        className: 'toolbar-item icon-align-left' + (self.state.textAlign === 'left' ? ' active' : ''),
                        'data-align': 'left',
                        onClick: self.setTextAlign
                    }), _react2.default.createElement('span', {
                        className: 'toolbar-item icon-align-center' + (self.state.textAlign === 'center' ? ' active' : ''),
                        'data-align': 'center',
                        onClick: self.setTextAlign
                    }), _react2.default.createElement('ul', {
                        className: 'color-list',
                        onClick: self.onColorChange
                    }, _react2.default.createElement('li', {
                        className: 'color-item black' + (self.state.color === '#000000' ? ' active' : ''),
                        'data-color': '#000000'
                    }), _react2.default.createElement('li', {
                        className: 'color-item grey' + (self.state.color === '#999999' ? ' active' : ''),
                        'data-color': '#999999'
                    }), _react2.default.createElement('li', {
                        className: 'color-item pink' + (self.state.color === '#FC5C5A' ? ' active' : ''),
                        'data-color': '#FC5C5A'
                    }), _react2.default.createElement('li', {
                        className: 'color-item yellow' + (self.state.color === '#FF6C00' ? ' active' : ''),
                        'data-color': '#FF6C00'
                    }), _react2.default.createElement('li', {
                        className: 'color-item blue' + (self.state.color === '#0F86E8' ? ' active' : ''),
                        'data-color': '#0F86E8'
                    }), _react2.default.createElement('li', {
                        className: 'color-item green' + (self.state.color === '#43B244' ? ' active' : ''),
                        'data-color': '#43B244'
                    }), _react2.default.createElement('li', {
                        className: 'color-item brown' + (self.state.color === '#3D618A' ? ' active' : ''),
                        'data-color': '#3D618A'
                    }), _react2.default.createElement('li', {
                        className: 'color-item purple' + (self.state.color === '#9900CC' ? ' active' : ''),
                        'data-color': '#9900CC'
                    }))));
                }
            }
        ]);
        return Body;
    }(_PageController3.default);
    ;
    exports.default = Body;
});