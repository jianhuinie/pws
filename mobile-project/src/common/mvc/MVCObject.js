/**
 * Created by xuzheng on 15/4/21.
 */
define(function (require) {

    var util_string = require('util/string');
    var observer = require('./observer');


    var initcap = util_string.initcap;

    /**
     * 实现 KVO 的基类。
     */
    function MVCObject() {
    }

    var p = MVCObject.prototype;
    /**
     * 获取值。
     *
     * @param {string} key 键值名称
     * @return 键对应的值
     */
    p.get = function (key) {
        var __o_accessors_ = _get_accessors(this)[key];
        if (__o_accessors_) {
            key = __o_accessors_.targetKey;
            __o_accessors_ = __o_accessors_.target;
            var getterName = getGetterName(key);
            return __o_accessors_[getterName] ? __o_accessors_[getterName]() : __o_accessors_.get(key)
        } else return this[key]
    };

    /**
     * 设置值。
     *
     * @param {string} key 键值字符串
     * @param {*} value 键对应的值
     */
    p.set = function (key, value) {
        var __o_accessors_ = _get_accessors(this);
        if (__o_accessors_.hasOwnProperty(key)) {
            var accessor = __o_accessors_[key];
            var targetKey = accessor.targetKey;
            var target = accessor.target;
            var setterName = getSetterName(targetKey); //setKey
            target[setterName] ? target[setterName](value) : target.set(targetKey, value)
        } else {
            //var oldValue = this[key];
            //如果不是引用对象类型，判断值是否相等
            /* if(value && oldValue && value.equals && value.equals(oldValue) || oldValue === value){
             return null;
             }*/
            this[key] = value;
            _changed(this, key);
        }
    };

    /**
     * 通知所有观察者此属性有所改变。这会通知绑定到对象属性的对象以及绑定到的对象。
     *
     * @param {string} key 键值字符串
     */
    p.notify = function (key) {
        var __o_accessors_ = _get_accessors(this);
        if (__o_accessors_.hasOwnProperty(key)) {
            var accessor = __o_accessors_[key];
            accessor.target.notify(accessor.targetKey)
        } else _changed(this, key)
    };

    /**
     * 设置键值对集合。
     *
     * @param {Object} values 键值字符串
     */
    p.setValues = function (values) {
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                var value = values[key], setterName = getSetterName(key);
                this[setterName] ? this[setterName](value) : this.set(key, value);
            }
        }
    };
    p.setOptions = p.setValues;

    /**
     * 针对状态更改的常规处理程序。在派生类中覆盖此项，以处理任意状态更改。
     *
     * @param {util_string} key 键值字符串
     */
    p.changed = function (key) {

    };

    /**
     * 将视图绑定到模型。
     *
     * @param {string} key 键值名称
     * @param {MVCObject|object} target 模型对象
     * @param {string} [targetKey=key] 键值名称
     * @param {boolean} [noNotify=false] 视图对象属性改变是否通知模型对象
     */
    p.bindTo = function (key, target, targetKey, noNotify) {
        targetKey = targetKey || key;
        var _self = this;
        _self.unbind(key, true);
        /*_get_bindings(_self)[key] = target[getChangeName(targetKey)] = function () {
         _changed(_self, key)
         };*/
        _get_bindings(_self)[key] = observer.addListener(target, getChangeName(targetKey.toLowerCase()), function () {
            _changed(_self, key)
        });
        _bindto(_self, key, target, targetKey, noNotify)
    };

    p.bindsTo = function (keys, target, targetKeys, noNotify) {
        //不做过多判断，默认使用的时数组类型
        //keys = is_array(keys) ? keys: get_keys(keys);
        targetKeys = targetKeys || [];
        for (var i = 0, len = keys.length; i < len; i++) {
            var targetKey = targetKeys[i] || null;
            this.bindTo(keys[i], target, targetKey, noNotify);
        }
    };

    /**
     * 删除绑定。取消绑定会将未绑定属性设置为当前值。将不会通知该对象，因为值尚未更改。
     *
     * @param {string} key 键值字符串
     * @param {boolean} [notClear = false] 是否清楚绑定的值
     */
    p.unbind = function (key, notClear) {
        var lsnr = _get_bindings(this)[key];
        if (lsnr) {
            delete _get_bindings(this)[key];
            observer.removeListener(lsnr);
            var value = notClear && this.get(key);
            delete _get_accessors(this)[key];
            if (notClear) {
                this[key] = value
            } else {
                _changed(this, key);
            }
        }
    };

    /**
     * 删除所有绑定。
     *
     */
    p.unbindAll = function (keys) {
        if (!keys) {
            keys = [];
            var items = _get_bindings(this);
            for (var key in items) {
                if (items.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        for (var i = 0, n = keys.length; i < n; i++) {
            this.unbind(keys[i]);
        }
    };

    //返回一个单例对象,bindValues
    function _get_accessors(mvc) {
        return mvc.__o_accessors_ || (mvc.__o_accessors_ = {});
    }

    //属性发生了改变，触发事件attr_changed事件
    function _changed(mvc, key) {
        var key_changed = getChangeName(key);
        mvc[key_changed] ? mvc[key_changed]() : mvc.changed(key);
        var eventName = getChangeName(key.toLowerCase());
        observer.trigger(mvc, eventName);
    }

    //绑定视图
    function _bindto(mvc, key, target, targetKey, noNotify) {
        _get_accessors(mvc)[key] = {
            'target': target,
            'targetKey': targetKey
        };
        noNotify || _changed(mvc, key);
    }

    //用于绑定的属性,bindListeners
    function _get_bindings(mvc) {
        if (!mvc.__o_bindings_) mvc.__o_bindings_ = {};
        return mvc.__o_bindings_
    }

    var getterNameCache = {};

    function getGetterName(str) {
        return getterNameCache[str] || (getterNameCache[str] = 'get' + initcap(str));
    }

    var setterNameCache = {};

    function getSetterName(str) {
        return setterNameCache[str] || (setterNameCache[str] = 'set' + initcap(str));
    }

    var changeNameCache = {};

    function getChangeName(key) {
        return changeNameCache[key] || (changeNameCache[key] = key + '_changed');
    }

    return MVCObject;
});