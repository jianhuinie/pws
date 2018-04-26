define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('./Subject/index');
    var _index3 = require('./LessonWay/index');
    var _index5 = require('./Sort/index');
    var _index7 = require('./Choose/index');
    var _index9 = require('./NavItem/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
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
    var Nav = function (_React$Component) {
        _inherits(Nav, _React$Component);
        function Nav(props) {
            _classCallCheck(this, Nav);
            var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));
            _this.state = {
                subJect: '',
                lessonWay: '不限',
                sortWay: '智能排序',
                choose: '筛选',
                navStatus: [
                    'normal',
                    'normal',
                    'normal',
                    'normal'
                ],
                showContent: [
                    0,
                    0,
                    0,
                    0
                ],
                iconStatus: [
                    'icon-caret-down2',
                    'icon-caret-down2',
                    'icon-caret-down2',
                    'icon-caret-down2'
                ],
                sortWayArray: [],
                lessonWayArray: [],
                chooseObj: _this.props.chooseObject,
                courseObject: _this.props.courseObject,
                maskStatus: 0,
                params: {
                    subject_id: 0,
                    lesson_way: 0,
                    sort: 'all',
                    sex: 0,
                    school_age: 0,
                    price_range: 0
                }
            };
            _this.lessonWayFunc = _this.lessonWayFunc.bind(_this);
            _this.sortFunc = _this.sortFunc.bind(_this);
            _this.chooseFunc = _this.chooseFunc.bind(_this);
            _this.subjectFunc = _this.subjectFunc.bind(_this);
            _this.clickMask = _this.clickMask.bind(_this);
            return _this;
        }
        _createClass(Nav, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var subJectName = '';
                    var selectedName = nextProps.courseObject.selected_name;
                    var selectedNameLength = selectedName.length;
                    if (selectedNameLength) {
                        subJectName = selectedName[selectedNameLength - 1];
                    }
                    this.setState({
                        subJect: subJectName,
                        lessonWay: nextProps.lessonWayName,
                        sortWay: nextProps.sortWayName,
                        lessonWayArray: nextProps.lessonWayArray,
                        sortWayArray: nextProps.sortWayArray,
                        chooseObj: nextProps.chooseObject,
                        courseObject: nextProps.courseObject,
                        params: nextProps.params
                    });
                }
            },
            {
                key: 'clickItem',
                value: function clickItem(index) {
                    var self = this;
                    var navStatus = this.state.navStatus;
                    var iconStatus = this.state.iconStatus;
                    var showContent = this.state.showContent;
                    var maskStatus = this.state.maskStatus;
                    for (var i = 0; i < navStatus.length; i++) {
                        if (i !== index) {
                            showContent[i] = 0;
                            if (navStatus[i] !== 'choosed') {
                                navStatus[i] = 'normal';
                                iconStatus[i] = 'icon-caret-down2';
                            }
                        }
                    }
                    if (showContent[index]) {
                        showContent[index] = 0;
                    } else {
                        showContent[index] = 1;
                    }
                    if (navStatus[index] === 'active') {
                        navStatus[index] = 'normal';
                        iconStatus[index] = 'icon-caret-down2';
                        maskStatus = 0;
                    } else if (navStatus[index] === 'normal') {
                        navStatus[index] = 'active';
                        iconStatus[index] = 'icon-caret-up2';
                        maskStatus = 1;
                    } else if (navStatus[index] === 'choosed') {
                        if (maskStatus && !showContent[index]) {
                            maskStatus = 0;
                        } else {
                            maskStatus = 1;
                        }
                    }
                    self.setState({
                        navStatus: navStatus,
                        iconStatus: iconStatus,
                        maskStatus: maskStatus,
                        showContent: showContent
                    });
                }
            },
            {
                key: 'lessonWayFunc',
                value: function lessonWayFunc(data) {
                    var navStatus = this.state.navStatus;
                    var iconStatus = this.state.iconStatus;
                    var showContent = this.state.showContent;
                    showContent[1] = 0;
                    var params = this.state.params;
                    params.lesson_way = +data.value;
                    if (+data.value) {
                        navStatus[1] = 'choosed';
                        iconStatus[1] = 'icon-caret-down2 icon-choosed';
                    } else {
                        navStatus[1] = 'normal';
                        iconStatus[1] = 'icon-caret-down2';
                    }
                    this.setState({
                        navStatus: navStatus,
                        iconStatus: iconStatus,
                        maskStatus: 0,
                        params: params
                    });
                    if (typeof this.props.callback === 'function') {
                        this.props.callback(params);
                    }
                }
            },
            {
                key: 'sortFunc',
                value: function sortFunc(data) {
                    var navStatus = this.state.navStatus;
                    var iconStatus = this.state.iconStatus;
                    var showContent = this.state.showContent;
                    showContent[2] = 0;
                    var params = this.state.params;
                    params.sort = data.id;
                    if (data.id === 'all') {
                        navStatus[2] = 'normal';
                        iconStatus[2] = 'icon-caret-down2';
                    } else {
                        navStatus[2] = 'choosed';
                        iconStatus[2] = 'icon-caret-down2 icon-choosed';
                    }
                    this.setState({
                        navStatus: navStatus,
                        iconStatus: iconStatus,
                        maskStatus: 0,
                        params: params
                    });
                    if (typeof this.props.callback === 'function') {
                        this.props.callback(params);
                    }
                }
            },
            {
                key: 'chooseFunc',
                value: function chooseFunc(data) {
                    var navStatus = this.state.navStatus;
                    var iconStatus = this.state.iconStatus;
                    var showContent = this.state.showContent;
                    showContent[3] = 0;
                    navStatus[3] = 'choosed';
                    iconStatus[3] = 'icon-caret-down2 icon-choosed';
                    var params = this.state.params;
                    params.sex = data.sex;
                    params.school_age = data.schoolAge;
                    params.price_range = data.priceRange;
                    if (!+data.sex && !+data.schoolAge && !+data.priceRange) {
                        navStatus[3] = 'normal';
                        iconStatus[3] = 'icon-caret-down2';
                    } else {
                        navStatus[3] = 'choosed';
                        iconStatus[3] = 'icon-caret-down2 icon-choosed';
                    }
                    this.setState({
                        navStatus: navStatus,
                        iconStatus: iconStatus,
                        maskStatus: 0,
                        params: params
                    });
                    if (typeof this.props.callback === 'function') {
                        this.props.callback(params);
                    }
                }
            },
            {
                key: 'subjectFunc',
                value: function subjectFunc(data) {
                    var navStatus = this.state.navStatus;
                    var iconStatus = this.state.iconStatus;
                    var showContent = this.state.showContent;
                    showContent[0] = 0;
                    navStatus[0] = 'choosed';
                    iconStatus[0] = 'icon-caret-down2 icon-choosed';
                    var params = this.state.params;
                    params.subject_id = data.index;
                    this.setState({
                        navStatus: navStatus,
                        iconStatus: iconStatus,
                        maskStatus: 0,
                        params: params
                    });
                    if (typeof this.props.callback === 'function') {
                        this.props.callback(params);
                    }
                }
            },
            {
                key: 'clickMask',
                value: function clickMask() {
                    console.log(this.state.navStatus);
                    var navStatusArr = this.state.navStatus.map(function (item) {
                        var it = item;
                        if (item === 'active') {
                            it = 'normal';
                        }
                        return it;
                    });
                    this.setState({
                        maskStatus: 0,
                        showContent: [
                            0,
                            0,
                            0,
                            0
                        ],
                        iconStatus: [
                            'icon-caret-down2',
                            'icon-caret-down2',
                            'icon-caret-down2',
                            'icon-caret-down2'
                        ],
                        navStatus: navStatusArr
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'nav-container' }, _react2.default.createElement('div', { className: 'nav-bar' }, _react2.default.createElement(_index10.default, {
                        name: this.state.subJect,
                        callback: this.clickItem.bind(this, 0),
                        itemClassStatus: this.state.navStatus[0],
                        iconStatus: this.state.iconStatus[0]
                    }), _react2.default.createElement(_index10.default, {
                        name: this.state.lessonWay,
                        callback: this.clickItem.bind(this, 1),
                        itemClassStatus: this.state.navStatus[1],
                        iconStatus: this.state.iconStatus[1]
                    }), _react2.default.createElement(_index10.default, {
                        name: this.state.sortWay,
                        callback: this.clickItem.bind(this, 2),
                        itemClassStatus: this.state.navStatus[2],
                        iconStatus: this.state.iconStatus[2]
                    }), _react2.default.createElement(_index10.default, {
                        name: this.state.choose,
                        callback: this.clickItem.bind(this, 3),
                        itemClassStatus: this.state.navStatus[3],
                        iconStatus: this.state.iconStatus[3]
                    })), _react2.default.createElement(_index2.default, {
                        show: this.state.showContent[0],
                        callback: this.subjectFunc,
                        selected: this.state.courseObject.selected
                    }), _react2.default.createElement(_index4.default, {
                        show: this.state.showContent[1],
                        callback: this.lessonWayFunc,
                        lessonWayArray: this.state.lessonWayArray,
                        lessonWayIndex: +this.state.params.lesson_way
                    }), _react2.default.createElement(_index6.default, {
                        show: this.state.showContent[2],
                        callback: this.sortFunc,
                        sortWayArray: this.state.sortWayArray,
                        sortWayIndex: this.state.params.sort
                    }), _react2.default.createElement(_index8.default, {
                        show: this.state.showContent[3],
                        callback: this.chooseFunc,
                        chooseObj: this.state.chooseObj,
                        params: this.state.params
                    }), _react2.default.createElement('div', {
                        className: this.state.maskStatus ? 'mask' : 'mask hide',
                        onClick: this.clickMask
                    }));
                }
            }
        ]);
        return Nav;
    }(_react2.default.Component);
    Nav.propTypes = {
        lessonWayName: _react.PropTypes.string.isRequired,
        sortWayName: _react.PropTypes.string.isRequired,
        lessonWayArray: _react.PropTypes.array.isRequired,
        sortWayArray: _react.PropTypes.array.isRequired,
        chooseObject: _react.PropTypes.object.isRequired,
        courseObject: _react.PropTypes.object.isRequired,
        callback: _react.PropTypes.func.isRequired,
        params: _react.PropTypes.object.isRequired
    };
    ;
    exports.default = Nav;
});