/**
 * Created by gsx on 15/4/21.
 */
define(function (require) {

    'use strict';

    var exports = {};

    var utilBase = require('../base');
    var utilArray = require('../array');
    var utilObject = require('../object');


    var ie = false;
    var isEmpty = utilObject.isEmpty;
    var toArray = utilArray.argsToArray;

    var _listeners = {};
    var _eventObjects = {};
    var _eventObjectIdIndex = 0;


    /**
     *将指定侦听器函数添加到指定对象实例的指定事件名称。
     *
     * <pre>
     * <strong>传回该侦听器的标识符，该标识符能够与 exports.removeListener() 配合使用。</strong>
     * </pre>
     *
     * @param {Object} instance 对象事例
     * @param {string} eventName 数组对象
     * @param {Function} handler 绑定的函数
     * @return {EventListener} listener 传回该侦听器的标识符
     */
    exports.addListener = function (instance, eventName, handler) {
        return new EventListener(instance, eventName, handler);
    };

    /**
     *删除应由上述 exports.addListener 传回的指定侦听器。
     *
     * @param {EventListener} listener 事件侦听器
     */
    exports.removeListener = function (listener) {
        if (listener instanceof EventListener) {
            listener.remove();
        } else {
            exports.removeDomListener(listener);
        }
    };

    /**
     *判断此事件是否注册存在。
     *
     * @param {Object} instance 对象事例
     * @param {string} eventName 事件名称
     * @return  是否注册
     * @type boolean
     */
    exports.exist = function (instance, eventName) {
        var listeners = _getListeners(instance, eventName);
        return listeners && !isEmpty(listeners);
    };

    /**
     * 对于指定实例，删除其指定事件的所有侦听器。
     *
     * @param {Object} instance 事件侦听器
     * @param {string} eventName 事件名称
     */
    exports.clearListeners = function (instance, eventName) {
        var listeners = _getListeners(instance, eventName);
        for (var key in listeners) {
            if (listeners[key]) {
                listeners[key].remove();
            }
        }
    };

    /**
     * 对于指定实例，删除其所有事件的所有侦听器。
     *
     * @function
     * @param {Object} instance 事件侦听器
     */
    exports.clearInstanceListeners = function (instance) {
        var listeners = _getListeners(instance);
        for (var key in listeners) {
            if (listeners[key]) {
                listeners[key].remove();
            }
        }
    };

    /**
     * 触发指定事件。eventName 后的所有参数都以参数的形式传递到侦听器。
     *
     * @param {Object} instance 事件侦听器
     * @param {string} eventName 事件名称
     */
    exports.trigger = function (instance, eventName) {
        if (exports.exist(instance, eventName)) {
            var args = toArray(arguments, 2);
            var listeners = _getListeners(instance, eventName);
            for (var key in listeners) {
                if (listeners[key]) {
                    listeners[key].handler.apply(listeners[key].instance, args);
                }
            }
        }
    };

    /**
     * 类似于 exports.addListener，但处理程序会在处理完第一个事件后将自已删除。
     *
     * @param {Object} instance 事件侦听器
     * @param {string} eventName 事件名称
     * @param {Function} handler 执行函数
     * @return {EventListener} listener  一个事件侦听器
     */
    exports.addListenerOnce = function (instance, eventName, handler) {
        var eventListener = exports.addListener(instance, eventName, function () {
            eventListener.remove();
            return handler.apply(this, arguments);
        });
        return eventListener;
    };

    /**
     * 将object对象上的事件转发到instance对象上触发。
     *
     * @param {Object} instance 事件侦听器
     * @param {string} eventName 事件名称
     * @param {Object} object 执行函数
     * @return  一个事件侦听器
     * @type EventListener
     */
    exports.forward = function (instance, eventName, object) {
        return exports.addListener(instance, eventName, _forwardEvent(eventName, object))
    };

    /**
     * 删除所有注册的事件处理程序以防止内存泄漏。应作为 unload 事件的处理程序进行调用。
     *
     * @private
     */
    exports.unload = function () {
        var listeners = _listeners;

        for (var key in listeners) {
            if (listeners[key]) {
                listeners.remove();
            }
        }
        _listeners = {};
        (listeners = window.CollectGarbage) && listeners();
    };

    exports.addDomListener = function (element, eventName, handle, useOriginalEvent) {
        var token = {
            element: element,
            handle: handle,
            type: eventName
        };
        var eventID = utilBase.getUid(token);
        token.eid = eventID;
        $(element).on(eventName + '.' + eventID, function (evt) {
            handle.call(this, useOriginalEvent ? (evt.originalEvent || evt) : evt);
        });
        return token;
    };

    exports.removeDomListener = function (token) {
        $(token.element).off(token.type + '.' + token.eid);
    };

    exports.addDomListenerOnce = function (element, eventName, handler, useOriginalEvent) {
        var token = exports.addDomListener(element, eventName, function () {
            exports.removeDomListener(token);
            return handler.apply(this, arguments);
        }, useOriginalEvent);
        return token;
    };

    /**
     *此类是不透明的。它没有方法和构造函数。
     *
     * 此类的实例从 addListener()、addDomListener() 返回，并最终传递回 removeListener()。
     * @param {Object} instance 对象事例
     * @param {string} eventName 数组对象
     * @param {Function} handler 绑定的函数
     *
     */
    function EventListener(instance, eventName, handler) {
        this.instance = instance;
        this.eventName = eventName;
        this.handler = handler;
        this.id = ++eid;
        _get_event_list(instance, eventName)[this.id] = this;
        if (ie) {
            _listeners[this.id] = this;
        }
    }

    var eid = 0; // 事件id

    EventListener.prototype.remove = function () {
        var instance = this.instance;
        var eventName = this.eventName;
        if (instance) {
            delete _get_event_list(instance, eventName)[this.id];
            if (instance.__events_) {
                if (isEmpty(instance.__events_[eventName])) {
                    delete instance.__events_[eventName];
                }
                if (isEmpty(instance.__events_)) {
                    delete instance.__events_;
                }
            }
            this.handler = null;
            this.instance = null;
            delete _listeners[this.id];

        }
    };

    //注册实例事件
    function _get_event_list(instance, eventName) {
        var events;
        if (ie) {
            var eventObject = getEventObject(instance);
            events = eventObject.__events_;
        } else {
            instance.__events_ || (instance.__events_ = {});
            events = instance.__events_;
        }
        events[eventName] || (events[eventName] = {});
        return events[eventName];
    }

    function getEventObject(object) {
        var eventObject;
        if (object && object.__oid_) {
            eventObject = _eventObjects[object.__oid_];
        }
        if (!eventObject && object) {
            object.__oid_ = ++_eventObjectIdIndex;
            eventObject = {
                __events_: {}
            };
            _eventObjects[object.__oid_] = eventObject;
        }
        return eventObject;
    }

    //获取事件侦听器
    function _getListeners(instance, eventName) {
        var listeners;
        var events = {};
        if (ie) {
            var eventObject = getEventObject(instance);
            if (eventObject) {
                events = eventObject.__events_;
            }
        } else {
            events = instance.__events_ || {};
        }
        if (eventName) {
            listeners = events[eventName] || {};
        } else {
            listeners = {};
            var _items;
            var _listenerKey;
            for (eventName in events) {
                _items = events[eventName];
                for (_listenerKey in _items) {
                    listeners[_listenerKey] = _items[_listenerKey];
                }
            }
        }
        return listeners;
    }

    // 转发并触发事件
    function _forwardEvent(eventName, object) {
        return function () {
            var args;
            for (args = [object, eventName], len = arguments.length, i = 0; i < len; ++i) {
                args.push(arguments[i]);
            }
            exports.trigger.apply(this, args);
        };
    }

    return exports;
});