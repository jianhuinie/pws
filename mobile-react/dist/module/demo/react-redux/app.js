define(function (require, exports) {
    'use strict';
    var _reactRedux = require('react-redux');
    var _index = require('./component/Counter/index');
    var _actions = require('./actions');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _index2 = _interopRequireDefault(_index);
    var _actions2 = _interopRequireDefault(_actions);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function mapStateToProps(state) {
        return { value: state.count.count };
    }
    function mapDispatchToProps(dispatch) {
        return {
            onIncreaseClick: function onIncreaseClick() {
                dispatch(_actions2.default.countAction.increaseAction);
            }
        };
    }
    var App = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_index2.default);
    exports.default = App;
});