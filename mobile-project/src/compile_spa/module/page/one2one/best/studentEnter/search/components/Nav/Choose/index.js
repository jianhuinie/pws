define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _index = require('./ChooseItem/index');
    var _index3 = require('./ChooseButton/index');
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
    var Choose = function (_React$Component) {
        _inherits(Choose, _React$Component);
        function Choose(props) {
            _classCallCheck(this, Choose);
            var _this = _possibleConstructorReturn(this, (Choose.__proto__ || Object.getPrototypeOf(Choose)).call(this, props));
            _this.state = {
                choose: {
                    sex: [],
                    school_age: [],
                    price_range: []
                },
                chooseIndex: {
                    sex: 0,
                    schoolAge: 0,
                    priceRange: 0
                }
            };
            _this.reset = _this.reset.bind(_this);
            _this.confirm = _this.confirm.bind(_this);
            _this.chooseSex = _this.chooseSex.bind(_this);
            _this.chooseTeachTime = _this.chooseTeachTime.bind(_this);
            _this.choosePrice = _this.choosePrice.bind(_this);
            return _this;
        }
        _createClass(Choose, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var chooseIndex = this.state.chooseIndex;
                    chooseIndex.sex = nextProps.params.sex;
                    chooseIndex.schoolAge = nextProps.params.school_age;
                    chooseIndex.priceRange = nextProps.params.price_range;
                    this.setState({
                        choose: nextProps.chooseObj,
                        show: nextProps.show
                    });
                }
            },
            {
                key: 'reset',
                value: function reset() {
                    var chooseIndex = this.state.chooseIndex;
                    chooseIndex.sex = 0;
                    chooseIndex.schoolAge = 0;
                    chooseIndex.priceRange = 0;
                    this.setState({ chooseIndex: chooseIndex });
                }
            },
            {
                key: 'confirm',
                value: function confirm(data) {
                    var chooseIndex = this.state.chooseIndex;
                    chooseIndex.sex = data.sex;
                    chooseIndex.schoolAge = data.schoolAge;
                    chooseIndex.priceRange = data.priceRange;
                    var datas = {
                        sex: data.sex,
                        schoolAge: data.schoolAge,
                        priceRange: data.priceRange
                    };
                    this.props.callback(datas);
                }
            },
            {
                key: 'chooseSex',
                value: function chooseSex(data) {
                    var chooseIndex = this.state.chooseIndex;
                    chooseIndex.sex = +data.value;
                    this.setState({ chooseIndex: chooseIndex });
                }
            },
            {
                key: 'chooseTeachTime',
                value: function chooseTeachTime(data) {
                    var chooseIndex = this.state.chooseIndex;
                    chooseIndex.schoolAge = +data.value;
                    this.setState({ chooseIndex: chooseIndex });
                }
            },
            {
                key: 'choosePrice',
                value: function choosePrice(data) {
                    var chooseIndex = this.state.chooseIndex;
                    chooseIndex.priceRange = +data.value;
                    this.setState({ chooseIndex: chooseIndex });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: this.props.show ? 'choose-content' : 'choose-content hide' }, _react2.default.createElement('div', { className: 'choose-content-item' }, _react2.default.createElement(_index2.default, {
                        name: '老师性别',
                        index: +this.state.chooseIndex.sex,
                        itemArray: this.state.choose.sex,
                        callback: this.chooseSex
                    }), _react2.default.createElement(_index2.default, {
                        name: '教龄范围',
                        index: +this.state.chooseIndex.schoolAge,
                        itemArray: this.state.choose.school_age,
                        callback: this.chooseTeachTime
                    }), _react2.default.createElement(_index2.default, {
                        name: '价格区间',
                        index: +this.state.chooseIndex.priceRange,
                        itemArray: this.state.choose.price_range,
                        callback: this.choosePrice
                    })), _react2.default.createElement(_index4.default, {
                        chooseIndex: this.state.chooseIndex,
                        callbackReset: this.reset,
                        callbackConfirm: this.confirm
                    }));
                }
            }
        ]);
        return Choose;
    }(_react2.default.Component);
    Choose.PropTypes = {
        callback: _react.PropTypes.func.isRequired,
        chooseObj: _react.PropTypes.object.isRequired,
        show: _react.PropTypes.number.isRequired,
        params: _react.PropTypes.object.isRequired
    };
    exports.default = Choose;
});