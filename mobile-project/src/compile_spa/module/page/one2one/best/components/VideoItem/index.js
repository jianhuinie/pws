define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var lazyLoadImage = require('common/lazyLoadImage');
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
    var VideoItem = function (_React$Component) {
        _inherits(VideoItem, _React$Component);
        function VideoItem(props) {
            _classCallCheck(this, VideoItem);
            var _this = _possibleConstructorReturn(this, (VideoItem.__proto__ || Object.getPrototypeOf(VideoItem)).call(this, props));
            _this.state = { showCover: 1 };
            _this.hideCover = _this.hideCover.bind(_this);
            return _this;
        }
        _createClass(VideoItem, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    lazyLoadImage.init();
                }
            },
            {
                key: 'hideCover',
                value: function hideCover() {
                    var self = this;
                    self.setState({ showCover: 0 });
                    document.domain = 'genshuixue.com';
                    try {
                        var playFrame = $('#player-frame')[0];
                        var videoPlayer = playFrame.contentWindow.document.getElementsByTagName('video');
                        if (videoPlayer[0].readyState === 4) {
                            self.playVideo(videoPlayer);
                        } else {
                            videoPlayer[0].load();
                            videoPlayer[0].oncanplay = function () {
                                self.playVideo(videoPlayer);
                            };
                        }
                    } catch (e) {
                        console.log('error');
                    }
                }
            },
            {
                key: 'playVideo',
                value: function playVideo(videoPlayer) {
                    videoPlayer[0].play();
                    $(videoPlayer).attr('autoplay', 'autoplay');
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var data = self.props.item;
                    return _react2.default.createElement('div', { className: 'video-item' }, _react2.default.createElement('div', { id: 'fixed-top' }, _react2.default.createElement('div', { id: 'video-wrap' }, _react2.default.createElement('div', {
                        id: 'video-image-panel',
                        className: self.state.showCover ? '' : 'hide'
                    }, _react2.default.createElement('img', {
                        className: 'preface',
                        width: '100%',
                        height: '100%',
                        'data-src': data.cover_img
                    }), _react2.default.createElement('i', {
                        className: 'play-icon icon-ic_play',
                        onClick: self.hideCover
                    })), _react2.default.createElement('div', { id: 'video-container' }, _react2.default.createElement('iframe', {
                        className: self.state.showCover ? 'hide' : '',
                        id: 'player-frame',
                        src: data.video_url
                    })))));
                }
            }
        ]);
        return VideoItem;
    }(_react2.default.Component);
    exports.default = VideoItem;
});