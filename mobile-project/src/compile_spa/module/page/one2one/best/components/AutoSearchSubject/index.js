define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var uiNew = require('common/ui');
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
    var AutoSearchSubject = function (_React$Component) {
        _inherits(AutoSearchSubject, _React$Component);
        function AutoSearchSubject(props) {
            _classCallCheck(this, AutoSearchSubject);
            var _this = _possibleConstructorReturn(this, (AutoSearchSubject.__proto__ || Object.getPrototypeOf(AutoSearchSubject)).call(this, props));
            _this.state = {
                showDropdownList: 0,
                dropList: [],
                inputSubject: null
            };
            _this.getDropdownList = _this.getDropdownList.bind(_this);
            _this.getOrangeBorder = _this.getOrangeBorder.bind(_this);
            _this.removeOrangeBorder = _this.removeOrangeBorder.bind(_this);
            return _this;
        }
        _createClass(AutoSearchSubject, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var self = this;
                    if (nextProps.isPost === 0) {
                        var stateObj = self.state;
                        stateObj.inputSubject = null;
                        self.setState(stateObj);
                    }
                }
            },
            {
                key: 'getOrangeBorder',
                value: function getOrangeBorder(e) {
                    $(e.target).removeClass('gray');
                    $(e.target).parent().removeClass('gray').addClass('orange');
                }
            },
            {
                key: 'getDropdownList',
                value: function getDropdownList(event) {
                    var self = this;
                    var val = $.trim(event.target.value);
                    var url = 'https://suggestion.genshuixue.com/s';
                    if (location.host.indexOf('beta') !== -1) {
                        url = 'https://beta-suggestion.genshuixue.com/s';
                    }
                    self.setState({ inputSubject: val });
                    if (val) {
                        var params = {
                            key: val,
                            type: 1,
                            v: 2
                        };
                        $.ajax({
                            url: url,
                            data: params,
                            dataType: 'jsonp'
                        }).done(function (res) {
                            if (+res.code === 1) {
                                var dataList = res.result && res.result.r;
                                if (dataList.length > 0) {
                                    var stateObj = self.state;
                                    stateObj.showDropdownList = 1;
                                    stateObj.dropList = dataList;
                                    self.setState(stateObj);
                                }
                            } else {
                                uiNew.alert(res.message);
                            }
                        });
                    } else {
                        self.choosedSubject({});
                    }
                }
            },
            {
                key: 'removeOrangeBorder',
                value: function removeOrangeBorder(e) {
                    var domEle = $(e.target);
                    var val = $.trim(domEle.val());
                    if (!val) {
                        domEle.addClass('gray');
                        domEle.parent().addClass('gray');
                    }
                    domEle.parent().removeClass('orange');
                }
            },
            {
                key: 'choosedSubject',
                value: function choosedSubject(item) {
                    var self = this;
                    self.setState({
                        showDropdownList: 0,
                        dropList: [],
                        inputSubject: item.title || ''
                    });
                    self.props.callbackChoosed(item);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var dataList = self.state.dropList;
                    var inputSubject = self.state.inputSubject || '';
                    var subjectComponents = dataList.map(function (item) {
                        return _react2.default.createElement('li', {
                            className: 'subject-li',
                            key: item.id,
                            onClick: self.choosedSubject.bind(self, item)
                        }, item.title);
                    });
                    return _react2.default.createElement('div', { className: 'input-border name-border subject-border gray' }, _react2.default.createElement('input', {
                        className: 'subject gray',
                        type: 'text',
                        name: 'subject-search',
                        required: 'required',
                        ref: 'myTextInput',
                        value: inputSubject,
                        onFocus: self.getOrangeBorder,
                        onBlur: self.removeOrangeBorder,
                        maxLength: '20',
                        placeholder: '您要学习的科目',
                        onChange: self.getDropdownList
                    }), _react2.default.createElement('ul', {
                        className: self.state.showDropdownList ? 'search-suggestion' : 'search-suggestion hide',
                        'data-type': 'liudan'
                    }, subjectComponents));
                }
            }
        ]);
        return AutoSearchSubject;
    }(_react2.default.Component);
    ;
    exports.default = AutoSearchSubject;
});