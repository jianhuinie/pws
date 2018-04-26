define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _index = require('common/components/CourseSearch/index');
    var _CommonController2 = require('common/controller/CommonController');
    var _index3 = require('./SeriesTable/index');
    var _url = require('common/util/url');
    var _util = require('common/util/util');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _index4 = _interopRequireDefault(_index3);
    var _url2 = _interopRequireDefault(_url);
    var _util2 = _interopRequireDefault(_util);
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
    var SeriesList = function (_CommonController) {
        _inherits(SeriesList, _CommonController);
        function SeriesList(props) {
            _classCallCheck(this, SeriesList);
            var _this = _possibleConstructorReturn(this, (SeriesList.__proto__ || Object.getPrototypeOf(SeriesList)).call(this, props));
            _this.handleSearch = function (value) {
                _this.setState({ query: value });
            };
            _this.state = { query: undefined };
            return _this;
        }
        _createClass(SeriesList, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    _util2.default.renderLeftSider();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var url = (0, _url2.default)();
                    url.params.seriesId = undefined;
                    url.hash = '#/series/edit';
                    return _react2.default.createElement('div', { className: 'series-list' }, _react2.default.createElement(_antd.Breadcrumb, null, _react2.default.createElement(_antd.Breadcrumb.Item, null, (0, _url2.default)().params.name), _react2.default.createElement(_antd.Breadcrumb.Item, null, '课程管理'), _react2.default.createElement(_antd.Breadcrumb.Item, null, '系列课')), _react2.default.createElement('div', { className: 'series-list-operation' }, _react2.default.createElement('div', { className: 'series-list-operation-add' }, _react2.default.createElement(_antd.Button, { className: 'classic-btn pink-btn series-list-operation-add-button' }, _react2.default.createElement('a', { href: url.toString() }, '新建系列课'))), _react2.default.createElement(_index2.default, {
                        onCourseSearch: this.handleSearch,
                        placeholder: '输入课程名称'
                    })), _react2.default.createElement(_index4.default, { search: this.state.query }));
                }
            }
        ]);
        return SeriesList;
    }(_CommonController3.default);
    exports.default = SeriesList;
});