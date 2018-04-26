define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _reactRedux = require('react-redux');
    var _redux = require('redux');
    var _reducers = require('./reducers');
    var _app = require('./app');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _reducers2 = _interopRequireDefault(_reducers);
    var _app2 = _interopRequireDefault(_app);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var store = (0, _redux.createStore)(_reducers2.default);
    exports.default = _react2.default.createClass({
        displayName: 'react-redux',
        render: function render() {
            return _react2.default.createElement(_reactRedux.Provider, { store: store }, _react2.default.createElement(_app2.default, null));
        }
    });
});