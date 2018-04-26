define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRouter = require('react-router');
    var _index = require('compile_spa/common/components/SubjectChoose/index');
    var _PageController2 = require('compile_spa/common/controller/PageController');
    var app = require('common/app');
    var setShare = require('common/share/initialize');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
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
    var Subject = function (_PageController) {
        _inherits(Subject, _PageController);
        function Subject(props) {
            _classCallCheck(this, Subject);
            var _this = _possibleConstructorReturn(this, (Subject.__proto__ || Object.getPrototypeOf(Subject)).call(this, props));
            _this.confirmSubject = _this.confirmSubject.bind(_this);
            document.title = '全部科目';
            return _this;
        }
        _createClass(Subject, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    setShare({
                        title: '跟谁学\u300E优选1对1\u300F - 名师个性化辅导',
                        content: '400+城市覆盖\uFF0C8000万家长信赖\u3002全国优选老师\uFF0C个性化学习方案\uFF0C全程助教服务\uFF0C带给你最好的学习体验\u3002',
                        img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
                        url: location.origin + '/webapp/#/one2one/best/se/detail'
                    });
                }
            },
            {
                key: 'confirmSubject',
                value: function confirmSubject(data) {
                    _reactRouter.hashHistory.push('one2one/best/se/search?subject_id=' + data.index);
                }
            },
            {
                key: 'render',
                value: function render() {
                    app.setPageTitle('全部科目');
                    var index = 100;
                    var selected = [
                        100,
                        0,
                        0
                    ];
                    return _react2.default.createElement('div', { className: 'subject-content-all' }, _react2.default.createElement(_index2.default, {
                        cssType: 'all',
                        selected: selected,
                        index: index,
                        callback: this.confirmSubject
                    }));
                }
            }
        ]);
        return Subject;
    }(_PageController3.default);
    exports.default = Subject;
});