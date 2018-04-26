define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var uiNew = require('common/ui');
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
    var SearchAddress = function (_React$Component) {
        _inherits(SearchAddress, _React$Component);
        function SearchAddress(props) {
            _classCallCheck(this, SearchAddress);
            var _this = _possibleConstructorReturn(this, (SearchAddress.__proto__ || Object.getPrototypeOf(SearchAddress)).call(this, props));
            _this.state = {
                showDropdownList: 0,
                dropList: [],
                currentAddress: ''
            };
            _this.getAddressList = _this.getAddressList.bind(_this);
            _this.clearAddress = _this.clearAddress.bind(_this);
            return _this;
        }
        _createClass(SearchAddress, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.getCurrentAddress();
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
                key: 'getAddressList',
                value: function getAddressList() {
                    var self = this;
                    var val = $.trim(self.refs.myTextInput.value);
                    var url = 'https://api.map.baidu.com/place/v2/suggestion';
                    var params = {
                        query: val,
                        region: '全国',
                        output: 'json',
                        ak: '2MrTdwjxa074wgqs6vhuWppfW57twsaB'
                    };
                    if (val) {
                        $.ajax({
                            url: url,
                            data: params,
                            dataType: 'jsonp'
                        }).done(function (res) {
                            if (+res.status === 0) {
                                var dropList = res.result;
                                var addressArr = [];
                                if (dropList.length > 0) {
                                    $.each(dropList, function (key, value) {
                                        value.showAddressStr = value.city + value.district + value.name;
                                        if (value.location) {
                                            addressArr.push(value);
                                        }
                                    });
                                    self.setState({
                                        showDropdownList: 1,
                                        dropList: addressArr
                                    });
                                }
                            } else {
                                uiNew.alert(res.message);
                            }
                        });
                    }
                }
            },
            {
                key: 'clearAddress',
                value: function clearAddress() {
                    var self = this;
                    self.refs.myTextInput.value = '';
                    self.setState({
                        showDropdownList: 0,
                        dropList: []
                    });
                }
            },
            {
                key: 'choosedAddress',
                value: function choosedAddress(item) {
                    var self = this;
                    self.setState({
                        showDropdownList: 0,
                        dropList: []
                    });
                    self.refs.myTextInput.value = item.showAddressStr;
                    if (self.props.callback && typeof self.props.callback === 'function') {
                        this.props.callback(item);
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var dataList = self.state.dropList;
                    var addressComponents = dataList.map(function (item) {
                        return _react2.default.createElement('li', {
                            className: 'subject-li',
                            key: item.uid,
                            onClick: self.choosedAddress.bind(self, item)
                        }, _react2.default.createElement('div', { className: 'address' }, item.name), _react2.default.createElement('div', { className: 'area' }, item.city, item.district));
                    });
                    return _react2.default.createElement('div', { className: 'subject-box input-border' }, _react2.default.createElement('input', {
                        className: 'subject',
                        type: 'text',
                        name: 'subject-search',
                        required: 'required',
                        ref: 'myTextInput',
                        maxLength: '20',
                        placeholder: '请输入小区/大厦/学校等',
                        onChange: self.getAddressList
                    }), _react2.default.createElement('div', {
                        className: 'clear-address',
                        onClick: self.clearAddress
                    }, _react2.default.createElement('i', { className: 'icon-close' })), _react2.default.createElement('div', { className: 'shadow' }), _react2.default.createElement('div', { className: 'current-address' }, self.state.currentAddress, _react2.default.createElement('span', { className: 'icon-ditu' })), _react2.default.createElement('ul', {
                        className: self.state.showDropdownList ? 'search-address' : 'search-address hide',
                        'data-type': 'liudan'
                    }, addressComponents));
                }
            }
        ]);
        return SearchAddress;
    }(_react2.default.Component);
    ;
    exports.default = SearchAddress;
});