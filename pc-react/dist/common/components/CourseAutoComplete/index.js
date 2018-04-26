define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _CommonController2 = require('common/controller/CommonController');
    var _ajaxService = require('common/util/ajaxService');
    var _url = require('common/util/url');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    var _url2 = _interopRequireDefault(_url);
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
    var CourseAutoComplete = function (_CommonController) {
        _inherits(CourseAutoComplete, _CommonController);
        function CourseAutoComplete(props) {
            _classCallCheck(this, CourseAutoComplete);
            var _this = _possibleConstructorReturn(this, (CourseAutoComplete.__proto__ || Object.getPrototypeOf(CourseAutoComplete)).call(this, props));
            _this.handleSearch = function (query) {
                var self = _this;
                if (!self.props.type) {
                    _antd.message.error('请选择课程类型');
                    return;
                }
                _ajaxService2.default.get('/pc/course/getOptions', {
                    classroomId: Number((0, _url2.default)().params.classroomId),
                    query: query,
                    type: _this.props.type
                }).then(function (res) {
                    var courses = res.data.courses || [];
                    _this.setState({
                        dataSource: courses.map(function (item) {
                            return {
                                value: item.courseId + ' ' + item.name,
                                text: item.name
                            };
                        })
                    });
                });
            };
            _this.handleSelect = function (value) {
                _this.setState({ courseName: value.split(' ')[1] });
                _this.props.onChange(value);
            };
            _this.handleInputChange = function (value) {
                _this.props.onDelete && _this.props.onDelete(value);
            };
            _this.inputFocus = function () {
                var self = _this;
                self.handleSearch(null);
            };
            _this.state = {
                dataSource: [],
                courseName: props.defaultName
            };
            return _this;
        }
        _createClass(CourseAutoComplete, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var me = this;
                    if (nextProps.defaultName !== me.props.defaultName) {
                        me.setState({ courseName: nextProps.defaultName });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement(_antd.AutoComplete, {
                        dataSource: this.state.dataSource,
                        onSelect: this.handleSelect,
                        onSearch: this.handleSearch,
                        onChange: this.handleInputChange,
                        onFocus: self.inputFocus,
                        placeholder: this.props.tip,
                        value: this.state.courseName,
                        className: 'carousel-auto-complete',
                        getPopupContainer: function getPopupContainer(triggerNode) {
                            return triggerNode;
                        }
                    });
                }
            }
        ]);
        return CourseAutoComplete;
    }(_CommonController3.default);
    CourseAutoComplete.propTypes = {
        onChange: _react.PropTypes.func,
        onClear: _react.PropTypes.func,
        type: _react.PropTypes.number,
        defaultName: _react.PropTypes.string,
        tip: _react.PropTypes.string
    };
    exports.default = CourseAutoComplete;
});