define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _CommonController2 = require('common/controller/CommonController');
    var _ajaxService = require('common/util/ajaxService');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
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
    var SubjectSelect = function (_CommonController) {
        _inherits(SubjectSelect, _CommonController);
        function SubjectSelect(props) {
            _classCallCheck(this, SubjectSelect);
            var _this = _possibleConstructorReturn(this, (SubjectSelect.__proto__ || Object.getPrototypeOf(SubjectSelect)).call(this, props));
            _this.handleMainSubjectChange = function (value) {
                _this.setState({
                    firstId: value,
                    secondId: undefined,
                    thirdId: undefined
                });
                _this.getNextSubjects('second', value);
            };
            _this.getNextSubjects = function (type, value) {
                _ajaxService2.default.get('/pc/subject/list', { subjectId: value }).then(function (res) {
                    var subjects = res.data.subjects;
                    if (type === 'second') {
                        _this.setState({ secondSubject: subjects });
                    } else {
                        _this.setState({ thirdSubject: subjects });
                    }
                });
            };
            _this.handleSecondSubjectChange = function (value) {
                _this.setState({
                    secondId: value,
                    thirdId: undefined
                });
                _this.getNextSubjects('third', value);
                _this.props.onChange(value);
            };
            _this.handleThirdSubjectChange = function (value) {
                _this.setState({ thirdId: value });
                _this.props.onChange(value);
            };
            _this.state = {
                mainSubject: [],
                secondSubject: [],
                thirdSubject: [],
                firstId: props.firstId,
                secondId: props.secondId,
                thirdId: props.thirdId
            };
            return _this;
        }
        _createClass(SubjectSelect, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var me = this;
                    if (nextProps.firstId && nextProps.firstId !== me.props.firstId || nextProps.secondId && nextProps.secondId !== me.props.secondId || nextProps.thirdId && nextProps.thirdId !== me.props.thirdId) {
                        me.setState({
                            firstId: nextProps.firstId,
                            secondId: nextProps.secondId,
                            thirdId: nextProps.thirdId
                        });
                        this.getNextSubjects('second', nextProps.firstId);
                        this.getNextSubjects('third', nextProps.secondId);
                    }
                }
            },
            {
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;
                    _ajaxService2.default.get('/pc/subject/list', { subjectId: 0 }).then(function (res) {
                        var subjects = res.data.subjects;
                        _this2.setState({ mainSubject: subjects });
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var Option = _antd.Select.Option;
                    return _react2.default.createElement('div', { className: 'subject-select' }, _react2.default.createElement(_antd.Select, {
                        className: 'subject-select-content',
                        placeholder: this.props.placeholder,
                        dropdownClassName: 'subject-select-content-item',
                        onChange: this.handleMainSubjectChange,
                        getPopupContainer: function getPopupContainer(triggerNode) {
                            return triggerNode.parentNode;
                        },
                        value: this.state.firstId,
                        notFoundContent: '无'
                    }, this.state.mainSubject.map(function (item) {
                        return _react2.default.createElement(Option, {
                            value: item.id,
                            key: item.id
                        }, item.name);
                    })), _react2.default.createElement(_antd.Select, {
                        className: 'subject-select-content',
                        placeholder: this.props.placeholder,
                        dropdownClassName: 'subject-select-content-item',
                        onChange: this.handleSecondSubjectChange,
                        getPopupContainer: function getPopupContainer(triggerNode) {
                            return triggerNode.parentNode;
                        },
                        value: this.state.secondId,
                        notFoundContent: '无'
                    }, this.state.secondSubject.map(function (item) {
                        return _react2.default.createElement(Option, {
                            value: item.id,
                            key: item.id
                        }, item.name);
                    })), _react2.default.createElement(_antd.Select, {
                        className: 'subject-select-content',
                        placeholder: this.props.placeholder,
                        dropdownClassName: 'subject-select-content-item',
                        onChange: this.handleThirdSubjectChange,
                        getPopupContainer: function getPopupContainer(triggerNode) {
                            return triggerNode.parentNode;
                        },
                        value: this.state.thirdId,
                        notFoundContent: '无'
                    }, this.state.thirdSubject.map(function (item) {
                        return _react2.default.createElement(Option, {
                            value: item.id,
                            key: item.id
                        }, item.name);
                    })));
                }
            }
        ]);
        return SubjectSelect;
    }(_CommonController3.default);
    SubjectSelect.defaultProps = {
        defaultFirstValue: undefined,
        defaultSecondValue: undefined,
        placeholder: '请选择分类'
    };
    exports.default = SubjectSelect;
});