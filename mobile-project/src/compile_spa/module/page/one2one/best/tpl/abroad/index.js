define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _config = require('./config');
    var _index = require('compile_spa/module/page/one2one/best/components/ImgItem/index');
    var _index3 = require('compile_spa/module/page/one2one/best/components/VideoItem/index');
    var _index5 = require('compile_spa/module/page/one2one/best/components/FormItem/index');
    var _index7 = require('compile_spa/module/page/one2one/best/components/SliderItem/index');
    var _index9 = require('compile_spa/module/page/one2one/best/components/FooterItem/index');
    var _PageController2 = require('compile_spa/common/controller/PageController');
    var service = require('common/service');
    var URL = require('util/url');
    var APP = require('common/app');
    var setShare = require('common/share/initialize');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _config2 = _interopRequireDefault(_config);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
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
    var shareInfo = {
        url: location.href,
        content: '400+城市覆盖\uFF0C8000万家长信赖\u3002全国优选老师\uFF0C个性化学习方案\uFF0C全程助教服务\uFF0C带给你最好的学习体验\u3002',
        img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
        title: '跟谁学 - 找好老师\uFF0C上跟谁学'
    };
    var abroadContainer = function (_PageController) {
        _inherits(abroadContainer, _PageController);
        function abroadContainer(props) {
            _classCallCheck(this, abroadContainer);
            var _this = _possibleConstructorReturn(this, (abroadContainer.__proto__ || Object.getPrototypeOf(abroadContainer)).call(this, props));
            _this.state = {
                title: '跟谁学 - 找好老师\uFF0C上跟谁学',
                type: _this.getUrlParams().type || 'k12',
                tplInfo: []
            };
            return _this;
        }
        _createClass(abroadContainer, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    var params = { type: self.state.type };
                    service.post(_config2.default.PATHS.GETTPL, params).then(function (res) {
                        if (+res.code === 0) {
                            var resData = res.data;
                            self.setState({
                                title: resData.title,
                                tplInfo: resData.tpl_info
                            });
                            var newShareInfo = resData.share_info || shareInfo;
                            setShare({
                                title: newShareInfo.title,
                                content: newShareInfo.content,
                                img: newShareInfo.img,
                                url: location.href
                            });
                        }
                    });
                }
            },
            {
                key: 'getUrlParams',
                value: function getUrlParams() {
                    var urlStr = URL().hash.split('?')[1];
                    var dataObj = {};
                    if (urlStr) {
                        var urlArr = urlStr.split('&');
                        $.each(urlArr, function (key, value) {
                            var tempArr = value.split('=');
                            dataObj[tempArr[0]] = decodeURIComponent(tempArr[1]);
                        });
                    }
                    return dataObj;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    APP.setPageTitle(self.state.title);
                    var listComponet = this.state.tplInfo.map(function (item, index) {
                        var listType = item.type;
                        var listShow = null;
                        var keyVal = 'img' + index;
                        switch (listType) {
                        case 'image':
                            listShow = _react2.default.createElement(_index2.default, {
                                key: keyVal,
                                item: item
                            });
                            break;
                        case 'form':
                            listShow = _react2.default.createElement(_index6.default, {
                                key: keyVal,
                                item: item
                            });
                            break;
                        case 'slider':
                            listShow = _react2.default.createElement(_index8.default, {
                                key: keyVal,
                                item: item.imgs
                            });
                            break;
                        case 'video':
                            listShow = _react2.default.createElement(_index4.default, {
                                key: keyVal,
                                item: item
                            });
                            break;
                        default:
                            ;
                        }
                        return listShow;
                    });
                    return _react2.default.createElement('div', { className: 'one2one-tpl' }, listComponet, _react2.default.createElement(_index10.default, {
                        title: '预约名师1对1',
                        classEle: 'abroad-post'
                    }));
                }
            }
        ]);
        return abroadContainer;
    }(_PageController3.default);
    ;
    exports.default = abroadContainer;
});