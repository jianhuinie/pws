define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _config = require('common/config');
    var _reactRouter = require('react-router');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _config2 = _interopRequireDefault(_config);
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
    var classroomHash = '#/classroom';
    var LeftSider = function (_React$Component) {
        _inherits(LeftSider, _React$Component);
        function LeftSider(props) {
            _classCallCheck(this, LeftSider);
            var _this = _possibleConstructorReturn(this, (LeftSider.__proto__ || Object.getPrototypeOf(LeftSider)).call(this, props));
            _this.getSecondMenu = function (data) {
                var isInclude = data.some(function (item) {
                    var activeItem = new RegExp(item.path);
                    return activeItem.test(location.hash);
                });
                var secondListComponet = data.map(function (item) {
                    var activeItem = new RegExp(item.path);
                    var isCurrentPage = activeItem.test(location.hash);
                    return _react2.default.createElement('li', {
                        className: isCurrentPage ? 'second-sider-name active cursor path-tab' : 'second-sider-name cursor path-tab',
                        'data-path': item.path,
                        key: item.name
                    }, _react2.default.createElement('span', { className: item.icon }), item.name);
                });
                return _react2.default.createElement('ul', { className: isInclude ? 'second-sider-name' : 'second-sider-name hide' }, secondListComponet);
            };
            _this.clickMenu = function (e) {
                var ele = $(e.target);
                if (e.target.tagName === 'SPAN') {
                    ele = ele.parent();
                }
                var path = ele.data('path');
                if (ele.hasClass('cursor')) {
                    if (path) {
                        if (ele.hasClass('active')) {
                            window.location.reload();
                        } else {
                            _reactRouter.hashHistory.push(path);
                        }
                    } else {
                        var secondEle = ele.next();
                        if (secondEle.hasClass('hide')) {
                            secondEle.removeClass('hide');
                        } else {
                            secondEle.addClass('hide');
                        }
                    }
                }
            };
            _this.state = {};
            return _this;
        }
        _createClass(LeftSider, [{
                key: 'render',
                value: function render() {
                    var self = this;
                    var isClassroom = location.hash === classroomHash;
                    var menu = isClassroom ? _config2.default.COURSE_MENU : _config2.default.MENU;
                    var listComponet = menu.map(function (item) {
                        var html = void 0;
                        if (item.children && item.children.length) {
                            html = _react2.default.createElement('div', {
                                className: 'sider-name',
                                key: item.name
                            }, _react2.default.createElement('div', { className: 'cursor path-tab' }, _react2.default.createElement('span', { className: item.icon }), item.name, _react2.default.createElement('span', { className: 'icon-title-packup-nor' })), self.getSecondMenu(item.children));
                        } else {
                            var isCurrentPage = item.path === location.hash.substr(1);
                            html = _react2.default.createElement('div', {
                                className: isCurrentPage ? 'sider-name active cursor path-tab' : 'sider-name cursor path-tab',
                                'data-path': item.path,
                                key: item.name
                            }, _react2.default.createElement('span', { className: item.icon }), item.name);
                        }
                        return html;
                    });
                    return _react2.default.createElement('div', {
                        className: 'nav-page',
                        onClick: self.clickMenu
                    }, listComponet);
                }
            }]);
        return LeftSider;
    }(_react2.default.Component);
    ;
    exports.default = LeftSider;
});