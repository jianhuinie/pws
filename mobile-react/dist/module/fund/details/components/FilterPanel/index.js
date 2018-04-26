define(function (require, exports) {
    'use strict';
    var _CommonController2 = require('common/controller/CommonController');
    var _react = require('react');
    var _index = require('common/components/SlideInDialog/index');
    var _walletDetailType = require('common/enum/walletDetailType');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _CommonController3 = _interopRequireDefault(_CommonController2);
    var _react2 = _interopRequireDefault(_react);
    var _index2 = _interopRequireDefault(_index);
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
    var FilterPannel = function (_CommonController) {
        _inherits(FilterPannel, _CommonController);
        function FilterPannel(props) {
            _classCallCheck(this, FilterPannel);
            var _this = _possibleConstructorReturn(this, (FilterPannel.__proto__ || Object.getPrototypeOf(FilterPannel)).call(this, props));
            _this.state = {
                isShowFilter: props.isShowFilter,
                selectKey: props.selectKey
            };
            _this.showFilter = _this.showFilter.bind(_this);
            _this.closeFilter = _this.closeFilter.bind(_this);
            return _this;
        }
        _createClass(FilterPannel, [
            {
                key: 'showFilter',
                value: function showFilter() {
                    this.setState({ isShowFilter: true });
                }
            },
            {
                key: 'closeFilter',
                value: function closeFilter() {
                    this.setState({ isShowFilter: false });
                }
            },
            {
                key: 'handleTypeClick',
                value: function handleTypeClick(key) {
                    if (key !== this.state.selectKey) {
                        this.setState({ selectKey: key });
                        this.props.onTypeChange(key);
                        this.closeFilter();
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    return _react2.default.createElement('div', { className: 'filter-pannel' }, _react2.default.createElement('div', {
                        className: 'filter-pannel-btn',
                        onClick: this.showFilter
                    }, '筛选'), _react2.default.createElement(_index2.default, {
                        onCloseHandler: this.closeFilter,
                        isShowDialog: this.state.isShowFilter
                    }, _react2.default.createElement('div', { className: 'filter-pannel-content' }, _react2.default.createElement('div', { className: 'filter-pannel-content-title' }, '选择筛选类型'), _react2.default.createElement('div', { className: 'filter-pannel-content-option' }, Object.keys(_walletDetailType.walletTypeEnum).map(function (item) {
                        var key = _walletDetailType.walletTypeEnum[item];
                        return _react2.default.createElement('div', {
                            key: key,
                            className: 'option-item ' + (_this2.state.selectKey === key ? 'active' : ''),
                            onClick: function onClick() {
                                _this2.handleTypeClick(key);
                            }
                        }, _walletDetailType.walletTypeMap.get(key));
                    }), _react2.default.createElement('div', { className: 'option-item clear' }), _react2.default.createElement('div', { className: 'option-item clear' })), _react2.default.createElement('div', {
                        className: 'filter-pannel-content-close',
                        onClick: this.closeFilter
                    }, '取消'))));
                }
            }
        ]);
        return FilterPannel;
    }(_CommonController3.default);
    FilterPannel.propTypes = {
        isShowFilter: _react.PropTypes.bool,
        selectKey: _react.PropTypes.number,
        onTypeChange: _react.PropTypes.func.isRequired
    };
    FilterPannel.defaultProps = {
        isShowFilter: false,
        selectKey: _walletDetailType.walletTypeEnum.ALL
    };
    exports.default = FilterPannel;
});