define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var URL = require('util/url');
    var UTIL = require('common/util');
    var app = require('common/app');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
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
    var LessonWay = function (_React$Component) {
        _inherits(LessonWay, _React$Component);
        function LessonWay(props) {
            _classCallCheck(this, LessonWay);
            var _this = _possibleConstructorReturn(this, (LessonWay.__proto__ || Object.getPrototypeOf(LessonWay)).call(this, props));
            var urlObj = UTIL.getHashParams();
            _this.state = {
                index: _this.props.lessonWayIndex,
                currentAddress: '',
                urlObj: urlObj
            };
            _this.chooseAddress = _this.chooseAddress.bind(self);
            return _this;
        }
        _createClass(LessonWay, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.showAddress();
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({
                        index: +nextProps.lessonWayIndex,
                        show: nextProps.show
                    });
                }
            },
            {
                key: 'getCurrentAddress',
                value: function getCurrentAddress() {
                    var self = this;
                    var str = '暂时无法获取到定位';
                    if (app.isStudentApp()) {
                        Jockey.on('setLocation', function (res) {
                            var position = {
                                coords: {
                                    latitude: res.lat,
                                    longitude: res.lng
                                }
                            };
                            onSuccess(position);
                            Jockey.off('setLocation');
                        });
                        Jockey.send('getLocation');
                    } else if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(onSuccess, onError);
                    } else {
                        self.setState({ currentAddress: str });
                    }
                    function onSuccess(position) {
                        var lat = position.coords.latitude;
                        var lng = position.coords.longitude;
                        var url = 'https://api.map.baidu.com/geocoder/v2/';
                        var params = {
                            location: lat + ',' + lng,
                            output: 'json',
                            ak: '2MrTdwjxa074wgqs6vhuWppfW57twsaB'
                        };
                        $.ajax({
                            url: url,
                            data: params,
                            dataType: 'jsonp'
                        }).done(function (res) {
                            var detailAddress = res.result.formatted_address;
                            self.setState({ currentAddress: detailAddress });
                        });
                    }
                    function onError() {
                        self.setState({ currentAddress: str });
                    }
                }
            },
            {
                key: 'showAddress',
                value: function showAddress() {
                    var self = this;
                    var urlAddress = self.state.urlObj.addressName;
                    if (urlAddress) {
                        self.setState({ currentAddress: urlAddress });
                    } else {
                        self.getCurrentAddress();
                    }
                }
            },
            {
                key: 'chooseLessonWay',
                value: function chooseLessonWay(item) {
                    var data = {
                        lessonWayName: item.name,
                        value: +item.value
                    };
                    this.setState({ index: +item.value });
                    if (typeof this.props.callback === 'function') {
                        this.props.callback(data);
                    }
                }
            },
            {
                key: 'chooseAddress',
                value: function chooseAddress() {
                    var hashVal = 'one2one/best/se/address';
                    var urlStr = URL().hash.split('?')[1];
                    if (urlStr) {
                        hashVal += '?' + urlStr;
                    }
                    _reactRouter.hashHistory.push(hashVal);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    return _react2.default.createElement('div', { className: this.props.show ? 'lessonWay-content' : 'lessonWay-content hide' }, _react2.default.createElement('div', {
                        className: 'address',
                        onClick: self.chooseAddress
                    }, _react2.default.createElement('i', { className: 'icon-ditu' }), _react2.default.createElement('span', { className: 'text' }, self.state.currentAddress), _react2.default.createElement('i', { className: 'icon-chevron-thin-right' })), _react2.default.createElement('div', { className: 'lesson-way-content' }, this.props.lessonWayArray.map(function (item, index) {
                        return _react2.default.createElement('div', {
                            className: 'item',
                            onClick: self.chooseLessonWay.bind(self, item),
                            key: index
                        }, _react2.default.createElement('span', { className: +self.state.index === +item.value ? 'text text-active' : 'text' }, item.name), _react2.default.createElement('span', { className: +item.value === 2 ? 'recommend' : 'recommend hide' }, '推荐'), _react2.default.createElement('i', { className: +self.state.index === +item.value ? 'icon-checkmark' : 'icon-checkmark hide' }));
                    })));
                }
            }
        ]);
        return LessonWay;
    }(_react2.default.Component);
    LessonWay.propTypes = {
        callback: _react.PropTypes.func.isRequired,
        lessonWayIndex: _react.PropTypes.number.isRequired,
        lessonWayArray: _react.PropTypes.array.isRequired,
        show: _react.PropTypes.number.isRequired
    };
    exports.default = LessonWay;
});