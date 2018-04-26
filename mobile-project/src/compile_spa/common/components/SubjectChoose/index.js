define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('./LevelOne/index');
    var _index3 = require('./LevelTwo/index');
    var service = require('common/service');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
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
    var Subject = function (_React$Component) {
        _inherits(Subject, _React$Component);
        function Subject(props) {
            _classCallCheck(this, Subject);
            var _this = _possibleConstructorReturn(this, (Subject.__proto__ || Object.getPrototypeOf(Subject)).call(this, props));
            _this.state = {
                selected: _this.props.selected,
                level1: [],
                level2: []
            };
            _this.getLevelOneId = _this.getLevelOneId.bind(_this);
            _this.getList = _this.getList.bind(_this);
            _this.confirmSubject = _this.confirmSubject.bind(_this);
            return _this;
        }
        _createClass(Subject, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ selected: nextProps.selected });
                    if (+nextProps.selected[0]) {
                        this.getList(nextProps.selected[0]);
                    }
                }
            },
            {
                key: 'getLevelOneId',
                value: function getLevelOneId(data) {
                    var selected = this.state.selected;
                    selected[0] = +data.value;
                    this.setState({ selected: selected });
                    this.getList(+data.value);
                }
            },
            {
                key: 'getList',
                value: function getList() {
                    var _this2 = this;
                    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                    var self = this;
                    service.post('/preferredOneOnOne/choiceSubject', { level1_id: id }).then(function (res) {
                        if (+res.code === 0) {
                            var data = res.data;
                            var lists = data.list;
                            var hasSelected = _this2.state.selected;
                            lists.forEach(function (item, index) {
                                if (item.name === '全部') {
                                    lists.splice(index, 1);
                                }
                            });
                            if (+id === 0) {
                                _this2.setState({ level1: lists });
                                var chooseValue = lists[0].value;
                                _this2.getList(chooseValue);
                                hasSelected[0] = chooseValue;
                                self.setState({ selected: hasSelected });
                            } else {
                                _this2.setState({ level2: data.list });
                            }
                        }
                    });
                }
            },
            {
                key: 'confirmSubject',
                value: function confirmSubject(data) {
                    if (typeof this.props.callback === 'function') {
                        this.props.callback(data);
                    }
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var index = 0;
                    this.getList(index);
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: this.props.cssType === 'all' ? 'filter-parent-all' : 'filter-parent' }, _react2.default.createElement('div', { className: 'course' }, _react2.default.createElement(_index2.default, {
                        cssType: this.props.cssType,
                        level1: this.state.level1,
                        index: +this.state.selected[0],
                        callback: this.getLevelOneId
                    }), _react2.default.createElement(_index4.default, {
                        cssType: this.props.cssType,
                        level2: this.state.level2,
                        selected: this.state.selected,
                        callback: this.confirmSubject
                    })));
                }
            }
        ]);
        return Subject;
    }(_react2.default.Component);
    Subject.propTypes = {
        selected: _react.PropTypes.array.isRequired,
        callback: _react.PropTypes.func.isRequired,
        cssType: _react.PropTypes.string.isRequired
    };
    exports.default = Subject;
});