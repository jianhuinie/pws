/**
 * @file 元素是否隐藏
 * @author musicode
 */
define('cc/function/isHidden',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 元素是否隐藏不能用 element.is(':hidden')
     *
     * 这样太暴力了，当调用者需要做动画时，它可以是 opacity: 0 或是 visibility: hidden
     */

    return function (element) {

        var display = element.css('display');

        return element.css('display') === 'none'
            || element.css('opacity') == 0
            || element.css('visibility') === 'hidden';

    };

});
/**
 * @file 下一个时间片
 * @author musicode
 */
define('cc/function/nextTick',['require','exports','module'],function (require, exports, module) {

    'use strict';

    // 整套组件用相同的时间片机制
    // 为了兼容 jQuery 的事件冒泡等问题
    // 不采用高级浏览器特性

    return function (fn) {
        var timer = setTimeout(fn, 0);
        return function () {
            clearTimeout(timer);
        };
    };

});
/**
 * @file 节流函数
 * @author musicode
 */
define('cc/function/debounce',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 节流调用
     *
     * @param {Function} fn 需要节制调用的函数
     * @param {number=} delay 调用的时间间隔，默认 50ms
     * @param {boolean=} lazy 是否在最后调用
     * @return {Function}
     */
    return function (fn, delay, lazy) {

        delay = $.type(delay) === 'number' ? delay : 50;

        var prevTime;
        var timer;

        function createTimer(args) {
            timer = setTimeout(
                function () {
                    timer = null;
                    prevTime = $.now();
                    fn.apply(null, $.makeArray(args));
                },
                delay
            );
        }

        return function () {

            if (lazy
                && prevTime > 0
                && $.now() - prevTime < delay
            ) {
                clearTimeout(timer);
                timer = null;
            }

            if (!timer) {
                createTimer(arguments);
            }

        };
    };

});
/**
 * @file 转成 number 类型
 * @author musicode
 */
define('cc/function/toNumber',['require','exports','module'],function (require, exports, module) {

    'use strict';

    var parser = {
        int: parseInt,
        float: parseFloat
    };

    /**
     * 转成 number 类型
     *
     * @param {*} value
     * @param {*=} defaultValue 转换失败时的默认值
     * @param {string=} parseType 如果需要解析转换，可传入 int 或 float
     * @return {number}
     */
    return function (value, defaultValue, parseType) {

        if ($.type(value) !== 'number') {

            var parse = parser[ parseType ];

            if (parse) {
                value = parse(value, 10);
            }
            else if ($.isNumeric(value)) {
                value = + value;
            }
            else {
                value = NaN;
            }
        }

        return isNaN(value) ? defaultValue : value;

    };

});
/**
 * @file 处理多个 Promise 的 resolve 和 reject
 * @author musicode
 */
define('cc/function/allPromises',['require','exports','module'],function (require, exports, module) {

    'use strict';

    return function (promises) {

        var deferred = $.Deferred();

        $.when
            .apply($, promises)
            .then(
                function () {
                    deferred.resolve(
                        $.makeArray(arguments)
                    );
                },
                function () {
                    deferred.reject(
                        $.makeArray(arguments)
                    );
                }
            );

        return deferred;

    };

});
/**
 * @file 等待数组中的 promise 切换状态
 * @author musicode
 */
define('cc/function/waitPromises',['require','exports','module','./allPromises'],function (require, exports, module) {

    'use strict';

    var allPromises = require('./allPromises');

    return function (array, callback) {

        var promises = [ ];
        var indexes = [ ];

        $.each(
            array,
            function (index, item) {
                if ($.isFunction(item.then)) {
                    promises.push(item);
                    indexes.push(index);
                }
            }
        );

        if (promises.length > 0) {
            return allPromises(promises)
                .then(function (data) {
                    $.each(
                        data,
                        function (index, item) {
                            array[indexes[index]] = item;
                        }
                    );
                    callback();
                });
        }
        else {
            return callback();
        }

    };

});
/**
 * @file 生成全局唯一的 ID
 * @author musicode
 */
define('cc/function/guid',['require','exports','module'],function (require, exports, module) {

    var index = 0;

    return function () {
        return 'cc_' + index++;
    };

});
/**
 * @file 拦截
 * @author musicode
 */
define('cc/function/around',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 在方法执行前后进行拦截
     *
     * 1. 可拦截对象的方法
     * 2. 可拦截单纯的函数
     * 3. 如果 before 返回 false，可阻止后续执行
     * 4. after 如果返回非 undefined 值，可改写返回值
     */

    /**
     * 在方法执行前后进行拦截
     *
     * @param {(Object|Function)} target 拦截的对象或函数
     * @param {?string} name 如果 target 是 Object，name 表示它的属性名
     * @param {Function} before
     * @param {Function} after
     * @return {?Function}
     */
    return function (target, name, before, after) {

        var isMethod = $.type(name) === 'string';
        var origin = isMethod ? target[name] : target;

        // 调整参数顺序
        if (!isMethod) {
            after = before;
            before = name;
        }

        var wrapper = function () {

            var result;
            var args = $.makeArray(arguments);

            if ($.isFunction(before)) {
                result = before.apply(this, args);
            }

            if (result !== false) {

                if ($.isFunction(origin)) {
                    result = origin.apply(this, args);
                }

                if ($.isFunction(after)) {

                    args.push(result);

                    var temp = after.apply(this, args);

                    // 覆盖返回值
                    if ($.type(temp) !== 'undefined') {
                        result = temp;
                    }

                }

                return result;

            }
        };

        return isMethod
             ? (target[name] = wrapper)
             : wrapper;

    };

});
/**
 * @file 复制属性
 * @author musicode
 */
define('cc/function/extend',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 从 from 复制属性到 to
     *
     * 如果 to 已经存在某属性，则跳过
     *
     * @param {Object} to
     * @param {Object} from
     */
    return function (to, from) {

        if ($.isPlainObject(from)) {
            $.each(
                from,
                function (name, fn) {
                    if (!(name in to)) {
                        to[ name ] = fn;
                    }
                }
            );
        }

    };

});
/**
 * @file 第一个字母转成大写
 * @author musicode
 */
define('cc/function/ucFirst',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 转成 number 类型
     *
     * @param {string} word
     * @return {string}
     */
    return function (word) {

        return word.charAt(0).toUpperCase()
             + word.slice(1);

    };

});
/**
 * @file 转成 boolean 类型
 * @author musicode
 */
define('cc/function/toBoolean',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 转成 boolean 类型
     *
     * @param {*} value
     * @param {*} defaultValue
     * @return {*}
     */
    return function (value, defaultValue) {

        if ($.type(value) !== 'boolean') {

            if (arguments.length === 1) {
                defaultValue = !!value;
            }

            value = defaultValue;

        }

        return value;

    };

});
/**
 * @file 创建 jQuery 事件对象
 * @author musicode
 */
define('cc/function/createEvent',['require','exports','module'],function (require, exports, module) {

    'use strict';

    return function (event) {

        if (event && !event[ $.expando ]) {
            event = $.type(event) === 'string' || event.type
                ? $.Event(event)
                : $.Event(null, event);
        }

        return event || $.Event();

    };

});
/**
 * @file jq 的 replaceWith 会解绑所有事件，太坑了..
 * @author musicode
 */
define('cc/function/replaceWith',['require'],function (require) {

    'use strict';

    return function (oldElement, newElement) {

        oldElement = oldElement[0];
        newElement = newElement[0];

        oldElement.parentNode.replaceChild(newElement, oldElement);

    };

});
/**
 * @file 向上寻找最近的非 static 定位元素
 * @author musicode
 */
define('cc/function/offsetParent',['require','exports','module'],function (require, exports, module) {

    'use strict';

    // 好像有个 offsetParent 属性？

    function test(element) {
        return element.is('body')
            || element.css('position') !== 'static';
    }

    /**
     * 向上寻找最近的非 static 定位元素
     *
     * jQuery 的 offsetParent 不靠谱
     *
     * @param {jQuery} element
     * @return {jQuery}
     */
    return function (element) {

        if (element.is('body')) {
            return element;
        }

        var target = element.parent();

        while (!test(target)) {
            target = target.parent();
        }

        return target;
    };

});
/**
 * @file 使对象具有事件特性
 * @author musicode
 */
define('cc/util/event',['require','exports','module','../function/extend','../function/createEvent'],function (require, exports, module) {

    'use strict';

    var extend = require('../function/extend');
    var createEvent = require('../function/createEvent');

    var methods = {

        get$: function () {
            var me = this;
            if (!me.$) {
                me.$ = $({});
            }
            return me.$;
        },

        /**
         * 绑定事件
         */
        on: function (event, data, handler) {
            this.get$().on(event, data, handler);
            return this;
        },

        /**
         * 绑定一次事件
         */
        once: function (event, data, handler) {
            this.get$().one(event, data, handler);
            return this;
        },

        /**
         * 解绑事件
         */
        off: function (event, handler) {
            this.get$().off(event, handler);
            return this;
        },

        /**
         * 触发事件
         *
         * @param {Event|string} event 事件对象或事件名称
         * @param {Object=} data 事件数据
         * @return {Event}
         */
        emit: function (event, data) {
            event = createEvent(event);
            this.get$().trigger(event, data);
            return event;
        }
    };

    exports.extend = function (proto) {
        extend(proto, methods);
    };

});
/**
 * @file 组件生命周期管理
 * @author musicode
 */
define('cc/util/life',['require','exports','module','../function/guid','../function/around','../function/extend','../function/ucFirst','../function/nextTick','../function/toBoolean','../function/createEvent','../function/replaceWith','../function/offsetParent','./event'],function (require, exports, module) {

    'use strict';

    var guid = require('../function/guid');
    var around = require('../function/around');
    var extend = require('../function/extend');
    var ucFirst = require('../function/ucFirst');
    var nextTick = require('../function/nextTick');
    var toBoolean = require('../function/toBoolean');
    var createEvent = require('../function/createEvent');
    var replaceWith = require('../function/replaceWith');
    var offsetParent = require('../function/offsetParent');

    var eventUtil = require('./event');

    var instances = { };

    var UPDATE_ASYNC = '__update_async__';

    /**
     * setter 构造器
     *
     * @inner
     * @param {string} singular 单数形式
     * @param {string} complex 复数形式
     * @param {string} setter setter 方法
     * @param {string} getter getter 方法
     */
    function createSettter(singular, complex, setter, getter, validate) {

        return function (name, value, options) {

            var me = this;

            if ($.isPlainObject(name)) {

                options = value;

                $.each(
                    name,
                    function (name, value) {
                        me[ setter ](name, value, options);
                    }
                );

                return;

            }

            options = options || { };

            var oldValue = me[ getter ](name);

            var validator = me.constructor[ singular + 'Validator' ];
            if (validator) {
                if ($.isFunction(validator[ name ])) {
                    value = validator[ name ].call(me, value, options);
                }
            }

            if ($.isFunction(validate)) {
                value = validate(me, value, options);
            }

            if (oldValue === value && !options.force) {
                return;
            }

            me[ complex ][ name ] = value;

            if (options.silent) {
                return;
            }

            var record = { };
            extend(record, options);

            record.newValue = value;
            record.oldValue = oldValue;

            var change = { };
            change[name] = record;

            var watchChangeSync = function (watch) {
                if (watch && watch[ name ]) {
                    me.execute(
                        watch[ name ],
                        [ value, oldValue, record ]
                    );
                }
            };

            watchChangeSync(
                me.inner('watchSync')
            );
            watchChangeSync(
                me.option('watchSync')
            );

            if (options.sync) {
                watchChangeSync(
                    me.constructor[ singular + 'Updater' ]
                );
                watchChangeSync(
                    me.option('watch')
                );
                me.emit(singular + 'change', change);
                return;
            }

            var changes = me.inner(singular + 'Changes');
            if (!changes) {
                changes = { };
                me.inner(singular + 'Changes', changes);
            }

            $.extend(changes, change);

            if (!me.inner(UPDATE_ASYNC)) {
                me.inner(
                    UPDATE_ASYNC,
                    nextTick(function () {
                        me.sync(UPDATE_ASYNC);
                    })
                );
            }

        };

    }

    /**
     * 元素共享池
     *
     * key 是元素模板字符串，value 是 jQuery 对象
     *
     * @inner
     * @type {Object}
     */
    var elementSharePool = {

    };

    function initStructError() {
        this.error('initStruct() can just call one time.');
    }

    var methods = {

        /**
         * 处理模板替换
         */
        initStruct: function () {

            var me = this;

            var mainElement = me.option('mainElement');
            var mainTemplate = me.option('mainTemplate');

            if ($.type(mainTemplate) === 'string') {

                var share = me.option('share');
                var cacheKey = me.type + mainTemplate;
                if (share) {
                    mainElement = elementSharePool[ cacheKey ];
                }

                var tempElement;
                if (!mainElement) {
                    tempElement = $(mainTemplate);
                    if (share) {
                        elementSharePool[ cacheKey ] = tempElement;
                    }
                }
                else {
                    if (me.option('replace')) {
                        replaceWith(
                            mainElement,
                            tempElement = $(mainTemplate)
                        );
                    }
                    else {
                        mainElement.html(mainTemplate);
                    }
                }

                if (tempElement) {
                    mainElement = tempElement;
                    me.option('mainElement', mainElement);
                }

            }


            var parentSelector = me.option('parentSelector');
            if (parentSelector && !mainElement.parent().is(parentSelector)) {
                mainElement.appendTo(parentSelector);
            }

            me.initStruct = initStructError;

        },

        /**
         * 打印警告信息
         *
         * @param {string} msg
         */
        warn: function (msg) {
            if (typeof console !== 'undefined') {
                console.warn([ '[CC warn]', this.type, msg ].join(' '));
            }
        },

        /**
         * 打印错误信息
         *
         * @param {string} msg
         */
        error: function (msg) {
            throw new Error([ '[CC error]', this.type, msg ].join(' '));
        },

        /**
         * DOM 事件代理
         */
        live: function (event, selector, handler) {
            var me = this;
            var mainElement = me.inner('main');
            if (mainElement) {
                mainElement.on(event + me.namespace(), selector, handler);
            }
            return me;
        },

        /**
         * 触发事件
         *
         * @param {Event|string} event 事件对象或事件名称
         * @param {Object=} data 事件数据
         * @return {Event}
         */
        emit: function (event, data) {

            var me = this;
            var context = me.option('context') || me;

            event = createEvent(event);
            event.cc = context;

            var args = [ event ];
            if ($.isPlainObject(data)) {
                args.push(data);
            }

            event.type = event.type.toLowerCase();

            /**
             * event handler 执行顺序如下：
             * 1. 通过 instance.on 注册的优先使用
             * 2. 执行 options.ontype
             * 3. 执行 options.ontype_ 内部使用，确保有机会在最后执行一些逻辑
             */

            var eventCore = context.get$();
            eventCore.trigger.apply(eventCore, args);

            var ontype = 'on' + event.type;

            if (!event.isPropagationStopped()
                && context.execute(ontype, args) === false
            ) {
                event.preventDefault();
                event.stopPropagation();
            }

            context.execute(ontype + '_', args);

            return event;

        },

        dispatch: function (event, data) {

            if (event.isPropagationStopped()) {
                return;
            }

            // event.originalEvent 通常是 DOM 事件
            // 为了避免外部过多的判断，这里来保证
            if (!event.originalEvent) {
                event.originalEvent = {
                    preventDefault: $.noop,
                    stopPropagation: $.noop
                };
            }

            var dispatchEvent = $.Event(event);
            dispatchEvent.type = 'dispatch';

            this.emit(dispatchEvent, data);

            if (dispatchEvent.isPropagationStopped()) {
                event.preventDefault();
                event.stopPropagation();
            }

        },

        /**
         * 监听 before 事件，比如 before('init', function () { });
         *
         * @param {string} event
         * @param {Function} handler
         * @return {Object}
         */
        before: function (event, handler) {
            return this.on(
                'before' + event.toLowerCase(),
                handler
            );
        },

        /**
         * 监听 after 事件，比如 after('init', function () { });
         *
         * @param {string} event
         * @param {Function} handler
         * @return {Object}
         */
        after: function (event, handler) {
            return this.on(
                'after' + event.toLowerCase(),
                handler
            );
        },

        /**
         * 在主元素中查找子元素
         *
         * @param {string} selector
         * @return {jQuery?}
         */
        find: function (selector) {
            var mainElement = this.inner('main');
            if (mainElement) {
                var result = mainElement.find(selector);
                if (result.length) {
                    return result;
                }
            }
        },

        /**
         * 把组件元素加到 target 内部结束位置
         */
        appendTo: function (target) {
            var element = this.inner('main');
            if (element) {
                element.appendTo(target);
            }
        },

        /**
         * 把组件元素加到 target 内部开始位置
         */
        prependTo: function (target) {
            var element = this.inner('main');
            if (element) {
                element.prependTo(target);
            }
        },

        /**
         * 以组件的身份执行一个函数
         *
         * @param {string|Function} name
         * @param {*} args
         * @return {*}
         */
        execute: function (name, args) {

            var me = this;
            var fn = name;

            if ($.type(name) === 'string') {
                fn = me.option(name);
            }

            if ($.isFunction(fn)) {

                var context = me.option('context') || me;

                if ($.isArray(args)) {
                    return fn.apply(context, args);
                }
                else {
                    return fn.call(context, args);
                }

            }

        },

        renderWith: function (data, template, element) {

            var me = this;

            /**
             * mainTemplate 会在 initStruct() 中用于改写主元素
             * 它可以用来设置组件结构，但最好不要用于局部刷新，因为异步更新的关系，会短暂的出现原始模板
             *
             * renderTemplate 用于设置局部刷新的模板
             * renderSelector 是一个可选项，如果布局刷新的是主元素，那么 renderSelector 可省略
             *
             */

            if (!template) {
                template = me.option('renderTemplate');
                if (!template) {
                    template = me.option('mainTemplate');
                }
            }

            if (!element) {
                element = me.option('mainElement');
            }

            var renderSelector = me.option('renderSelector');
            if (renderSelector) {
                element = element.find(renderSelector);
            }

            var html;

            if ($.isPlainObject(data) || $.isArray(data)) {
                html = me.execute('render', [ data, template ]);
            }
            else if ($.type(data) === 'string') {
                html = data;
            }

            element.html(html);

        },

        /**
         * jquery 事件的命名空间
         *
         * @return {string}
         */
        namespace: function () {
            return '.' + this.guid;
        },

        /**
         * option 的 getter/setter
         *
         * @param {string} name
         * @param {*?} value
         * @return {*?}
         */
        option: function (name, value) {

            var me = this;

            if (arguments.length === 1 && $.type(name) === 'string') {
                return me.options[ name ];
            }
            else {

                if ($.isPlainObject(name)) {
                    $.each(name, function (name, value) {
                        me.option(name, value);
                    });
                    return;
                }

                me.options[ name ] = value;

            }

        },

        /**
         * 私有属性的 getter/setter
         *
         * @param {string} name
         * @param {*?} value
         * @return {*?}
         */
        inner: function (name, value) {

            var me = this;

            // 做一个容错，避免销毁后再次调用
            var inners = me.inners || { };

            if (arguments.length === 1 && $.type(name) === 'string') {
                return inners[ name ];
            }
            else {

                if ($.isPlainObject(name)) {
                    $.each(name, function (name, value) {
                        me.inner(name, value);
                    });
                    return;
                }

                inners[ name ] = value;

            }

        },

        /**
         * state getter
         *
         * @param {string} name
         * @return {boolean?}
         */
        is: function (name) {
            return this.states[ name ];
        },

        /**
         * state setter
         */
        state: createSettter('state', 'states', 'state', 'is',
            function (instance, value) {
                return toBoolean(value, false);
            }
        ),

        /**
         * property getter
         */
        get: function (name) {
            return this.properties[ name ];
        },

        /**
         * property setter
         */
        set: createSettter('property', 'properties', 'set', 'get')

    };

    var aspectMethods = {

        /**
         * 为了更好的性能，以及彻底解决初始化触发 change 事件带来的同步问题
         * 新版把 change 事件做成了单独时间片触发
         *
         * 每个组件都有一个异步更新定时器，在 dispose 时，会把异步的更新立即执行掉
         */
        sync: function () {

            var me = this;

            var update = function (changes, updater, complex) {

                $.each(
                    changes,
                    function (name, change) {
                        return me.execute(
                            updater[ name ],
                            [
                                change.newValue,
                                change.oldValue,
                                complex ? changes : change
                            ]
                        );
                    }
                );

            };

            $.each(
                [ 'property', 'state' ],
                function (index, key) {
                    var changes = me.inner(key + 'Changes');
                    if (changes) {

                        me.inner(key + 'Changes', null);

                        var staticUpdater = me.constructor[ key + 'Updater' ];
                        if (staticUpdater) {
                            update(changes, staticUpdater, true);
                        }

                        var watch = me.option('watch');
                        if (watch) {
                            update(changes, watch);
                        }

                        me.emit(key + 'change', changes);

                    }
                }
            );

            // 手动调的
            if (arguments[0] !== UPDATE_ASYNC) {
                me.execute(
                    me.inner(UPDATE_ASYNC)
                );
            }

            me.inner(UPDATE_ASYNC, false);

        },

        _sync: function () {
            if (!this.inner(UPDATE_ASYNC)) {
                return false;
            }
        },

        _init: function () {
            var state = 'initCalled';
            if (this.is(state)) {
                return false;
            }
            this.state(state, true);
        },

        _dispose: function () {
            var state = 'disposeCalled';
            if (this.is(state)) {
                return false;
            }
            this.state(state, true);
        }

    };

    /**
     * 执行实例的拦截方法
     *
     * 返回 false 可以阻止方法执行，返回 Object 可作为 before after 的事件数据
     *
     * @inner
     * @param {Object} instance 组件实例
     * @param {string} name 拦截方法名称
     * @param {Object} args 拦截方法参数
     * @param {Object} type before or false
     * @param {Object} event 事件
     * @return {boolean?}
     */
    function executeAspect(instance, name, args, type, event) {

        var result;

        var aspect = type === 'before'
                   ? ('_' + name)
                   : (name + '_');

        var method = instance[ aspect ];
        if ($.isFunction(method)) {
            result = method.apply(instance, args);
            if (result !== false && !$.isPlainObject(result)) {
                result = null;
            }
        }

        if (result === false) {
            return false;
        }

        var dispatch = false;
        if (result && result.dispatch) {
            dispatch = true;
            delete result.dispatch;
        }

        event = $.Event(event);
        event.type = type + name;

        instance.emit(event, result);
        if (dispatch) {
            instance.dispatch(event, result);
        }

        if (event.isDefaultPrevented()) {
            return false;
        }

    }

    /**
     * 扩展原型
     *
     * @param {Object} proto
     * @param {Array.<string>} exclude 不需要拦截的方法
     */
    exports.extend = function (proto, exclude) {

        // 前置方法返回 false 可拦截方法执行，后置方法返回 false 可阻止广播 after 事件
        //
        // 前置和后置方法都可以返回 Object，作为 before 和 after 事件的数据，即 trigger(type, data);
        //
        // 拦截方法的写法来自某一天的灵光咋现，因为我不喜欢私有属性和方法带上下划线前缀，但是下划线用来标识前后似乎非常优雅
        //
        // 比如 _show 表示显示之前，show_ 表示显示之后，非常直白

        extend(proto, aspectMethods);

        $.each(proto, function (name, method) {

            var index = name.indexOf('_');

            // 前置和后置方法不用拦截
            if (!$.isFunction(method)
                || index === 0
                || index === name.length - 1
            ) {
                return;
            }

            if ($.isArray(exclude)
                && $.inArray(name, exclude) >= 0
            ) {
                return;
            }


            var beforeHandler = function (e) {
                return executeAspect(this, name, arguments, 'before', e);
            };

            var afterHandler = function (e) {

                var me = this;
                var args = arguments;

                var emitAfterEvent = function () {
                    return executeAspect(me, name, args, 'after', e);
                };

                if (method.length + 1 === args.length) {
                    // 最后一个参数是方法执行结果
                    // 如果返回了 promise，等待它完成
                    var executeResult = args[ args.length - 1 ];
                    if (executeResult && $.isFunction(executeResult.then)) {
                        executeResult.then(emitAfterEvent);
                        return;
                    }
                }

                emitAfterEvent();

            };

            around(proto, name, beforeHandler, afterHandler);

        });

        extend(proto, methods);
        eventUtil.extend(proto);

    };

    /**
     * 初始化组件
     *
     * @param {*} instance 组件实例对象
     * @param {Object} options 初始化组件所用的配置
     * @return {*} 组件实例
     */
    exports.init = function (instance, options) {

        // options 不要污染 instance，避免 API 的设计自由因 options 字段名受到影响
        if (!options) {
            options = { };
        }

        extend(options, instance.constructor.defaultOptions);

        options.onafterinit_ = function () {
            instance.state('inited', true);
        };
        options.onafterdispose_ = function () {

            instance.state('disposed', true);
            instance.off();

            var mainElement = instance.inner('main');
            if (instance.option('removeOnDispose') && mainElement) {
                mainElement.remove();
            }

            nextTick(function () {
                delete instances[ instance.guid ];

                instance.properties =
                instance.options =
                instance.changes =
                instance.states =
                instance.inners =
                instance.guid = null;
            });

        };


        instances[ instance.guid = guid() ] = instance;

        // 用 properties 属性管理属性
        instance.properties = { };

        // 用 options 属性管理用户配置
        instance.options = options;

        // 用 options 属性管理状态
        instance.states = { };

        // 用 inners 属性管理内部属性
        instance.inners = { };

        instance.init();

        return instance;

    };

    /**
     * 销毁组件
     *
     * @param {*} instance 组件实例
     */
    exports.dispose = function (instance) {

        instance.sync();

        var mainElement = instance.inner('main');
        if (mainElement) {
            mainElement.off();
        }

    };

});
/**
 * @file Object.keys
 * @author musicode
 */
define('cc/function/keys',['require','exports','module'],function (require, exports, module) {

    'use strict';

    return function (obj) {

        if (Object.keys) {
            return Object.keys(obj);
        }

        var result = [];
        $.each(obj, function (key) {
           result.push(key);
        });

        return result;

    };

});
/**
 * @file 验证器（DOM 无关）
 * @author musicode
 */
define('cc/util/validator',['require','exports','module','../function/allPromises','../function/keys'],function (require, exports, module) {

    'use strict';

    var allPromises = require('../function/allPromises');
    var keys = require('../function/keys');

    /**
     * 内置常用规则
     *
     * @inner
     * @type {Object}
     */
    var buildInRules = {

        required: function (data, rules) {
            if (data.value === 0 || data.value) {
                return true;
            }
            var required = rules.required;
            if (required === true) {
                return false;
            }
        },

        pattern: function (data, rules) {
            var pattern = rules.pattern;
            if ($.type(pattern) === 'string') {
                pattern = exports.buildInPatterns[ pattern ];
            }
            if (pattern instanceof RegExp) {
                return pattern.test(data.value);
            }
        },

        minlength: function (data, rules) {
            var minlength = rules.minlength;
            if ($.isNumeric(minlength)) {
                return data.value.length >= + minlength;
            }
        },

        maxlength: function (data, rules) {
            var maxlength = rules.maxlength;
            if ($.isNumeric(maxlength)) {
                return data.value.length <= + maxlength;
            }
        },

        min: function (data, rules) {
            var min = rules.min;
            if ($.isNumeric(min)) {
                return data.value >= + min;
            }
        },

        max: function (data, rules) {
            var max = rules.max;
            if ($.isNumeric(max)) {
                return data.value <= + max;
            }
        },

        step: function (data, rules) {
            var min = rules.min;
            var step = rules.step;
            if ($.isNumeric(min) && $.isNumeric(step)) {
                return (data.value - min) % step === 0;
            }
        },

        equals: function (data, rules, all) {
            var equals = rules.equals;
            if ($.type(equals) === 'string') {
                return data.value === all[ equals ].value;
            }
        }

    };

    /**
     * 内置常用正则
     *
     * @type {Object}
     */
    exports.buildInPatterns = {
        int: /^\d+$/,
        number: /^-?[\d.]*$/,
        positive: /^[\d.]*$/,
        negative: /^-[\d.]*$/,
        char: /^[\w\u2E80-\u9FFF]+$/,
        url: /^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/,
        tel: /^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/,
        mobile: /^1[3-9]\d{9}$/,
        email: /^(?:[a-z0-9]+[_\-+.]+)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i
    };

    function list2Map(list) {
        var map = { };
        $.each(list, function (index, item) {
            if (item.name) {
                map[item.name] = item;
            }
        });
        return map;
    }

    /**
     *
     * @param {Object} data 待验证的数据，格式如下：
     *                      {
     *                          key1: {
     *                              value: '', // value 需要经过 trim
     *                              extra      // 扩展数据，比如 DOM 元素
     *                          }
     *                      }
     *
     * @param {Object} rules 验证规则，格式如下：
     *                       {
     *                           key1: {
     *                               before: function () {
     *                                  // 返回 false 可拦截 key1 的后续验证，这取决于字段的验证顺序
     *                               },
     *                               after: function () {
     *                                  // 验证完做一些处理
     *                               },
     *                               // 如果对顺序有要求，可配置 sequence
     *                               // 否则取决于遍历 rules 对象的顺序
     *                               sequence: [ 'required', 'pattern', 'customRule' ],
     *                               rules: {
     *                                   required: true,
     *                                   pattern: 'buildIn' or /xx/,
     *                                   customRule: function () {
     *                                      // 返回值：
     *                                      // true -> 同步验证通过
     *                                      // false -> 同步验证失败
     *                                      // promise -> 异步校验，异步值和同步返回值作用相同
     *                                      // 其他 -> 跳过
     *                                   }
     *                               },
     *                               errors: {
     *                                   required: 'required error',
     *                                   pattern: 'pattern error',
     *                                   customRule: 'customRule error'
     *                               }
     *                           }
     *                       }
     *
     * @param {Array.<string>=} sequence 验证字段的顺序，可选
     */
    exports.validate = function (data, rules, sequence) {

        var list = [ ];
        var promises = [ ];

        if (!$.isArray(sequence)) {
            sequence = keys(data);
        }

        $.each(
            sequence,
            function (index, key) {

                var fieldData = data[ key ];
                var fieldConfig = rules[ key ];

                if (!fieldConfig) {
                    return;
                }

                var result = $.extend({ name: key }, fieldData);

                if ($.isFunction(fieldConfig.before)
                    && fieldConfig.before(data, list2Map(list)) === false
                ) {
                    list.push(result);
                    return;
                }


                var fieldRules = fieldConfig.rules;
                var fieldFailedRule;

                var promiseNames = [ ];
                var promiseValues = [ ];

                var required = fieldRules.required;
                if ($.isFunction(required)) {
                    required = required(fieldData, fieldRules, data);
                }
                if (fieldData.value !== '' || required === true) {

                    var validateComplete = function (name, result) {
                        if (result === false) {
                            fieldFailedRule = name;
                        }
                        else if (result && $.isFunction(result.then)) {
                            result.then(validateComplete);
                            promiseNames.push(name);
                            promiseValues.push(result);
                        }
                        else if ($.type(result) !== 'boolean') {
                            result = false;
                        }
                        return result;
                    };
                    var validate = function (name, value) {
                        if (!$.isFunction(value)) {
                            value = buildInRules[ name ];
                        }
                        if ($.isFunction(value)) {
                            return validateComplete(
                                name,
                                value(fieldData, fieldRules, data)
                            );
                        }
                    };

                    var sequence = $.isArray(fieldConfig.sequence)
                        ? fieldConfig.sequence
                        : keys(fieldRules);

                    $.each(
                        sequence,
                        function (index, name) {
                            return validate(name, fieldRules[name]);
                        }
                    );

                }

                var extend = function () {

                    if (fieldFailedRule) {
                        result.rule = fieldFailedRule;
                        var error = fieldConfig.errors[ fieldFailedRule ];
                        if ($.isFunction(error)) {
                            error = error(fieldData, fieldRules, data);
                        }
                        result.error = error;
                    }

                    if ($.isFunction(fieldConfig.after)) {
                        fieldConfig.after(result, list2Map(list));
                    }

                };

                var index;

                if (promiseValues.length) {

                    var promise =

                    allPromises(promiseValues)
                        .then(function (values) {

                            $.each(
                                values,
                                function (index, value) {
                                    if (value === false) {
                                        fieldFailedRule = promiseNames[ index ];
                                        return false;
                                    }
                                }
                            );

                            extend();
                            list[ index - 1 ] = result;

                        });

                    index = list.push(promise);

                    promises.push(promise);

                }
                else {
                    extend();
                    list.push(result);
                }

            }
        );

        if (promises.length) {
            return allPromises(promises)
                .then(function () {
                    return list;
                });
        }

        return list;


    };

});
/**
 * @file 表单验证器
 * @author musicode
 */
define('cc/form/Validator',['require','exports','module','../function/isHidden','../function/nextTick','../function/debounce','../function/toNumber','../function/waitPromises','../util/life','../util/validator'],function (require, exports, module) {

    'use strict';

    var isHidden = require('../function/isHidden');
    var nextTick = require('../function/nextTick');
    var debounce = require('../function/debounce');
    var toNumber = require('../function/toNumber');
    var waitPromises = require('../function/waitPromises');
    var lifeUtil = require('../util/life');
    var validator = require('../util/validator');

    /**
     * 表单验证通常包括 required, min, max 等
     * 为方便记忆，属性名称遵循 HTML5 标准，具体可参考 html5 input 元素属性
     *
     *  required: 是否必填（boolean）
     *       max: 数字最大值（number）
     *       min: 数字最小值（number）
     *      step: 数字步进值（number）
     * maxlength: 字符串最大长度（number）
     * minlength: 字符串最小长度（number）
     *   pattern: 正则（string|RegExp）
     *
     * ## 自定义错误
     *
     * util/validator 模块内置了一些常用的规则，比如上面列举的 html5 属性
     *
     * 如果需要自定义规则，需要以下两步：
     * 1. 为 rules 添加一个规则，value 是函数，函数细节请参考 util/validator 注释
     * 2. 为 errors 添加一个错误话术，value 是字符串
     *
     * ## 失焦验证
     *
     * 表单验证可通过 validateOnBlur 整体控制表单字段是否开启失焦验证，本着局部覆盖全局的原则，
     * fields 可为某个单独的字段设置 validateOnBlur
     *
     * {
     *     fields: {
     *         username: {
     *             // 可覆盖 options 中的全局 validateOnBlur
     *             validateOnBlur: false,
     *
     *             // 验证规则
     *             rules: {
     *                 required: true,
     *                 min: 3,
     *                 max: 10,
     *                 minlength: 3,
     *                 maxlength: 10,
     *                 pattern: 'number',
     *                 custom: function (data) {
     *                     var value = data.value;
     *                     ....
     *                     return true/false/Promise;
     *                 }
     *             },
     *
     *             // 与 rules 一一对应的错误信息
     *             errors: {
     *                 required: '请输入用户名',
     *                 min: '最小为 3',
     *                 ...,
     *                 custom: '自定义错误'
     *             }
     *
     *         }
     *     }
     * }
     *
     *
     */

    /**
     * 表单验证器
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.mainElement 表单元素
     * @property {boolean=} options.validateOnBlur 是否实时验证（元素失焦验证）
     * @property {boolean=} options.showFirstError 是否只显示第一个错误
     * @property {number=} options.scrollOffset 使用 autoScroll 时，为了避免顶部贴边，最好加上一些间距
     *
     * @property {string=} options.errorTemplate 错误模板
     * @property {string=} options.errorAttribute 找到错误对应的提示元素的属性，如 data-error-for
     *
     * @property {string=} options.formSelector 当出现多个表单共用一个验证器时，可提供此选项配置
     * @property {string=} options.groupSelector
     * @property {Function=} options.showErrorAnimation
     * @property {Function=} options.hideErrorAnimation
     *
     * @property {Object} options.fields 配置字段
     * @property {Array.<string>=} options.sequence 验证字段的顺序，可选
     *
     * @property {Function=} options.render
     *
     */
    function Validator(options) {
        lifeUtil.init(this, options);
    }

    var proto = Validator.prototype;

    proto.type = 'Validator';

    proto.init = function () {

        var me = this;

        var mainElement = me.option('mainElement');
        var namespace = me.namespace();

        mainElement.on(
            'focusin' + namespace,
            function (e) {

                var fieldElement = $(e.target);
                var fieldName = fieldElement.prop('name');

                var errorAttribute = me.option('errorAttribute');
                if (fieldName && errorAttribute) {
                    me.execute(
                        'hideErrorAnimation',
                        {
                            errorElement: mainElement.find(
                                '[' + errorAttribute + '="' + fieldName + '"]'
                            ),
                            fieldElement: fieldElement
                        }
                    );
                }

            }
        );

        mainElement.on(
            'focusout' + namespace,
            // 大多数场景下，不需要延迟执行
            // 对于输入框后面跟选择层的场景，点击选择层会导致输入框 blur，因此设置一个延时
            // 经测试，180ms 是一个最小可用延迟
            // 本着没必要配置就不配置的原则，这里直接写死
            debounce(
                function (e) {
                    var name = e.target.name;
                    if (name && me.guid) {
                        var config = me.option('fields')[name];
                        if (config) {
                            var local = config.validateOnBlur;
                            var global = me.option('validateOnBlur');
                            if (local === true || local == null && global) {
                                me.validate(name);
                            }
                        }
                    }
                },
                180
            )
        );


        me.inner({
            main: mainElement
        });


    };

    /**
     * 验证表单字段
     *
     * @param {(Array.<string>|string)=} fields 可选，验证一个或多个字段
     *                                          如 ['username', 'password']
     *                                          默认验证所有字段
     *
     * @param {boolean=} autoScroll 验证失败时，是否自动滚动到第一个错误项，当表单很长时，开启有利于提升体验
     *
     * @return {boolean|Promise} 是否验证成功
     */
    proto.validate = function (fields, autoScroll) {

        var me = this;

        var mainElement = me.option('mainElement');
        var formSelector = me.option('formSelector');
        var groupSelector = me.option('groupSelector');
        var showFirstError = me.option('showFirstError');

        if ($.type(fields) === 'string') {
            fields = [ fields ];
        }
        else if (!$.isArray(fields)) {

            if ($.type(fields) === 'boolean') {
                autoScroll = fields;
            }

            fields = [ ];

            $.each(
                me.option('fields'),
                function (name) {
                    fields.push(name);
                }
            );

        }

        var validate = function (container) {
            var data = { };
            $.each(
                fields,
                function (index, name) {

                    var fieldElement = container.find('[name="' + name + '"]');
                    if (fieldElement.length !== 1 || fieldElement.prop('disabled')) {
                        return;
                    }

                    var value = fieldElement.val();
                    if (fieldElement.prop('type') !== 'password') {
                        value = $.trim(value);
                    }

                    var item = {
                        name: name,
                        value: value,
                        fieldElement: fieldElement
                    };

                    if (groupSelector) {
                        var groupElement = fieldElement.closest(groupSelector);
                        if (isHidden(groupElement)) {
                            return;
                        }
                        if (groupElement.length === 1) {
                            item.groupElement = groupElement;
                        }
                    }

                    data[ name ] = item;

                }
            );
            return validator.validate(
                data,
                me.option('fields'),
                me.option('sequence')
            );
        };

        var result = [ ];
        var addResult = function (item) {
            if ($.isArray(item) && item.length === 0) {
                return;
            }
            result.push(item);
        };

        if (formSelector) {
            mainElement.find(formSelector).each(
                function () {
                    addResult(
                        validate($(this))
                    );
                }
            );
        }
        else {
            addResult(
                validate(mainElement)
            );
        }


        var errors = [ ];

        var validateComplete = function () {

            var errorAttribute = me.option('errorAttribute');
            var errorTemplate = me.option('errorTemplate');

            var fields = [ ];
            $.each(
                result,
                function (index, item) {
                    $.each(
                        item,
                        function (index, item) {
                            fields.push(item);
                        }
                    );
                }
            );

            var hasShowError = false;

            $.each(
                fields,
                function (index, item) {

                    var animationOptions = {
                        fieldElement: item.fieldElement
                    };
                    var errorElement;
                    if (errorAttribute) {
                        errorElement = mainElement.find('[' + errorAttribute + '=' + item.name + ']');
                        animationOptions.errorElement = errorElement;
                    }

                    var error = item.error;
                    if (error) {
                        errors.push(item);
                        if (!showFirstError || !hasShowError) {
                            hasShowError = true;

                            if (errorElement) {
                                var html = me.execute(
                                    'render',
                                    [
                                        {
                                            error: error
                                        },
                                        errorTemplate
                                    ]
                                );
                                errorElement.html(html);
                            }

                            animationOptions.rule = item.rule;
                            animationOptions.error = error;

                            me.execute(
                                'showErrorAnimation',
                                animationOptions
                            );
                        }
                    }
                    else {
                        me.execute(
                            'hideErrorAnimation',
                            animationOptions
                        );
                    }
                }
            );

            if (autoScroll && errors.length > 0) {

                var fieldElement = errors[ 0 ].fieldElement;
                if (fieldElement.is('input[type="hidden"]')) {
                    fieldElement = fieldElement.parent();
                }

                var top = fieldElement.offset().top
                        + toNumber(me.option('scrollOffset'), 0);

                window.scrollTo(
                    window.scrollX,
                    top
                );

            }

            nextTick(
                function () {
                    if (me.guid) {
                        me.emit(
                            'validatecomplete',
                            {
                                fields: fields,
                                errors: errors
                            }
                        );
                    }
                }
            );

        };


        return waitPromises(
            result,
            function () {
                validateComplete();
                return errors.length === 0;
            }
        );

    };

    proto.dispose = function () {

        var me = this;

        lifeUtil.dispose(me);

        me.inner('main').off(
            me.namespace()
        );

    };

    lifeUtil.extend(proto);


    return Validator;

});

/**
 * ETPL (Enterprise Template)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @file 模板引擎
 * @author errorrik(errorrik@gmail.com)
 *         otakustay(otakustay@gmail.com)
 */


// HACK: 可见的重复代码未抽取成function和var是为了gzip size，吐槽的一边去
define('cc/util/etpl',[],function () {

    /**
     * 对象属性拷贝
     *
     * @inner
     * @param {Object} target 目标对象
     * @param {Object} source 源对象
     * @return {Object} 返回目标对象
     */
    function extend(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }

        return target;
    }

    /**
     * 随手写了个栈
     *
     * @inner
     * @constructor
     */
    function Stack() {
        this.raw = [];
        this.length = 0;
    }

    Stack.prototype = {
        /**
         * 添加元素进栈
         *
         * @param {*} elem 添加项
         */
        push: function (elem) {
            this.raw[this.length++] = elem;
        },

        /**
         * 弹出顶部元素
         *
         * @return {*} 顶部元素
         */
        pop: function () {
            if (this.length > 0) {
                var elem = this.raw[--this.length];
                this.raw.length = this.length;
                return elem;
            }
        },

        /**
         * 获取顶部元素
         *
         * @return {*} 顶部元素
         */
        top: function () {
            return this.raw[this.length - 1];
        },

        /**
         * 获取底部元素
         *
         * @return {*} 底部元素
         */
        bottom: function () {
            return this.raw[0];
        },

        /**
         * 根据查询条件获取元素
         *
         * @param {Function} condition 查询函数
         * @return {*} 符合条件的元素
         */
        find: function (condition) {
            var index = this.length;
            while (index--) {
                var item = this.raw[index];
                if (condition(item)) {
                    return item;
                }
            }
        }
    };

    /**
     * 唯一id的起始值
     *
     * @inner
     * @type {number}
     */
    var guidIndex = 0x2B845;

    /**
     * 获取唯一id，用于匿名target或编译代码的变量名生成
     *
     * @inner
     * @return {string} 唯一id
     */
    function generateGUID() {
        return '___' + (guidIndex++);
    }

    /**
     * 构建类之间的继承关系
     *
     * @inner
     * @param {Function} subClass 子类函数
     * @param {Function} superClass 父类函数
     */
    function inherits(subClass, superClass) {
        /* jshint -W054 */
        var F = new Function();
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        /* jshint +W054 */
        // 由于引擎内部的使用场景都是inherits后，逐个编写子类的prototype方法
        // 所以，不考虑将原有子类prototype缓存再逐个拷贝回去
    }

    /**
     * HTML Filter替换的字符实体表
     *
     * @const
     * @inner
     * @type {Object}
     */
    var HTML_ENTITY = {
        /* jshint ignore:start */
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        /* eslint-disable quotes */
        "'": '&#39;'
        /* eslint-enable quotes */
        /* jshint ignore:end */
    };

    /**
     * HTML Filter的替换函数
     *
     * @inner
     * @param {string} c 替换字符
     * @return {string} 替换后的HTML字符实体
     */
    function htmlFilterReplacer(c) {
        return HTML_ENTITY[c];
    }

    /**
     * 默认filter
     *
     * @inner
     * @const
     * @type {Object}
     */
    var DEFAULT_FILTERS = {
        /**
         * HTML转义filter
         *
         * @param {string} source 源串
         * @return {string} 替换结果串
         */
        html: function (source) {
            return source.replace(/[&<>"']/g, htmlFilterReplacer);
        },

        /**
         * URL编码filter
         *
         * @param {string} source 源串
         * @return {string} 替换结果串
         */
        url: encodeURIComponent,

        /**
         * 源串filter，用于在默认开启HTML转义时获取源串，不进行转义
         *
         * @param {string} source 源串
         * @return {string} 替换结果串
         */
        raw: function (source) {
            return source;
        }
    };

    /**
     * 字符串字面化
     *
     * @inner
     * @param {string} source 需要字面化的字符串
     * @return {string} 字符串字面化结果
     */
    function stringLiteralize(source) {
        return '"'
            + source
                .replace(/\x5C/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/\x0A/g, '\\n')
                .replace(/\x09/g, '\\t')
                .replace(/\x0D/g, '\\r')
                // .replace( /\x08/g, '\\b' )
                // .replace( /\x0C/g, '\\f' )
            + '"';
    }

    /**
     * 对字符串进行可用于new RegExp的字面化
     *
     * @inner
     * @param {string} source 需要字面化的字符串
     * @return {string} 字符串字面化结果
     */
    function regexpLiteral(source) {
        return source.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+]/g, function (c) {
            return '\\' + c;
        });
    }

    /**
     * 字符串格式化
     *
     * @inner
     * @param {string} source 目标模版字符串
     * @param {...string} replacements 字符串替换项集合
     * @return {string} 格式化结果
     */
    function stringFormat(source) {
        var args = arguments;
        return source.replace(
            /\{([0-9]+)\}/g,
            function (match, index) {
                return args[index - 0 + 1];
            });
    }

    /**
     * 用于render的字符串变量声明语句
     *
     * @inner
     * @const
     * @type {string}
     */
    var RENDER_STRING_DECLATION = 'var r="";';

    /**
     * 用于render的字符串内容添加语句（起始）
     *
     * @inner
     * @const
     * @type {string}
     */
    var RENDER_STRING_ADD_START = 'r+=';

    /**
     * 用于render的字符串内容添加语句（结束）
     *
     * @inner
     * @const
     * @type {string}
     */
    var RENDER_STRING_ADD_END = ';';

    /**
     * 用于render的字符串内容返回语句
     *
     * @inner
     * @const
     * @type {string}
     */
    var RENDER_STRING_RETURN = 'return r;';

    // HACK: IE8-时，编译后的renderer使用join Array的策略进行字符串拼接
    if (typeof navigator !== 'undefined'
        && /msie\s*([0-9]+)/i.test(navigator.userAgent)
        && RegExp.$1 - 0 < 8
    ) {
        RENDER_STRING_DECLATION = 'var r=[],ri=0;';
        RENDER_STRING_ADD_START = 'r[ri++]=';
        RENDER_STRING_RETURN = 'return r.join("");';
    }

    /**
     * 将访问变量名称转换成getVariable调用的编译语句
     * 用于if、var等命令生成编译代码
     *
     * @inner
     * @param {string} name 访问变量名
     * @return {string} getVariable调用的编译语句
     */
    function toGetVariableLiteral(name) {
        name = name.replace(/^\s*\*/, '');
        return stringFormat(
            'gv({0},["{1}"])',
            stringLiteralize(name),
            name.replace(
                    /\[['"]?([^'"]+)['"]?\]/g,
                    function (match, name) {
                        return '.' + name;
                    }
                )
                .split('.')
                .join('","')
        );
    }

    /**
     * 解析文本片段中以固定字符串开头和结尾的包含块
     * 用于 命令串：<!-- ... --> 和 变量替换串：${...} 的解析
     *
     * @inner
     * @param {string} source 要解析的文本
     * @param {string} open 包含块开头
     * @param {string} close 包含块结束
     * @param {boolean} greedy 是否贪婪匹配
     * @param {function({string})} onInBlock 包含块内文本的处理函数
     * @param {function({string})} onOutBlock 非包含块内文本的处理函数
     */
    function parseTextBlock(source, open, close, greedy, onInBlock, onOutBlock) {
        var closeLen = close.length;
        var texts = source.split(open);
        var level = 0;
        var buf = [];

        for (var i = 0, len = texts.length; i < len; i++) {
            var text = texts[i];

            if (i) {
                var openBegin = 1;
                level++;
                /* eslint-disable no-constant-condition */
                while (1) {
                    var closeIndex = text.indexOf(close);
                    if (closeIndex < 0) {
                        buf.push(level > 1 && openBegin ? open : '', text);
                        break;
                    }

                    level = greedy ? level - 1 : 0;
                    buf.push(
                        level > 0 && openBegin ? open : '',
                        text.slice(0, closeIndex),
                        level > 0 ? close : ''
                    );
                    text = text.slice(closeIndex + closeLen);
                    openBegin = 0;

                    if (level === 0) {
                        break;
                    }
                }
                /* eslint-enable no-constant-condition */

                if (level === 0) {
                    onInBlock(buf.join(''));
                    onOutBlock(text);
                    buf = [];
                }
            }
            else {
                text && onOutBlock(text);
            }
        }

        if (level > 0 && buf.length > 0) {
            onOutBlock(open);
            onOutBlock(buf.join(''));
        }
    }

    /**
     * 编译变量访问和变量替换的代码
     * 用于普通文本或if、var、filter等命令生成编译代码
     *
     * @inner
     * @param {string} source 源代码
     * @param {Engine} engine 引擎实例
     * @param {boolean} forText 是否为输出文本的变量替换
     * @return {string} 编译代码
     */
    function compileVariable(source, engine, forText) {
        var code = [];
        var options = engine.options;

        var toStringHead = '';
        var toStringFoot = '';
        var wrapHead = '';
        var wrapFoot = '';

        // 默认的filter，当forText模式时有效
        var defaultFilter;

        if (forText) {
            toStringHead = 'ts(';
            toStringFoot = ')';
            wrapHead = RENDER_STRING_ADD_START;
            wrapFoot = RENDER_STRING_ADD_END;
            defaultFilter = options.defaultFilter;
        }

        parseTextBlock(
            source, options.variableOpen, options.variableClose, 1,

            function (text) {
                // 加入默认filter
                // 只有当处理forText时，需要加入默认filter
                // 处理if/var/use等command时，不需要加入默认filter
                if (forText && text.indexOf('|') < 0 && defaultFilter) {
                    text += '|' + defaultFilter;
                }

                // variableCode是一个gv调用，然后通过循环，在外面包filter的调用
                // 形成filter["b"](filter["a"](gv(...)))
                //
                // 当forText模式，处理的是文本中的变量替换时
                // 传递给filter的需要是字符串形式，所以gv外需要包一层ts调用
                // 形成filter["b"](filter["a"](ts(gv(...))))
                //
                // 当variableName以*起始时，忽略ts调用，直接传递原值给filter
                var filterCharIndex = text.indexOf('|');
                var variableName = (
                        filterCharIndex > 0
                        ? text.slice(0, filterCharIndex)
                        : text
                    ).replace(/^\s+/, '').replace(/\s+$/, '');
                var filterSource = filterCharIndex > 0
                    ? text.slice(filterCharIndex + 1)
                    : '';

                var variableRawValue = variableName.indexOf('*') === 0;
                var variableCode = [
                    variableRawValue ? '' : toStringHead,
                    toGetVariableLiteral(variableName),
                    variableRawValue ? '' : toStringFoot
                ];

                if (filterSource) {
                    filterSource = compileVariable(filterSource, engine);
                    var filterSegs = filterSource.split('|');
                    for (var i = 0, len = filterSegs.length; i < len; i++) {
                        var seg = filterSegs[i];

                        if (/^\s*([a-z0-9_-]+)(\((.*)\))?\s*$/i.test(seg)) {
                            variableCode.unshift('fs["' + RegExp.$1 + '"](');

                            if (RegExp.$3) {
                                variableCode.push(',', RegExp.$3);
                            }

                            variableCode.push(')');
                        }
                    }
                }

                code.push(
                    wrapHead,
                    variableCode.join(''),
                    wrapFoot
                );
            },

            function (text) {
                code.push(
                    wrapHead,
                    forText ? stringLiteralize(text) : text,
                    wrapFoot
                );
            }
        );

        return code.join('');
    }

    /**
     * 文本节点类
     *
     * @inner
     * @constructor
     * @param {string} value 文本节点的内容文本
     * @param {Engine} engine 引擎实例
     */
    function TextNode(value, engine) {
        this.value = value;
        this.engine = engine;
    }

    TextNode.prototype = {
        /**
         * 获取renderer body的生成代码
         *
         * @return {string} 生成代码
         */
        getRendererBody: function () {
            var value = this.value;
            var options = this.engine.options;

            if (!value
                || (options.strip && /^\s*$/.test(value))
            ) {
                return '';
            }

            return compileVariable(value, this.engine, 1);
        },

        /**
         * 复制节点的方法
         *
         * @return {TextNode} 节点复制对象
         */
        clone: function () {
            return this;
        }
    };

    /**
     * 命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function Command(value, engine) {
        this.value = value;
        this.engine = engine;
        this.children = [];
        this.cloneProps = [];
    }

    Command.prototype = {
        /**
         * 添加子节点
         *
         * @param {TextNode|Command} node 子节点
         */
        addChild: function (node) {
            this.children.push(node);
        },

        /**
         * 节点open，解析开始
         *
         * @param {Object} context 语法分析环境对象
         */
        open: function (context) {
            var parent = context.stack.top();
            parent && parent.addChild(this);
            context.stack.push(this);
        },

        /**
         * 节点闭合，解析结束
         *
         * @param {Object} context 语法分析环境对象
         */
        close: function (context) {
            if (context.stack.top() === this) {
                context.stack.pop();
            }
        },

        /**
         * 获取renderer body的生成代码
         *
         * @return {string} 生成代码
         */
        getRendererBody: function () {
            var buf = [];
            var children = this.children;
            for (var i = 0; i < children.length; i++) {
                buf.push(children[i].getRendererBody());
            }

            return buf.join('');
        },

        /**
         * 复制节点的方法
         *
         * @return {Command} 节点复制对象
         */
        clone: function () {
            var Clazz = this.constructor;
            var node = new Clazz(this.value, this.engine);

            /* eslint-disable no-redeclare */
            for (var i = 0, l = this.children.length; i < l; i++) {
                node.addChild(this.children[i].clone());
            }

            for (var i = 0, l = this.cloneProps.length; i < l; i++) {
                var prop = this.cloneProps[i];
                node[prop] = this[prop];
            }
            /* eslint-enable no-redeclare */

            return node;
        }
    };

    /**
     * 命令自动闭合
     *
     * @inner
     * @param {Object} context 语法分析环境对象
     * @param {Function=} CommandType 自闭合的节点类型
     * @return {Command} 被闭合的节点
     */
    function autoCloseCommand(context, CommandType) {
        var stack = context.stack;
        var closeEnd = CommandType
            ? stack.find(
                function (item) {
                    return item instanceof CommandType;
                }
            )
            : stack.bottom();

        if (closeEnd) {
            var node;

            while ((node = stack.top()) !== closeEnd) {
                /* jshint ignore:start */
                // 如果节点对象不包含autoClose方法
                // 则认为该节点不支持自动闭合，需要抛出错误
                // for等节点不支持自动闭合
                if (!node.autoClose) {
                    throw new Error(node.type + ' must be closed manually: ' + node.value);
                }
                /* jshint ignore:end */

                node.autoClose(context);
            }

            closeEnd.close(context);
        }

        return closeEnd;
    }

    /**
     * renderer body起始代码段
     *
     * @inner
     * @const
     * @type {string}
     */
    var RENDERER_BODY_START = ''
        + 'data=data||{};'
        + 'var v={},fs=engine.filters,hg=typeof data.get=="function",'
        + 'gv=function(n,ps){'
        +     'var p=ps[0],d=v[p];'
        +     'if(d==null){'
        +         'if(hg){return data.get(n);}'
        +         'd=data[p];'
        +     '}'
        +     'for(var i=1,l=ps.length;i<l;i++)if(d!=null)d = d[ps[i]];'
        +     'return d;'
        + '},'
        + 'ts=function(s){'
        +     'if(typeof s==="string"){return s;}'
        +     'if(s==null){s="";}'
        +     'return ""+s;'
        + '};';

    // v: variables
    // fs: filters
    // gv: getVariable
    // ts: toString
    // n: name
    // ps: properties
    // hg: hasGetter

    /**
     * Target命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function TargetCommand(value, engine) {
        /* jshint ignore:start */
        if (!/^\s*([a-z0-9\/_-]+)\s*(\(\s*master\s*=\s*([a-z0-9\/_-]+)\s*\))?\s*/i.test(value)) {
            throw new Error('Invalid ' + this.type + ' syntax: ' + value);
        }
        /* jshint ignore:end */

        this.master = RegExp.$3;
        this.name = RegExp.$1;
        Command.call(this, value, engine);

        this.blocks = {};
    }

    // 创建Target命令节点继承关系
    inherits(TargetCommand, Command);

    /**
     * Block命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function BlockCommand(value, engine) {
        if (!/^\s*([a-z0-9\/_-]+)\s*$/i.test(value)) {
            throw new Error('Invalid ' + this.type + ' syntax: ' + value);
        }

        this.name = RegExp.$1;
        Command.call(this, value, engine);
        this.cloneProps = ['name'];
    }

    // 创建Block命令节点继承关系
    inherits(BlockCommand, Command);

    /**
     * Import命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function ImportCommand(value, engine) {
        if (!/^\s*([a-z0-9\/_-]+)\s*$/i.test(value)) {
            throw new Error('Invalid ' + this.type + ' syntax: ' + value);
        }

        this.name = RegExp.$1;
        Command.call(this, value, engine);
        this.cloneProps = ['name', 'state', 'blocks'];
        this.blocks = {};
    }

    // 创建Import命令节点继承关系
    inherits(ImportCommand, Command);

    /**
     * Var命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function VarCommand(value, engine) {
        if (!/^\s*([a-z0-9_]+)\s*=([\s\S]*)$/i.test(value)) {
            throw new Error('Invalid ' + this.type + ' syntax: ' + value);
        }

        this.name = RegExp.$1;
        this.expr = RegExp.$2;
        Command.call(this, value, engine);
        this.cloneProps = ['name', 'expr'];
    }

    // 创建Var命令节点继承关系
    inherits(VarCommand, Command);

    /**
     * filter命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function FilterCommand(value, engine) {
        if (!/^\s*([a-z0-9_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(value)) {
            throw new Error('Invalid ' + this.type + ' syntax: ' + value);
        }

        this.name = RegExp.$1;
        this.args = RegExp.$3;
        Command.call(this, value, engine);
        this.cloneProps = ['name', 'args'];
    }

    // 创建filter命令节点继承关系
    inherits(FilterCommand, Command);

    /**
     * Use命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function UseCommand(value, engine) {
        if (!/^\s*([a-z0-9\/_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(value)) {
            throw new Error('Invalid ' + this.type + ' syntax: ' + value);
        }

        this.name = RegExp.$1;
        this.args = RegExp.$3;
        Command.call(this, value, engine);
        this.cloneProps = ['name', 'args'];
    }

    // 创建Use命令节点继承关系
    inherits(UseCommand, Command);

    /**
     * for命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function ForCommand(value, engine) {
        var rule = new RegExp(
            stringFormat(
                /* jshint ignore:start */
                '^\\s*({0}[\\s\\S]+{1})\\s+as\\s+{0}([0-9a-z_]+){1}\\s*(,\\s*{0}([0-9a-z_]+){1})?\\s*$',
                /* jshint ignore:end */
                regexpLiteral(engine.options.variableOpen),
                regexpLiteral(engine.options.variableClose)
            ),
            'i'
        );


        if (!rule.test(value)) {
            throw new Error('Invalid ' + this.type + ' syntax: ' + value);
        }

        this.list = RegExp.$1;
        this.item = RegExp.$2;
        this.index = RegExp.$4;
        Command.call(this, value, engine);
        this.cloneProps = ['list', 'item', 'index'];
    }

    // 创建for命令节点继承关系
    inherits(ForCommand, Command);

    /**
     * if命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function IfCommand(value, engine) {
        Command.call(this, value, engine);
    }

    // 创建if命令节点继承关系
    inherits(IfCommand, Command);

    /**
     * elif命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function ElifCommand(value, engine) {
        IfCommand.call(this, value, engine);
    }

    // 创建elif命令节点继承关系
    inherits(ElifCommand, IfCommand);

    /**
     * else命令节点类
     *
     * @inner
     * @constructor
     * @param {string} value 命令节点的value
     * @param {Engine} engine 引擎实例
     */
    function ElseCommand(value, engine) {
        Command.call(this, value, engine);
    }

    // 创建else命令节点继承关系
    inherits(ElseCommand, IfCommand);

    /**
     * Target的节点状态
     *
     * @inner
     */
    var TargetState = {
        READING: 1,
        READED: 2,
        APPLIED: 3,
        READY: 4
    };

    /**
     * 应用其继承的母版，返回是否成功应用母版
     *
     * @return {boolean} 是否成功应用母版
     */
    ImportCommand.prototype.applyMaster =

    /**
     * 应用其继承的母版，返回是否成功应用母版
     *
     * @param {string} masterName 模板名称
     * @return {boolean} 是否成功应用母版
     */
    TargetCommand.prototype.applyMaster = function (masterName) {
        if (this.state >= TargetState.APPLIED) {
            return 1;
        }

        var blocks = this.blocks;

        function replaceBlock(node) {
            var children = node.children;

            if (children instanceof Array) {
                for (var i = 0, len = children.length; i < len; i++) {
                    var child = children[i];
                    if (child instanceof BlockCommand && blocks[child.name]) {
                        child = children[i] = blocks[child.name];
                    }

                    replaceBlock(child);
                }
            }
        }

        var master = this.engine.targets[masterName];
        if (master && master.applyMaster(master.master)) {
            this.children = master.clone().children;
            replaceBlock(this);
            this.state = TargetState.APPLIED;
            return 1;
        }
    };

    /**
     * 判断target是否ready
     * 包括是否成功应用母版，以及import语句依赖的target是否ready
     *
     * @return {boolean} target是否ready
     */
    TargetCommand.prototype.isReady = function () {
        if (this.state >= TargetState.READY) {
            return 1;
        }

        var engine = this.engine;
        var readyState = 1;

        /**
         * 递归检查节点的ready状态
         *
         * @inner
         * @param {Command|TextNode} node 目标节点
         */
        function checkReadyState(node) {
            for (var i = 0, len = node.children.length; i < len; i++) {
                var child = node.children[i];
                if (child instanceof ImportCommand) {
                    var target = engine.targets[child.name];
                    readyState = readyState
                        && target && target.isReady(engine);
                }
                else if (child instanceof Command) {
                    checkReadyState(child);
                }
            }
        }

        if (this.applyMaster(this.master)) {
            checkReadyState(this);
            readyState && (this.state = TargetState.READY);
            return readyState;
        }
    };

    /**
     * 获取target的renderer函数
     *
     * @return {function(Object):string} renderer函数
     */
    TargetCommand.prototype.getRenderer = function () {
        if (this.renderer) {
            return this.renderer;
        }

        if (this.isReady()) {
            // console.log(this.name + ' ------------------');
            // console.log(RENDERER_BODY_START + RENDER_STRING_DECLATION
            //     + this.getRendererBody()
            //     + RENDER_STRING_RETURN);

            /* jshint -W054 */
            var realRenderer = new Function(
                'data', 'engine',
                [
                    RENDERER_BODY_START,
                    RENDER_STRING_DECLATION,
                    this.getRendererBody(),
                    RENDER_STRING_RETURN
                ].join('\n')
            );
            /* jshint +W054 */

            var engine = this.engine;
            this.renderer = function (data) {
                return realRenderer(data, engine);
            };

            return this.renderer;
        }

        return null;
    };

    /**
     * 将target节点对象添加到语法分析环境中
     *
     * @inner
     * @param {TargetCommand} target target节点对象
     * @param {Object} context 语法分析环境对象
     */
    function addTargetToContext(target, context) {
        context.target = target;

        var engine = context.engine;
        var name = target.name;

        if (engine.targets[name]) {
            switch (engine.options.namingConflict) {
                /* jshint ignore:start */
                case 'override':
                    engine.targets[name] = target;
                    context.targets.push(name);
                case 'ignore':
                    break;
                /* jshint ignore:end */
                default:
                    throw new Error('Target exists: ' + name);
            }
        }
        else {
            engine.targets[name] = target;
            context.targets.push(name);
        }
    }

    /**
     * target节点open，解析开始
     *
     * @param {Object} context 语法分析环境对象
     */
    TargetCommand.prototype.open = function (context) {
        autoCloseCommand(context);
        Command.prototype.open.call(this, context);
        this.state = TargetState.READING;
        addTargetToContext(this, context);
    };

    /**
     * Var节点open，解析开始
     *
     * @param {Object} context 语法分析环境对象
     */
    VarCommand.prototype.open =

    /**
     * Use节点open，解析开始
     *
     * @param {Object} context 语法分析环境对象
     */
    UseCommand.prototype.open = function (context) {
        context.stack.top().addChild(this);
    };

    /**
     * Block节点open，解析开始
     *
     * @param {Object} context 语法分析环境对象
     */
    BlockCommand.prototype.open = function (context) {
        Command.prototype.open.call(this, context);
        context.stack
            .find(function (node) {
                return node.blocks;
            })
            .blocks[this.name] = this;
    };

    /**
     * elif节点open，解析开始
     *
     * @param {Object} context 语法分析环境对象
     */
    ElifCommand.prototype.open = function (context) {
        var elseCommand = new ElseCommand();
        elseCommand.open(context);

        var ifCommand = autoCloseCommand(context, IfCommand);
        ifCommand.addChild(this);
        context.stack.push(this);
    };

    /**
     * else节点open，解析开始
     *
     * @param {Object} context 语法分析环境对象
     */
    ElseCommand.prototype.open = function (context) {
        var ifCommand = autoCloseCommand(context, IfCommand);
        ifCommand.addChild(this);
        context.stack.push(this);
    };

    /**
     * import节点open，解析开始
     *
     * @param {Object} context 语法分析环境对象
     */
    ImportCommand.prototype.open = function (context) {
        this.parent = context.stack.top();
        this.target = context.target;
        Command.prototype.open.call(this, context);
        this.state = TargetState.READING;
    };

    /**
     * 节点解析结束
     * 由于use节点无需闭合，处理时不会入栈，所以将close置为空函数
     *
     * @param {Object} context 语法分析环境对象
     */
    UseCommand.prototype.close =

    /**
     * 节点解析结束
     * 由于var节点无需闭合，处理时不会入栈，所以将close置为空函数
     *
     * @param {Object} context 语法分析环境对象
     */
    VarCommand.prototype.close = function () {};

    /**
     * 节点解析结束
     *
     * @param {Object} context 语法分析环境对象
     */
    ImportCommand.prototype.close = function (context) {
        Command.prototype.close.call(this, context);
        this.state = TargetState.READED;
    };

    /**
     * 节点闭合，解析结束
     *
     * @param {Object} context 语法分析环境对象
     */
    TargetCommand.prototype.close = function (context) {
        Command.prototype.close.call(this, context);
        this.state = this.master ? TargetState.READED : TargetState.APPLIED;
        context.target = null;
    };

    /**
     * 节点自动闭合，解析结束
     * ImportCommand的自动结束逻辑为，在其开始位置后马上结束
     * 所以，其自动结束时children应赋予其所属的parent
     *
     * @param {Object} context 语法分析环境对象
     */
    ImportCommand.prototype.autoClose = function (context) {
        // move children to parent
        var parentChildren = this.parent.children;
        parentChildren.push.apply(parentChildren, this.children);
        this.children.length = 0;

        // move blocks to target
        /* eslint-disable guard-for-in */
        for (var key in this.blocks) {
            this.target.blocks[key] = this.blocks[key];
        }
        /* eslint-enable guard-for-in */
        this.blocks = {};

        // do close
        this.close(context);
    };

    /**
     * 节点open前的处理动作：节点不在target中时，自动创建匿名target
     *
     * @param {Object} context 语法分析环境对象
     */
    UseCommand.prototype.beforeOpen =

    /**
     * 节点open前的处理动作：节点不在target中时，自动创建匿名target
     *
     * @param {Object} context 语法分析环境对象
     */
    ImportCommand.prototype.beforeOpen =

    /**
     * 节点open前的处理动作：节点不在target中时，自动创建匿名target
     *
     * @param {Object} context 语法分析环境对象
     */
    VarCommand.prototype.beforeOpen =

    /**
     * 节点open前的处理动作：节点不在target中时，自动创建匿名target
     *
     * @param {Object} context 语法分析环境对象
     */
    ForCommand.prototype.beforeOpen =

    /**
     * 节点open前的处理动作：节点不在target中时，自动创建匿名target
     *
     * @param {Object} context 语法分析环境对象
     */
    FilterCommand.prototype.beforeOpen =

    /**
     * 节点open前的处理动作：节点不在target中时，自动创建匿名target
     *
     * @param {Object} context 语法分析环境对象
     */
    BlockCommand.prototype.beforeOpen =

    /**
     * 节点open前的处理动作：节点不在target中时，自动创建匿名target
     *
     * @param {Object} context 语法分析环境对象
     */
    IfCommand.prototype.beforeOpen =

    /**
     * 文本节点被添加到分析环境前的处理动作：节点不在target中时，自动创建匿名target
     *
     * @param {Object} context 语法分析环境对象
     */
    TextNode.prototype.beforeAdd = function (context) {
        if (context.stack.bottom()) {
            return;
        }

        var target = new TargetCommand(generateGUID(), context.engine);
        target.open(context);
    };

    /**
     * 获取renderer body的生成代码
     *
     * @return {string} 生成代码
     */
    ImportCommand.prototype.getRendererBody = function () {
        this.applyMaster(this.name);
        return Command.prototype.getRendererBody.call(this);
    };

    /**
     * 获取renderer body的生成代码
     *
     * @return {string} 生成代码
     */
    UseCommand.prototype.getRendererBody = function () {
        return stringFormat(
            '{0}engine.render({2},{{3}}){1}',
            RENDER_STRING_ADD_START,
            RENDER_STRING_ADD_END,
            stringLiteralize(this.name),
            compileVariable(this.args, this.engine).replace(
                /(^|,)\s*([a-z0-9_]+)\s*=/ig,
                function (match, start, argName) {
                    return (start || '') + stringLiteralize(argName) + ':';
                }
            )
        );
    };

    /**
     * 获取renderer body的生成代码
     *
     * @return {string} 生成代码
     */
    VarCommand.prototype.getRendererBody = function () {
        if (this.expr) {
            return stringFormat(
                'v[{0}]={1};',
                stringLiteralize(this.name),
                compileVariable(this.expr, this.engine)
            );
        }

        return '';
    };

    /**
     * 获取renderer body的生成代码
     *
     * @return {string} 生成代码
     */
    IfCommand.prototype.getRendererBody = function () {
        return stringFormat(
            'if({0}){{1}}',
            compileVariable(this.value, this.engine),
            Command.prototype.getRendererBody.call(this)
        );
    };

    /**
     * 获取renderer body的生成代码
     *
     * @return {string} 生成代码
     */
    ElseCommand.prototype.getRendererBody = function () {
        return stringFormat(
            '}else{{0}',
            Command.prototype.getRendererBody.call(this)
        );
    };

    /**
     * 获取renderer body的生成代码
     *
     * @return {string} 生成代码
     */
    ForCommand.prototype.getRendererBody = function () {
        return stringFormat(
            /* jshint ignore:start */
            ''
            + 'var {0}={1};'
            + 'if({0} instanceof Array)'
            +     'for (var {4}=0,{5}={0}.length;{4}<{5};{4}++){v[{2}]={4};v[{3}]={0}[{4}];{6}}'
            + 'else if(typeof {0}==="object")'
            +     'for(var {4} in {0}){v[{2}]={4};v[{3}]={0}[{4}];{6}}',
            /* jshint ignore:end */
            generateGUID(),
            compileVariable(this.list, this.engine),
            stringLiteralize(this.index || generateGUID()),
            stringLiteralize(this.item),
            generateGUID(),
            generateGUID(),
            Command.prototype.getRendererBody.call(this)
        );
    };

    /**
     * 获取renderer body的生成代码
     *
     * @return {string} 生成代码
     */
    FilterCommand.prototype.getRendererBody = function () {
        var args = this.args;
        return stringFormat(
            '{2}fs[{5}]((function(){{0}{4}{1}})(){6}){3}',
            RENDER_STRING_DECLATION,
            RENDER_STRING_RETURN,
            RENDER_STRING_ADD_START,
            RENDER_STRING_ADD_END,
            Command.prototype.getRendererBody.call(this),
            stringLiteralize(this.name),
            args ? ',' + compileVariable(args, this.engine) : ''
        );
    };

    /**
     * 命令类型集合
     *
     * @type {Object}
     */
    var commandTypes = {};

    /**
     * 添加命令类型
     *
     * @inner
     * @param {string} name 命令名称
     * @param {Function} Type 处理命令用到的类
     */
    function addCommandType(name, Type) {
        commandTypes[name] = Type;
        Type.prototype.type = name;
    }

    addCommandType('target', TargetCommand);
    addCommandType('block', BlockCommand);
    addCommandType('import', ImportCommand);
    addCommandType('use', UseCommand);
    addCommandType('var', VarCommand);
    addCommandType('for', ForCommand);
    addCommandType('if', IfCommand);
    addCommandType('elif', ElifCommand);
    addCommandType('else', ElseCommand);
    addCommandType('filter', FilterCommand);


    /**
     * etpl引擎类
     *
     * @constructor
     * @param {Object=} options 引擎参数
     * @param {string=} options.commandOpen 命令语法起始串
     * @param {string=} options.commandClose 命令语法结束串
     * @param {string=} options.variableOpen 变量语法起始串
     * @param {string=} options.variableClose 变量语法结束串
     * @param {string=} options.defaultFilter 默认变量替换的filter
     * @param {boolean=} options.strip 是否清除命令标签前后的空白字符
     * @param {string=} options.namingConflict target名字冲突时的处理策略
     */
    function Engine(options) {
        this.options = {
            commandOpen: '<!--',
            commandClose: '-->',
            commandSyntax: /^\s*(\/)?([a-z]+)\s*(?::([\s\S]*))?$/,
            variableOpen: '${',
            variableClose: '}',
            defaultFilter: 'html'
        };

        this.config(options);
        this.targets = {};
        this.filters = extend({}, DEFAULT_FILTERS);
    }

    /**
     * 配置引擎参数，设置的参数将被合并到现有参数中
     *
     * @param {Object} options 参数对象
     * @param {string=} options.commandOpen 命令语法起始串
     * @param {string=} options.commandClose 命令语法结束串
     * @param {string=} options.variableOpen 变量语法起始串
     * @param {string=} options.variableClose 变量语法结束串
     * @param {string=} options.defaultFilter 默认变量替换的filter
     * @param {boolean=} options.strip 是否清除命令标签前后的空白字符
     * @param {string=} options.namingConflict target名字冲突时的处理策略
     */
    Engine.prototype.config = function (options) {
        extend(this.options, options);
    };

    /**
     * 解析模板并编译，返回第一个target编译后的renderer函数。
     *
     * @param {string} source 模板源代码
     * @return {function(Object):string} renderer函数
     */
    Engine.prototype.compile =

    /**
     * 解析模板并编译，返回第一个target编译后的renderer函数。
     * 该方法的存在为了兼容老模板引擎
     *
     * @param {string} source 模板源代码
     * @return {function(Object):string} renderer函数
     */
    Engine.prototype.parse = function (source) {
        if (source) {
            var targetNames = parseSource(source, this);
            if (targetNames.length) {
                return this.targets[targetNames[0]].getRenderer();
            }
        }

        /* jshint -W054 */
        return new Function('return ""');
        /* jshint +W054 */
    };

    /**
     * 根据target名称获取编译后的renderer函数
     *
     * @param {string} name target名称
     * @return {function(Object):string} renderer函数
     */
    Engine.prototype.getRenderer = function (name) {
        var target = this.targets[name];
        if (target) {
            return target.getRenderer();
        }
    };

    /**
     * 执行模板渲染，返回渲染后的字符串。
     *
     * @param {string} name target名称
     * @param {Object=} data 模板数据。
     *      可以是plain object，
     *      也可以是带有 {string}get({string}name) 方法的对象
     * @return {string} 渲染结果
     */
    Engine.prototype.render = function (name, data) {
        var renderer = this.getRenderer(name);
        if (renderer) {
            return renderer(data);
        }

        return '';
    };

    /**
     * 增加过滤器
     *
     * @param {string} name 过滤器名称
     * @param {Function} filter 过滤函数
     */
    Engine.prototype.addFilter = function (name, filter) {
        if (typeof filter === 'function') {
            this.filters[name] = filter;
        }
    };

    /**
     * 解析源代码
     *
     * @inner
     * @param {string} source 模板源代码
     * @param {Engine} engine 引擎实例
     * @return {Array} target名称列表
     */
    function parseSource(source, engine) {
        var commandOpen = engine.options.commandOpen;
        var commandClose = engine.options.commandClose;
        var commandSyntax = engine.options.commandSyntax;

        var stack = new Stack();
        var analyseContext = {
            engine: engine,
            targets: [],
            stack: stack,
            target: null
        };

        // text节点内容缓冲区，用于合并多text
        var textBuf = [];

        /**
         * 将缓冲区中的text节点内容写入
         *
         * @inner
         */
        function flushTextBuf() {
            var text;
            if (textBuf.length > 0 && (text = textBuf.join(''))) {
                var textNode = new TextNode(text, engine);
                textNode.beforeAdd(analyseContext);

                stack.top().addChild(textNode);
                textBuf = [];

                if (engine.options.strip
                    && analyseContext.current instanceof Command
                ) {
                    textNode.value = text.replace(/^[\x20\t\r]*\n/, '');
                }
                analyseContext.current = textNode;
            }
        }

        var NodeType;

        parseTextBlock(
            source, commandOpen, commandClose, 0,

            function (text) { // <!--...-->内文本的处理函数
                var match = commandSyntax.exec(text);

                // 符合command规则，并且存在相应的Command类，说明是合法有含义的Command
                // 否则，为不具有command含义的普通文本
                if (match
                    && (NodeType = commandTypes[match[2].toLowerCase()])
                    && typeof NodeType === 'function'
                ) {
                    // 先将缓冲区中的text节点内容写入
                    flushTextBuf();

                    var currentNode = analyseContext.current;
                    if (engine.options.strip && currentNode instanceof TextNode) {
                        currentNode.value = currentNode.value
                            .replace(/\r?\n[\x20\t]*$/, '\n');
                    }

                    if (match[1]) {
                        currentNode = autoCloseCommand(analyseContext, NodeType);
                    }
                    else {
                        currentNode = new NodeType(match[3], engine);
                        if (typeof currentNode.beforeOpen === 'function') {
                            currentNode.beforeOpen(analyseContext);
                        }
                        currentNode.open(analyseContext);
                    }

                    analyseContext.current = currentNode;
                }
                else if (!/^\s*\/\//.test(text)) {
                    // 如果不是模板注释，则作为普通文本，写入缓冲区
                    textBuf.push(commandOpen, text, commandClose);
                }

                NodeType = null;
            },

            function (text) { // <!--...-->外，普通文本的处理函数
                // 普通文本直接写入缓冲区
                textBuf.push(text);
            }
        );


        flushTextBuf(); // 将缓冲区中的text节点内容写入
        autoCloseCommand(analyseContext);

        return analyseContext.targets;
    }

    var etpl = new Engine();
    etpl.Engine = Engine;

    return etpl;

});

define('cc-config/form/Validator',['require','exports','module','cc/form/Validator','cc/util/etpl'],function (require, exports, module) {

    'use strict';

    var Validator = require('cc/form/Validator');
    var etpl = require('cc/util/etpl');

    var tplRender = { };

    function getControlElement(fieldElement) {

        var controlElement;

        if (fieldElement.is('.input') || fieldElement.is('.dropdown')) {
            controlElement = fieldElement;
        }
        else {
            var tempElement = fieldElement.closest('.input');
            if (tempElement.length === 1) {
                controlElement = tempElement;
            }
            else {
                tempElement = fieldElement.closest('.dropdown');
                if (tempElement.length === 1) {
                    controlElement = tempElement;
                }
            }
        }

        return controlElement;

    }

    Validator.defaultOptions = {
        validateOnBlur: false,
        scrollOffset: -100,
        groupSelector: '.group',
        errorAttribute: 'data-error-for',
        errorTemplate: '<i class="icon-times-circle">${error}</i>',
        showErrorAnimation: function (options) {

            var errorElement = options.errorElement;
            if (errorElement.css('display') !== 'none') {
                return;
            }
            // hurry: 父元素添加非static定位
            var errorParent = errorElement.parent();
            var parentPosition = errorParent.css('position');
            if (parentPosition === 'static') {
                errorParent.css('position', 'relative');
            }
            errorElement.css({
                position: 'fixed',
                display: 'inline-block',
                width: 'auto'
            });

            var width = errorElement.outerWidth();
            var height = errorElement.outerHeight();

            var fieldElement = options.fieldElement;
            if (fieldElement.is(':hidden')) {
                fieldElement = fieldElement.closest(':visible');
            }

            var controlElement = getControlElement(fieldElement);
            if (controlElement) {
                controlElement.addClass('error');
            }

            var fieldWidth = fieldElement.outerWidth();
            var fieldHeight = fieldElement.outerHeight();

            var left = fieldWidth + 2;
            left += fieldElement.offset().left - errorParent.offset().left;
            // if (!$.contains(fieldElement[0], errorElement[0])) {
            //     left += fieldElement.position().left;
            // }
            // errorElement.css({
            //     position: 'absolute',
            //     left: left,
            //     top: fieldHeight > height ? 5 : ((fieldHeight - height) / 2),
            //     width: width + 1
            // });
            
            var style = {
                position: 'absolute',
                left: left,
                top: fieldHeight > height ? 5 : ((fieldHeight - height) / 2)
                // top: 2 - fieldHeight
                // width: errorWidth
            };
            var errorWidth = width + 1;
            var errorLeft = fieldElement.offset().left + fieldWidth + 8;
            if (errorLeft + errorWidth > screen.availWidth) {
                errorWidth -= (errorLeft + errorWidth - screen.availWidth + 10);
            }
            style.width = errorWidth;
            errorElement.css(style);
        },
        hideErrorAnimation: function (options) {
            var errorElement = options.errorElement;
            errorElement.hide();

            var controlElement = getControlElement(options.fieldElement);
            if (controlElement) {
                controlElement.removeClass('error');
            }

        },
        render: function (data, tpl) {

            var render = tplRender[ tpl ];
            if (!render) {
                render = tplRender[ tpl ] = etpl.compile(tpl);
            }

            return render(data);
        }
    };

    return Validator;

});
/**
 * @author hurry
 */
define('common/ngService/module',[],function () {
    'use strict';
    return angular.module('Manage.services', []);
});
/**
 * @file ajax service
 * @author hurry
 */
define('common/ngService/ajaxService',[],function () {
    'use strict';
    angular
        .module('Manage.services')
        .factory('ajaxService',
            [
                '$http', '$q', '$cacheFactory', '$timeout',
                'utilService',
            function (
                $http, $q, $cacheFactory, $timeout,
                utilService
            ) {

            var ajaxCache;
            // 成功状态码，默认0
            var doneCode;
            // 失败状态码，默认1
            var failCode;
            // 状态码对应字段，默认code
            var dataField;
            return {
                /**
                 * 发送请求
                 * @param {string} path 请求的path
                 * @param {Object} options 请求的参数
                 * @param {string} options.method 请求的method，默认'POST'
                 * @param {string} options.responseType 请求的responseType，默认'json'
                 * @param {string} options.contentType 请求的contentType，默认'application/json'
                 * @param {Function} options.transformRequest 请求的参数二次处理
                 * @param {Object} options.data 请求的参数，没有-直接发送options
                 * @param {boolean} options.isResponseFilter 是否对response返回数据做过滤，会过滤掉\u0001-\u001f之间控制字符，默认false
                 * @param {Function} options.logoutUrl 700异常，退出操作
                 * @param {Function} options.alert 提示框
                 * @param {Object|boolean} options.cache
                 * 缓存
                 *    boolean: == true, 通过$cacheFactory创建
                 *    {} 有缓存从缓存读取，没有写入，key: path + '_' + JSON.stringify(options)
                 * @param {number} options.cacheExpires 缓存过期时间，单位毫秒
                 * @param {Object} options.userDefineErrors 用户自定义error code
                 * @param {string} options.userDefineErrors.doneCode 成功状态码，默认0
                 * @param {string} options.userDefineErrors.failCode 失败状态码，默认1
                 * @param {string} options.userDefineErrors.dataField 状态码对应字段，默认是code
                 * @param {Array<Object>} options.userDefineErrors.otherCodes 其他自定义状态码
                 * @param {string} options.userDefineErrors.otherCodes.code 状态码
                 * @param {Function} options.userDefineErrors.otherCodes.handler 对应处理函数
                 * @param {Object} options.options 如果我这里都不能满足你，请直接设置该属性
                 * @return {Object}         promise
                 */
                send: function(path, options) {
                    return doRequest(path, options);
                },
                /**
                 * 清空指定path的缓存
                 * @param path
                 */
                clearCache: function () {
                    ajaxCache && ajaxCache.destroy();
                }
            };
            // 请求
            function doRequest(path, options) {
                var deferred = $q.defer();
                // cache的key值
                var key;
                options = options || {};
                var params = initParams(path, options);
                var data;
                if (options.cache) {
                    key = path + '_' + JSON.stringify(options);
                    data = ajaxCache.get(key);
                    if (data && options.cacheExpires && new Date().getTime() - data.createTime > options.cacheExpires) {
                        data = null;
                        ajaxCache.remove(key);
                    }
                }
                if (data) {
                    $timeout(function () {
                        successCallback(data.data, options, key, deferred);
                    });
                } else {
                    $http(params)
                        .success(function (data) {
                            successCallback(data, options, key, deferred);
                        })
                        .error(function (er) {
                            // options.alert ? options.alert('网络异常') : window.alert('网络异常');
                            deferred.reject(er);
                        });
                }
                return deferred.promise;
            }
            // 初始化参数
            function initParams(path, options) {
                doneCode = options.userDefineCodes && options.userDefineCodes.doneCode || 0;
                failCode = options.userDefineCodes && options.userDefineCodes.failCode || 1;
                dataField = options.userDefineCodes && options.userDefineCodes.dataField || 'code';
                options.alert = options.alert || utilService.showMessage;
                if (options.cache) {
                    if (angular.isObject(options.cache)) {
                        ajaxCache = options.cache;
                    } else {
                        ajaxCache = $cacheFactory('ajax_cache_' + new Date().getTime());
                    }
                }
                //支持 GET 请求 对URL和参数做处理 
                if (options.method && options.method === 'GET' && options.data && !$.isEmptyObject(options.data) ) {
                    var str = '';
                    $.each(options.data, function (key, value) {
                        str += '&' + key + '=' + value;
                    });
                    path += '?' + str.substring(1);
                }
                var params = options.options || {
                    method: options.method || 'POST',
                    responseType: options.responseType || 'json',
                    headers: {
                        'Content-Type': options.contentType || 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                        // 'Actual-Referer': location.href
                    },
                    transformRequest: function (obj) {
                        if ($.isFunction(options.transformRequest)) {
                            return options.transformRequest(obj);
                        }
                        return obj;
                    },
                    url: path,
                    data: options.data ? JSON.stringify(options.data) : JSON.stringify(options)
                };
                // 后端json.stringify问题，没有过滤掉\u0001-\u001f字符
                if (options.isResponseFilter && Array.isArray($http.defaults.transformResponse)) {
                    $http.defaults.transformResponse.unshift(function (value) {
                        if (value.startsWith('{"data"')) {
                            var rxEscapable = /[\u0000-\u001f]/g;
                            var data = rxEscapable.test(value)
                                ? value.replace(rxEscapable, function (a) {
                                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16));
                                })
                                : value;
                            return data;
                        }
                        return value;
                    });
                }
                return params;
            }

            //错误弹窗提示
            function showErrorMsg(data, options, deferred) {
                var errorMessage = data.message
                || data.msg
                || 'code=1异常error不能为空';
                if (data.track_id) {
                    errorMessage += '<br/><span class="track-id">' + data.track_id + '</span>';
                }
                var dialog = options.alert({
                    title: '提示',
                    skinClass: 'error-message-dialog',
                    content: errorMessage
                });
                deferred.reject(data, dialog);
            }

            // 成功回调
            function successCallback(data, options, key, deferred) {
                var status = data[dataField];
                switch (status) {
                    case doneCode:
                        // 成功
                        if (options.cache) {
                            ajaxCache.put(key, {
                                data: data,
                                createTime: new Date().getTime()
                            });
                        }
                        deferred.resolve(data);
                        break;
                    case 300:
                        // 部分成功
                        deferred.resolve(data);
                        break;
                    case 302:
                        //普通跳转  重定向
                        location.href = data.redirect_url;
                        break;
                    case 401:
                        // 未登录  重定向
                        location.href = data.redirect_url + encodeURIComponent(location.hash);
                        break;
                    case failCode:
                        showErrorMsg(data, options, deferred);
                        break;
                    case 500:
                        options.alert('系统异常');
                        deferred.reject(data);
                        break;
                    case 700:
                        // 登录异常
                        if (options.logoutUrl) {
                            return $http({
                                method: options.method || 'GET',
                                url: options.logoutUrl,
                                data: {}
                            });
                        }
                        break;
                    default:
                        if (!options.userDefineErrors || !options.userDefineErrors.otherCodes) {
                            showErrorMsg(data, options, deferred);
                            return;
                        }
                        // 其他状态码
                        var otherCodes = options.userDefineErrors.otherCodes;
                        if (Array.isArray) {
                            otherCodes.forEach(function (error) {
                                error.code === status && $.isFunction(error.handler) && error.handler(data);
                            });
                        } else {
                            for (var i = 0, error; (error = otherCodes[i++]); ) {
                                error.code === status && $.isFunction(error.handler) && error.handler(data);
                            }
                        }
                        break;
                }
            }
        }]);
});
/**
 * @file 缓存
 * @author hurry
 */
 define('common/ngService/myCache',['require','./module'],function (require) {
 	'use strict';
	var cache = {};
 	require('./module')
 		.factory('myCache', function () {

 			return {
				set: function (key, value) {
					cache[key] = value;
					return value;
				},
				get: function (key) {
					return cache[key];
				},
				del: function(key) {
					var val = cache[key];
					cache[key] = undefined;
					return val;
				}
			};
 		});
 });

/**
 * @file 包含
 * @author musicode
 */
define('cc/function/contains',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * container 是否包含 element
     *
     * @param {jQuery|HTMLElement} container
     * @param {jQuery|HTMLElement} element
     * @return {boolean}
     */
    return function (container, element) {

        container = container.jquery
                  ? container[0]
                  : container;

        element = element.jquery
                ? element[0]
                : element;

        if (!container || !element) {
            return false;
        }

        if (container === element) {
            return true;
        }

        return $.contains(container, element);

    };

});
/**
 * @file 单例
 * @author musicode
 */
define('cc/util/instance',['require','exports','module'],function (require, exports, module) {

    /**
     * 全局使用的单例，没必要重复包装 jQuery 对象
     */

    exports.window = $(window);

    exports.document = $(document);

    exports.html = $(document.documentElement);

    exports.body = $(document.body);

});
/**
 * @file 获得网页元素
 * @author musicode
 */
define('cc/function/page',['require','exports','module','../util/instance'],function (require, exports, module) {

    'use strict';

    var instance = require('../util/instance');

    /**
     * 获得网页元素
     *
     * @return {jQuery}
     */
    return function () {
        if (instance.body.prop('clientHeight') < instance.html.prop('clientHeight')) {
            return instance.html;
        }
        else {
            return instance.body;
        }
    };

});
/**
 * @file 获得网页可滚动宽度
 * @author musicode
 */
define('cc/function/pageWidth',['require','exports','module','./page'],function (require, exports, module) {

    'use strict';

    var page = require('./page');

    /**
     * 获得网页可滚动宽度
     *
     * @return {number}
     */
    return function () {
        var element = page()[0];
        return Math.max(element.scrollWidth, element.clientWidth);
    };

});
/**
 * @file 获得网页可滚动高度
 * @author musicode
 */
define('cc/function/pageHeight',['require','exports','module','./page'],function (require, exports, module) {

    'use strict';

    var page = require('./page');

    /**
     * 获得网页可滚动高度
     *
     * @return {number}
     */
    return function () {
        var element = page()[0];
        return Math.max(element.scrollHeight, element.clientHeight);
    };

});
/**
 * @file 获得小数的位数
 * @author musicode
 */
define('cc/function/decimalLength',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 获得小数的位数
     *
     * @param {string} str
     * @return {number}
     */
    return function (str) {

        var parts = ('' + str).split('.');

        return parts.length === 2 ? parts[1].length : 0;

    };
});
/**
 * @file 把小数转成整数，避免小数计算的精度问题
 * @author musicode
 */
define('cc/function/float2Int',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 把小数转成整数，避免小数计算的精度问题
     *
     * @param {string|number} float 浮点数
     * @param {number=} length 可选，右移的位数
     * @return {number}
     */
    return function (float, length) {

        var parts = ('' + float).split('.');
        var result;

        if (length >= 0) {}
        else {
            length = 0;
        }

        if (parts.length === 1) {
            result = float + new Array(length + 1).join('0');
        }
        else {
            length = Math.max(0, length - parts[1].length);
            result = parts.join('') + new Array(length + 1).join('0');
        }

        return + result;

    };

});
/**
 * @file 除法
 * @author musicode
 */
define('cc/function/divide',['require','exports','module','./decimalLength','./float2Int'],function (require, exports, module) {

    'use strict';

    var decimalLength = require('./decimalLength');
    var float2Int = require('./float2Int');

    /**
     * 除法
     *
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    return function (a, b) {

        var length = Math.max(
                        decimalLength(a),
                        decimalLength(b)
                    );

        a = float2Int(a, length);
        b = float2Int(b, length);

        return a / b;

    };

});
/**
 * @file 解析百分比
 * @author musicode
 */
define('cc/function/parsePercent',['require','exports','module','./divide'],function (require, exports, module) {

    'use strict';

    var divide = require('./divide');

    /**
     * 提取百分比的正则
     *
     * @inner
     * @type {RegExp}
     */
    var percentExpr = /(-?\d+(\.\d+)?)%/;

    return function (value) {
        if (percentExpr.test(value)) {
            return divide(RegExp.$1, 100);
        }
    };

});
/**
 * @file 定位元素
 * @author musicode
 */
define('cc/function/pin',['require','exports','module','../util/instance','./parsePercent'],function (require, exports, module) {

    'use strict';

    var instance = require('../util/instance');
    var parsePercent = require('./parsePercent');

    /**
     * 名称映射百分比
     *
     * @inner
     * @type {Object}
     */
    var name2Value = {
        left: 0,
        top: 0,
        center: '50%',
        middle: '50%',
        right: '100%',
        bottom: '100%'
    };

    /**
     * 提取百分比的正则
     *
     * @inner
     * @type {RegExp}
     */
    var percentExpr = /(-?\d+(\.\d+)?)%/;

    /**
     * 解析配置中的横坐标值，可选值有以下几种：
     *
     * left   (等价于 0%)
     * center (等价于 50%)
     * right  (等价于 100%)
     * xx%    (百分比)
     * xx     (纯数字)
     *
     * @inner
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {number=} options.width
     * @property {string|number} options.x
     * @return {number}
     */
    function parseX(options) {

        var x = name2Value[options.x];

        if (x == null) {
            x = options.x;
        }

        if ($.type(x) === 'string') {
            var percent = parsePercent(x);
            if (percent != null) {
                x = percent * (options.width || options.element.outerWidth());
            }
        }

        return x;
    }

    /**
     * 解析配置中的纵坐标值，可选值有以下几种：
     *
     * top    (等价于 0%)
     * middle (等价于 50%)
     * bottom (等价于 100%)
     * yy%    (百分比)
     * yy     (纯数字)
     *
     * @inner
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {number=} options.height
     * @property {string|number} options.y
     * @return {number}
     */
    function parseY(options) {

        var y = name2Value[options.y];

        if (y == null) {
            y = options.y;
        }

        if ($.type(y) === 'string') {
            var percent = parsePercent(y);
            if (percent != null) {
                y = percent * (options.height || options.element.outerHeight());
            }
        }

        return y;
    }

    /**
     * 定位一个元素
     *
     * 把 a 定位到 b 的右下角
     * pin({
     *     element: $('a'),
     *     x: 'left',
     *     y: 'top',
     *     attachment: {
     *         element: $('b'),
     *         x: 'right',
     *         y: 'bottom'
     *
     *     },
     *     offset: {
     *         x: 10,
     *         y:  10
     *     }
     * });
     *
     * @param {Object} options
     *
     * @property {jQuery} options.element 需要定位的元素
     * @property {string|number} options.x 目标元素的横坐标定位点，值可以是 'left' 'center' 'right' 'xx%' 10(纯数字)
     * @property {string|number} options.y 目标元素的纵坐标定位点，值可以是 'top' 'middle' 'bottom' 'yy%' 10(纯数字)
     *
     * @property {Object} options.attachment 参照对象
     * @property {jQuery} options.attachment.element 参照元素，默认是 body
     * @property {string|number} options.attachment.x 参照物元素的横坐标定位点，取值同 options.x
     * @property {string|number} options.attachment.y 参照物元素的纵坐标定位点，取值同 options.y
     * @property {number=} options.attachment.width 参照物元素的宽度，默认取 attachment.outerWidth()
     * @property {number=} options.attachment.height 参照物元素的高度，默认取 attachment.outerHeight()
     *
     * @property {Object=} options.offset 偏移量
     * @property {number=} options.offset.x 水平方向偏移量，单位是 px
     * @property {number=} options.offset.y 垂直方向偏移量，单位是 px
     *
     * @property {boolean=} options.silent 是否不设置样式，而是返回样式
     *
     * @return {?Object} 如果 options.silent 为 true 返回定位坐标
     */
    return function (options) {

        var element = options.element;
        var attachment = options.attachment || { };

        if (!attachment.element) {
            attachment.element = instance.body;
        }

        var attachmentOffset = attachment.element.offset();

        // 计算的原点
        var originX = attachmentOffset.left + parseX(attachment);
        var originY = attachmentOffset.top + parseY(attachment);

        var x = originX - parseX(options);
        var y = originY - parseY(options);

        var offset = options.offset;
        if (offset) {
            if ($.type(offset.x) === 'number') {
                x += offset.x;
            }
            if ($.type(offset.y) === 'number') {
                y += offset.y;
            }
        }

        var style = {
            left: x,
            top: y
        };

        var position = element.css('position');
        if (position !== 'absolute' && position !== 'fixed') {
            style.position = 'absolute';
        }

        if (options.silent) {
            return style;
        }
        else {
            element.css(style);
        }
    };

});
/**
 * @file 获得视窗元素
 * @author musicode
 */
define('cc/function/viewport',['require','exports','module','../util/instance'],function (require, exports, module) {

    'use strict';

    var instance = require('../util/instance');

    /**
     * 获得视窗元素
     *
     * @return {jQuery}
     */
    return function () {
        if (instance.body.prop('clientHeight') > instance.html.prop('clientHeight')) {
            return instance.html;
        }
        else {
            return instance.body;
        }
    };

});
/**
 * @file 获得视窗宽度
 * @author musicode
 */
define('cc/function/viewportWidth',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 获得视窗宽度
     *
     * @return {number}
     */
    return function () {
        return window.innerWidth || document.documentElement.clientWidth;
    };

});
/**
 * @file 获得视窗高度
 * @author musicode
 */
define('cc/function/viewportHeight',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 获得视窗高度
     *
     * @return {number}
     */
    return function () {
        return window.innerHeight || document.documentElement.clientHeight;
    };

});
/**
 * @file 获得网页水平滚动距离
 * @author musicode
 */
define('cc/function/pageScrollLeft',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 获得网页水平滚动距离
     *
     * @return {number}
     */
    return function () {
        return Math.max(
                document.body.scrollLeft,
                document.documentElement.scrollLeft
            );
    };

});
/**
 * @file 获得网页垂直滚动距离
 * @author musicode
 */
define('cc/function/pageScrollTop',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 获得网页垂直滚动距离
     *
     * @return {number}
     */
    return function () {
        return Math.max(
                document.body.scrollTop,
                document.documentElement.scrollTop
            );
    };

});
/**
 * @file 全局定位
 * @author musicode
 */
define('cc/function/pinGlobal',['require','exports','module','./pin','./viewport','./viewportWidth','./viewportHeight','./pageScrollLeft','./pageScrollTop'],function (require, exports, module) {

    'use strict';

    var pin = require('./pin');

    var viewport = require('./viewport');
    var viewportWidth = require('./viewportWidth');
    var viewportHeight = require('./viewportHeight');
    var pageScrollLeft = require('./pageScrollLeft');
    var pageScrollTop = require('./pageScrollTop');

    /**
     * @param {Object} options
     * @property {string} options.element 要定位的元素
     * @property {number|string} options.x 可以是像素值，或是百分比
     * @property {number|string} options.y 可以是像素值，或是百分比
     * @property {boolean} options.fixed 是否为 fixed 定位
     * @return {Object} 返回坐标
     */
    return function (options) {

        var pinOptions = {

            silent: true,

            element: options.element,

            x: options.x === '50%' ? '50%' : 0,
            y: options.y === '50%' ? '50%' : 0,

            attachment: {
                element: viewport(),
                width: viewportWidth(),
                height: viewportHeight(),
                x: options.x,
                y: options.y
            }
        };

        if (!options.fixed) {
            pinOptions.offset = {
                x: pageScrollLeft(),
                y: pageScrollTop()
            };
        }

        return pin(pinOptions);

    };

});
/**
 * @file 约束值
 * @author musicode
 */
define('cc/function/restrain',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 约束值
     *
     * @param {number} value
     * @param {number} min 最小值
     * @param {number} max 最大值
     * @return {number}
     */
    return function (value, min, max) {

        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }

        return value;
    };

});
/**
 * @file 获得元素的 left top
 * @author musicode
 */
define('cc/function/position',['require','exports','module','./offsetParent'],function (require, exports, module) {

    'use strict';

    var offsetParent = require('./offsetParent');

    /**
     * 返回元素的定位信息
     *
     * @param {jQuery} element
     * @return {Object}
     * @property {string} $return.position
     * @property {number} $return.top
     * @property {number} $return.left
     */
    return function (element) {

        var parentElement = offsetParent(element);

        var position = element.css('position');
        var x = parseInt(element.css('left'), 10);
        var y = parseInt(element.css('top'), 10);

        var isAutoX = isNaN(x);
        var isAutoY = isNaN(y);

        if (isAutoX || isAutoY) {

            if (parentElement.length === 1) {

                var targetOffset = element.offset();
                var containerOffset = parentElement.offset();

                if (isAutoX) {
                    x = targetOffset.left
                      - containerOffset.left
                      - (parseInt(parentElement.css('border-left-width'), 10) || 0);
                }
                if (isAutoY) {
                    y = targetOffset.top
                      - containerOffset.top
                      - (parseInt(parentElement.css('border-top-width'), 10) || 0);
                }
            }
            else {
                x = y = 0;
            }
        }

        if (!position || position === 'static') {
            position = 'absolute';
        }

        return {
            position: position,
            left: x,
            top: y
        };
    };

});
/**
 * @file 测试 target 元素是否在指定的选择器内部
 * @author musicode
 */
define('cc/function/testTarget',['require','exports','module','../util/instance','./contains'],function (require, exports, module) {

    'use strict';

    var instance = require('../util/instance');
    var contains = require('./contains');

    /**
     * 测试 target 元素是否在指定的选择器内部
     *
     * @param {jQuery|HTMLElement} target
     * @param {string|Array.<string>} selector
     * @param {jQuery=} context
     * @return {boolean}
     */
    return function (target, selector, context) {

        var result = false;

        if ($.isArray(selector)) {
            selector = selector.join(',');
        }

        if (!context) {
            context = instance.document;
        }

        context
            .find(selector)
            .each(
                function () {
                    if (result = contains(this, target)) {
                        return false;
                    }
                }
            );

        return result;

    };

});
/**
 * @file 封装 jq 的 offset 方法，类似 width 和 innerWidth 的关系
 * @author musicode
 */
define('cc/function/innerOffset',['require','exports','module','./toNumber'],function (require, exports, module) {

    'use strict';

    var toNumber = require('./toNumber');

    /**
     * @param {jQuery} element
     * @return {Object}
     */
    return function (element) {

        var offsetData = element.offset();
        var borderLeftWidth = element.css('border-left-width');
        var borderTopWidth = element.css('border-top-width');

        return {
            x: offsetData.left + toNumber(borderLeftWidth, 0, 'int'),
            y: offsetData.top + toNumber(borderTopWidth, 0, 'int')
        };

    };

});
/**
 * @file 封装 jq 的 offset 方法，类似 width 和 outerWidth 的关系
 * @author musicode
 */
define('cc/function/outerOffset',['require','exports','module','./toNumber'],function (require, exports, module) {

    'use strict';

    var toNumber = require('./toNumber');

    /**
     * @param {jQuery} element
     * @return {Object}
     */
    return function (element) {

        var offsetData = element.offset();
        var marginLeft = toNumber(element.css('margin-left'), 0, 'int');
        var marginTop = toNumber(element.css('margin-top'), 0, 'int');

        return {
            x: offsetData.left - marginLeft,
            y: offsetData.top - marginTop
        };

    };

});
/**
 * @file 启用选中元素文本
 * @author musicode
 */
define('cc/function/enableSelection',['require','exports','module'],function (require, exports, module) {

    'use strict';

    if (document.selection) {
        return function () {
            document.body.onselectstart = null;
        };
    }

    return $.noop;

});
/**
 * @file 禁止选中元素文本
 * @author musicode
 */
define('cc/function/disableSelection',['require','exports','module'],function (require, exports, module) {

    'use strict';

    if (document.selection) {
        return function () {
            document.body.onselectstart = function () {
                return false;
            };
        };
    }

    return $.noop;

});
/**
 * @file 获得事件的 pageX/pageY
 * @author musicode
 */
define('cc/function/eventPage',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 获得事件的 pageX/pageY
     *
     * @param {Event} event
     * @return {Object}
     */
    return function (event) {

        var x = event.pageX;
        var y = event.pageY;

        // IE 不支持 pageX/pageY
        if ($.type(x) !== 'number') {
            var documentElement = document.documentElement;
            x = event.clientX + documentElement.scrollLeft;
            y = event.clientY + documentElement.scrollTop;
        }

        return {
            x: x,
            y: y
        };
    };

});
/**
 * @file 获得事件的 offsetX/offsetY
 * @author musicode
 */
define('cc/function/eventOffset',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 获得事件的 offsetX/offsetY
     *
     * @param {Event} event
     * @return {Object}
     */
    return function (event) {

        var x = event.offsetX;
        var y = event.offsetY;

        // Firefox 不支持 offsetX/offsetY
        if ($.type(x) !== 'number') {
            var rect = event.target.getBoundingClientRect();
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
        }

        return {
            x: x,
            y: y
        };
    };

});
/**
 * @file 鼠标事件，如果是移动平台，换为 touch 事件
 * @author musicode
 */
define('cc/util/touch',['require','exports','module','../function/eventPage','../function/eventOffset'],function (require, exports, module) {

    'use strict';

    var eventPage = require('../function/eventPage');
    var eventOffset = require('../function/eventOffset');

    function getTouchObject(e) {
        return e.originalEvent.changedTouches[0];
    }

    var element = document.createElement('div');

    var touch = {
        support: 'ontouchend' in element,
        click: 'touchstart',
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend',
        page: function (e) {
            var touch = getTouchObject(e);
            return {
                x: touch.pageX,
                y: touch.pageY
            };
        },
        client: function (e) {
            var touch = getTouchObject(e);
            return {
                x: touch.clientX,
                y: touch.clientY
            };
        },
        offset: function (e) {
            var touch = getTouchObject(e);
            return {
                x: touch.offsetX,
                y: touch.offsetY
            };
        }
    };

    var mouse = {
        support: 'onclick' in element,
        click: 'click',
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup',
        page: function (e) {
            return eventPage(e);
        },
        client: function (e) {
            return {
                x: e.clientX,
                y: e.clientY
            };
        },
        offset: function () {
            return eventOffset(e);
        }
    };

    element = null;

    return {
        touch: touch,
        mouse: mouse
    };

});
/**
 * @file Draggable
 * @author musicode
 */
define('cc/helper/Draggable',['require','exports','module','../function/page','../function/restrain','../function/position','../function/contains','../function/testTarget','../function/innerOffset','../function/outerOffset','../function/pageScrollLeft','../function/pageScrollTop','../function/viewportWidth','../function/viewportHeight','../function/enableSelection','../function/disableSelection','../util/life','../util/touch','../util/instance'],function (require, exports, module) {

    'use strict';

    /**
     *
     * 拖拽元素和容器元素有两种关系：
     *
     * 1. 拖拽元素是容器的子元素，比如对话框是 body 的子元素
     * 2. 拖拽元素不是容器的子元素，比如二者是同级关系，但是视觉上一个比较大，一个比较小，大的看着像容器
     *
     * 拖拽的过程就是不断计算相对于父元素的绝对定位坐标
     *
     *    mousedown 记录鼠标点击位置和元素左上角的偏移坐标，记录拖拽范围
     *    mousemove 获取当前鼠标位置并转换到相对父元素的坐标
     *
     * 元素在容器内拖拽，可拖拽盒模型范围不包括 margin 和 border
     *
     * 拖拽通常会产生大块选区，因为兼容问题，js 无法做到完美解决，必须有 css 配合，因此提供 bodyDraggingClass 选项
     */

    var page = require('../function/page');
    var restrain = require('../function/restrain');
    var position = require('../function/position');
    var contains = require('../function/contains');
    var testTarget = require('../function/testTarget');
    var innerOffset = require('../function/innerOffset');
    var outerOffset = require('../function/outerOffset');
    var pageScrollLeft = require('../function/pageScrollLeft');
    var pageScrollTop = require('../function/pageScrollTop');
    var viewportWidth = require('../function/viewportWidth');
    var viewportHeight = require('../function/viewportHeight');
    var enableSelection = require('../function/enableSelection');
    var disableSelection = require('../function/disableSelection');

    var lifeUtil = require('../util/life');
    var touchUtil = require('../util/touch');
    var bodyElement = require('../util/instance').body;

    /**
     * 拖拽
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.mainElement 需要拖拽的元素
     * @property {string} options.mainSelector 需要拖拽的元素的选择器，支持事件代理
     * @property {jQuery=} options.containerElement 限制拖拽范围的容器元素
     * @property {string=} options.draggingClass 拖拽时给 mainElement 添加的 className
     * @property {string=} options.containerDraggingClass 拖拽时给 containerElement 添加的 className
     * @property {string=} options.bodyDraggingClass 拖拽时给 bodyElement 添加的 className，用样式避免出现选区
     *
     * @property {string=} options.axis 限制方向，可选值包括 x y
     *
     * @property {(string|Array.<string>)=} options.includeSelector 触发拖拽的区域
     * @property {(string|Array.<string>)=} options.excludeSelector 不触发拖拽的区域
     *
     * @property {Function} options.init
     * @property {Function} options.dragAnimation
     *
     */
    function Draggable(options) {
        lifeUtil.init(this, options);
    }

    var proto = Draggable.prototype;

    proto.type = 'Draggable';

    proto.init = function () {

        var me = this;

        var mainElement = me.option('mainElement');
        var mainSelector = me.option('mainSelector');

        me.inner({
            main: mainElement
        });

        var containerElement = me.option('containerElement');
        if (!containerElement) {
            containerElement = page();
        }

        var draggingClass = me.option('draggingClass');
        var containerDraggingClass = me.option('containerDraggingClass');
        // 业务代码使用的组件基于 custom/ 的默认配置，因此组合使用时，外部是没法设置这个值的
        // 这里给 bodyDraggingClass 一个默认值，便于全局控制选区的禁用
        var bodyDraggingClass = me.option('bodyDraggingClass') || 'dragging';
        var draggingStyle;

        var beforeDragHandler = function (e) {

            var coord;

            draggingElement = mainSelector
                ? $(e.currentTarget)
                : mainElement;

            var isEvent = e[ $.expando ];
            if (isEvent) {

                // 这里本想使用 not 选择器来实现 exclude
                // 但是当 exclude 位于 include 内部时，mousedown exclude 区域，jq 依然会触发事件
                // 因为有这个问题，索性整个判断都放在这里

                var includeSelector = me.option('includeSelector');
                var excludeSelector = me.option('excludeSelector');

                var target = e.target;

                if (includeSelector && !testTarget(target, includeSelector, draggingElement)
                    || excludeSelector && testTarget(target, excludeSelector, draggingElement)
                ) {
                    return;
                }

                $.each(globalCoord, function (key, value) {
                    if (e.type.indexOf(key) === 0) {
                        coord = value;
                        return false;
                    }
                });

            }
            else if (e.type) {
                coord = globalCoord[ e.type ];
            }

            if (!coord) {
                coord = globalCoord.mouse;
            }

            me.emit(
                'pick',
                {
                    mainElement: draggingElement
                }
            );

            // 重新取值比较靠谱
            draggingStyle = position(draggingElement);

            point.left = draggingStyle.left;
            point.top = draggingStyle.top;

            var containerIsViewport = containerElement.is('html,body');
            var containerContainsElement = true;
            if (!containerIsViewport) {
                containerContainsElement = contains(containerElement, draggingElement);
            }

            // =================================================================
            // 计算偏移量
            // 这样方便 ondrag 时作为当前全局坐标的减数，减少计算量
            // =================================================================

            var draggingOuterOffset = outerOffset(draggingElement);
            var containerInnerOffset = innerOffset(containerElement);

            // 拖拽点相对于拖拽元素的偏移量
            var offsetX;
            var offsetY;

            if (isEvent) {
                offsetX = coord.absoluteX(e) - draggingOuterOffset.x;
                offsetY = coord.absoluteY(e) - draggingOuterOffset.y;
            }
            else {
                offsetX = e.offsetX;
                offsetY = e.offsetY;
            }

            // 因为 ondrag 是用`全局坐标`减去`偏移量`
            // 所以偏移量应该是全局坐标的偏移量
            if (containerContainsElement) {
                if (!containerIsViewport) {
                    offsetX -= containerElement.scrollLeft();
                    offsetY -= containerElement.scrollTop();
                }
                offsetX += containerInnerOffset.x;
                offsetY += containerInnerOffset.y;
            }

            // =================================================================
            // 全局坐标计算函数
            // =================================================================

            // 计算拖拽范围
            var x;
            var y;
            var width;
            var height;

            // 计算可拖拽范围有 2 种情况：
            // 1. 在容器内部定位
            // 2. 不在容器内部定位，但需要参考容器位置和大小

            // 当加入 fixed 定位时，情况又变复杂了
            // fixed 是 2 的一种特殊情况

            var viewWidth = viewportWidth();
            var viewHeight = viewportHeight();
            var viewTop = pageScrollTop();
            var viewLeft = pageScrollLeft();
            var viewRight = viewLeft + viewWidth;
            var viewBottom = viewTop + viewHeight;

            var isFixed = draggingStyle.position === 'fixed';

            if (isFixed) {
                if (containerIsViewport) {
                    x = 0;
                    y = 0;
                }
                else {
                    x = restrain(containerInnerOffset.x, viewLeft, viewRight);
                    y = restrain(containerInnerOffset.y, viewTop, viewBottom);
                }
            }
            else {
                if (containerIsViewport) {
                    x = -1 * containerInnerOffset.x;
                    y = -1 * containerInnerOffset.y;
                }
                else {
                    if (containerContainsElement) {
                        x = 0;
                        y = 0;
                    }
                    else {
                        x = containerInnerOffset.x;
                        y = containerInnerOffset.y;
                    }
                }
            }

            if (width == null) {
                if (!containerIsViewport && containerContainsElement) {
                    width = containerElement.prop('scrollWidth');
                    height = containerElement.prop('scrollHeight');
                }
                else {
                    width = containerElement.innerWidth();
                    height = containerElement.innerHeight();
                }
            }

            if (containerIsViewport) {
                if (width < viewWidth) {
                    width = viewWidth;
                }
                if (height < viewHeight) {
                    height = viewHeight;
                }
            }

            if (isFixed) {
                if (x + width > viewRight) {
                    width = viewRight - x;
                }
                if (y + height > viewBottom) {
                    height = viewBottom - y;
                }
            }

            width = Math.max(0, width - draggingElement.outerWidth(true));
            height = Math.max(0, height - draggingElement.outerHeight(true));

            var axis = me.option('axis');

            xCalculator = axis === 'y'
                        ? calculator.constant(draggingStyle.left)
                        : calculator.variable(
                            // 全局坐标
                            coord[ isFixed ? 'fixedX' : 'absoluteX' ],
                            // 偏移坐标
                            offsetX,
                            // 约束坐标范围
                            x,
                            x + width
                        );

            yCalculator = axis === 'x'
                        ? calculator.constant(draggingStyle.top)
                        : calculator.variable(
                            coord[ isFixed ? 'fixedY' : 'absoluteY' ],
                            offsetY,
                            y,
                            y + height
                        );

            counter = 0;

            return true;

        };

        var dragHandler = function (e) {

            if (counter == null) {
                return;
            }

            point.left = xCalculator(e);
            point.top = yCalculator(e);

            var event;

            // 不写在 mousedown 是因为鼠标按下不表示开始拖拽
            // 只有坐标发生变动才算
            if (counter === 0) {

                if (draggingStyle) {
                    draggingElement.css(draggingStyle);
                    draggingStyle = null;
                }

                event = me.emit('beforedrag', $.extend({}, point));
                if (event.isDefaultPrevented()) {
                    return;
                }

                disableSelection();

                if (draggingClass) {
                    draggingElement.addClass(draggingClass);
                }

                if (containerDraggingClass) {
                    containerElement.addClass(containerDraggingClass);
                }

                if (bodyDraggingClass) {
                    bodyElement.addClass(bodyDraggingClass);
                }

            }

            counter++;

            event = me.emit('drag', $.extend({}, point));
            if (!event.isDefaultPrevented()) {
                me.execute(
                    'dragAnimation',
                    {
                        mainElement: draggingElement,
                        mainStyle: point
                    }
                );
            }

        };

        var afterDragHandler = function () {

            if (counter == null) {
                return;
            }

            if (counter > 0) {

                enableSelection();

                if (draggingClass) {
                    draggingElement.removeClass(draggingClass);
                }

                if (containerDraggingClass) {
                    containerElement.removeClass(containerDraggingClass);
                }

                if (bodyDraggingClass) {
                    bodyElement.removeClass(bodyDraggingClass);
                }

                me.emit('afterdrag', $.extend({}, point));

            }

            me.emit(
                'drop',
                {
                    mainElement: draggingElement
                }
            );

            counter =
            xCalculator =
            yCalculator =
            draggingStyle =
            draggingElement = null;

        };

        me.execute('init', {
            mainElement: mainElement,
            mainSelector: mainSelector,
            namespace: me.namespace(),
            downHandler: beforeDragHandler,
            moveHandler: dragHandler,
            upHandler: afterDragHandler
        });

    };

    proto.dispose = function () {

        var me = this;

        lifeUtil.dispose(me);

        me.inner('main').off(
            me.namespace()
        );

    };

    lifeUtil.extend(proto);

    //
    // =================================================
    // 因为同一时间只能拖拽一个对象
    // 所以公用下面这些局部变量是安全的
    // =================================================
    //

    /**
     * 当前坐标
     *
     * @inner
     * @type {Object}
     */
    var point = { };

    /**
     * 计算 x 坐标的函数
     *
     * @inner
     * @type {Function}
     */
    var xCalculator;

    /**
     * 计算 y 坐标的函数
     *
     * @inner
     * @type {Function}
     */
    var yCalculator;

    /**
     * 一次拖拽行为的次数计数器
     *
     * @inner
     * @type {number}
     */
    var counter;

    /**
     * 当前正在拖拽的元素
     *
     * @inner
     * @type {jQuery}
     */
    var draggingElement;

    /**
     * 坐标计算器
     *
     * @inner
     * @type {Object}
     */
    var calculator = {

        /**
         * 返回常量
         *
         * @inner
         * @param {number} value
         * @return {Function}
         */
        constant: function (value) {
            return function () {
                return value;
            };
        },

        /**
         * 需要计算
         *
         * @inner
         * @param {Function} fn
         * @param {number} offset 偏移量
         * @param {number} min 最小值
         * @param {number} max 最大值
         * @return {Function}
         */
        variable: function (fn, offset, min, max) {
            return function (e) {
                return restrain(fn(e) - offset, min, max);
            };
        }

    };

    /**
     * 计算全局坐标
     *
     * @inner
     * @type {Object}
     */
    var globalCoord = { };

    $.each(touchUtil, function (key, event) {

        if (!event.support) {
            return;
        }

        globalCoord[ key ] = {
            absoluteX: function (e) {
                return event.client(e).x + pageScrollLeft();
            },
            absoluteY: function (e) {
                return event.client(e).y + pageScrollTop();
            },
            fixedX: function (e) {
                return event.client(e).x;
            },
            fixedY: function (e) {
                return event.client(e).y;
            }
        };

    });

    return Draggable;

});

/**
 * @file 全局拖拽
 * @author musicode
 */
define('cc/function/dragGlobal',['require','exports','module','../helper/Draggable','../util/instance'],function (require, exports, module) {

    'use strict';

    var Draggable = require('../helper/Draggable');

    var instance = require('../util/instance');

    /**
     * @param {Object} options
     * @property {string} options.element 要定位的元素
     * @property {string|Array.<string>} options.includeSelector
     * @property {string|Array.<string>} options.excludeSelector
     * @property {string=} options.draggingClass 拖拽时给 element 添加的 class
     * @return {Draggable}
     */
    return function (options) {

        return new Draggable({
            mainElement: options.element,
            containerElement: instance.body,
            mainDraggingClass: options.draggingClass,
            includeSelector: options.includeSelector,
            excludeSelector: options.excludeSelector,
            dragAnimation: options.dragAnimation,
            init: function (options) {

                var namespace = options.namespace;

                options.mainElement
                    .on('mousedown' + namespace, function (e) {

                        if (!options.downHandler(e)) {
                            return;
                        }

                        instance.document
                            .off(namespace)
                            .on('mousemove' + namespace, options.moveHandler)
                            .on('mouseup' + namespace, function (e) {

                                options.upHandler(e);

                                instance.document.off(namespace);

                            });

                    });
            }
        });

    };

});
/**
 * @file Dialog
 * @author musicode
 */
define('cc/ui/Dialog',['require','exports','module','../function/contains','../function/debounce','../function/pageWidth','../function/pageHeight','../function/pinGlobal','../function/dragGlobal','../util/life','../util/instance'],function (require, exports, module) {

    'use strict';

    var contains = require('../function/contains');
    var debounce = require('../function/debounce');
    var pageWidth = require('../function/pageWidth');
    var pageHeight = require('../function/pageHeight');

    var pinGlobal = require('../function/pinGlobal');
    var dragGlobal = require('../function/dragGlobal');

    var lifeUtil = require('../util/life');
    var window = require('../util/instance').window;

    /**
     * 对话框
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery=} options.mainElement 对话框元素
     * @property {string=} options.mainTemplate 对话框模板
     *
     * @property {string=} options.title 对话框标题模板
     * @property {string=} options.content 对话框内容模板
     * @property {string=} options.footer 对话框底部模板
     *
     * @property {(number|number)=} options.width 对话框整体宽度
     * @property {(number|string)=} options.x 对话框的 x 位置，可以是 数字(10) 或 百分比(50%)
     * @property {(number|string)=} options.y 对话框的 y 位置，可以是 数字(10) 或 百分比(50%)
     *
     * @property {boolean=} options.hidden 对话框初始化是否默认隐藏
     * @property {boolean=} options.fixed 对话框是否是 fixed 定位
     * @property {boolean=} options.modal 对话框是否模态
     * @property {boolean=} options.draggable 对话框是否可拖拽，拖拽位置需要用 draggableIncludeSelector 和 draggableExcludeSelector 配置
     * @property {boolean=} options.removeClose 是否不需要关闭按钮
     * @property {boolean=} options.removeOnEmpty 当 title 或 content 为空时，是否隐藏 header 或 body 或 footer 元素
     * @property {boolean=} options.disposeOnHide 是否隐藏时销毁控件
     * @property {boolean=} options.removeOnDispose 销毁时是否移除元素
     * @property {boolean=} options.hideOnClickMask 点击遮罩是否隐藏对话框
     * @property {number=} options.zIndex 不推荐使用这个，如果实在是被恶心的东西挡住了，只能加上一个更大的值
     *
     * @property {Function} options.showAnimation 显示对话框和遮罩动画
     * @property {Function} options.hideAnimation 隐藏对话框和遮罩动画
     * @property {Function} options.dragAnimation 拖拽对话框移动的动画
     * @property {Function} options.refreshAnimation 调用 refresh() 时调整对话框和遮罩的动画
     * @property {Function} options.resizeWindowAnimation 浏览器 resize 时调整对话框和遮罩的动画
     *
     * @property {jQuery=} options.maskElement 遮罩元素
     * @property {string=} options.maskTemplate 如果没传 maskElement，可传模板动态创建
     *
     * @property {string=} options.skinClass 皮肤
     * @property {string=} options.draggableClass 如果对话框可拖拽，给 mainElement 添加的 className
     * @property {string=} options.draggingClass 拖拽时给 mainElement 添加的 className
     *
     * @property {(string|Array)=} options.draggableIncludeSelector 可拖拽的元素
     * @property {(string|Array)=} options.draggableExcludeSelector 不可拖拽的元素
     *
     * @property {string=} options.headerSelector 头部元素
     * @property {string=} options.contentSelector 填充 content 的元素
     * @property {string=} options.footerSelector 填充 footer 的元素
     *
     * @property {string=} options.titleSelector 填充 title 的元素
     * @property {string=} options.closeSelector 点击可关闭对话框的元素
     *
     */
    function Dialog(options) {
        lifeUtil.init(this, options);
    }

    var proto = Dialog.prototype;

    proto.type = 'Dialog';

    proto.init = function () {

        var me = this;

        me.initStruct();

        var mainElement = me.option('mainElement');
        var maskElement = me.option('maskElement');

        if (me.option('modal')) {

            if (!maskElement) {
                maskElement = $(me.option('maskTemplate'));
            }

            // 遮罩放到对话框前面
            // 这样在 z-index 相同的情况下，对话框还能位于遮罩上方

            // Bootstrap 的结构居然是 .mask > .dialog，这里可以兼容一下
            if (!contains(maskElement, mainElement)) {
                mainElement.before(maskElement);
            }

        }
        else if (maskElement) {
            maskElement = null;
        }






        var classList = [ ];

        var skinClass = me.option('skinClass');
        if (skinClass) {
            classList.push(skinClass);
        }

        var draggableClass = me.option('draggableClass');
        if (me.option('draggable') && draggableClass) {
            classList.push(draggableClass);
        }

        if (classList.length > 0) {
            mainElement.addClass(
                classList.join(' ')
            );
        }





        var removeOnEmpty = me.option('removeOnEmpty');

        $.each(
            [ 'content', 'footer' ],
            function (index, name) {
                var value = me.option(name);
                var selector = me.option(name + 'Selector');
                if (value) {
                    mainElement
                        .find(selector)
                        .html(value);
                }
                else if (removeOnEmpty) {
                    mainElement
                        .find(selector)
                        .remove();
                }
            }
        );

        var title = me.option('title');
        if (title) {
            mainElement
                .find(
                    me.option('titleSelector')
                )
                .html(title);
        }
        else if (removeOnEmpty) {
            mainElement
                .find(
                    me.option('headerSelector')
                )
                .remove();
        }

        var closeSelector = me.option('closeSelector');
        if (me.option('removeClose')) {
            mainElement
                .find(closeSelector)
                .remove();
        }


        var style = { };

        var width = me.option('width');
        switch ($.type(width)) {
            case 'string':
            case 'number':
                style.width = width;
                break;
        }

        var position = me.option('fixed') ? 'fixed' : 'absolute';
        if (mainElement.css('position') !== position) {
            style.position = position;
        }

        if (maskElement) {

            var zIndexStyleName = 'z-index';

            var zIndex = me.option('zIndex');

            if (!$.isNumeric(zIndex)) {
                zIndex = maskElement.css(zIndexStyleName);
                if (!$.isNumeric(zIndex)) {
                    zIndex = 'auto';
                }
            }

            maskElement.css(zIndexStyleName, zIndex);

            style[ zIndexStyleName ] = zIndex;

        }

        mainElement.css(style);





        var clickType = 'click' + me.namespace();

        if (closeSelector) {
            mainElement.on(
                clickType,
                closeSelector,
                $.proxy(me.hide, me)
            );
        }

        if (me.option('disposeOnHide')) {
            me.on('statechange', function (e, change) {
                var hidden = change.hidden;
                if (hidden
                    && hidden.newValue === true
                    && hidden.oldValue === false
                ) {
                    me.dispose();
                }
            });
        }

        if (maskElement) {
            if (me.option('hideOnClickMask')) {
                maskElement.on(clickType, function (e) {
                    if (!contains(mainElement, e.target)) {
                        me.hide();
                    }
                });
            }
            if (me.option('removeOnDispose')) {
                me.after('dispose', function () {
                    maskElement.remove();
                });
            }
        }


        me.inner({
            main: mainElement,
            mask: maskElement
        });

        var hidden = me.option('hidden');
        if (hidden) {
            me.hide();
        }
        else {
            me.show();
        }

    };


    proto.show = function () {
        this.state('hidden', false);
    };

    proto._show = function () {
        if (this.is('hidden') === false) {
            return false;
        }
    };


    proto.hide = function () {
        this.state('hidden', true);
    };

    proto._hide = function () {
        if (this.is('hidden') === true) {
            return false;
        }
    };


    proto.refresh = function () {

        var me = this;

        var options = { };

        var mainElement = me.inner('main');
        options.mainElement = mainElement;
        options.mainStyle = pinGlobal({
            element: mainElement,
            x: me.option('x'),
            y: me.option('y'),
            fixed: me.option('fixed')
        });

        var maskElement = me.inner('mask');
        if (maskElement) {
            options.maskElement = maskElement;
            options.maskStyle = {
                width: pageWidth(),
                height: pageHeight()
            };
        }

        me.execute(
            arguments[0] ? 'resizeWindowAnimation' : 'refreshAnimation',
            options
        );

    };

    proto.dispose = function () {

        var me = this;

        lifeUtil.dispose(me);

        if (!me.is('hidden')) {
            me.hide();
        }

        var mainElement = me.inner('main');
        var maskElement = me.inner('mask');
        var namespace = me.namespace();

        mainElement.off(namespace);
        if (maskElement) {
            maskElement.off(namespace);
        }

    };

    lifeUtil.extend(proto);

    Dialog.stateUpdater = {

        hidden: function (hidden) {

            var me = this;
            var namespace = me.namespace();

            window.off(namespace);

            var dragger = me.inner('dragger');
            if (dragger) {
                dragger.dispose();
                dragger = null;
            }

            var mainElement = me.inner('main');
            var maskElement = me.inner('mask');

            var options = {
                mainElement: mainElement
            };
            if (maskElement) {
                options.maskElement = maskElement;
            }

            if (hidden) {
                me.execute(
                    'hideAnimation',
                    options
                );
            }
            else {

                window.on(
                    'resize' + namespace,
                    debounce(
                        function () {
                            me.refresh(true);
                        },
                        50
                    )
                );

                if (me.option('draggable')) {
                    dragger = dragGlobal({
                        element: mainElement,
                        includeSelector: me.option('draggableIncludeSelector'),
                        excludeSelector: me.option('draggableExcludeSelector'),
                        draggingClass: me.option('draggingClass'),
                        dragAnimation: me.option('dragAnimation')
                    });
                }

                me.execute(
                    'showAnimation',
                    options
                );

                me.refresh();

            }

            me.inner('dragger', dragger);

        }
    };


    return Dialog;

});
define('cc-config/ui/Dialog',['require','exports','module','cc/ui/Dialog'],function (require, exports, module) {

    'use strict';

    var Dialog = require('cc/ui/Dialog');

    Dialog.defaultOptions = {

        x: '50%',
        y: '50%',

        modal: true,
        fixed: true,
        hidden: false,
        draggable: true,

        removeOnEmpty: false,
        disposeOnHide: true,
        removeOnDispose: true,
        positionOnResize: true,

        hideOnClickMask: false,

        draggableClass: 'draggable',

        draggableIncludeSelector: '> .header',
        draggableExcludeSelector: [ '> .header > .title', '> .close' ],

        parentSelector: 'body',

        headerSelector: '> .header',
        titleSelector: '> .header > .title',
        closeSelector: '> .close',
        contentSelector: '> .body',
        footerSelector: '> .footer',

        mainTemplate: '<div class="dialog">'
                   +     '<div class="header">'
                   +         '<div class="title"></div>'
                   +     '</div>'
                   +     '<span class="close">&times;</span>'
                   +     '<div class="body"></div>'
                   + '</div>',

        maskTemplate: '<div class="mask"></div>',

        showAnimation: function (options) {
            options.mainElement.show();
            if (options.maskElement) {
                options.maskElement.show();
            }
        },
        hideAnimation: function (options) {
            options.mainElement.hide();
            if (options.maskElement) {
                options.maskElement.hide();
            }
        },
        dragAnimation: function (options) {
            options.mainElement.css(options.mainStyle);
        },
        refreshAnimation: function (options) {
            options.mainElement.css(options.mainStyle);
            var maskElement = options.maskElement;
            if (maskElement) {
                maskElement.css(options.maskStyle);
            }
        },
        resizeWindowAnimation: function (options) {
            options.mainElement.css(options.mainStyle);
            var maskElement = options.maskElement;
            if (maskElement) {
                maskElement.css(options.maskStyle);
            }
        }

    };

    return Dialog;

});
/**
 * @file dialogInstance服务
 * @demo
 *     dialog.open({
                title: '获取语音验证码',
                controller: 'voiceMessageCtrl',
                width: 370,
                templateUrl: helper.getTplUrl('main/cash/dialog/messageValid/voiceCode/tpl'),
                resolve: {
                    dialogConfig: function () {
                        return {
                            sendMessagePath: $scope.sendMessagePath
                        };
                    }
                }
            });
 * @author hurry
 */
define('common/ngService/dialog',['require','./module','cc-config/ui/Dialog','cc/ui/Dialog'],function (require) {
    'use strict';
    var serviceModule = require('./module');
    // var Dialog = require('cobble/ui/Dialog');
    require('cc-config/ui/Dialog');
    var Dialog = require('cc/ui/Dialog');
    serviceModule.factory('dialog', ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$compile',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $compile) {

            return {

                /**
                 * 显示一个弹框
                 * @param {Object} param 参数
                 * @param {Object.template} param 参数
                 * @param {Object.templateUrl} param 参数
                 * @param {Object.?} 其他参数透传，参见dep/cobble/0.3.0/src/ui/Dialog.js
                 */
                open: function (param) {

                    function getTemplatePromise(options) {
                        return options.template ? $q.when(options.template) :
                            $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl,
                                {cache: $templateCache}).then(function (result) {
                                    return result.data;
                                });
                    }

                    function getResolvePromises(resolves) {
                        var promisesArr = [];
                        angular.forEach(resolves, function (value) {
                            if (angular.isFunction(value) || angular.isArray(value)) {
                                promisesArr.push($q.when($injector.invoke(value)));
                            }
                        });
                        return promisesArr;
                    }

                    var modalResultDeferred = $q.defer();
                    var modalOpenedDeferred = $q.defer();
                    var dialogInstance = {};

                    //merge and clean up options
                    param = angular.extend({}, param);
                    param.resolve = param.resolve || {};

                    //verify options
                    if (!param.template && !param.templateUrl) {
                        throw new Error('one of template or templateurl options is required.');
                    }

                    dialogInstance.result = modalResultDeferred.promise;
                    dialogInstance.opened = modalOpenedDeferred.promise;
                    var templateAndResolvePromise =
                        $q.all([getTemplatePromise(param)].concat(getResolvePromises(param.resolve)));


                    templateAndResolvePromise.then(function resolvesuccess(tplandvars) {
                        var modalscope = (param.scope || $rootScope).$new();
                        var ctrllocals = {};
                        var resolveiter = 1;

                        var opts = $.extend(
                            {},
                            {
                                title: '提示',
                                content: tplandvars[0],
                                width: 400,
                                zIndex: 1000
                                // y: '20%'
                            },
                            param
                        );

                        dialogInstance.dialog = new Dialog(opts);

                        dialogInstance.dialog.close = function (value) {
                            this.hide();
                            modalResultDeferred.reject(value);
                        };
                        dialogInstance.dialog.dismiss = function (value) {
                            this.hide();
                            modalResultDeferred.resolve(value);
                        };
                        //controllers
                        if (param.controller) {
                            ctrllocals.$scope = modalscope;
                            angular.forEach(param.resolve, function (value, key) {
                                ctrllocals[key] = tplandvars[resolveiter++];
                                modalscope[key] = tplandvars[resolveiter++];
                            });

                            $controller(param.controller, ctrllocals);
                        }
                        modalscope.dialog = dialogInstance.dialog;
                        dialogInstance.dialog.$scope = modalscope;
                        $compile(dialogInstance.dialog.options.mainElement)(modalscope);
                        modalOpenedDeferred.resolve(dialogInstance);

                    }, function resolveerror(reason) {
                        modalResultDeferred.reject(reason);
                        modalOpenedDeferred.reject(false);
                    });

                    templateAndResolvePromise.then(function () {
                        modalOpenedDeferred.resolve(true);
                    }, function () {
                        modalOpenedDeferred.reject(false);
                    });
                    return dialogInstance.result;
                },
                /**
                 * 显示一个弹框
                 * @param {Object} controller 控制器
                 */
                // bind: function (controller, options) {

                //     var dialogInstance = {};
                //     var options = options || {};

                //     dialogInstance.dialog = $modal.open({
                //         templateUrl: 'app/module/common/tpl/tpl.html',
                //         windowTemplateUrl: 'app/module/common/tpl/window.html',
                //         controller: controller,
                //         resolve: options.resolve || {},
                //         size: options.size,
                //         openedClass: options.openedClass,
                //         windowClass: options.windowClass,
                //         backdropClass: options.backdropClass
                //     });

                //     dialogInstance.dialog.rendered.then(function (dialog) {
                //     });

                //     return dialogInstance.opened;
                // }
            };
        }]);
});
/**
 * @file json
 * @author musicode copy from json2
 */
define('cc/util/json',['require','exports','module'],function (require, exports, module) {

    /*
        json2.js
        2015-05-03

        Public Domain.

        NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

        See http://www.JSON.org/js.html


        This code should be minified before deployment.
        See http://javascript.crockford.com/jsmin.html

        USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
        NOT CONTROL.


        This file creates a global JSON object containing two methods: stringify
        and parse. This file is provides the ES5 JSON capability to ES3 systems.
        If a project might run on IE8 or earlier, then this file should be included.
        This file does nothing on ES5 systems.

            JSON.stringify(value, replacer, space)
                value       any JavaScript value, usually an object or array.

                replacer    an optional parameter that determines how object
                            values are stringified for objects. It can be a
                            function or an array of strings.

                space       an optional parameter that specifies the indentation
                            of nested structures. If it is omitted, the text will
                            be packed without extra whitespace. If it is a number,
                            it will specify the number of spaces to indent at each
                            level. If it is a string (such as '\t' or '&nbsp;'),
                            it contains the characters used to indent at each level.

                This method produces a JSON text from a JavaScript value.

                When an object value is found, if the object contains a toJSON
                method, its toJSON method will be called and the result will be
                stringified. A toJSON method does not serialize: it returns the
                value represented by the name/value pair that should be serialized,
                or undefined if nothing should be serialized. The toJSON method
                will be passed the key associated with the value, and this will be
                bound to the value

                For example, this would serialize Dates as ISO strings.

                    Date.prototype.toJSON = function (key) {
                        function f(n) {
                            // Format integers to have at least two digits.
                            return n < 10
                                ? '0' + n
                                : n;
                        }

                        return this.getUTCFullYear()   + '-' +
                             f(this.getUTCMonth() + 1) + '-' +
                             f(this.getUTCDate())      + 'T' +
                             f(this.getUTCHours())     + ':' +
                             f(this.getUTCMinutes())   + ':' +
                             f(this.getUTCSeconds())   + 'Z';
                    };

                You can provide an optional replacer method. It will be passed the
                key and value of each member, with this bound to the containing
                object. The value that is returned from your method will be
                serialized. If your method returns undefined, then the member will
                be excluded from the serialization.

                If the replacer parameter is an array of strings, then it will be
                used to select the members to be serialized. It filters the results
                such that only members with keys listed in the replacer array are
                stringified.

                Values that do not have JSON representations, such as undefined or
                functions, will not be serialized. Such values in objects will be
                dropped; in arrays they will be replaced with null. You can use
                a replacer function to replace those with JSON values.
                JSON.stringify(undefined) returns undefined.

                The optional space parameter produces a stringification of the
                value that is filled with line breaks and indentation to make it
                easier to read.

                If the space parameter is a non-empty string, then that string will
                be used for indentation. If the space parameter is a number, then
                the indentation will be that many spaces.

                Example:

                text = JSON.stringify(['e', {pluribus: 'unum'}]);
                // text is '["e",{"pluribus":"unum"}]'


                text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
                // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

                text = JSON.stringify([new Date()], function (key, value) {
                    return this[key] instanceof Date
                        ? 'Date(' + this[key] + ')'
                        : value;
                });
                // text is '["Date(---current time---)"]'


            JSON.parse(text, reviver)
                This method parses a JSON text to produce an object or array.
                It can throw a SyntaxError exception.

                The optional reviver parameter is a function that can filter and
                transform the results. It receives each of the keys and values,
                and its return value is used instead of the original value.
                If it returns what it received, then the structure is not modified.
                If it returns undefined then the member is deleted.

                Example:

                // Parse the text. Values that look like ISO date strings will
                // be converted to Date objects.

                myData = JSON.parse(text, function (key, value) {
                    var a;
                    if (typeof value === 'string') {
                        a =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                        if (a) {
                            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                                +a[5], +a[6]));
                        }
                    }
                    return value;
                });

                myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                    var d;
                    if (typeof value === 'string' &&
                            value.slice(0, 5) === 'Date(' &&
                            value.slice(-1) === ')') {
                        d = new Date(value.slice(5, -1));
                        if (d) {
                            return d;
                        }
                    }
                    return value;
                });


        This is a reference implementation. You are free to copy, modify, or
        redistribute.
    */

    /*jslint
        eval, for, this
    */

    /*property
        JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
        getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
        lastIndex, length, parse, prototype, push, replace, slice, stringify,
        test, toJSON, toString, valueOf
    */


    // Create a JSON object only if one does not already exist. We create the
    // methods in a closure to avoid creating global variables.

    if (typeof JSON !== 'object') {
        JSON = {};
    }

    (function () {
        'use strict';

        var rx_one = /^[\],:{}\s]*$/,
            rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rx_four = /(?:^|:|,)(?:\s*\[)+/g,
            rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10
                ? '0' + n
                : n;
        }

        function this_value() {
            return this.valueOf();
        }

        if (typeof Date.prototype.toJSON !== 'function') {

            Date.prototype.toJSON = function () {

                return isFinite(this.valueOf())
                    ? this.getUTCFullYear() + '-' +
                            f(this.getUTCMonth() + 1) + '-' +
                            f(this.getUTCDate()) + 'T' +
                            f(this.getUTCHours()) + ':' +
                            f(this.getUTCMinutes()) + ':' +
                            f(this.getUTCSeconds()) + 'Z'
                    : null;
            };

            Boolean.prototype.toJSON = this_value;
            Number.prototype.toJSON = this_value;
            String.prototype.toJSON = this_value;
        }

        var gap,
            indent,
            meta,
            rep;


        function quote(string) {

    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

            rx_escapable.lastIndex = 0;
            return rx_escapable.test(string)
                ? '"' + string.replace(rx_escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string'
                        ? c
                        : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"'
                : '"' + string + '"';
        }


        function str(key, holder) {

    // Produce a string from holder[key].

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

            if (value && typeof value === 'object' &&
                    typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

    // What happens next depends on the value's type.

            switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

    // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value)
                    ? String(value)
                    : 'null';

            case 'boolean':
            case 'null':

    // If the value is a boolean or null, convert it to a string. Note:
    // typeof null does not produce 'null'. The case is included here in
    // the remote chance that this gets fixed someday.

                return String(value);

    // If the type is 'object', we might be dealing with an object or an array or
    // null.

            case 'object':

    // Due to a specification blunder in ECMAScript, typeof null is 'object',
    // so watch out for that case.

                if (!value) {
                    return 'null';
                }

    // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

    // Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

    // The value is an array. Stringify every element. Use null as a placeholder
    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

    // Join all of the elements together, separated with commas, and wrap them in
    // brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

    // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                    gap
                                        ? ': '
                                        : ':'
                                ) + v);
                            }
                        }
                    }
                } else {

    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                    gap
                                        ? ': '
                                        : ':'
                                ) + v);
                            }
                        }
                    }
                }

    // Join all of the member texts together, separated with commas,
    // and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                        ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
            }
        }

    // If the JSON object does not yet have a stringify method, give it one.

        if (typeof JSON.stringify !== 'function') {
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };
            JSON.stringify = function (value, replacer, space) {

    // The stringify method takes a value and an optional replacer, and an optional
    // space parameter, and returns a JSON text. The replacer can be a function
    // that can replace values, or an array of strings that will select the keys.
    // A default replacer method can be provided. Use of the space parameter can
    // produce text that is more easily readable.

                var i;
                gap = '';
                indent = '';

    // If the space parameter is a number, make an indent string containing that
    // many spaces.

                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

    // If the space parameter is a string, it will be used as the indent string.

                } else if (typeof space === 'string') {
                    indent = space;
                }

    // If there is a replacer, it must be a function or an array.
    // Otherwise, throw an error.

                rep = replacer;
                if (replacer && typeof replacer !== 'function' &&
                        (typeof replacer !== 'object' ||
                        typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.

                return str('', {'': value});
            };
        }


    // If the JSON object does not yet have a parse method, give it one.

        if (typeof JSON.parse !== 'function') {
            JSON.parse = function (text, reviver) {

    // The parse method takes a text and an optional reviver function, and returns
    // a JavaScript value if the text is a valid JSON text.

                var j;

                function walk(holder, key) {

    // The walk method is used to recursively walk the resulting structure so
    // that modifications can be made.

                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }


    // Parsing happens in four stages. In the first stage, we replace certain
    // Unicode characters with escape sequences. JavaScript handles many characters
    // incorrectly, either silently deleting them, or treating them as line endings.

                text = String(text);
                rx_dangerous.lastIndex = 0;
                if (rx_dangerous.test(text)) {
                    text = text.replace(rx_dangerous, function (a) {
                        return '\\u' +
                                ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }

    // In the second stage, we run the text against regular expressions that look
    // for non-JSON patterns. We are especially concerned with '()' and 'new'
    // because they can cause invocation, and '=' because it can cause mutation.
    // But just to be safe, we want to reject all unexpected forms.

    // We split the second stage into 4 regexp operations in order to work around
    // crippling inefficiencies in IE's and Safari's regexp engines. First we
    // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
    // replace all simple value tokens with ']' characters. Third, we delete all
    // open brackets that follow a colon or comma or that begin the text. Finally,
    // we look to see that the remaining characters are only whitespace or ']' or
    // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

                if (
                    rx_one.test(
                        text
                            .replace(rx_two, '@')
                            .replace(rx_three, ']')
                            .replace(rx_four, '')
                    )
                ) {

    // In the third stage we use the eval function to compile the text into a
    // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
    // in JavaScript: it can begin a block or an object literal. We wrap the text
    // in parens to eliminate the ambiguity.

                    j = eval('(' + text + ')');

    // In the optional fourth stage, we recursively walk the new structure, passing
    // each name/value pair to a reviver function for possible transformation.

                    return typeof reviver === 'function'
                        ? walk({'': j}, '')
                        : j;
                }

    // If the text is not JSON parseable, then a SyntaxError is thrown.

                throw new SyntaxError('JSON.parse');
            };
        }
    }());

    return JSON;

});
/**
 * @file 是否支持 localStorage
 * @author musicode
 */
define('cc/function/supportLocalStorage',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 是否支持 localStorage
     *
     * @return {boolean}
     */
    return function () {

        return typeof window.localStorage !== 'undefined';

    };

});
/**
 * @file localStorage 本地存储
 * @author musicode
 */
define('cc/util/localStorage',['require','exports','module','../function/supportLocalStorage'],function (require, exports, module) {

    'use strict';

    var support = require('../function/supportLocalStorage')();

    /**
     * 设置键值
     *
     * @param {string|Object} key 键或一个键值对象
     * @param {(string|number)=} value 键值，当 key 是 Object 时，可不传
     */
    function set(key, value) {

        if ($.isPlainObject(key)) {
            $.each(key, set);
        }
        else {
            try {
                localStorage[key] = value;
            }
            catch (e) { }
        }
    }

    /**
     * 获取值
     *
     * @param {string} key 键
     * @return {string?}
     */
    function get(key) {

        var result;

        try {
            result = localStorage[key];
        }
        catch (e) { }

        return result;

    }

    /**
     * 删除一个键值对
     *
     * @param {string} key 键
     */
    function remove(key) {

        try {
            localStorage.removeItem(key);
        }
        catch (e) { }

    }

    exports.support = support;

    if (support) {
        exports.set = set;
        exports.get = get;
        exports.remove = remove;
    }
    else {
        exports.set =
        exports.get =
        exports.remove = $.noop;
    }

});
/**
 * @file 日期
 * @author hurry
 */
define('common/ngService/confirm/controller',['require','cc/util/localStorage'],function (require) {
    'use strict';
    var localStorage = require('cc/util/localStorage');
    function Controller($scope, dialogConfig, $sce, $timeout) {
        var vm = $scope;
        //设置缓存
        function setNotRemindAgainCache() {
            if (vm.cacheKey) {
                var cacheValue = vm.notRemindAgain ? 'notRemindAgain': 'remindAgain';
                localStorage.set(vm.cacheKey, cacheValue);
            }
        }

        function init() {
            vm.okBtnPosition = dialogConfig.okBtnPosition;
            vm.okBtnText = dialogConfig.okBtnText;
            vm.cancelBtnText = dialogConfig.cancelBtnText;
            vm.content = $sce.trustAsHtml(dialogConfig.content);
            vm.hideCancel = dialogConfig.hideCancel;
            vm.textClass = dialogConfig.textClass;
            vm.cacheKey = dialogConfig.cacheKey;
            vm.notRemindAgain = dialogConfig.notRemindAgain;
            vm.remindText = dialogConfig.remindText;
        }
        vm.okHandler = function () {
            setNotRemindAgainCache();
            if ($.isFunction(dialogConfig.okHandler)) {
                var result = dialogConfig.okHandler();
                if (result === false) {
                    return;
                }
            }
            vm.dialog.dismiss('ok');
        };
        vm.cancelHandler = function () {
            setNotRemindAgainCache();
            if ($.isFunction(dialogConfig.cancelHandler)) {
                var result = dialogConfig.cancelHandler();
                if (result === false) {
                    return;
                }
            }
            vm.dialog.close();
        };

        $timeout(function () {
            $('.close').on('click', function () {
                setNotRemindAgainCache();
                vm.dialog.close();
            });
        });

        init();
    }

    Controller.$inject = [
        '$scope', 'dialogConfig', '$sce',
        '$timeout'
    ];
    return Controller;
});

/**
 * @file ajax service
 * @author hurry
 */
define('common/ngService/utilService',['require','cc/util/json','cc/function/divide','./confirm/controller'],function (require) {
    'use strict';
    var json = require('cc/util/json');
    var divide = require('cc/function/divide');
    angular
        .module('Manage.services')
        .factory('utilService', ['dialog', '$q', function (dialog, $q) {
            return {
                parseQuery: function () {
                    var queryString = location.search.slice(1);
                    var queryArray = queryString.split('&');

                    var result = {};

                    $(queryArray).each(function (index, item) {
                        item = item.split('=');
                        result[item[0]] = decodeURIComponent(item[1]);
                    });

                    return result;
                },
                // 获取当前环境
                getEnvName: function () {
                    var host = window.location.host.split('.');
                    var env = 'www';

                    if (host.length > 1) {
                        host = host[0].split('-');

                        if (host.length > 1) {
                            env = host[0];
                        }
                    }

                    return env;
                },
                /**
                 * 统一的alert/confirm弹框
                 * @param  {Object/string} options [description]
                 * @param  {?string} options.title 标题，默认'提示'
                 * @param  {string} options.content 内容
                 * @param  {string} options.width 宽度
                 * @param  {?boolean} options.hideCancel 是否隐藏取消按钮，默认隐藏
                 * @param  {?string} options.okBtnText 确定按钮文本，默认'确定'
                 * @param  {?string} options.cancelBtnText 取消按钮文本，默认'取消'
                 * @param  {?function} options.okHandler 点确定回调，返回false，不关闭弹框
                 * @param  {?function} options.cancelHandler 点取消回调，返回false，不关闭弹框
                 * @param  {?string} options.skinClass 弹窗类 便于样式处理
                 * @param  {?string} options.textClass 文本类 用于控制文本展示颜色
                 *          可以取 primary secondary success error info danger warning muted 之一
                 * @param  {?string} options.cacheKey 考虑有些弹窗会有不再提示的勾选项 该字段不为空则展示不再勾选  默认不展示
                 *          cacheKey为勾选不再提示时设置localStorage的key
                 * @param  {?string} options.notRemindAgain 是否默认勾选   默认不勾选
                 * @param  {?string} options.remindText  提示文案  默认  '不再提示'
                 * @param  {?string} options.okBtnPosition 确认按钮的位置 left right
                 * @return {Promise}         [description]
                 */
                showMessage: function (options) {
                    var defer = $q.defer();
                    var content = options.content;
                    if (options + '' === options) {
                        content = options;
                    }
                    var hideCancel = true;
                    if (typeof options.hideCancel === 'boolean') {
                        hideCancel = options.hideCancel;
                    }
                    var dialogOpt = {
                        title: options.title || '提示',
                        skinClass: (options.skinClass || '') + ' show-message',
                        controller: require('./confirm/controller'),
                        templateUrl: 'app/common/ngService/confirm/tpl.html',
                        width: options.width || 370,
                        resolve: {
                            dialogConfig: function () {
                                return {
                                    okBtnPosition: options.okBtnPosition || 'right',
                                    okBtnText: options.okBtnText || '确定',
                                    cancelBtnText: options.cancelBtnText || '取消',
                                    hideCancel: hideCancel,
                                    content: content,
                                    textClass: options.textClass || '',
                                    okHandler: options.okHandler,
                                    cancelHandler: options.cancelHandler,
                                    cacheKey: options.cacheKey || '',
                                    notRemindAgain: options.notRemindAgain || false,
                                    remindText: options.remindText || '不再提示'
                                };
                            }
                        }
                    };
                    var dialogInstance = dialog.open(dialogOpt);
                    dialogInstance
                        .then(function (res) {
                            defer.resolve(res);
                        },
                        function (res) {
                            defer.reject(res);
                        });
                    return defer.promise;
                },
                /**
                 * 修改函数上下文
                 *
                 * @param  {Function} fn      [description]
                 * @param  {[type]}   context [description]
                 * @param  {[type]}   args    [description]
                 * @return {[type]}           [description]
                 */
                bind: function(fn, context) {
                    var extraArgs = [].slice.call(arguments, 2);
                    return function() {
                        var args = extraArgs.concat([].slice.call(arguments));
                        return fn.apply(context, args);
                    };
                },
                /**
                 * 停止事件的传播
                 *
                 * @param {Event} event 事件对象
                 */
                stopPropagation: function(event) {
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    } else {
                        event.cancelBubble = true;
                    }
                },
                JSON: {
                    parse: function (value) {
                        if (JSON.parse) {
                            return JSON.parse(value);
                        }
                        return json.parse(value);
                    },
                    stringify: function (value) {
                        if (JSON.stringify) {
                            return JSON.stringify(value);
                        }
                        return json.stringify(value);
                    }
                },
                /**
                 * 格式化size B KB MB GB
                 * @param  {number} size 文件大小
                 * @return {string}      格式化后的size字符串
                 */
                formatFileSize: function (size) {
                    var unit;
                    //有些地方size是字符串
                    size = +size;
                    if (size < 1024) {
                        unit = 'B';
                    }
                    else if (size < Math.pow(1024, 2)) {
                        size =  divide(size, 1024);
                        unit = 'KB';
                    }
                    else if (size < Math.pow(1024, 3)) {
                        size =  divide(size, Math.pow(1024, 2));
                        unit = 'MB';
                    }
                    else {
                        size =  divide(size, Math.pow(1024, 3));
                        unit = 'GB';
                    }

                    return size.toFixed(1) + unit;
                },
                /**
                 * 将时间戳或日期转为固定格式的日期展示
                 * year-month-day  year年month月day日
                 * @param  {string} date 可以为时间戳和支持转化的日期格式
                 * @param {string}   formatter '-'  ':'
                 * @return {string}      格式化后的日期符串
                 */
                formatDateString: function (date, formatter) {
                    var date = new Date(date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    if (day < 10) {
                        day = '0' + day;
                    }
                    if (month < 10) {
                        month = '0' + month;
                    }
                    var dateArray = [];
                    dateArray.push(year);
                    dateArray.push(month);
                    dateArray.push(day);

                    if (formatter) {
                        return dateArray.join(formatter);
                    }
                    else {
                        return year + '年' + month + '月' + day + '日';
                    }
                },
                /**
                 *  将某个时间转换成相对UTC-8时区(北京)的时间毫秒数
                 *  北京时区相对于UTC时区 晚8小时
                 *  @param  {string} date 可以为时间戳和支持转化的日期格式
                 */
                getUTC8Time: function (date) {
                    var hourMilliSeconds = 60 * 60 * 1000;
                    var date = new Date(date);
                    var year =  date.getUTCFullYear();
                    var month = date.getUTCMonth();
                    var day = date.getUTCDate();
                    var hour = date.getUTCHours();
                    var minute = date.getUTCMinutes();
                    var second = date.getUTCSeconds();
                    var milliSecond = date.getUTCMilliseconds();
                    return new Date(year, month, day, hour, minute, second, milliSecond).getTime() + 8 * hourMilliSeconds;
                },
                /**
                 *  @param  {string} sourceString 对html进行转义  防止xss攻击
                 */
                encodeHtml: function (sourceString) {
                    return String(sourceString)
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;');
                }
            };
        }]);
});
/**
 * @file 计算比例
 * @author musicode
 */
define('cc/function/ratio',['require','exports','module'],function (require, exports, module) {

    'use strict';

    return function (numerator, denominator) {
        if (numerator >= 0 && denominator > 0) {
            return numerator / denominator;
        }
        return 0;
    };

});
/**
 * @file extname -> mime-type
 * @author musicode
 */
define('cc/util/mimeType',['require','exports','module'],function (require, exports, module) {

    'use strict';

    return {
        html    : 'text/html',
        htm     : 'text/html',
        shtml   : 'text/html',
        xml     : 'text/xml',
        css     : 'text/css',
        js      : 'application/x-javascript',
        json    : 'application/json',
        atom    : 'application/atom+xml',
        rss     : 'application/rss+xml',

        mml     : 'text/mathml',
        txt     : 'text/plain',
        jad     : 'text/vnd.sun.j2me.app-descriptor',
        wml     : 'text/vnd.wap.wml',
        htc     : 'text/x-component',

        jpg     : 'image/jpeg',
        jpeg    : 'image/jpeg',
        png     : 'image/png',
        gif     : 'image/gif',
        tif     : 'image/tiff',
        tiff    : 'image/tiff',
        wbmp    : 'image/vnd.wap.wbmp',
        ico     : 'image/x-icon',
        jng     : 'image/x-jng',
        bmp     : 'image/x-ms-bmp',
        svg     : 'image/svg+xml',
        svgz    : 'image/svg+xml',
        webp    : 'image/webp',

        mp3     : 'audio/mpeg',
        wma     : 'audio/x-ms-wma',
        wav     : 'audio/x-wav',
        mid     : 'audio/midi',
        midd    : 'audio/midi',
        kar     : 'audio/midi',
        ogg     : 'audio/ogg',
        m4a     : 'audio/x-m4a',
        ra      : 'audio/x-realaudio',
        ram     : 'audio/x-pn-realaudio',
        mod     : 'audio/mod',


        '3gp'   : 'video/3gpp',
        '3gpp'  : 'video/3gpp',
        mp4     : 'video/mp4',
        mpeg    : 'video/mpeg',
        mpg     : 'video/mpeg',
        mov     : 'video/quicktime',
        webm    : 'video/webm',
        flv     : 'video/x-flv',
        m4v     : 'video/x-m4v',
        mng     : 'video/x-mng',
        asx     : 'video/x-ms-asf',
        asf     : 'video/x-ms-asf',
        wmv     : 'video/x-ms-wmv',
        avi     : 'video/x-msvideo',
        rm      : 'video/vnd.rn-realvideo',
        rmvb    : 'video/vnd.rn-realvideo',
        ts      : 'video/MP2T',
        dv      : 'video/x-dv',
        mkv     : 'video/x-matroska',

        jar     : 'application/java-archive',
        war     : 'application/java-archive',
        ear     : 'application/java-archive',
        hqx     : 'application/mac-binhex40',
        pdf     : 'application/pdf',
        ps      : 'application/postscript',
        eps     : 'application/postscript',
        ai      : 'application/postscript',
        rtf     : 'application/rtf',
        wmlc    : 'application/vnd.wap.wmlc',
        kml     : 'application/vnd.google-earth.kml+xml',
        kmz     : 'application/vnd.google-earth.kmz',
        '7z'    : 'application/x-7z-compressed',
        cco     : 'application/x-cocoa',
        jardiff : 'application/x-java-archive-diff',
        jnlp    : 'application/x-java-jnlp-file',
        run     : 'application/x-makeself',
        pl      : 'application/x-perl',
        pm      : 'application/x-perl',
        prc     : 'application/x-pilot',
        pdb     : 'application/x-pilot',
        rar     : 'application/x-rar-compressed',
        rpm     : 'application/x-redhat-package-manager',
        sea     : 'application/x-sea',
        swf     : 'application/x-shockwave-flash',
        sit     : 'application/x-stuffit',
        tcl     : 'application/x-tcl',
        tk      : 'application/x-tcl',
        der     : 'application/x-x509-ca-cert',
        pem     : 'application/x-x509-ca-cert',
        crt     : 'application/x-x509-ca-cert',
        xpi     : 'application/x-xpinstall',
        xhtml   : 'application/xhtml+xml',
        zip     : 'application/zip',

        bin     : 'application/octet-stream',
        exe     : 'application/octet-stream',
        dll     : 'application/octet-stream',
        deb     : 'application/octet-stream',
        dmg     : 'application/octet-stream',
        eot     : 'application/octet-stream',
        iso     : 'application/octet-stream',
        img     : 'application/octet-stream',
        msi     : 'application/octet-stream',
        msp     : 'application/octet-stream',
        msm     : 'application/octet-stream',

        doc     : 'application/msword',
        xls     : 'application/vnd.ms-excel',
        ppt     : 'application/vnd.ms-powerpoint',
        docx    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx    : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        pptx    : 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };

});
/**
 * @file AjaxUploader
 * @author musicode
 */
define('cc/helper/AjaxUploader',['require','exports','module','../function/ratio','../function/restrain','../function/nextTick','../util/life','../util/event','../util/mimeType'],function (require, exports, module) {

    'use strict';

    /**
     * ## 多文件上传
     *
     *     实质是文件多选，最终还是一个一个上传文件的，并非同时上传
     *
     * ## 文件格式
     *
     *     html 的规范是 MIME type，如 audio/*, video/*
     *     具体可见 http://www.iana.org/assignments/media-types
     *
     *     但鉴于这种方式不直观(小白可能都没听过 MIME type)，还是用扩展名好了
     */

    var getRatio = require('../function/ratio');
    var restrain = require('../function/restrain');
    var nextTick = require('../function/nextTick');

    var lifeUtil = require('../util/life');
    var eventUtil = require('../util/event');
    var mimeTypeUtil = require('../util/mimeType');

    /**
     * 使用 HTML5 ajax 上传
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.mainElement 点击打开文件选择框的元素
     * @property {string} options.action 上传地址
     * @property {boolean=} options.multiple 是否支持多文件上传
     * @property {Object=} options.data 上传的其他数据
     * @property {Object=} options.header 请求头
     * @property {string=} options.fileName 上传文件的 name 值
     * @property {Array.<string>=} options.accept 可上传的文件类型，如
     *                                            [ 'jpg', 'png' ]
     * @property {boolean=} options.useChunk 是否使用分片上传
     * @property {number=} options.chunkSize 分片大小
     *
     */
    function AjaxUploader(options) {
        lifeUtil.init(this, options);
    }

    var proto = AjaxUploader.prototype;

    proto.type = 'AjaxUploader';

    proto.init = function () {

        var me = this;

        var fileElement = me.option('mainElement');


        // 确保是文件上传控件
        if (!fileElement.is('input[type="file"]')) {
            me.error('AjaxUploader mainElement must be <input type="file" />.');
        }

        // 用一个 form 元素包着，便于重置
        var mainElement = $('<form></form>');

        fileElement.replaceWith(mainElement);
        mainElement.append(fileElement);



        // 完善元素属性
        var properties = { };

        if (me.option('accept')) {
            properties.accept = formatAccept(me.option('accept'));
        }

        if (me.option('multiple')) {
            properties.multiple = true;
        }



        fileElement
        .prop(properties)
        .on(
            'change' + me.namespace(),
            function () {
                $.each(
                    me.getFiles(),
                    function (index, fileItem) {
                        fileItem.dispose();
                    }
                );

                me.inner(
                    'files',
                    $.map(
                        fileElement.prop('files'),
                        function (file, index) {
                            return new FileItem({
                                nativeFile: file,
                                index: index
                            });
                        }
                    )
                );

                me.emit('filechange');

            }
        );

        /**
         * 文件队列，格式如下：
         * {
         *     index: 0,  // 当前上传文件的索引
         *     files: [], // 上传文件列表
         * }
         *
         * @type {Object}
         */
        me.inner({
            main: mainElement,
            file: fileElement,
            files: [ ]
        });

        me.set({
            action: me.option('action'),
            data: me.option('data')
        });

        me.emit('ready');

    };

    /**
     * 获取选择的文件
     *
     * @return {Array.<Object>} 对象格式为
     *                          {
     *                              index: 0,         // 文件索引
     *                              file: { },        // 标准文件对象
     *                              nativeFile: File, // 原生文件对象
     *                              status: 0         // 文件状态：等待上传，上传中，上传成功，上传失败等
     *                          }
     *
     */
    proto.getFiles = function () {
        return this.inner('files');
    };

    /**
     * 重置
     */
    proto.reset = function () {
        // 避免出现停止后选择相同文件，不触发 change 事件的问题
        this.inner('main')[0].reset();
    };

    /**
     * 上传文件
     *
     * @param {number} index
     * @param {Object=} fileItem
     */
    proto.upload = function (index, fileItem) {

        var me = this;

        if (!fileItem) {
            fileItem = me.getFiles()[index];
        }
        else {
            fileItem = new FileItem(fileItem);
            me.getFiles()[index] = fileItem;
        }

        if (fileItem) {
            if (
                fileItem.upload({
                    action: me.get('action'),
                    data: me.get('data'),
                    fileName: me.option('fileName'),
                    header: me.option('header'),
                    path: me.option('path'),
                    authToken: me.option('authToken'),
                    useChunk: me.get('useChunk'),
                    chunkSize: me.get('chunkSize')
                })
            ) {
                var dispatchEvent = function (e, data) {
                    me.emit(e, data);
                };
                fileItem
                    .on('uploadstart', dispatchEvent)
                    .on('uploadprogress', dispatchEvent)
                    .on('uploadsuccess', dispatchEvent)
                    .on('uploaderror', dispatchEvent)
                    .on('uploadcomplete', dispatchEvent)
                    .on('chunkuploadsuccess', dispatchEvent);
            }
        }

    };

    /**
     * 停止上传
     */
    proto.stop = function (index) {
        var fileItem = this.getFiles()[index];
        if (fileItem) {
            fileItem.cancel();
        }
    };

    /**
     * 启用
     */
    proto.enable = function () {
        this.inner('file').prop('disabled', false);
    };

    /**
     * 禁用
     */
    proto.disable = function () {
        this.inner('file').prop('disabled', true);
    };

    /**
     * 销毁对象
     */
    proto.dispose = function () {

        var me = this;

        lifeUtil.dispose(me);

        me.stop();

        me.inner('file').off(
            me.namespace()
        );

    };

    lifeUtil.extend(proto, ['getFiles', 'setAction', 'setData']);

    /**
     * 是否支持分块上传
     *
     * @static
     * @type {boolean}
     */
    AjaxUploader.supportChunk = typeof FileReader !== 'undefined';

    /**
     * 等待上传状态
     *
     * @const
     * @type {number}
     */
    AjaxUploader.STATUS_WAITING = 0;

    /**
     * 正在上传状态
     *
     * @const
     * @type {number}
     */
    AjaxUploader.STATUS_UPLOADING = 1;

    /**
     * 上传成功状态
     *
     * @const
     * @type {number}
     */
    AjaxUploader.STATUS_UPLOAD_SUCCESS = 2;

    /**
     * 上传失败状态
     *
     * @const
     * @type {number}
     */
    AjaxUploader.STATUS_UPLOAD_ERROR = 3;

    /**
     * 上传中止错误
     *
     * @const
     * @type {number}
     */
    AjaxUploader.ERROR_CANCEL = 0;

    /**
     * 上传分片大小错误
     *
     * @const
     * @type {number}
     */
    AjaxUploader.ERROR_CHUNK_SIZE = -1;


    /**
     * 事件处理函数
     *
     * @inner
     * @type {Object}
     */
    var xhrEventHandler = {

        uploadStart: {
            type: 'loadstart',
            handler: function (fileItem, e) {
                fileItem.status = AjaxUploader.STATUS_UPLOADING;
                fileItem.emit(
                    'uploadstart',
                    {
                        fileItem: fileItem.toPlainObject()
                    }
                );
            }
        },

        uploadSuccess: {
            type: 'load',
            handler: function (fileItem, e) {

                var data = {
                    responseText: fileItem.xhr.responseText
                };

                var chunkInfo = fileItem.chunk;
                if (chunkInfo) {
                    var fileSize = fileItem.file.size;
                    if (chunkInfo.uploaded < fileSize) {
                        // 分片上传成功
                        data.fileItem = fileItem.toPlainObject();
                        var event = fileItem.emit('chunkuploadsuccess', data);
                        if (!event.isDefaultPrevented()) {
                            chunkInfo.index++;
                            chunkInfo.uploaded += chunkInfo.uploading;
                            if (chunkInfo.uploaded < fileSize) {
                                fileItem.upload();
                                return;
                            }
                        }
                        else {
                            return;
                        }
                    }
                }

                fileItem.status = AjaxUploader.STATUS_UPLOAD_SUCCESS;

                data.fileItem = fileItem.toPlainObject();
                fileItem.emit('uploadsuccess', data);

                uploadComplete(fileItem);

            }
        },

        uploadError: {
            type: 'error',
            handler: function (fileItem, e, errorCode) {

                fileItem.status = AjaxUploader.STATUS_UPLOAD_ERROR;

                fileItem.emit(
                    'uploaderror',
                    {
                        fileItem: fileItem.toPlainObject(),
                        errorCode: errorCode
                    }
                );

                uploadComplete(fileItem);
            }
        },

        uploadStop: {
            type: 'abort',
            handler: function (fileItem, e) {
                xhrEventHandler
                .uploadError
                .handler(fileItem, e, AjaxUploader.ERROR_CANCEL);
            }
        }
    };

    var uploadEventHandler = {

        uploadProgress: {
            type: 'progress',
            handler: function (fileItem, e) {

                var total = fileItem.file.size;
                var uploaded = e.loaded;

                var chunkInfo = fileItem.chunk;
                if (chunkInfo) {
                    uploaded += chunkInfo.uploaded;
                }

                fileItem.emit(
                    'uploadprogress',
                    {
                        fileItem: fileItem.toPlainObject(),
                        uploaded: uploaded,
                        total: total,
                        percent: (100 * restrain(getRatio(uploaded, total), 0, 1)).toFixed(2) + '%'
                    }
                );

            }
        }


    };

    /**
     * 上传完成后执行
     *
     * @inner
     * @param {Object} fileItem
     */
    function uploadComplete(fileItem) {

        var xhr = fileItem.xhr;
        if (xhr) {

            $.each(
                xhrEventHandler,
                function (index, item) {
                    xhr['on' + item.type] = null;
                }
            );

            $.each(
                uploadEventHandler,
                function (index, item) {
                    xhr.upload['on' + item.type] = null;
                }
            );

            delete fileItem.xhr;
        }

        var options = fileItem.options;
        if (options) {
            delete fileItem.options;
        }

        fileItem.emit(
            'uploadcomplete',
            {
                fileItem: fileItem.toPlainObject()
            }
        );

    }

    function FileItem(options) {
        var me = this;
        $.extend(me, options);
        if (me.file == null) {
            me.file = formatFile(me.nativeFile)
        }
        if (me.status == null) {
            me.status = AjaxUploader.STATUS_WAITING;
        }
    }

    var FileItemPrototype = FileItem.prototype;

    FileItemPrototype.upload = function (options) {

        var me = this;

        if (!options) {
            options = me.options;
        }
        else {
            me.options = options;
        }

        var validStatus = options.useChunk
            ? AjaxUploader.STATUS_UPLOADING
            : AjaxUploader.STATUS_WAITING;

        if (me.status > validStatus) {
            return;
        }

        var xhr = new XMLHttpRequest();
        me.xhr = xhr;

        $.each(
            xhrEventHandler,
            function (index, item) {
                xhr['on' + item.type] = function (e) {
                    item.handler(me, e);
                };
            }
        );

        $.each(
            uploadEventHandler,
            function (index, item) {
                xhr.upload['on' + item.type] = function (e) {
                    item.handler(me, e);
                };
            }
        );

        xhr.open('post', options.action, true);

        // 上传可能是同步的，因此这里强制异步
        nextTick(function () {
            if (options.useChunk) {
                me.uploadFileChunk(options);
            }
            else {
                me.uploadFile(options);
            }
        });

        return true;

    };

    FileItemPrototype.uploadFile = function (options) {
        var me = this;
        var formData = new FormData();

        if (options.data) {
            $.each(
                options.data,
                function (key, value) {
                    formData.append(key, value);
                }
            );
        }

        formData.append(
            options.fileName,
            me.nativeFile
        );

        if (options.path) {
            formData.append(
                'path',
                options.path
            );
        }
        if (options.authToken) {
            formData.append(
                'auth_token',
                options.authToken
            );
        }

        var xhr = me.xhr;
        if (options.header) {
            $.each(options.header, function (name, value) {
                xhr.setRequestHeader(name, value);
            });
        }

        xhr.send(formData);

    };

    FileItemPrototype.uploadFileChunk = function (options) {

        var me = this;

        var file = me.nativeFile;

        // 碰到过传了几个分片之后，file.size 变成 0 的情况
        // 因此 fileSize 从最初的格式化对象中取比较保险
        var fileSize = me.file.size;

        var chunkInfo = me.chunk;
        if (!chunkInfo) {
            chunkInfo =
            me.chunk = {
                index: 0,
                uploaded: 0
            };
        }

        var chunkIndex = chunkInfo.index;

        var chunkSize = options.chunkSize;
        var start = chunkSize * chunkIndex;
        var end = chunkSize * (chunkIndex + 1);
        if (end > fileSize) {
            end = fileSize;
        }

        // 正在上传分片的大小
        chunkInfo.uploading = end - start;
        if (chunkInfo.uploading <= 0) {
            nextTick(
                function () {
                    xhrEventHandler
                    .uploadError
                    .handler(me, {}, AjaxUploader.ERROR_CHUNK_SIZE);
                }
            );
            return;
        }


        var xhr = me.xhr;

        var header = {
            'Content-Type': '',
            'X_FILENAME': encodeURIComponent(file.name),
            'Content-Range': 'bytes ' + (start + 1) + '-' + end + '/' + fileSize
        };

        if (options.header) {
            $.extend(header, options.header);
        }

        $.each(header, function (name, value) {
            xhr.setRequestHeader(name, value);
        });

        xhr.send(file.slice(start, end));

    };

    FileItemPrototype.cancel = function () {
        var me = this;
        if (me.status === AjaxUploader.STATUS_UPLOADING) {
            me.xhr.abort();
        }
    };

    FileItemPrototype.toPlainObject = function () {
        var me = this;
        var data = {
            index: me.index,
            file: me.file,
            nativeFile: me.nativeFile,
            status: me.status
        };
        if (me.chunk) {
            data.chunk = me.chunk;
        }
        return data;
    };

    FileItemPrototype.dispose = function () {
        var me = this;
        me.cancel();
        me.off();
    };

    eventUtil.extend(FileItemPrototype);

    /**
     * 把 [ 'jpg', 'png' ] 格式的 accept 转为
     * 浏览器可识别的 'image/jpg,image/png'
     *
     * @inner
     * @param {Array.<string>} accept
     * @return {string}
     */
    function formatAccept(accept) {

        var result = [ ];

        $.each(
            accept,
            function (index, name) {
                if (mimeTypeUtil[ name ]) {
                    result.push(
                        mimeTypeUtil[ name ]
                    );
                }
            }
        );

        return $.unique(result).join(',');

    }

    /**
     * 格式化文件对象
     *
     * @inner
     * @param {Object} file
     * @property {string} file.name 文件名称
     * @property {number} file.size 文件大小
     * @return {Object}
     */
    function formatFile(file) {

        var name = file.name;
        var parts = name.split('.');
        var type = parts.length > 1
                 ? parts.pop().toLowerCase()
                 : '';

        return {
            name: name,
            type: type,
            size: file.size
        };

    }


    return AjaxUploader;

});

/**
 * @file 拆解字符串，并 trim 每个部分
 * @author musicode
 */
define('cc/function/split',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 拆解字符串，并 trim 每个部分
     *
     * @param {string} str 字符串
     * @param {string} sep 分隔符
     * @return {Array.<string>}
     */
    return function (str, sep) {

        var result = [ ];

        if ($.type(str) === 'number') {
            str = '' + str;
        }

        if (str && $.type(str) === 'string') {
            $.each(
                str.split(sep),
                function (index, part) {
                    part = $.trim(part);
                    if (part) {
                        result.push(part);
                    }
                }
            );
        }

        return result;
    };

});
/**
 * @file 秒偏移
 * @author musicode
 */
define('cc/function/offsetSecond',['require','exports','module'],function (require, exports, module) {

    'use strict';

    return function (date, offset) {

        if ($.type(date) === 'date') {
            date = date.getTime();
        }

        return new Date(date + offset * 1000);

    };

});
/**
 * @file 分偏移
 * @author musicode
 */
define('cc/function/offsetMinute',['require','exports','module','./offsetSecond'],function (require, exports, module) {

    'use strict';

    var offsetSecond = require('./offsetSecond');

    return function (date, offset) {
        return offsetSecond(date, offset * 60);
    };

});
/**
 * @file 小时偏移
 * @author musicode
 */
define('cc/function/offsetHour',['require','exports','module','./offsetMinute'],function (require, exports, module) {

    'use strict';

    var offsetMinute = require('./offsetMinute');

    return function (date, offset) {
        return offsetMinute(date, offset * 60);
    };

});
/**
 * @file 天偏移
 * @author musicode
 */
define('cc/function/offsetDate',['require','exports','module','./offsetHour'],function (require, exports, module) {

    'use strict';

    var offsetHour = require('./offsetHour');

    return function (date, offset) {
        return offsetHour(date, offset * 24);
    };

});
/**
 * @file cookie
 * @author musicode
 */
define('cc/util/cookie',['require','exports','module','../function/split','../function/offsetDate'],function (require, exports, module) {

    'use strict';

    /**
     * 操作 cookie
     *
     * 对外暴露三个方法:
     *
     * get()
     * set()
     * remove()
     *
     * 使用 cookie 必须了解的知识：
     *
     * 一枚 cookie 有如下属性：
     *
     *    key value domain path expires secure
     *
     *    domain: 浏览器只向指定域的服务器发送 cookie
     *    path: 为特定页面指定 cookie
     *    expires: 日期格式为（Weekday, DD-MON-YY HH:MM:SS GMT）唯一合法的时区是 GMT，默认是会话结束时过期
     *    secure: 使用 ssl 安全连接时才会发送 cookie
     *
     * 有点类似命名空间的意思
     *
     */

    var split = require('../function/split');
    var offsetHour = require('../function/offsetDate');

    /**
     * 把 cookie 字符串解析成对象
     *
     * @inner
     * @param {string} cookieStr 格式为 key1=value1;key2=value2;
     * @return {Object}
     */
    function parse(cookieStr) {

        if (cookieStr.indexOf('"') === 0) {
            // 如果 cookie 按照 RFC2068 规范进行了转义，要转成原始格式
            cookieStr = cookieStr.slice(1, -1)
                                 .replace(/\\"/g, '"')
                                 .replace(/\\\\/g, '\\');
        }

        var result = { };

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            cookieStr = decodeURIComponent(cookieStr.replace(/\+/g, ' '));

            $.each(
                split(cookieStr, ';'),
                function (index, part) {
                    var terms = split(part, '=');
                    var key = terms[0];
                    var value = terms[1];
                    if (key) {
                        result[key] = value;
                    }
                }
            );
        }
        catch (e) { }

        return result;
    }

    /**
     * 设置一枚 cookie
     *
     * @inner
     * @param {string} key
     * @param {string} value
     * @param {Object} options
     */
    function setCookie(key, value, options) {

        var expires = options.expires;

        if ($.isNumeric(expires)) {
            expires = offsetHour(new Date(), expires);
        }

        document.cookie = [
            encodeURIComponent(key), '=', encodeURIComponent(value),
            expires ? ';expires=' + expires.toUTCString() : '',
            options.path ? ';path=' + options.path : '',
            options.domain ? ';domain=' + options.domain : '',
            options.secure ? ';secure' : ''
        ].join('');

    }

    /**
     * 读取 cookie 的键值
     *
     * 如果不传 key，则返回完整的 cookie 键值对象
     *
     * @param {string=} key
     * @return {string|Object|undefined}
     */
    exports.get = function (key) {
        var result = parse(document.cookie);
        return $.type(key) === 'string' ? result[key] : result;
    };

    /**
     * 写入 cookie
     *
     * @param {string|Object} key 如果 key 是 string，则必须传 value
     *                            如果 key 是 Object，可批量写入
     * @param {*=} value
     * @param {Object=} options
     * @property {number=} options.expires 过期小时数，如 1 表示 1 小时后过期
     * @property {string=} options.path
     * @property {string=} options.domain
     * @property {boolean=} options.secure
     */
    exports.set = function (key, value, options) {

        if ($.isPlainObject(key)) {
            options = value;
            value = null;
        }

        options = $.extend(
            { },
            exports.defaultOptions,
            options
        );

        if (value === null) {
            $.each(
                key,
                function (key, value) {
                    setCookie(key, value, options);
                }
            );
        }
        else {
            setCookie(key, value, options);
        }
    };

    /**
     * 删除某个 cookie
     *
     * @param {string} key
     * @param {Object=} options
     * @property {string=} options.path cookie 的路径
     * @property {string=} options.domain 域名
     * @property {boolean=} options.secure 是否加密传输
     */
    exports.remove = function (key, options) {

        options = options || { };
        options.expires = -1;

        setCookie(
            key,
            '',
            $.extend(
                { },
                exports.defaultOptions,
                options
            )
        );

    };

    /**
     * 默认属性，暴露给外部修改
     *
     * @type {Object}
     */
    exports.defaultOptions = { };

});
/**
 * @file 简单的 flash 上传实现(simple upload....)
 * @author musicode
 */
define('cc/util/supload/supload',['require','exports','module','../cookie','../json'],function (require, exports, module) {

    if (window.Supload === Supload) {
        return window.Supload;
    }

    var cookie = require('../cookie');
    var json = require('../json');

    /**
     * Supload 构造函数
     *
     * @constructor
     * @param {Object} options
     * @param {HTMLElement|string} options.element 放置 <oject> 标签的元素或元素 ID
     * @param {string} options.flashUrl swf 文件所在地址
     * @param {string} options.action 上传地址
     * @param {string=} options.fileName 文件的 name
     * @param {string=} options.accept 可上传的文件格式，如 'jpg,png'
     * @param {boolean=} options.multiple 是否支持多文件上传
     * @param {Object=} options.data 上传的其他数据
     * @param {Object=} options.header 请求头
     * @param {Function=} options.onLoaded
     * @param {Function=} options.onFileChange
     * @param {function(Object)=} options.onUploadStart
     * @param {function(Object)=} options.onUploadProgress
     * @param {function(Object)=} options.onUploadSuccess
     * @param {function(Object)=} options.onUploadError
     * @param {function(Object)=} options.onUploadComplete
     */
    function Supload(options) {
        $.extend(this, options);
        this.init();
    }

    Supload.prototype = {

        constructor: Supload,

        /**
         * 初始化
         */
        init: function () {

            var instanceId = createGuid();
            this.movieName = instanceId;

            var element = this.element;
            if ($.type(element) === 'string') {
                element = document.getElementById(element);
            }

            var data = this.data || (this.data = { });

            $.each(
                cookie.get(),
                function (key, value) {
                    if ($.type(data[key]) === 'undefined') {
                        data[key] = value;
                    }
                }
            );

            var swf = Supload.createSWF(instanceId, this.flashUrl, this.getFlashVars());
            element.parentNode.replaceChild(swf, element);
            this.element = swf;

//            this.onLog = function (data) {
//                console.log(data);
//            };

            Supload.instances[instanceId] = this;
        },

        /**
         * 拼装给 flash 用的参数
         *
         * @return {string}
         */
        getFlashVars: function () {

            var me = this;
            var result = [ ];

            $.each(
                [ 'movieName', 'action', 'accept', 'multiple', 'fileName', 'data', 'header' ],
                function (index, key) {
                    var value = me[key];
                    if (value != null) {
                        if ($.isPlainObject(value)) {
                            value = json.stringify(value);
                        }
                        else if ($.isArray(value)) {
                            value = value.join(',');
                        }
                        result.push(key + '=' + encodeURIComponent(value));
                    }
                }
            );

            result.push('projectName=' + Supload.projectName);

            return result.join('&amp;');
        },

        /**
         * 获得要上传的文件
         *
         * @return {Array}
         */
        getFiles: function () {
            return (this.element.getFiles && this.element.getFiles()) || [ ];
        },

        /**
         * 设置上传地址
         *
         * @param {string} action
         */
        setAction: function (action) {
            this.element.setAction && this.element.setAction(action);
        },

        /**
         * 设置上传数据
         *
         * @param {Object} data 需要一起上传的数据
         */
        setData: function (data) {
            this.element.setData && this.element.setData(data);
        },

        /**
         * 重置
         */
        reset: function () {
            this.element.reset && this.element.reset();
        },

        /**
         * 上传
         */
        upload: function (index) {
            this.element.upload && this.element.upload(index);
        },

        /**
         * 取消上传
         */
        cancel: function (index) {
            this.element.cancel && this.element.cancel(index);
        },

        /**
         * 启用鼠标点击打开文件选择窗口
         */
        enable: function () {
            this.element.enable && this.element.enable();
        },

        /**
         * 禁用鼠标点击打开文件选择窗口
         */
        disable: function () {
            this.element.disable && this.element.disable();
        },

        /**
         * 销毁对象
         */
        dispose: function () {
            this.element.dispose && this.element.dispose();
            Supload.instances[this.movieName] = null;
            // 清除 IE 引用
            window[this.movieName] = null;
        }
    };

    /**
     * 项目名称，as 会用 projectName.instances[movieName] 找出当前实例
     *
     * @type {string}
     */
    Supload.projectName = 'Supload';

    /**
     * 创建 swf 元素
     *
     * 无需兼容 IE67 用现有方法即可
     *
     * 如果想兼容 IE67，有两种方法：
     *
     * 1. 把 wmode 改成 opaque
     * 2. 用 swfobject 或别的库重写此方法
     *
     * 这里不兼容 IE67 是因为要判断浏览器实在太蛋疼了。。。
     *
     * @param {string} id 实例 id
     * @param {string} flashUrl swf 文件地址
     * @param {string} flashVars 传给 flash 的变量
     * @return {HTMLElement}
     */
    Supload.createSWF = function(id, flashUrl, flashVars) {

        // 不加 ID 在 IE 下没法运行
        var html = '<object id="' + id + '" class="' + Supload.projectName.toLowerCase()
                 + '" type="application/x-shockwave-flash" data="' + flashUrl + '">'
                 +     '<param name="movie" value="' + flashUrl + '" />'
                 +     '<param name="allowscriptaccess" value="always" />'
                 +     '<param name="wmode" value="transparent" />'
                 +     '<param name="flashvars" value="' + flashVars + '" />'
                 + '</object>';

        return $(html)[0];
    };

    /**
     * Supload 实例容器
     *
     * @type {Object}
     */
    Supload.instances = { };

    /**
     * 等待上传状态
     *
     * @type {number}
     */
    Supload.STATUS_WAITING = 0;

    /**
     * 正在上传状态
     *
     * @type {number}
     */
    Supload.STATUS_UPLOADING = 1;

    /**
     * 上传成功状态
     *
     * @type {number}
     */
    Supload.STATUS_UPLOAD_SUCCESS = 2;

    /**
     * 上传失败状态
     *
     * @type {number}
     */
    Supload.STATUS_UPLOAD_ERROR = 3;

    /**
     * 上传中止错误
     *
     * @const
     * @type {number}
     */
    Supload.ERROR_CANCEL = 0;

    /**
     * 上传出现沙箱安全错误
     *
     * @const
     * @type {number}
     */
    Supload.ERROR_SECURITY = 1;

    /**
     * 上传 IO 错误
     *
     * @const
     * @type {number}
     */
    Supload.ERROR_IO = 2;

    /**
     * guid 初始值
     *
     * @inner
     * @type {number}
     */
    var guidIndex = 0x2B845;

    /**
     * 创建新的唯一的 guid
     *
     * @inner
     * @return {string}
     */
    function createGuid() {
        return '_Supload_' + (guidIndex++);
    }

    /**
     * 暴露给全局的对象，这样 as 才能调到
     *
     * @type {Function}
     */
    window.Supload = Supload;


    return Supload;

});

/**
 * @file FlashUploader
 * @author musicode
 */
define('cc/helper/FlashUploader',['require','exports','module','../function/ucFirst','../function/ratio','../util/life','../util/supload/supload'],function (require, exports, module) {

    'use strict';

    /**
     * 如果出现 flash 跨域问题，有两种解决办法：
     *
     * 1. 可把 supload.swf 放到自己的域下，修改 FlashUploader.defaultOptions.flashUrl
     * 2. 放一个 crossdomain.xml 跨域配置文件
     *
     */

    var ucFirst = require('../function/ucFirst');
    var getRatio = require('../function/ratio');

    var lifeUtil = require('../util/life');
    require('../util/supload/supload');

    var Supload = window.Supload;

    /**
     * 使用 flash 上传
     *
     * 注意：不能 hide() 元素，否则 swf 会自动销毁
     *      不能 css('visibility', 'hidden') 元素，IE 下 swf 会自动销毁
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.mainElement 点击打开文件选择框的元素
     * @property {string} options.action 上传地址
     * @property {boolean=} options.multiple 是否支持多文件上传
     * @property {Object=} options.data 上传的其他数据
     * @property {Object=} options.header 请求头
     * @property {Array.<string>=} options.accept 可上传的文件类型，如
     *                                            [ 'jpg', 'png' ]
     */
    function FlashUploader(options) {
        lifeUtil.init(this, options);
    }

    var proto = FlashUploader.prototype;

    proto.type = 'FlashUploader';

    proto.init = function () {

        var me = this;

        var mainElement = me.option('mainElement');

        var action = me.option('action');
        var data = me.option('data');

        var options = {
            element: mainElement[0],
            flashUrl: me.option('flashUrl'),
            action: data,
            accept: me.option('accept'),
            multiple: me.option('multiple'),
            data: data,
            header: me.option('header'),
            fileName: me.option('fileName'),
            customSettings: {
                uploader: me
            }
        };

        $.each(
            eventHandler,
            function (type, handler) {
                options[ 'on' + ucFirst(type) ] = handler;
            }
        );

        var supload = new Supload(options);
        me.inner({
            supload: supload,
            watchSync: {
                action: function (action) {
                    supload.setAction(action);
                },
                data: function (data) {
                    supload.setData(data);
                }
            }
        });

        me.set({
            action: action,
            data: data
        });

    };

    /**
     * 获取当前选择的文件
     *
     * @return {Array.<Object>}
     */
    proto.getFiles = function () {
        return this.inner('supload').getFiles();
    };

    /**
     * 重置
     */
    proto.reset = function () {
        this.inner('supload').reset();
    };

    /**
     * 上传文件
     */
    proto.upload = function (index) {
        this.inner('supload').upload(index);
    };

    /**
     * 停止上传
     */
    proto.stop = function (index) {
        this.inner('supload').cancel(index);
    };

    /**
     * 启用
     */
    proto.enable = function () {
        this.inner('supload').enable();
    };

    /**
     * 禁用
     */
    proto.disable = function () {
        this.inner('supload').disable();
    };

    /**
     * 销毁对象
     */
    proto.dispose = function () {

        var me = this;

        lifeUtil.dispose(me);

        me.inner('supload').dispose();

    };

    lifeUtil.extend(proto, ['getFiles', 'setAction', 'setData']);

    /**
     * 等待上传状态
     *
     * @type {number}
     */
    FlashUploader.STATUS_WAITING = Supload.STATUS_WAITING;

    /**
     * 正在上传状态
     *
     * @type {number}
     */
    FlashUploader.STATUS_UPLOADING = Supload.STATUS_UPLOADING;

    /**
     * 上传成功状态
     *
     * @type {number}
     */
    FlashUploader.STATUS_UPLOAD_SUCCESS = Supload.STATUS_UPLOAD_SUCCESS;

    /**
     * 上传失败状态
     *
     * @type {number}
     */
    FlashUploader.STATUS_UPLOAD_ERROR = Supload.STATUS_UPLOAD_ERROR;

    /**
     * 上传中止错误
     *
     * @const
     * @type {number}
     */
    FlashUploader.ERROR_CANCEL = Supload.ERROR_CANCEL;

    /**
     * 上传出现沙箱安全错误
     *
     * @const
     * @type {number}
     */
    FlashUploader.ERROR_SECURITY = Supload.ERROR_SECURITY;

    /**
     * 上传 IO 错误
     *
     * @const
     * @type {number}
     */
    FlashUploader.ERROR_IO = Supload.ERROR_IO;

    /**
     * 事件处理函数
     *
     * @inner
     * @type {Object}
     */
    var eventHandler = {

        /**
         * flash 加载完成
         */
        ready: function () {
            var uploader = this.customSettings.uploader;
            uploader.emit('ready');
        },

        /**
         * 选择文件
         */
        fileChange: function () {
            var uploader = this.customSettings.uploader;
            uploader.emit('filechange');
        },

        /**
         * 开始上传
         *
         * @param {Object} data
         * @property {Object} data.fileItem
         */
        uploadStart: function (data) {
            var uploader = this.customSettings.uploader;
            uploader.emit('uploadstart', data);
        },

        /**
         * 正在上传
         *
         * @param {Object} data
         * @property {Object} data.fileItem
         * @property {number} data.uploaded
         * @property {number} data.total
         */
        uploadProgress: function (data) {

            var uploader = this.customSettings.uploader;

            data.percent = (100  * getRatio(data.uploaded, data.total)).toFixed(2) + '%';

            uploader.emit('uploadprogress', data);

        },

        /**
         * 上传成功
         *
         * @param {Object} data
         * @property {Object} data.fileItem
         * @property {string} data.response
         */
        uploadSuccess: function (data) {
            var uploader = this.customSettings.uploader;
            uploader.emit('uploadsuccess', data);
        },

        /**
         * 上传失败，失败原因可查看 errorCode
         *
         * @param {Object} data
         * @property {Object} data.fileItem
         * @property {number} data.errorCode
         */
        uploadError: function (data) {
            var uploader = this.customSettings.uploader;
            uploader.emit('uploaderror', data);
        },

        /**
         * 上传完成，在 成功/失败 之后触发
         *
         * @param {Object} data
         * @property {Object} data.fileItem
         */
        uploadComplete: function (data) {
            var uploader = this.customSettings.uploader;
            uploader.emit('uploadcomplete', data);
        }
    };


    return FlashUploader;

});

/**
 * @file 上传
 * @author musicode
 */
define('cc/ui/Uploader',['require','exports','module','../helper/AjaxUploader','../helper/FlashUploader'],function (require, exports, module) {

    'use strict';

    function supportFileAPI() {
        return 'files' in $('<input type="file" />')[0];
    }

    function supportAjaxUploadProgressEvents() {

        if (!XMLHttpRequest) {
            return false;
        }

        var xhr = new XMLHttpRequest();
        return ('upload' in xhr) && ('onprogress' in xhr.upload);
    }

    return supportFileAPI() && supportAjaxUploadProgressEvents()
         ? require('../helper/AjaxUploader')
         : require('../helper/FlashUploader');

});
/**
 * @file uploader service
 * @author hurry
 */
define('common/ngService/uploaderService',['require','cc/ui/Uploader'],function (require) {
    'use strict';
    var Uploader = require('cc/ui/Uploader');
    var fileTypes = 'mp4/.avi/.wmv/.rm/.rmvb/.mov/.flv/.mpg/.mpeg/.mkv/.3gp';
    var M_SIZE = 1024 * 1024;

    /**
     * 这里为了兼容后端接口  配置了 3个 上传视频的URL  和后端沟通好了 以后统一走 commonVideo
     */
    var actions = {
        pic: '/api/tcenter/foundation/storage/upload-image',
        video: '/api/disk/get-upload-info',
        commonVideo: '/api/tcenter/foundation/storage/get-upload-video-url',
        localVideo: '/api/video_course/getUploadUrl',
        audio: '/api/tcenter/foundation/storage/upload-audio'
    };
    var acceptType = {
        pic: 'image/png,image/jpeg',
        video: 'video/quicktime,video/3gpp,video/mp4,video/x-matroska,video/mpeg,video/x-flv,video/x-msvideo,video/vnd.rn-realvideo,video/x-ms-wmv',
        commonVideo: 'video/quicktime,video/3gpp,video/mp4,video/x-matroska,video/mpeg,video/x-flv,video/x-msvideo,video/vnd.rn-realvideo,video/x-ms-wmv',
        localVideo: 'video/quicktime,video/3gpp,video/mp4,video/x-matroska,video/mpeg,video/x-flv,video/x-msvideo,video/vnd.rn-realvideo,video/x-ms-wmv',
        audio: 'audio/mp3'
    };
    var className = {
        pic: 'upload-file-pic',
        video: 'upload-file-video',
        commonVideo: 'upload-file-video',
        localVideo: 'upload-file-video',
        audio: 'upload-file-audio'
    };
    var M = 1024 * 1024;
    angular
        .module('Manage.services')
        .factory('uploaderService', ['$q', 'ajaxService', 'utilService', 'storageInfo', 
        function ($q, ajaxService, utilService, storageInfo) {
            var getUploadUrl = function (uploader, fileItem, opts) {
                var params = fileItem.file;
                var url = '/api/disk/get-upload-info';
                var uploadType = opts.type;
                if (uploadType) {
                    url = actions[uploadType];
                }
                //参数做处理  两个后端接口定的字段名不一样。。。
                if (uploadType && uploadType === 'commonVideo') {
                    var file = fileItem.file;
                    var paramsData = {
                        filename: file.name,
                        total_size: file.size,
                        from_type: opts.from_type || 9
                    };
                    params = {
                        data: paramsData,
                        method: 'GET'
                    };
                }
                //post请求
                else {
                    if (opts.path) {
                        params = $.extend({}, params,
                            {
                            path: opts.path
                        });
                    }
                    if (opts.authToken) {
                        params = $.extend({}, params,
                            {
                                auth_token: opts.authToken
                            });
                    }
                }

                ajaxService.send(url, params)
                    .then(function (res) {
                        var data = res.data;
                        uploader.set({
                            'action': data.upload_url,
                            'useChunk': true,
                            'chunkSize': 5 * M
                        });
                        uploader.videoParams = {
                            id: data.id,
                            cover: data.cover,
                            fid: data.fid,
                            fileName: fileItem.file.name
                        };
                        uploader.upload(0);
                    });
            };

            var uploader;

            return {
                /**
                 * 使用 HTML5 ajax 上传
                 *
                 * @param {Object} options
                 * @property {string} options.action 上传地址
                 * @property {boolean=} options.multiple 是否支持多文件上传
                 * @property {string} options.type 类型: 'pic/video/audio'
                 * @property {Object=} options.data 上传的其他数据
                 * @property {Object=} options.header 请求头
                 * @property {Array.<string>=} options.accept 可上传的文件类型，如
                 *                                            [ 'jpg', 'png' ]
                 * @property {boolean=} options.useChunk 是否使用分片上传
                 * @property {number=} options.chunkSize 分片大小
                 * @property {boolean=} options.isCheckType 是否区分类型  默认是false
                 * @property {number=} options.from_type 视频上传类型
                 * @property {string=} options.path 上传路径
                 * @property {string=} options.authToken auth_token
                 * @property {string=} options.maxSize 上传文件的大小限制  单位M
                 * @property {function=} options.validateFile 上传文件之前校验函数  不满足条件终值上传 返回值true  false
                 * @property {boolean=} options.checkStorageSpace 上传文件之前校验存储空间 默认false
                 *
                 */
                upload: function (options) {
                    var deferred = $q.defer();
                    var inputFile = $('.' + className[options.type]);
                    inputFile.remove();
                    // if (!inputFile.length) {
                        var file = ''
                            + '<input type="file" name="file" '
                            +   'accept="'
                            +       acceptType[options.type]
                            +   '" style="display:none"'
                            +   ' class="' + className[options.type] + '"/>';
                        inputFile = $(file);
                        $(document.body).append(inputFile);
                    // }
                    // hurry: 成功统一处理函数
                    function successHandler(e, data) {
                        //如果上传的是视频文件 上传视频接口成功返回的是1.。。
                        var nativeFile = data.fileItem.nativeFile;
                        if (nativeFile && nativeFile.type.indexOf('video') > -1) {
                            var response = JSON.parse(data.responseText);
                            if (+response.code === 1) {
                                deferred.resolve(data);
                            }
                            else {
                                deferred.reject(data);
                            }
                        }
                        else {
                                deferred.resolve(data);
                        }
                    }
                    var defaultOptions = {
                        header: {
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        fileName: 'attachment',
                        mainElement: inputFile,
                        action: actions[options.type],
                        onuploadsuccess: function (e, data) {
                            successHandler(e, data);
                        },
                        onchunkuploadsuccess: function (e, data) {
                            // 视频分片上传部分失败
                            var nativeFile = data.fileItem.nativeFile;
                            if (nativeFile && nativeFile.type.indexOf('video') > -1) {
                                var response = JSON.parse(data.responseText);
                                if (+response.code === 1) {
                                    // deferred.resolve(data);
                                }
                                else {
                                    e.isDefaultPrevented = function () {
                                        return true;
                                    };
                                    // uploader.stop(0);
                                    deferred.reject(data);
                                }
                            }
                        },
                        onuploaderror: function (e, data) {
                            deferred.reject(data);
                        },
                        // onuploadprogress: function (e, data) {
                        //    console.log(data)
                        // },
                        onuploadcomplete: function () {
                            uploader.dispose();
                        }
                    };
                    var opts = $.extend({}, defaultOptions, options);
                    uploader = new Uploader(opts);
                    options.uploader = uploader;
                    uploader.on('filechange', function () {
                        var error;
                        var maxSize = options.maxSize || '';
                        var fileItem = uploader.getFiles(0)[0];
                        var file = fileItem.file;
                        var name = file.name;

                        if (name.length > 40 || name.indexOf('/') > 0) {
                            error = '文件名称太长或名称含有特殊字符';
                        }
                        else if (maxSize && file.size > maxSize * M_SIZE) {
                            error = '请不要上传超过' + maxSize + 'M的内容';
                        }

                        if (error) {
                            utilService
                                .showMessage({
                                    title: '温馨提示',
                                    content: error,
                                    okBtnText: '确定',
                                    cancelBtnText: '取消',
                                    hideCancel: true
                                })
                                .then(function () {
                                    deferred.reject({
                                        errorType: 'errorBeforeUpload'
                                    });
                                }, function () {
                                    deferred.reject({
                                        errorType: 'errorBeforeUpload'
                                    });
                                });
                            return false;
                        }

                        //上传前对文件的校验函数
                        if (options.validateFile && $.isFunction(options.validateFile) && !options.validateFile(file)) {
                            return false;
                        }

                        //继续上传处理
                        var continueUploadAction = function () {
                            if (options.type === 'video'
                                || options.type === 'localVideo'
                                || options.type === 'commonVideo'
                            ) {
                                getUploadUrl(uploader, fileItem, opts);
                            }
                            else if (options.isCheckType) {
                                uploader.set('action', '/api/disk/upload');
                                var type = fileItem.file.type;

                                if (fileTypes.indexOf(type) >= 0) {
                                    getUploadUrl(uploader, fileItem, opts);
                                }
                                else {
                                    uploader.upload(0);
                                }
                            }
                            else {
                                uploader.upload(0);
                            }
                        };

                        //校验存储空间是否够
                        if (options.checkStorageSpace) {
                            storageInfo().then(function (response) {
                                var data = response.data;
                                var remainStorageSpace = data.max_size - data.used_size;
                                if (remainStorageSpace < file.size) {
                                    utilService
                                        .showMessage({
                                            title: '温馨提示',
                                            content: '您的存储空间不足，请购买存储空间后上传',
                                            hideCancel: false,
                                            okBtnText: '购买存储空间',
                                            okHandler: function () {
                                                var skipUrl = 'http://www.genshuixue.com/teacher_center/storage_space';
                                                if (data.user_role === 6) {
                                                    skipUrl = 'http://ziliao.genshuixue.com/main.html#/storageSpace';
                                                }
                                                window.open(skipUrl);
                                            }
                                        });
                                    deferred.reject({
                                        errorType: 'errorBeforeUpload'
                                    });
                                    return false;
                                }
                                else {
                                    continueUploadAction();
                                }
                            });
                        }
                        else {
                            continueUploadAction();
                        }
                    });
                    inputFile.click();
                    return deferred.promise;
                },
                stop: function (uploader) {
                    uploader.stop(0);
                }
            };
        }]);
});
/**
 * @file 缓存
 * @author hurry
 */
 define('common/ngService/tipsService',['require','./module'],function (require) {
 	'use strict';
 	require('./module')
 		.factory('tipsService', ['$timeout', '$q', function ($timeout, $q) {
 			return {
 				/**
 				 * [show description]
 				 * @param  {Object|string} options [description]
 				 * @param  {string} options.content 显示内容，支持html
 				 * @param  {string} options.positon 提示条位置  center top  默认center
 				 * @param  {string} options.type tip类型  用来控制提示条的背景色 默认 primary
 				 * 支持 success  danger primary error info warning muted secondary 等
 				 * @param  {number} options.showTime 显示时间，单位：ms，默认显示1000ms
 				 * @param  {cssSelector|jQuery=} options.element
 				 *         要显示的元素，可以是:
 				 *         1、css选择器
 				 *         2、jquery对象
 				 */
				show: function (options) {
					var deferred = $q.defer();
					var defaultOptions = {
						showTime: 1000
					};
					if (options + '' === options) {
						defaultOptions.content = options;
					}
					else {
						$.extend(defaultOptions, options);
					}
					var ele = $('.tips-wrapper');
					if (!ele.length) {
						ele = $('<div class="tips-wrapper" style="display:none;"></div>');
						$(document.body).append(ele);
					}
					if (defaultOptions.element) {
						var container = $(defaultOptions.element);
						var offset = container.offset();
						var containerWidth = container.width();
						ele.css({
							top: offset.top,
							left: offset.left,
							width: containerWidth,
							marginLeft: 0
						});
					}
					var typeClass = defaultOptions.type || 'primary';
					ele.addClass(typeClass);
					var positionClass = defaultOptions.position
										? 'position-' + defaultOptions.position
										: 'position-center';
					ele.addClass(positionClass);
					ele.html(defaultOptions.content);
					ele.slideDown();
					$timeout(function () {
						ele.slideUp('slow', function () {
							deferred.resolve();
						});
					}, defaultOptions.showTime);

					return deferred.promise;
				},
				// TODO: 
				dispose: function () {

				}
			};
 		}]);
 });

/**
 * @fileOverview  获取当前用户的侧边栏权限
 * @author niejianhui
 */


define('common/ngService/getSideNavAuth',['require','./module'],function (require) {
    'use strict';

    require('./module')
        .factory('getSideNavAuth', ['ajaxService', function (ajaxService) {
            return function () {
                return ajaxService.send('/api/tcenter/nav/list', {currentHash: location.hash});
            };
        }]);
});


/**
 * @fileOverview  获取当前用户的信息
 * @author niejianhui
 */


define('common/ngService/userInfo',['require','./module'],function (require) {
    'use strict';

    require('./module')
        .factory('userInfo', ['ajaxService', function (ajaxService) {
            return function () {
                return ajaxService.send(
                    '/api/user/basicInfo'
                );
            };
        }]);
});


/**
 * @fileOverview  获取当前用户的存储空间信息
 * @author niejianhui
 */


define('common/ngService/storageInfo',['require','./module'],function (require) {
    'use strict';

    require('./module')
        .factory('storageInfo', ['ajaxService', function (ajaxService) {
            return function () {
                return ajaxService.send(
                    '/api/user/storageInfo'
                );
            };
        }]);
});


/**
 * @file service引入
 * @author hurry
 */
define('common/ngService/main',['require','./module','./ajaxService','./myCache','./dialog','./utilService','./uploaderService','./tipsService','./getSideNavAuth','./userInfo','./storageInfo'],function (require) {
    'use strict';
    require('./module');
    require('./ajaxService');
    require('./myCache');
    require('./dialog');
    require('./utilService');
    require('./uploaderService');
    require('./tipsService');
    require('./getSideNavAuth');
    require('./userInfo');
    require('./storageInfo');
});
/**
 * @author hurry
 */
define('common/ngDirective/module',[],function () {
    'use strict';
    return angular.module('Manage.directives', []);
});
/**
 * @file 返回顶部
 * @author hurry
 *
 * usage:
 *
 * <back-up></back-up>
 *
 */
define('common/ngDirective/backTop/directive',[],function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('backTop', function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: '/src/ngDirective/backTop/tpl.html',
            link: function () {

                $(window).scroll(function () { //只要窗口滚动,就触发下面代码
                    var scrollt = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动后的高度
                    if (scrollt > 200) { //判断滚动后高度超过200px,就显示
                        $('.directives-flotage-bottom').fadeIn(400); //淡入
                    } else {
                        $('.directives-flotage-bottom').stop().fadeOut(400); //淡出，必须加上stop()停止之前动画,否则会出现闪动
                    }
                });
                $('.tip').click(function () { //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
                    $('html,body').animate({scrollTop: '0px'}, 200);
                });

            }
        };
    });
});

/**
 * @fileOverview 百度分享的指令
 * @author hurry
 */

define('common/ngDirective/baiduShare/directive',[],function () {
    'use strict';

    function getShareFloat() {
        var shareFloat = $(''
            + '<div class="bdsharebuttonbox ex-tooltip-layer" data-tag="share_1">'
            +    '<a class="bds_more" data-cmd="more"></a>'
            // +    '<a class="bds_mshare" data-cmd="mshare"></a>'
            +    '<a class="bds_qzone" data-cmd="qzone" href="#"></a>'
            +     '<a class="bds_tsina" data-cmd="tsina"></a>'
            +    '<a class="bds_weixin" data-cmd="weixin"></a>'
            // +    '<a class="bds_renren" data-cmd="renren"></a>'
            // +    '<a class="bds_tqq" data-cmd="tqq"></a>'
            + '</div>'
        );

        return shareFloat;
    }


    var tempOptions = {};

    function setConfig(config) {
        for (var key in tempOptions) {
            config[key] = tempOptions[key];
        }
    }

    window._bd_share_config = {
        common: {
            bdSnsKey: {},
            bdText: '',
            bdDesc: '',
            bdMini:2,
            bdPic: '',
            bdStyle:0,
            bdSize:16,
            onBeforeClick: function (cmd, config) {
                setConfig(config);
                return config;
            }
        },
        share: {}
    };

    angular.module('Manage.directives')
        .directive('baiduShare', ['$timeout', function ($timeout){
            // Runs during compile
            return {
                restrict: 'A',
                scope: {
                    shareOptions: '=shareOptions'
                },
                replace: true,
                link: function($scope, iElm) {

                    var shareFloat = getShareFloat();
                    iElm.append(shareFloat.hide());

                    var shareOptions = $scope.shareOptions;
                    bind();
                    function bind() {
                        window.require(['BaiduShare'], function () {
                            // 解决分页分享失效问题
                            if (window._bd_share_main) {
                                window._bd_share_main.init();
                            }
                            var to;

                            iElm
                                .on('mouseover', function () {
                                    // 实例话多个分享 设置config
                                    for (var key in shareOptions) {
                                        tempOptions[key] = shareOptions[key];
                                    }
                                    to && $timeout.cancel(to);
                                    shareFloat.show();
                                })
                                .on('mouseout', function () {
                                    to = $timeout(function () {
                                        shareFloat.hide();
                                    }, 100);
                                });

                            shareFloat.on('mouseover', function () {
                                $timeout.cancel(to);
                            });
                        });
                    }
                }
            };
        }]);
});
/**
 * 公共配置文件
 * @author  hurry
 * @date 2016/11/05
 */
define('common/config/common',[],function() {
	'use strict';
	return {
		/**
         * 日期格式
         */
        DATE_FORMAT: 'yyyy-MM-dd',
        MOMENT_DATE_FORMAT: 'YYYY-MM-DD',
        /**
         * 年-月
         * @type {String}
         */
        YEAR_MONTH_FORMAT: 'yyyy-MM',
        /**
         * 年-月－日 时：分：秒
         * @type {String}
         */
        DATE_TIME_FORMAT: 'yyyy-MM-dd HH:mm:ss',
        /**
         * 时：分：秒
         * @type {String}
         */
        TIME_FORMAT: 'HH:mm:ss',
        /**
         * 有数据的开始月份
         * @const
         * @type {string}
         */
        DATA_BEGIN: '2014-06-16',

		// 默认每页显示多少条
		DEFAULT_PAGE_SZIE: 20,

        /**
         * 默认的当前页
         */
        DEFAULT_CURRENT_PAGE: 1,

        //一天的毫秒数
        ONE_DAY_MILLISECONDS: 24 * 60 * 60 * 1000,

        //文件类型映射classMAP
        FILE_TYPE_CLASS_MAP: {
            'ppt': 'file-ppt',
            'pptx': 'file-ppt',
            'img': 'file-img',
            'jpg': 'file-img',
            'jpeg': 'file-img',
            'png': 'file-img',
            'pdf': 'file-pdf',
            'doc': 'file-word',
            'docx': 'file-word',
            'audio': 'file-audio',
            'mp3': 'file-audio',
            'mp4': 'file-video',
            'avi': 'file-video',
            '3gp': 'file-video',
            'mkv': 'file-video',
            'rmvb': 'file-video',
            'wmv': 'file-video',
            'rm': 'file-video',
            'flv': 'file-video',
            'mov': 'file-video',
            'mpeg': 'file-video',
            'xls': 'file-excel',
            'xlsx': 'file-excel',
            'txt': 'file-txt',
            'zip': 'file-zip',
            'dir': 'file-folder',
            'unknown': 'file-unknown'
        }
	};
});
(function ($) {
    'use strict';
    $.fn.daterangepicker = function (options) {
        var pluginName = 'DateRangePicker';

        // Find the plugin attached to the element
        var instance = this.data(pluginName);

        // If the instance wasn't found, create it...
        if (!instance) {
            // Return the element being bound to
            return this.each(function () {
                return $(this).data(pluginName, new DateRangePicker(this, options));
            });
        }

        // ...otherwise if the user passes true to the plugin (on the second call),
        // then return the instance of the plugin itself
        return (options === true) ? instance : this;
    };

    var DEFAULT_OPTS = {
        // The date that will be treated as 'today'.
        today: new Date(),
        selectableDateRange: null,
        selectedRange: null,
        showAlways: false,
        hideOnClick: true,
        // 默认选中
        isDefaultSelected: true,
        // 是否默认append到body后，默认false
        isAppendBody: false,
        // The z-index for the calendar control.
        zIndex: 1000,
        template: [
            '<div class="daterangepicker">',
            '<div class="daterangepicker-banner">',
            '<a data-action="setDate" data-range="yesterday" href="javascript:void(0);">昨天</a>',
            '<a data-action="setDate" data-range="last7" href="javascript:void(0);">最近7天</a>',
            '<a data-action="setDate" data-range="lastweek" href="javascript:void(0);">上周</a>',
            '<a data-action="setDate" data-range="thismonth" href="javascript:void(0);">本月</a>',
            '<a data-action="setDate" data-range="lastmonth" href="javascript:void(0);">上个月</a>',
            '</div>',
            '<div class="daterangepicker-content">',
            '<div class="daterangepicker-start">',
            '<span></span>',
            '<input data-type="startTime" type="text">',
            '</div>',
            '<div class="daterangepicker-end">',
            '<span></span>',
            '<input data-type="endTime" type="text">',
            '</div>',
            '</div>',
            '<div class="daterangepicker-action">',
            '<input data-action="setDate" class="btn btn-blue btn-primary" type="button" value="确定">',
            '<input data-aciton="reset" class="btn btn-default" type="button" value="取消">',
            '<span class="error red"></span>',
            '</div>',
            '</div>'
        ].join('')
    };

    function getDateString(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        return year + '-' + month + '-' + day;
    }

    function translateDate(date, format) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        format = format || 'yyyy年mm月dd日';
        format = format.replace('yyyy', date.getFullYear());
        format = format.replace('mm', month);
        format = format.replace('dd', day);
        return format;
    }

    function getDateRange(range) {
        var result = {};
        var me = this;
        switch (range) {
            case 'today':
                result.start = this.options.today;
                result.end = this.options.today;
                break;
            case 'yesterday':
                result.start = this.options.today - 3600 * 1000 * 24;
                result.end = this.options.today - 3600 * 1000 * 24;
                break;
            case 'last7':
                result.start = this.options.today - 3600 * 1000 * 24 * 6;
                result.end = this.options.today;
                break;
            case 'lastweek':
                var day = this.options.today.getDay();
                result.start = this.options.today - 3600 * 1000 * 24 * (6 + day);
                result.end = this.options.today - 3600 * 1000 * 24 * day;
                break;
            case 'thismonth':
                result.start = (new Date(this.options.today)).setDate(1);
                result.end = this.options.today > this.options.selectableDateRange.to
                    ? this.options.selectableDateRange.to
                    : this.options.today;
                break;
            case 'lastmonth':
                var monthStart = new Date(this.options.today);
                monthStart.setDate(1);
                monthStart.setMonth(monthStart.getMonth() - 1);
                result.start = new Date(monthStart);

                var monthEnd = new Date(this.options.today);
                monthEnd.setDate(1);
                monthEnd = monthEnd - 3600 * 24 * 1000;
                result.end = new Date(monthEnd);
                // render
                me.reset();
                break;
        }

        result.start = new Date(result.start);
        result.end = new Date(result.end);
        return result;
    }

    function DateRangePicker(element, options) {
        var isToggle = true;
        var me = this;
        me.el = $(element);
        var options = me.options = $.extend(true, {}, DEFAULT_OPTS, options);

        if (!$.fn.datetimepicker) {
            throw new Error('daterangepicker needs datetimepicker plugin!');
        }
        var today = options.today;
        options.start = today;
        options.end = today;

        var selectableDateRange = options.selectableDateRange;

        if (selectableDateRange && selectableDateRange.to < today) {
            options.start = selectableDateRange.to;
            options.end = selectableDateRange.to;
        }

        if (selectableDateRange && selectableDateRange.from > today) {
            options.start = selectableDateRange.from;
            options.end = selectableDateRange.from;
        }

        if (options.selectedRange && options.selectedRange.from) {
            options.start = selectableDateRange.from > options.selectedRange.from
                ? options.start
                : options.selectedRange.from;
        }

        if (options.selectedRange && options.selectedRange.to) {
            options.end = selectableDateRange.to < options.selectedRange.to
                ? options.end
                : options.selectedRange.to;
        }

        // hurry 扩展zIndex，系统默认1000，但是$modal是1050，所以需要用户指定
        me.daterangepicker = $(options.template).css({ zIndex: options.zIndex });
        // hurry 放到body中，而不是放到el后，不然位置有问题
        options.isAppendBody
            ? $(document.body).after(me.daterangepicker)
            : me.el.after(me.daterangepicker);
        me.daterangepicker
            .find('[data-type="startTime"]')
            .datetimepicker({
                showAlways: true,
                hideOnClick: false,
                // isAppendBody: options.isAppendBody,
                selectedDate: options.start,
                selectableDateRange: options.selectableDateRange
            }).on('changeDate', function (e) {
                $(this).siblings('span').html('开始日期：' + translateDate(e.date));
            }).siblings('span').html('开始日期：' + translateDate(options.start));

        me.daterangepicker
            .find('[data-type="endTime"]')
            .datetimepicker({
                showAlways: true,
                hideOnClick: false,
                // isAppendBody: options.isAppendBody,
                selectedDate: options.end,
                selectableDateRange: options.selectableDateRange
            }).on('changeDate', function (e) {
                $(this).siblings('span').html('结束日期：' + translateDate(e.date));
            }).siblings('span').html('结束日期：' + translateDate(options.end));

        // old
        // me.el.after(me.daterangepicker);

        me.daterangepicker.on('click', 'input[data-aciton="reset"]', function () {
            me.reset();
            me.hide();
        });

        me.daterangepicker.on('click', '[data-action="setDate"]', function () {
            var range = $(this).data('range');
            me.transRange(range);
            var errorEle = me.daterangepicker.find('.error');
            if (me.options.maxDuration && me.maxThanMaxDuration()) {
                errorEle.html('日期跨度超过' + me.options.maxDuration + '天，请重新选择');
                return;
            }
            errorEle.html('');
            me.selectRange($(this).data('range'));
            me.hide();
        });
        me.el.on('click', function (e) {
            if (isToggle) {
                me.show(e);
            }
            else {
                me.hide(e);
            }
            isToggle = !isToggle;
        });

        $(document).on('mouseup', function (e) {
            var target = e.target;
            var daterangepicker = me.daterangepicker;

            if (
                !me.el.is(target)
                && !daterangepicker.is(target)
                && daterangepicker.has(target).length === 0
                && daterangepicker.is(':visible')
                ) {
                me.hide();
            }
        });

        if (me.options.showAlways) {
            me.show();
        }

        $(window).resize(function () {
            me.resize();
        });

        $(window).on('scroll.datetimepicker', function () {
            me.resize();
        });

        me.options.isDefaultSelected && me.selectRange();
    }

    DateRangePicker.prototype.resize = function () {
        var el = this.el;
        var daterangepicker = this.daterangepicker;
        var options = this.options;
        var elPos = el.offset();
        // hurry 边界考虑
        // 右边界
        var left = elPos.left;
        // 1为顶部的边宽度
        var top = (elPos.top + el.outerHeight() - $(window).scrollTop() + 1);
        var cssOpts = {};
        var screenWidth = screen.availWidth;
        var screenHeight = screen.availHeight;
        var daterangepickerWidth = daterangepicker.outerWidth();
        var daterangepickerHeight = daterangepicker.outerHeight();
        // 右边界
        if (daterangepickerWidth + left + 5 > screenWidth) {
            cssOpts.right = '5px';
        }
        else {
            cssOpts.left = left;
        }
        // 下边界
        if (top + daterangepickerHeight > screenHeight) {
            top = (elPos.top - daterangepickerHeight - $(window).scrollTop() - 1);
        }
        cssOpts.top = top;
        daterangepicker.css(cssOpts);
    };

    DateRangePicker.prototype.show = function () {
        this.daterangepicker.show();
        this.daterangepicker.resize();
    };

    DateRangePicker.prototype.hide = function () {
        if (!this.options.showAlways && this.options.hideOnClick) {
            this.daterangepicker.hide();
        }
    };

    DateRangePicker.prototype.transRange = function (range) {
        var me = this;
        if (!range) {
            me.options.start = new Date(
                me.daterangepicker
                    .find('[data-type="startTime"]')
                    .val()
            );
            me.options.end = new Date(
                me.daterangepicker
                    .find('[data-type="endTime"]')
                    .val()
            );
        } else {
            range = getDateRange.call(this, range);
            me.options.start = range.start;
            me.options.end = range.end;
        }
    };

    DateRangePicker.prototype.maxThanMaxDuration = function () {
        var me = this;
        var option = me.options;
        var duration = Math.abs((option.start-option.end)/(1000*60*60*24));
        if (duration > me.options.maxDuration) {
            return true;
        } else {
            return false;
        }
    };

    DateRangePicker.prototype.selectRange = function (range) {
        var me = this;
        me.transRange(range);
        if (me.options.start > me.options.end) {
            me.options.start = [me.options.start, me.options.end];
            me.options.end = me.options.start[0];
            me.options.start = me.options.start[1];
            me.daterangepicker
                .find('[data-type="startTime"]')
                .datetimepicker({
                    selectedDate: me.options.start
                });

            me.daterangepicker
                .find('[data-type="endTime"]')
                .datetimepicker({
                    selectedDate: me.options.end
                });
        }

        me.el.val(
                translateDate(
                    me.options.start, 'yyyy.mm.dd')
                + ' - '
                + translateDate(me.options.end, 'yyyy.mm.dd'
            )
        );
        var e = $.Event("change");
        me.el.trigger(e);

        me.daterangepicker
            .find('[data-type="startTime"]')
            .datetimepicker({
                selectedDate: me.options.start
            });

        me.daterangepicker
            .find('[data-type="endTime"]')
            .datetimepicker({
                selectedDate: me.options.end
            });

        me.el.trigger({
            type: 'changeDate',
            date: me.el.val()
        });
        me.options.onDateSelect && me.options.onDateSelect(me.el.val());
    };

    DateRangePicker.prototype.reset = function () {
        this.daterangepicker.find('[data-type="startTime"]').datetimepicker({
            selectedDate: this.options.start
        });

        this.daterangepicker.find('[data-type="endTime"]').datetimepicker({
            selectedDate: this.options.end
        });
    };

})(jQuery);
define("common/ui/daterangepicker/index", function(){});

/**
 * datetimepicler
 *
 * @file
 * @author hanrui(hanrui@baijiahulian.com)
 *
 * 关于time的部分后续补充，代码优化后续也需要搞一下
 */
(function () {
    $.fn.datetimepicker = function (options) {
        var pluginName = 'DateTimePicker';

        // Find the plugin attached to the element
        var instance = this.data(pluginName);

        // If the instance wasn't found, create it...
        if (!instance) {
            // Return the element being bound to
            return this.each(function () {
                return $(this).data(pluginName, new DateTimePicker(this, options));
            });
        }
        if (options.selectedDate) {
            instance.setDate(options.selectedDate);
        }

        // ...otherwise if the user passes true to the plugin (on the second call),
        // then return the instance of the plugin itself
        return (options === true) ? instance : this;
    };

    // Default options
    $.fn.datetimepicker.defaults = {

        mode: 'day', // 选择模式 day|week
        // 是否默认append到body后，默认false
        isAppendBody: false,
        // Style to use for the calendar.  This name must match the name used in
        // the stylesheet, using the class naming convention "calendar-cssName".
        // 给后续换皮肤用的
        cssName: '',

        // The z-index for the calendar control.
        zIndex: 1000,

        // Set to true if you want the calendar to be visible at all times.
        // NOTE: If your target element is hidden, the calendar will be hidden as well.
        showAlways: false,

        // Hide the calendar when a date is selected (only if showAlways is set to false).
        hideOnClick: true,


        // The date that will be treated as 'today'.
        todayDate: new Date(),

        // 默认选中
        isDefaultSelected: true,

        // The date that will appear selected when the calendar renders.
        // By default it will be set to todayDate.
        selectedDate: null,

        // A collection of dates that can be selectable by the user.
        // The dates can be a one-time selection or made repeatable by setting
        // the repeatYear or repeatMonth flag to true.
        // By default repeatYear and repeatMonth are false.
        //
        // This example creates 4-individual dates that can be selected;
        // The first date will repeat every year, the second date will repeat every
        // month and year, the third date will repeat every month and the fourth date
        // will only be selectable one-time and not repeat:
        //
        //    selectableDates: [
        //        { date: new Date(0, 8, 5), repeatYear: true },
        //        { date: new Date(0, 0, 14), repeatMonth: true, repeatYear: true },
        //        { date: new Date(2013, 0, 24), repeatMonth: true },
        //        { date: new Date(2013, 11, 25) },
        //    ]
        selectableDates: null,

        // A collection of date ranges that are selectable by the user.
        // The ranges can be made to repeat by setting repeatYear to true
        // (repeatMonth is not supported).
        //
        // This example will create 3-sets of selectable date ranges with
        // specific from and to ranges.  The 4th and 5th ranges don't specify
        // the "to" date in which case the "to" date will be the maximum days for
        // the month specified in "from".  The 4th and 5th ranges also repeat every year:
        //
        //     selectableDateRange: 
        //         { from: new Date(2013, 1, 1), to: newDate (2013, 2, 1) }
        selectableDateRange: null,

        // Mark certain dates as special dates.  Similar to selectableDates, this
        // property supports both repeatYear and repeatMonth flags.
        // Each special date can be styled using custom style names and can have
        // data attached to it that will be returned in the onClick callback.
        // The data field can be any custom (JSON style) object.
        //
        // This example creates two (repeatable by year) dates with special data in them.
        // The first date also assigns a special class (which you will have to define).
        //    specialDates: [
        //        {
        //            date: new Date(0, 8, 5),
        //            data: { message: 'Happy Birthday!' },
        //            repeatYear: true,
        //            cssClass: 'special-bday'
        //        },
        //        {
        //            date: new Date(2013, 0, 8),
        //            data: { message: 'Meeting every day 8 of the month' },
        //            repeatMonth: true
        //        }
        //    ]
        specialDates: null,

        // List of months that can be selectable, including when the user clicks
        // on the title to select from the dropdown.
        // This example only makes two months visible; September and December:
        //    selectableMonths: [8, 11]
        selectableMonths: null,

        // List of selectable years.  If not provided, will default to 5-years
        // back and forward.
        // This example only allows selection of dates that have year 2012, 2013, 2015
        //    selectableYears: [2012, 2013, 2015]
        selectableYears: null,

        // List of selectable days of the week.  0 is Monday, 1 is Tuesday, and so on.
        // This example allows only Sunday, Tuesday, Thursday:
        //    selectableDOW: [0, 2, 4]
        selectableDOW: null,

        // Names of the month that will be shown in the title.
        // Will default to long-form names:
        //     January, February, March, April, May, June, July,
        //     August, September, October, November, December
        monthNames: null,

        // Names of the days of the Week that will be shown below the title.
        // Will default to short-form names:
        //     Sun, Mon, Tue, Wed, Thu, Fri, Sat
        dowNames: null,

        // The day of the week to start the calendar on.  0 is Sunday, 1 is Monday and so on.
        dowOffset: 1,

        // Callback that will trigger when the calendar needs to show.
        // You can use this callback to animate the opening of the calendar.
        onShow: function (calendar) {

        },

        // Callback that will trigger when the calendar needs to hide.
        // You can use this callback to animate the hiding of the calendar.
        onHide: function (calendar) {
            calendar.hide();
        },

        // First date of the month.
        firstDate: null
    };


    var getSelectableMonths = function (selectYear, to, from, options) {
        var selectableMonths = [];
        if (to && from && to.getFullYear() === from.getFullYear()) {
            selectableMonths = getSelectableList(
                from.getMonth(),
                to.getMonth(),
                options.selectableMonths
            );
        } else if (to && (+selectYear || options.selectedDate.getFullYear()) === to.getFullYear()) {
            selectableMonths = getSelectableList(
                0,
                to.getMonth(),
                options.selectableMonths
            );
        } else if (from && (+selectYear || options.selectedDate.getFullYear()) === from.getFullYear()) {
            selectableMonths = getSelectableList(
                from.getMonth(),
                11,
                options.selectableMonths
            );
        } else {
            selectableMonths = getSelectableList(
                0,
                11,
                options.selectableMonths
            );
        }
        return selectableMonths;
    }
    // Helper function to build selectable list
    var getSelectableList = function (min, max, userList) {
        // Build a default list using min/max
        var resultList = [];
        for (var i = min; i <= max; i++) {
            resultList.push(i);
        }

        // If user provided a collection, sanitize list by ensuring it's within range and unique
        if (userList) {
            var newList = [];
            $.each(userList, function (i, v) {
                if (v >= min && v <= max && $.inArray(v, newList) < 0) {
                    newList.push(v);
                }
            });

            resultList = newList.length ? newList : resultList;
        }
        ;

        // Sort the values before returning it
        resultList.sort();

        return resultList;
    };


    // Main entry point.  Initialize the plugin
    function DateTimePicker(element, userOptions) {
        var isToggle = true;
        // Grab handle to this
        var self = this;

        // Save bound element to el
        self.el = $(element);
        // self.el = $(document.body);
        var el = self.el;

        // Merge user options into default options
        self.options = $.extend(true, {}, $.fn.datetimepicker.defaults, userOptions);
        var options = self.options;

        if (!(el.attr('calendar-id') || '').length) {
            el.attr('calendar-id', 'calendar-' + Math.round(Math.random() * 1e10))
        }

        // Find the calendar element if the user provided one
        self.calendar = $($.find('[calendar-el=' + el.attr('calendar-id') + ' ]'));

        // If calendar doesn't exist, create it and re-assign it to self
        if (!self.calendar.length) {
            self.calendar = $('<div/>')
                .attr('calendar-el', el.attr('calendar-id'))
                .data('is', true)
                .css({
                    zIndex: options.zIndex
                })
                .html([
                    '<div class="calendar-banner"/>',
                    '<div class="calendar-weeks"/>',
                    '<div class="calendar-days"/>'
                ].join(''));
            // hurry 放到body中，而不是放到el后，不然位置有问题
            options.isAppendBody
                ? $(document.body).after(self.calendar)
                : $(self.el).after(self.calendar);
        }

        // Default first date to selected
        options.selectedDate = options.selectedDate || options.todayDate;
        options.firstDate = (new Date((options.firstDate || options.selectedDate)))._first();

        // Show the plugin on focus
        el
            .addClass('calendar-el')
            .on('click', function (e) {
                if (isToggle) {
                    self.show(e);
                }
                else {
                    self.hide(e);
                }
                isToggle = !isToggle;
            });

        // Hide the plugin on mouse up outside of the plugin
        $(document).bind('mouseup', function (e) {
            var target = e.target;
            var calendar = self.calendar;

            if (!el.is(target) && !calendar.is(target) && calendar.has(target).length === 0 && calendar.is(':visible')) {
                self.hide();
            }
        });

        // hurry: 允许默认日期为空
        if (options.selectedDate && options.isDefaultSelected) {
            // self.render();
            self.setDate(options.selectedDate);
        }
        else {
            self.render();
        }

        $(window).resize(function () {
            self.resize();
        });

        $(window).on('scroll.datetimepicker', function () {
            self.resize();
        });

        // If the user is defining the container and it exists, hide it on initial creation.
        // The update function will handle showing if it's showAlways = true
        if (self.calendar.length && options.showAlways) {
            self.show();
        }
        // self.el = $(element);
    };

    // Public methods
    DateTimePicker.prototype.resize = function () {
        var el = this.el;
        var calendar = this.calendar;
        var options = this.options;
        var elPos = el.offset();

        // calendar.css({
        //     // 1为顶部的边宽度
        //     top: (elPos.top + el.outerHeight() - $(window).scrollTop() + 1) + 'px',
        //     left: (elPos.left) + 'px'
        // });

        // hurry 边界考虑
        // 右边界
        var left = elPos.left;
        // 1为顶部的边宽度
        var top = (elPos.top + el.outerHeight() - $(window).scrollTop() + 1);
        var cssOpts = {};
        var screenWidth = screen.availWidth;
        var screenHeight = screen.availHeight;
        var calendarWidth = calendar.outerWidth();
        var calendarHeight = calendar.outerHeight();
        // 右边界
        if (calendarWidth + left > screenWidth) {
            cssOpts.right = '5px';
        }
        else {
            cssOpts.left = left;
        }
        // 下边界
        if (top + calendarHeight > screenHeight) {
            top = (elPos.top - calendarHeight - $(window).scrollTop() - 1);
        }
        cssOpts.top = top;
        calendar.css(cssOpts);
    };

    DateTimePicker.prototype.show = function () {
        this.resize();
        // Show this calendar
        this.calendar.show();
    };

    DateTimePicker.prototype.hide = function () {
        if (this.options && !this.options.showAlways) {
            this.calendar.hide();
        }
    };

    DateTimePicker.prototype.renderBanner = function () {
        var self = this;
        var el = self.el;
        var options = self.options;
        var calendar = self.calendar;

    };

    DateTimePicker.prototype.renderWeeks = function () {

    };

    DateTimePicker.prototype.renderDays = function () {

    };

    DateTimePicker.prototype.setDate = function (date) {
        function getFormatDate(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            return year + '-' + month + '-' + day;
        }

        this.options.selectedDate = date;

        var res = getFormatDate(date);

        if (this.options.mode == 'week') {
            var weekDay = date.getDay();
            if (weekDay == 0 ) {
                weekDay = 7;
            }
            var dayTime = 24 * 60 * 60 * 1000;
            var monday = date.getTime() - (weekDay- 1) * dayTime;
            var sunday = date.getTime() + (7 - weekDay) * dayTime;
            if (sunday > (new Date().getTime())) {
                sunday = new Date().getTime();
            }
            res = getFormatDate(new Date(monday)) + '至' +  getFormatDate(new Date(sunday));
        }

        this.el.val(res);
        this.el.trigger({
            type: 'changeDate',
            date: date
        });
        var monthVal = date.getMonth();
        var yearVal = date.getFullYear();

        var selectMonth = this.calendar.find('select').eq(1);
        var selectYear = this.calendar.find('select').eq(0);

        this.options.firstDate = new Date(date.getFullYear(), date.getMonth(), 1);

        this.render();
    }

    // Render the calendar
    DateTimePicker.prototype.render = function (renderCalback) {

        var self = this;
        var el = self.el;
        var options = self.options;
        var calendar = self.calendar;

        // Build a core class (with border) that every element would have
        var coreClass = ' core ';
        var cssName = 'calendar';
        cssName += options.cssName ? ' calendar-' + options.cssName : '';

        // Get today
        var todayVal = options.todayDate._val();
        var todayTime = todayVal.time;

        // Constants
        var maxRow = 6;
        var maxCol = 7;


        // Selectable (constants)
        // hanrui 修改，跨年切换，当前2016-01切换上一个月
        var selectYear = (options.firstDate && options.firstDate.getFullYear()) || calendar.find('select').eq(0).val();
        var from = options.selectableDateRange && options.selectableDateRange.from;
        var to = options.selectableDateRange && options.selectableDateRange.to;
        var selectableYears = getSelectableList(
                (from && from.getFullYear()) || todayVal.year - 5,
                (to && to.getFullYear()) || todayVal.year + 5,
            options.selectableYears
        );
        var selectableMonths = getSelectableMonths(selectYear, to, from, options);

        var selectableDOW = getSelectableList(0, 6, options.selectableDOW);
        var dowNames = options.dowNames || ['日', '一', '二', '三', '四', '五', '六'];
        var monthNames = options.monthNames || ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

        // Helper function to setDate
        var setFirstDate = function (_date) {
            if (_date) {
                // Get first date
                options.firstDate = _date;

                // Update the calendar
                self.render();
            }
        };

        var getFirstDate = function (_offset) {
            // Create start date as the first date of the month
            var _date = new Date(options.firstDate);
            if (to && _date > to) {
                _date = new Date(to)._first();
            } else if (from && _date < from) {
                _date = new Date(from)._first();
            }

            // Default to no offset
            _offset = _offset || 0;

            // Find out which months are selectable
            while (true) {
                _date.setMonth(_date.getMonth() + _offset);
                _date.setDate(Math.min(1, _date._max()));

                // If not an offset, break out of the loop
                if (_offset == 0) {
                    break;
                }

                // Get _date's value
                var dateVal = _date._val();

                // Get local vars
                var dateMonth = dateVal.month;
                var dateYear = dateVal.year;

                // hanrui 修改，跨年切换，当前2016-01切换上一个月
                var currentSelectableMonths = selectableMonths;
                if ((_offset === -1 && dateMonth === 11) || (_offset === 1 && dateMonth === 0)) {
                    currentSelectableMonths = getSelectableMonths(dateYear, to, from, options);
                }
                
                // Find the month first
                if ($.inArray(dateMonth, currentSelectableMonths) != -1) {
                    // If year is in our collection, break...
                    if ($.inArray(dateYear, selectableYears) != -1) {
                        break;
                    } else {
                        // ...otherwise, if it's out of bounds, exit loop
                        if (dateYear < selectableYears[0] || dateYear > selectableYears[selectableYears.length - 1]) {
                            return null;
                        }
                    }
                }
            }

            return _date;
        };

        // Get the previous, next first dates
        var prevFirstDate = getFirstDate(-1);
        var nextFirstDate = getFirstDate(1);

        // Get the first date for the current month being rendered
        var firstDate = (options.firstDate = getFirstDate());
        var firstDateVal = firstDate._val();
        var firstDateMonth = firstDateVal.month;
        var firstDateYear = firstDateVal.year;

        // Get the start date in the calendar
        var startDate = new Date(firstDate);

        // Sanitize days of the week offset
        var dowOffset = Math.abs(Math.min(6, Math.max(0, options.dowOffset)));

        // Offset weekdays
        var startOffset = startDate.getDay() - dowOffset;
        startOffset = startOffset < 1 ? -7 - startOffset : -startOffset;
        dowNames = (dowNames.concat(dowNames))
            .slice(dowOffset, dowOffset + 7);

        // Offset the start date
        startDate._add(startOffset);

        // Gather flags for prev/next arrows
        var showPrev = (prevFirstDate);
        var showNext = (nextFirstDate);


        var prevCell = $('<a/>')
            .addClass('prev-arrow btn btn-' + (showPrev ? 'default' : 'disabled'))
            .click(function (e) {
                if (showPrev) {
                    e.stopPropagation();
                    setFirstDate(prevFirstDate);
                    // self.render();
                }
            });

        var titleCell = $('<span/>');

        var nextCell = $('<a/>')
            .addClass('next-arrow btn btn-' + (showNext ? 'default' : 'disabled'))
            .click(function (e) {
                if (showNext) {
                    e.stopPropagation();
                    setFirstDate(nextFirstDate);
                }
            });

        // Add cells for prev/title/next
        var title = $('<div class="calendar-banner"></div>');
        var weeks = $('<div class=calendar-weeks></div>');
        var days = $('<div class=calendar-days></div>');

        title
            .append(prevCell)
            .append(titleCell)
            .append(nextCell);

        // Add all the cells to the calendar
        for (var row = 0, cellIndex = 0; row < maxRow + 1; row++) {
            for (var col = 0; col < maxCol; col++, cellIndex++) {
                var cellDate = new Date(startDate);
                var cellClass = 'day';
                var cellZIndex = options.zIndex + (cellIndex);
                var cell = $('<div/>')

                if (!row) {
                    cellClass = 'week';
                    cell.html(dowNames[col]);
                    cellDate = null;
                    weeks.append(cell);
                } else {
                    // Get the new date for this cell
                    cellDate._add(col + ((row - 1) * maxCol));
                    // Get value for this date
                    var cellDateVal = cellDate._val();
                    var cellDateTime = cellDateVal.time;

                    // Variable to hold special data
                    var specialData = null;

                    // Determine if this date is selectable
                    var isSelectable = true;

                    // Helper function to get repeat friendly date against current date
                    var getRepeatDate = function (v, date) {
                        // If repeating, set the date's year and month accordingly
                        if (v.repeatYear === true) {
                            date.setYear(cellDateVal.year);
                        }
                        if (v.repeatMonth === true) {
                            date.setMonth(cellDateVal.month);
                        }

                        return date._val();
                    };
                    // Assign date for the cell
                    cell.html(cellDateVal.date);
                    cell.attr('row', row);
                    // If we have selectable date ranges
                    if (options.selectableDateRange) {
                        isSelectable = false;
                        $.each([options.selectableDateRange], function (i, v) {
                            var dateFrom = v.from;
                            var dateTo = v.to;

                            dateFrom = dateFrom || new Date(todayVal.year - 5, 0, 1);

                            dateTo = dateTo || new Date(todayVal.year + 5, 11, 31);

                            // If repeating year, set the from and two to the current date's year
                            dateFrom = getRepeatDate(v, dateFrom);
                            dateTo = getRepeatDate(v, dateTo);

                            // Test to see if this date is selectable
                            if (cellDateTime >= dateFrom.time && cellDateTime <= dateTo.time) {
                                isSelectable = true;
                                return true;
                            }
                        });
                    }

                    // Handle date ranges and collections
                    if (options.selectableDates) {
                        if ((options.selectableDateRange && !isSelectable) || (isSelectable && !options.selectableDateRange)) {
                            isSelectable = false;
                        }
                        $.each(options.selectableDates, function (i, v) {
                            var vDate = getRepeatDate(v, v.date);

                            if (vDate.time == cellDateTime) {
                                return (isSelectable = true);
                            }
                        });
                    }

                    // If not active or if not within selectableMonths, set to noday otherwise evaluate accordingly
                    // if (!isSelectable ||
                    //     $.inArray(cellDateVal.year, selectableYears) < 0 ||
                    //     $.inArray(cellDateVal.month, selectableMonths) < 0 ||
                    //     $.inArray(cellDateVal.day, selectableDOW) < 0) {
                    //     continue;
                    // }
                    if (firstDateMonth != cellDateVal.month) {
                        cellClass += ' outday';
                    }
                    if (!isSelectable) {
                        cellClass += ' disabled';
                    }
                    if (todayTime == cellDateTime) {
                        cellClass += ' today';
                        cellZIndex += 50;
                    }
                    if (options.selectedDate._time() == cellDateTime) {
                        cellClass += ' selected';
                        cellZIndex += 51;
                    }

                    // Handle special dates
                    if (options.specialDates) {
                        $.each(options.specialDates, function (i, v) {
                            var vDate = getRepeatDate(v, v.date);

                            if (vDate.time == cellDateTime) {
                                cellClass = (v.cssClass || 'special');
                                cellZIndex += 52;
                                specialData = v.data;
                            }
                        });
                    }
                    if (isSelectable) {
                        if (self.options.mode == 'week') {
                            cell.hover(function (e) {
                                var row = $(e.target).attr('row');
                                calendar.find('[row=' + row + ']').css({
                                    background: '#eee'
                                })
                            });
                            cell.mouseleave(function (e) {
                                var row = $(e.target).attr('row');
                                calendar.find('[row=' + row + ']').css({
                                    background: '#fff'
                                })
                            });
                        }
                        cell.click(function (e) {
                            e.stopPropagation();

                            // Get the data from this cell
                            var clickedData = $(this).data('data');

                            // Save date to selected and first
                            options.selectedDate = options.firstDate = clickedData.date;

                            // Update calendar (and auto-hide if necessary)
                            self.render(function () {
                                if (!options.showAlways && options.hideOnClick) {
                                    self.hide();
                                }
                            });

                            self.setDate(clickedData.date);
                            self.options.onDateSelect && self.options.onDateSelect(clickedData.date);
                        });
                    }
                    days.append(cell);
                }

                // Assign other properties to the cell
                cell
                    .data('data', {
                        date: cellDate,
                        data: specialData
                    })
                    .addClass(coreClass + cellClass);

                // Add cell to calendar

            }
        }

        var child = $('<div/>')
            .append(title);
        child.append(weeks).append(days);
        // Add core classes and remove calendar's children
        calendar
            .removeClass()
            .addClass(cssName)
            .html(child);

        // Render the month / year title

        // Helper function when select is updated
        var onYearMonthSelect = function (e) {
            var targetName = e.target.name;
            var year = yearSelect.val();
            var month = monthSelect.val();
            options.firstDate = new Date(year, month, 1);
            self.render();
                return;
        };

        // Build month selector
        var monthSelect = $('<select name="monthSelect"/>')
            .change(onYearMonthSelect);

        // Build year selector
        var yearSelect = $('<select name="yearSelect"/>')
            .change(onYearMonthSelect);

        // Populate month select
        $.each(monthNames, function (i, v) {
            if ($.inArray(i, selectableMonths) != -1) {
                var o = $('<option/>').html(v).attr('value', i);
                if (i == firstDateMonth) {
                    o.attr('selected', 'selected');
                }
                monthSelect.append(o);
            }
        });

        // Populate year select
        $.each(selectableYears, function (i, v) {
            var o = $('<option/>').html(v).attr('value', v);
            if (v == firstDateYear) {
                o.attr('selected', 'selected');
            }
            yearSelect.append(o);
        });

        var titleYearMonth = $('<span/>')
            .addClass('calendar-year-month')
            .append(yearSelect)
        titleYearMonth.append(monthSelect);

        // Add to title
        titleCell.html(titleYearMonth);

        // Run the callback signaling end of the render
        renderCalback = renderCalback || (function () {
        });
        renderCalback();
    };

    // One time initialization of useful prototypes
    (function () {
        Date.prototype._clear = function () {
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
            this.setMilliseconds(0);

            return this;
        };

        Date.prototype._time = function () {
            return this._clear().getTime();
        };

        Date.prototype._max = function () {
            var isLeapYear = (new Date(this.getYear(), 1, 29).getMonth() == 1) ? 1 : 0;
            var days = [31, 28 + isLeapYear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            return days[this.getMonth()];
        };

        Date.prototype._add = function (days) {
            this.setDate(this.getDate() + days);
        };

        Date.prototype._first = function () {
            var date = new Date(this);
            date.setDate(1);

            return date;
        };

        Date.prototype._val = function () {
            this._clear();

            return {
                year: this.getFullYear(),
                month: this.getMonth(),
                date: this.getDate(),
                time: this.getTime(),
                day: this.getDay()
            };
        };
    })();
})();
define("common/ui/datetimepicker/index", function(){});

/**
 * @file 时间范围选择
 * 该指令在使用的时候只能以属性的形式挂在input元素上，
 * 通过ng-model进行双向数据绑定。
 * ng-model的数据结构为
 * {
 *    begin: 1403020800000, // 范围开始时间戳
 *    end: 1405612800000 // 范围结束时间戳
 * }
 * 如：<input daterangepicker options="options" ng-model="dateRange" />
 *
 * @author hurry
 */
define('common/ngDirective/daterangepicker/directive',['require','common/config/common','../../ui/daterangepicker/index','../../ui/datetimepicker/index'],function (require) {
    'use strict';
    var config = require('common/config/common');
    require('../../ui/daterangepicker/index');
    require('../../ui/datetimepicker/index');
    angular
        .module('Manage.directives')
        .directive('daterangepicker', function () {
            return {
                restrict: 'A',
                scope: {

                    /**
                     * @param {boolean} options.isDefaultSelected
                     *        是否默认选中，默认true，
                     *        选中默认selectedDate，
                     *        不选中，反之
                     * @param {number} options.selectableBegin 可选时间的开始
                     * @param {number} options.selectableEnd 可选时间的结束
                     * @param {number} options.maxDuration 最大时间间隔
                     * @param {function} options.onDateSelect 选择时间以后的回调
                     */
                    options: '=options'
                },
                /**
                 * @param {number} begin 默认开始时间
                 * @param {number} end 默认结束时间
                 */
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var vm = scope;
                    var isToggle = true;
                    var picker;
                    var defaultOptions = {
                        // selectedDate: new Date(),
                        selectableBegin: '2014/1/1',
                        selectableEnd: new Date(),
                        isDefaultSelected: true
                    };
                    var options = $.extend(defaultOptions, vm.options);
                    var ele = $(element);
                    var pre = ele.prev();
                    var next = ele.next();
                    var parent = ele.parent();
                    var wrapper = $('<div class="date-time-wrapper"></div>');
                    var icon = $('<i class="icon-ic_calendar"></i>');
                    icon.on('click', function (e) {
                        if (picker) {
                            var instance = picker.data('DateRangePicker');
                            if (isToggle) {
                                instance.show(e);
                            }
                            else {
                                instance.hide(e);
                            }
                            isToggle = !isToggle;
                        }
                    });
                    wrapper.append(ele).append(icon);
                    if (pre.length) {
                        wrapper.insertAfter(pre);
                    }
                    else if (next.length) {
                        wrapper.insertBefore(next);
                    }
                    else {
                        parent.append(wrapper);
                    }
                    /**
                     * modelValue转为视图用的数据
                     */
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        if (modelValue) {
                            var begin = modelValue.begin;
                            var end = modelValue.end;
                            vm.begin = angular.isString(begin)
                                ? begin.replace(/-/g, '/') : begin;
                            vm.end = angular.isString(end)
                                ? end.replace(/-/g, '/') : end;
                        }
                        return modelValue;
                    });


                    ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue;
                    });


                    ngModelCtrl.$render = function () {
                        var currentDate = new Date().getTime();
                        var begin = options.selectableBegin;
                        var end = options.selectableEnd;
                        begin = angular.isString(begin)
                            ? begin.replace(/-/g, '/') : begin;
                        end = angular.isString(end)
                            ? end.replace(/-/g, '/') : end;
                        var uiParam = {
                            selectableDateRange: {
                                from: new Date(begin),
                                to: new Date(end)
                            },
                            isDefaultSelected: options.isDefaultSelected,
                            isAppendBody: true,
                            zIndex: options.zIndex || 1060,
                            maxDuration: options.maxDuration || 30,
                            // 当前选择的时间段
                            selectedRange: {
                                from: new Date(vm.begin || (currentDate - 7 * config.ONE_DAY_MILLISECONDS)),
                                to: new Date(vm.end || currentDate)
                            },
                            onDateSelect: function (val) {
                                var split = val.split('-');
                                var begin = split[0].replace(/\./g, '/');
                                var end = split[1].replace(/\./g, '/');
                                var res = {
                                    begin: new Date(begin).getTime(),
                                    // 结束时间为选中日期的23点59分59秒
                                    end: new Date(end).getTime() + (24 * 60 * 60 * 1000 - 1)
                                };
                                ngModelCtrl.$setViewValue(res);
                                options.onDateSelect && options.onDateSelect(res);
                            }
                        };
                        picker = $(element).daterangepicker(uiParam).prop('readonly', true);
                    };
                }
            };
        });
});
//! moment.js
//! version : 2.15.2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('moment',factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        var k;
        for (k in obj) {
            // even if its not own property I'd still call it non-empty
            return false;
        }
        return true;
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (utils_hooks__hooks.deprecationHandler != null) {
                utils_hooks__hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (utils_hooks__hooks.deprecationHandler != null) {
            utils_hooks__hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;
    utils_hooks__hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return this._months;
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return this._monthsShort;
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function units_month__handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = create_utc__createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return units_month__handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        if (!m) {
            return this._weekdays;
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function day_of_week__handleStrictParse(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = create_utc__createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = create_utc__createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        ordinalParse: defaultOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                            'specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/');
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, parentConfig = baseConfig;
            // MERGE
            if (locales[name] != null) {
                parentConfig = locales[name]._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (isDate(input)) {
            config._d = input;
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);

            if (tZone === 0) {
                this.utcOffset(0, true);
            } else {
                this.utcOffset(offsetFromString(matchOffset, this._i));
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = utils_hooks__hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIOROITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = stringGet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = stringSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    momentPrototype__proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var prototype__proto = Locale.prototype;

    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto.ordinal         = ordinal;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    prototype__proto.weekdaysRegex       =        weekdaysRegex;
    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = lists__get(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = locale_locales__getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return lists__get(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function lists__listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function lists__listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function lists__listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function lists__listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function duration_humanize__getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.15.2';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeRounding = duration_humanize__getSetRelativeTimeRounding;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.calendarFormat        = getCalendarFormat;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
/**
 * @file 时间选择
 * @author hurry
 * 该指令在使用的时候只能以属性的形式挂在input元素上，
 * 通过ng-model进行双向数据绑定。ng-model的值即为当前选定日期0点的时间戳
 * 如：<input datetimepicker options="options" ng-model="selectedTime" />
 * @date   2015/11/06
 */
define('common/ngDirective/datetimepicker/directive',['require','common/config/common','moment','../../ui/datetimepicker/index'],function (require) {
    'use strict';
    var config = require('common/config/common');
    var moment = require('moment');
    require('../../ui/datetimepicker/index');
    angular
        .module('Manage.directives')
        .directive('datetimepicker', function () {
            return {
                restrict: 'A',
                scope: {

                    /**
                     * @param {number} options.selectedDate 默认选中时间
                     * @param {boolean} options.isDefaultSelected
                     *        是否默认选中，默认true，
                     *        选中默认selectedDate，
                     *        不选中，反之
                     * @param {number} options.selectableBegin 可选时间的开始时间戳
                     * @param {number} options.selectableEnd 可选时间的结束结束时间戳
                     * @param {number} options.onDateSelect 选择时间以后的回调
                     */
                    options: '=options'
                },
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var isToggle = true;
                    var picker;
                    var vm = scope;
                    var defaultOptions = {
                        selectedDate: moment().format(config.MOMENT_DATE_FORMAT).replace(/-/g, '/'),
                        selectableBegin: '2014/6/16',
                        selectableEnd: new Date(),
                        isDefaultSelected: true
                    };
                    function init() {
                        var ele = $(element);
                        var pre = ele.prev();
                        var next = ele.next();
                        var parent = ele.parent();
                        var wrapper = $('<div class="date-time-wrapper"></div>');
                        var icon = $('<i class="icon-ic_calendar"></i>');
                        icon.on('click', function (e) {
                            if (picker) {
                                var instance = picker.data('DateTimePicker');
                                if (isToggle) {
                                    instance.show(e);
                                }
                                else {
                                    instance.hide(e);
                                }
                                isToggle = !isToggle;
                            }
                        });
                        wrapper.append(ele).append(icon);
                        if (pre.length) {
                            wrapper.insertAfter(pre);
                        }
                        else if (next.length) {
                            wrapper.insertBefore(next);
                        }
                        else {
                            parent.append(wrapper);
                        }
                    }
                    function main() {
                        init();
                    }
                    main();
                    /**
                     * modelValue转为视图用的数据
                     */
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        if (modelValue) {
                            vm.selectedDate = vm.options.selectedDate = modelValue;
                        }
                        return modelValue;
                    });


                    ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue;
                    });

                    ngModelCtrl.$render = function () {
                        if (vm.options) {
                            var options = $.extend({}, defaultOptions, vm.options);
                            var begin = options.selectableBegin;
                            var end = options.selectableEnd;
                            begin = angular.isString(begin)
                                ? begin.replace(/-/g, '/') : begin;
                            end = angular.isString(end)
                                ? end.replace(/-/g, '/') : end;
                            var selectedDate = options.selectedDate;
                            selectedDate = angular.isString(selectedDate)
                                ? selectedDate.replace(/-/g, '/') : selectedDate;
                            var uiParam = {
                                selectedDate: new Date(selectedDate),
                                isAppendBody: true,
                                zIndex: options.zIndex || 1100,
                                isDefaultSelected: options.isDefaultSelected,
                                selectableDateRange: {
                                    from: new Date(begin),
                                    to: new Date(end)
                                },
                                onDateSelect: function (val) {
                                    val = new Date(val).getTime();
                                    ngModelCtrl.$setViewValue(val);
                                    options.onDateSelect && options.onDateSelect(val);
                                }
                            };
                            picker = $(element).datetimepicker(uiParam);
                            picker.prop('readonly', true);
                        }
                    };
                }
            };
        });
});
/**
 * @file tooltip指令
 * @author hurry
 */

define('common/ngDirective/tooltip/directive',[],function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('tooltip', ['$timeout', function ($timeout){
            // Runs during compile
            return {
                restrict: 'A',
                scope: {
                    /**
                     * 配置
                     * @param {Object} options
                     * @param {string} options.position
                     *        'top/bottom/left/right' 默认top
                     * @param {number} options.width 宽度，默认120px
                     * @param {string} options.content 要显示内容
                     * @param {?function} options.getContent
                     *        获取显示内容
                     *        this: $scop
                     *        arguments: iAttr
                     */
                    options: '='
                },
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope, iElm, iAttrs) {

                    var layerStyle = {};
                    var tempElem;

                    function positionTip (elem, direction) {
                        var width = elem.outerWidth();
                        var height = elem.outerHeight();
                        var optWidth = $scope.options.width || 120;

                        switch(direction) {
                            case 'left':
                                break;
                            case 'right':
                                layerStyle.left = width + 10 + 'px';
                                layerStyle.top =  Math.ceil((height - 28) /2) + 'px';
                                break;
                            case 'top':
                            case 'bottom':
                                //有些挂靠元素只是一个图标  宽度很小  
                                if (width > 45) {
                                    layerStyle.left = (width - optWidth) + 'px';
                                }
                                else {
                                    layerStyle.left = (45 - optWidth) + 'px';
                                }
                                tempElem.find('i').css('left', (optWidth - 50 + 'px'));
                                break;
                            default:
                                break;
                        }

                        tempElem.css(layerStyle);

                    }


                    $scope.$watch('options', function (newValue) {

                        if (!newValue) {
                            return;
                        }

                        var position = newValue.position || 'top';

                        iElm.addClass('ex-tooltip-' + position)
                            .addClass('ex-tooltip');

                        layerStyle = {
                            width: (newValue.width || 120) + 'px'
                        };

                        tempElem = $(''
                            + '<div class="ex-tooltip-layer">'
                            +       '<i class="ex-tooltip-before"></i>'
                            +       '<i class="ex-tooltip-after"></i>'
                            +       (newValue.content || '')
                            + '</div>'
                        );

                        iElm.append(tempElem.hide());

                        var to;
                        iElm.on('mouseenter', function () {
                                if (angular.isFunction(newValue.getContent)) {
                                    tempElem.html(''
                                        + '<div class="ex-tooltip-layer">'
                                        +       '<i class="ex-tooltip-before"></i>'
                                        +       '<i class="ex-tooltip-after"></i>'
                                        +       newValue.getContent.apply($scope, [iAttrs])
                                        + '</div>'
                                    );
                                }

                                positionTip(iElm, position);
                                tempElem.show();
                            })
                            .on('mouseleave', function () {

                                to = $timeout(function(){
                                    tempElem.hide();
                                }, 100);
                            });

                        // tempElem.on('mouseover', function () {
                        //     to && $timeout.cancel(to);
                        // });

                        newValue.clazz && iElm.parent().addClass(newValue.clazz);

                    });
                }
            };
        }]);
});

/**
 * @file 转成 string 类型
 * @author musicode
 */
define('cc/function/toString',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 转成 string 类型
     *
     * @param {*} value
     * @param {*} defaultValue
     * @return {string}
     */
    return function (value, defaultValue) {

        var type = $.type(value);

        if (type === 'number') {
            value = '' + value;
        }
        else if (type !== 'string') {

            if (arguments.length === 1) {
                defaultValue = '';
            }

            value = defaultValue;

        }

        return value;

    };

});
/**
 * @file 事件触发器
 * @author musicode
 */
define('cc/util/trigger',['require','exports','module','../function/split'],function (require, exports, module) {

    'use strict';

    var split = require('../function/split');

    /**
     * 延时定时器的 key
     *
     * @inner
     * @type {string}
     */
    var delayTimer = 'delayTimer';

    function createHandler(options) {

        return function (e) {

            var delay = options.delay;
            var startDelay = options.startDelay;
            var endDelay = options.endDelay;

            var done = function () {
                options.handler.call(e.currentTarget, e);
            };

            var action = function () {

                if (delay > 0 && startDelay && endDelay) {

                    var startTimer = function () {

                        options[ delayTimer ] = setTimeout(
                            function () {
                                fn(delayTimer);
                            },
                            delay
                        );

                    };

                    var clearTimer = function () {

                        clearTimeout(options[ delayTimer ]);

                        endDelay(fn, options);

                        options[ delayTimer ] = null;

                    };

                    var fn = function (value) {

                        if (options[ delayTimer ]) {
                            clearTimer();
                        }

                        if (delayTimer === value) {
                            done();
                        }

                    };

                    if (!options[ delayTimer ]) {
                        startDelay(fn, options);
                        startTimer();
                    }

                }
                else {
                    done();
                }

            };

            var beforeHandler = options.beforeHandler;
            if ($.isFunction(beforeHandler)) {
                var result = beforeHandler.call(e.currentTarget, e);
                if (result === false) {
                    return;
                }
                else if (result && $.isFunction(result.then)) {
                    result.then(action);
                    return;
                }
            }

            action();

        };

    }

    exports = {
        focus: {
            type: 'focusin',
            handler: createHandler
        },
        blur: {
            type: 'focusout',
            handler: createHandler
        },
        click: {
            type: 'click',
            handler: createHandler
        },
        enter: {
            type: 'mouseenter',
            handler: createHandler
        },
        leave: {
            type: 'mouseleave',
            handler: createHandler
        },
        context: {
            type: 'contextmenu',
            handler: createHandler
        }
    };

    /**
     *
     * @param {string} trigger
     * @param {Function} each
     * @return {Object}
     */
    exports.parse = function (trigger, each) {

        var configs = { };

        if (trigger) {
            $.each(
                split(trigger, ','),
                function (index, trigger) {

                    var config = exports[ trigger ];
                    if (config) {
                        configs[ trigger ] = {
                            type: config.type,
                            handler: config.handler(
                                each(trigger)
                            )
                        };
                    }

                }
            );
        }

        return configs;

    };

    return exports;

});
/**
 * @file Popup
 * @author musicode
 */
define('cc/helper/Popup',['require','exports','module','../function/isHidden','../function/contains','../function/nextTick','../util/life','../util/trigger','../util/instance'],function (require, exports, module) {

    'use strict';

    /**
     * 弹出式交互使用的非常普遍
     *
     * 抽象的说就是通过怎样的交互触发一个元素的显示，以及后续怎么隐藏它的问题
     *
     * ## 怎样触发显示
     *
     *    常见的触发方式包括：
     *
     *    focus 专用于输入框
     *    click
     *    enter
     *
     * ## 怎样触发隐藏
     *
     *    常见的触发方式包括：
     *
     *    blur 专用于输入框
     *    click （点击元素之外的地方触发隐藏）
     *    leave
     *
     * ## 延时
     *
     *    有时为了避免过于灵敏的触发，会设置 delay 来减少误操作
     *
     * ## 多种触发方式
     *
     *    比较常用的组合是 'leave,click'，即 鼠标移出 和 元素失焦 都会触发隐藏
     *
     *    如果没有隐藏延时，这个组合是不可能实现的，因为一旦移出，肯定是 leave 率先生效，click 等于没写
     *    如果设置隐藏延时，为了避免问题复杂化，需要把隐藏延时的方式写在首位
     *
     * ## 事件代理
     *
     *    当多个 triggerElement 共享一个 layerElement 元素时，可转为事件代理，而无需为每个 triggerElement 绑定事件
     *
     *
     */

    var isHidden = require('../function/isHidden');
    var contains = require('../function/contains');
    var nextTick = require('../function/nextTick');

    var lifeUtil = require('../util/life');
    var triggerUtil = require('../util/trigger');
    var instanceUtil = require('../util/instance');

    /**
     * 简单的弹出式交互
     *
     * 不涉及位置计算，仅包含显示/隐藏逻辑
     *
     * @constructor
     * @param {Object} options
     *
     * @property {jQuery=} options.triggerElement 触发元素，如果是调用方法显示，可不传
     * @property {string=} options.triggerSelector 如果传了选择器，表示为 triggerElement 的 triggerSelector 元素进行事件代理
     *                                             即触发了 triggerElement 中的 triggerSelector，会弹出 layerElement
     *
     * @property {jQuery|Function} options.layerElement 弹出的元素
     *
     * @property {boolean=} options.opened 弹出的元素是否默认展开。如果不传，会自动根据 DOM 判断
     *
     * @property {string=} options.showLayerTrigger 显示的触发方式，可选值有 click enter focus context，可组合使用，以逗号分隔
     * @property {number=} options.showLayerDelay 显示延时
     * @property {Function=} options.showLayerAnimation 显示动画
     *
     * @property {string} options.hideLayerTrigger 隐藏的触发方式，可选值有 click leave blur context，可组合使用，以逗号分隔
     * @property {number=} options.hideLayerDelay 隐藏延时
     * @property {Function} options.hideLayerAnimation 隐藏动画
     */
    function Popup(options) {
        lifeUtil.init(this, options);
    }

    var proto = Popup.prototype;

    proto.type = 'Popup';

    proto.init = function () {

        var me = this;

        var curry = function (proxy, name) {
            if ($.isFunction(proxy[ name ])) {
                return proxy[ name ](me);
            }
        };

        var showTriggers = triggerUtil.parse(
            me.option('showLayerTrigger'),
            function (trigger) {

                var showLayerTrigger = triggers.show[ trigger ];

                return {
                    delay: me.option('showLayerDelay'),
                    startDelay: curry(showLayerTrigger, 'startDelay'),
                    endDelay: curry(showLayerTrigger, 'endDelay'),
                    handler: curry(showLayerTrigger, 'handler'),
                    beforeHandler: function (e) {

                        var action = function () {
                            me.inner({
                                trigger: getTriggerElement(me, e),
                                layer: getLayerElement(me, e)
                            });
                        };

                        if (me.is('opened')) {

                            var promise = $.Deferred();
                            promise.then(action);

                            me.inner(HIDE_PROMISE_KEY, promise);

                            return promise;

                        }
                        else {
                            action();
                        }

                    }
                };

            }
        );

        var hideTriggers = triggerUtil.parse(
            me.option('hideLayerTrigger'),
            function (trigger) {

                var hideLayerTrigger = triggers.hide[ trigger ];

                return {
                    delay: me.option('hideLayerDelay'),
                    startDelay: curry(hideLayerTrigger, 'startDelay'),
                    endDelay: curry(hideLayerTrigger, 'endDelay'),
                    handler: curry(hideLayerTrigger, 'handler')
                };

            }
        );

        var showEvent = function (action) {
            $.each(
                showTriggers,
                function (trigger, config) {
                    triggers.show[ trigger ][ action ](me, config);
                }
            );
        };

        var hideEvent = function (action) {
            $.each(
                hideTriggers,
                function (trigger, config) {
                    triggers.hide[ trigger ][ action ](me, config);
                }
            );
        };







        var hasShowEvent = false;
        var hasHideEvent = false;

        var bindShowEvent = function () {
            if (!hasShowEvent) {
                showEvent('on');
                hasShowEvent = true;
            }
        };
        var unbindShowEvent = function () {
            if (hasShowEvent) {
                showEvent('off');
                hasShowEvent = false;
            }
        };
        var bindHideEvent = function () {
            if (!hasHideEvent) {
                hideEvent('on');
                hasHideEvent = true;
            }
        };
        var unbindHideEvent = function () {
            if (hasHideEvent) {
                hideEvent('off');
                hasHideEvent = false;
            }
        };
        var stateChangeHandler = function (e, data) {
            var opened = data.opened;
            if (opened) {
                if (opened.newValue) {
                    if (!me.option('triggerSelector')) {
                        unbindShowEvent();
                    }
                    nextTick(bindHideEvent);
                }
                else {
                    unbindHideEvent();
                    bindShowEvent();
                }
            }
        };

        me
        .before('dispose', function () {

            me.off('statechange', stateChangeHandler);

            unbindShowEvent();
            unbindHideEvent();

            me.close();

        })
        .on('statechange', stateChangeHandler);


        me.inner({
            trigger: getTriggerElement(me),
            layer: getLayerElement(me)
        });

        me.state({
            opened: me.option('opened')
        });

    };


    proto.open = function () {
        this.state('opened', true);
    };

    proto._open = function (e) {

        var me = this;

        if (me.is('opened')) {

            var layerElement = me.inner('layer');

            // 多个 triggerElement 触发同一个 layerElement 时
            // 不同的 triggerElement 触发 open，需要先 close 之前的
            var currTriggerElement = me.inner('trigger');
            var prevTriggerElement = layerElement.data(TRIGGER_ELEMENT_KEY);

            if (currTriggerElement
                && prevTriggerElement
                && currTriggerElement[0] !== prevTriggerElement[0]
            ) {
                layerElement.data(POPUP_KEY).close();
                nextTick(function () {
                    if (me.guid) {
                        me.open(e);
                    }
                });
            }

            return false;
        }

        return {
            dispatch: true
        };

    };

    proto.open_ = function () {

        var me = this;

        var layerElement = me.inner('layer');
        if (layerElement) {

            var data = { };
            data[ TRIGGER_ELEMENT_KEY ] = me.inner('trigger');
            data[ POPUP_KEY ] = me;

            layerElement.data(data);
        }

        return {
            dispatch: true
        };

    };


    proto.close = function () {
        this.state('opened', false);
    };

    proto._close = function () {
        if (!this.is('opened')) {
            return false;
        }
        return {
            dispatch: true
        };
    };
    proto.close_ = function () {
        var me = this;
        var layerElement = me.inner('layer');
        if (layerElement) {
            layerElement
                .removeData(POPUP_KEY)
                .removeData(TRIGGER_ELEMENT_KEY);
        }
        return {
            dispatch: true
        };
    };

    proto.dispose = function () {
        lifeUtil.dispose(this);
    };

    lifeUtil.extend(proto);

    Popup.stateUpdater = {
        opened: function (opened) {
            var layerElement = this.inner('layer');
            if (layerElement) {
                this.execute(
                    opened ? 'showLayerAnimation' : 'hideLayerAnimation',
                    {
                        layerElement: layerElement
                    }
                );
            }
        }
    };

    Popup.stateValidator = {
        opened: function (opened) {
            if ($.type(opened) !== 'boolean') {
                var layerElement = this.inner('layer');
                if (layerElement) {
                    opened = !isHidden(layerElement);
                }
            }
            return opened;
        }
    };

    /**
     * 创建响应 show 事件的事件处理函数
     *
     * @inner
     * @param {Popup} instance
     * @param {Function=} before 需要满足什么前置条件才可往下执行
     * @return {Function}
     */
    function createShowHandler(instance, before) {
        return function (e) {

            var target = $(this);
            if (target.attr('disabled') === 'disabled') {
                return;
            }

            if ($.isFunction(before)) {
                if (!before.call(this, e)) {
                    return;
                }
            }

            instance.open(e);

        };
    }

    /**
     * 创建响应 hide 事件的事件处理函数
     *
     * @inner
     * @param {Popup} instance
     * @param {Function=} before 需要满足什么前置条件才可往下执行
     * @return {Function}
     */
    function createHideHandler(instance, before) {
        return function (e) {

            var target = $(this);
            if (target.attr('disabled') === 'disabled') {
                return;
            }

            if ($.isFunction(before)) {
                if (!before.call(this, e)) {
                    return;
                }
            }

            instance.close(e);

            var promise = instance.inner(HIDE_PROMISE_KEY);
            if (promise) {
                instance.sync();
                promise.resolve();
            }

        };
    }

    function onElement(element, type, handler, selector) {
        if (element) {
            element.on(type, selector, handler);
        }
    }

    function offElement(element, type, handler) {
        if (element) {
            element.off(type, handler);
        }
    }

    /**
     * 通用的绑定事件
     *
     * @inner
     * @param {Object} instance
     * @param {Object} config
     */
    function onTrigger(instance, config) {
        var triggerElement = instance.option('triggerElement');
        var triggerSelector = instance.option('triggerSelector');
        if (triggerElement || triggerSelector) {
            onElement(
                triggerElement || instanceUtil.body,
                config.type,
                config.handler,
                triggerSelector
            );
        }
    }

    /**
     * 通用的解绑事件
     *
     * @inner
     * @param {Object} instance
     * @param {Object} config
     */
    function offTrigger(instance, config) {
        offElement(
            instance.option('triggerElement') || instanceUtil.body,
            config.type,
            config.handler
        );
    }

    /**
     * 在 document 绑定全局事件
     *
     * @inner
     * @param {Popup} instance
     * @param {Object} config
     */
    function onDocument(instance, config) {
        onElement(
            instanceUtil.document,
            config.type,
            config.handler
        );
    }

    /**
     * 取消全局绑定
     *
     * @inner
     * @param {Popup} instance
     * @param {Object} config
     */
    function offDocument(instance, config) {
        offElement(
            instanceUtil.document,
            config.type,
            config.handler
        );
    }

    /**
     * 创建响应 hide 失焦的事件处理函数
     *
     * @inner
     * @param {Popup} instance
     * @return {Function}
     */
    function createDocumentHideHandler(instance) {
        return createHideHandler(
            instance,
            function (e) {
                return !contains(
                    instance.inner('layer'),
                    e.target
                );
            }
        );
    }

    function getTriggerElement(instance, event) {
        var triggerElement = instance.option('triggerElement');
        var triggerSelector = instance.option('triggerSelector');
        if (triggerElement && !triggerSelector) {
            return triggerElement;
        }
        if (event) {
            return $(event.currentTarget);
        }
    }

    function getLayerElement(instance, event) {
        var layerElement = instance.option('layerElement');
        if (layerElement && layerElement.jquery && layerElement.length) {
            return layerElement;
        }
        if (event && $.isFunction(layerElement)) {
            layerElement = instance.execute(layerElement, event);
            if (layerElement && layerElement.tagName) {
                layerElement = $(layerElement);
            }
            return layerElement;
        }
    }

    var POPUP_KEY = '__prev_popup__';
    var TRIGGER_ELEMENT_KEY = '__trigger_element__';
    var HIDE_PROMISE_KEY = '__hide_promise__';

    var enterType = triggerUtil.enter.type;
    var leaveType = triggerUtil.leave.type;

    /**
     * show/hide 配置
     *
     * @inner
     * @type {Object}
     */
    var triggers = {

        show: {
            focus: {
                on: onTrigger,
                off: offTrigger,
                handler: createShowHandler
            },
            click: {
                on: onTrigger,
                off: offTrigger,
                handler: createShowHandler
            },
            enter: {
                on: onTrigger,
                off: offTrigger,
                handler: createShowHandler,
                startDelay: function (instance) {
                    return function (handler) {
                        onElement(
                            instance.inner('trigger'),
                            leaveType,
                            handler
                        );
                    };
                },
                endDelay: function (instance) {
                    return function (handler) {
                        offElement(
                            instance.inner('trigger'),
                            leaveType,
                            handler
                        );
                    };
                }
            },
            context: {
                on: onTrigger,
                off: offTrigger,
                handler: createShowHandler
            }
        },

        hide: {
            blur: {
                on: onTrigger,
                off: offTrigger,
                handler: createHideHandler
            },
            click: {
                on: onDocument,
                off: offDocument,
                handler: createDocumentHideHandler
            },
            leave: {
                on: function (instance, config) {

                    onElement(
                        instance.inner('trigger'),
                        config.type,
                        config.handler
                    );

                    onElement(
                        instance.inner('layer'),
                        config.type,
                        config.handler
                    );

                },
                off: function (instance, config) {

                    offElement(
                        instance.inner('trigger'),
                        config.type,
                        config.handler
                    );

                    offElement(
                        instance.inner('layer'),
                        config.type,
                        config.handler
                    );

                },
                handler: createHideHandler,
                startDelay: function (instance) {
                    return function (handler) {

                        onElement(
                            instance.inner('trigger'),
                            enterType,
                            handler
                        );

                        onElement(
                            instance.inner('layer'),
                            enterType,
                            handler
                        );

                    };
                },
                endDelay: function (instance) {
                    return function (handler) {

                        offElement(
                            instance.inner('trigger'),
                            enterType,
                            handler
                        );

                        offElement(
                            instance.inner('layer'),
                            enterType,
                            handler
                        );

                    };
                }
            },
            context: {
                on: onDocument,
                off: offDocument,
                handler: createDocumentHideHandler
            }
        }

    };


    return Popup;

});

/**
 * @file 下拉菜单
 * @author musicode
 */
define('cc/ui/ComboBox',['require','exports','module','../function/toString','../helper/Popup','../util/life'],function (require, exports, module) {

    'use strict';

    var toString = require('../function/toString');

    var Popup = require('../helper/Popup');

    var lifeUtil = require('../util/life');

    /**
     * @constructor
     * @param {Object} options
     * @property {jQuery=} options.mainElement 如果需要容器包着 buttonElement 和 menuElement, 可以设置主元素
     *                                         menuActiveClass 会优先作用于它，否则作用于 menuElement
     *
     * @property {jQuery} options.buttonElement 按钮元素
     * @property {jQuery} options.menuElement 下拉菜单元素
     * @property {string=} options.menuTemplate 菜单模板
     *
     * @property {Array.<Object>=} options.data 渲染下拉菜单的数据
     * @property {Function} options.render 渲染模板的函数
     *
     * @property {string=} options.value 当前选中的值
     * @property {string} options.defaultText 未选中值时默认显示的文本，如 请选择
     *
     * @property {string} options.itemSelector 菜单项选择器
     * @property {string=} options.textAttribute 菜单项文本属性名称
     * @property {string} options.valueAttribute 菜单项值属性名称
     *
     * @property {string=} options.itemActiveClass 菜单项选中状态的 className，可提升用户体验
     * @property {string=} options.menuActiveClass 菜单展开状态的 className
     *
     * @property {string} options.showMenuTrigger 显示下拉菜单的触发方式
     * @property {number=} options.showMenuDelay 显示下拉菜单的触发延时
     * @property {Function} options.showMenuAnimation 显示下拉菜单的动画
     *
     * @property {string} options.hideMenuTrigger 隐藏下拉菜单的触发方式
     * @property {number=} options.hideMenuDelay 隐藏下拉菜单的延时
     * @property {Function} options.hideMenuAnimation 隐藏下拉菜单的动画
     *
     * @property {Function} options.setText 设置选中菜单项文本
     */
    function ComboBox(options) {
        lifeUtil.init(this, options);
    }

    var proto = ComboBox.prototype;

    proto.type = 'ComboBox';

    proto.init = function () {

        var me = this;

        me.initStruct();


        var buttonElement = me.option('buttonElement');
        var menuElement = me.option('menuElement');

        var popup = new Popup({
            triggerElement: buttonElement,
            layerElement: menuElement,
            showLayerTrigger: me.option('showMenuTrigger'),
            showLayerDelay: me.option('showMenuDelay'),
            hideLayerTrigger: me.option('hideMenuTrigger'),
            hideLayerDelay: me.option('hideMenuDelay'),
            showLayerAnimation: function () {
                me.execute(
                    'showMenuAnimation',
                    {
                        menuElement: menuElement
                    }
                );
            },
            hideLayerAnimation: function () {
                me.execute(
                    'hideMenuAnimation',
                    {
                        menuElement: menuElement
                    }
                );
            },
            watchSync: {
                opened: function (opened) {
                    me.state('opened', opened);
                }
            }
        });

        popup.on('dispatch', function (e, data) {
            var event = me.emit(e.originalEvent, data);
            me.dispatch(event, data);
        });

        var mainElement = me.option('mainElement');
        var menuActiveClass = me.option('menuActiveClass');
        if (menuActiveClass) {
            var element = mainElement || menuElement;
            popup
                .after('open', function () {
                    element.addClass(menuActiveClass);
                })
                .after('close', function () {
                    element.removeClass(menuActiveClass);
                });
        }

        var itemSelector = me.option('itemSelector');
        var valueAttribute = me.option('valueAttribute');

        menuElement.on(
            'click' + me.namespace(),
            itemSelector,
            function (e) {

                if (me.is('opened')) {
                    me.close(e);
                }

                if (e.isDefaultPrevented()) {
                    return;
                }

                me.set(
                    'value',
                    $(this).attr(valueAttribute)
                );

                var event = $.Event(e.originalEvent);
                event.type = 'select';

                me.dispatch(
                    me.emit(event)
                );

            }
        );


        me.inner({
            main: mainElement,
            popup: popup
        });

        me.set({
            data: me.option('data'),
            value: me.option('value')
        });

    };

    proto.render = function () {

        var me = this;

        me.renderWith(
            me.get('data'),
            me.option('menuTemplate'),
            me.option('menuElement')
        );

    };

    proto._render = function () {
        if (!this.get('data')) {
            return false;
        }
    };

    proto.open = function () {
        this.state('opened', true);
    };

    proto.close = function () {
        this.state('opened', false);
    };

    proto.dispose = function () {

        var me = this;

        lifeUtil.dispose(me);

        me.inner('popup').dispose();

        me.option('menuElement').off(
            me.namespace()
        );

    };

    lifeUtil.extend(proto, [ 'open', 'close' ]);

    ComboBox.propertyUpdater = { };

    ComboBox.propertyUpdater.data =
    ComboBox.propertyUpdater.value = function (newValue, oldValue, change) {

        var me = this;

        var menuElement = me.option('menuElement');
        var itemActiveClass = me.option('itemActiveClass');
        var textAttribute = me.option('textAttribute');
        var valueAttribute = me.option('valueAttribute');


        if (change.data) {
            this.render();
        }
        else if (change.value && itemActiveClass) {
            menuElement
                .find('.' + itemActiveClass)
                .removeClass(itemActiveClass);
        }


        var text;
        var value = toString(me.get('value'), null);

        if (value != null) {

            var getText = function (element) {
                text = element.attr(textAttribute);
                if (text == null) {
                    text = element.html();
                }
                return text;
            };

            if (value !== '') {
                var itemElement = menuElement.find(
                    '[' + valueAttribute + '="' + value + '"]'
                );

                switch (itemElement.length) {
                    case 1:
                        if (itemActiveClass) {
                            itemElement.addClass(itemActiveClass);
                        }
                        text = getText(itemElement);
                        break;
                    case 0:
                        break;
                    default:
                        me.error('value repeated.');
                        break;
                }
            }
            else {
                menuElement
                    .find('[' + valueAttribute + ']')
                    .each(function () {
                        var target = $(this);
                        var value = target.attr(valueAttribute);
                        if (value === '') {
                            text = getText(target);
                            return false;
                        }
                    });
            }

        }

        me.execute(
            'setText',
            {
                buttonElement: me.option('buttonElement'),
                text: text || me.option('defaultText')
            }
        );

        return false;

    };

    ComboBox.propertyValidator = {

        value: function (value) {

            var me = this;

            var itemActiveClass = me.option('itemActiveClass');
            if (value == null && itemActiveClass) {
                var itemElement = me.option('menuElement').find('.' + itemActiveClass);
                if (itemElement.length === 1) {
                    value = itemElement.attr(
                        me.option('valueAttribute')
                    );
                }
            }

            return value;
        }

    };

    ComboBox.stateUpdater = {
        opened: function (opened) {
            var popup = this.inner('popup');
            if (opened) {
                popup.open();
            }
            else {
                popup.close();
            }
        }
    };


    return ComboBox;

});

/**
 * file 表单组件的通用逻辑
 * @author musicode
 */
define('cc/form/common',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * form/ 下的通用逻辑，比如
     *
     * 1. 检测是否包含 name attribute
     * 2. 检测是否包含一个原生表单元素
     * 3. 同步变化到原生表单元素
     */

    exports.prop = function (instance, name, value) {

        if ($.isPlainObject(name)) {
            $.each(
                name,
                function (name, value) {
                    exports.prop(instance, name, value);
                }
            );
        }
        else {

            var nativeElement = instance.inner('native');

            if (arguments.length === 2) {
                return nativeElement.prop(name);
            }
            else {
                // 为了避免光标跳动，如果相同就不要赋值了
                if (nativeElement.prop(name) !== value) {
                    nativeElement.prop(name, value);
                }
                // 触发 change 事件，便于 mvvm 框架捕获
                if (name === 'value') {
                    nativeElement.trigger('change');
                }
            }
        }

    };

    exports.setClass = function (instance, className, action) {
        var classValue = instance.option(className);
        if (classValue) {
            instance.option('mainElement')[ action + 'Class' ](
                classValue
            );
        }
    };

    exports.findNative = function (instance, selector) {
        var nativeElement = instance.option('mainElement').find(selector);
        if (nativeElement.length === 0) {
            instance.error('form/' + instance.type + ' 必须包含一个 [' + selector + '].');
        }
        return nativeElement.eq(0);
    };

    exports.validateName = function (instance, name) {

        if ($.type(name) !== 'string') {

            name = exports.prop(instance, 'name');

            if (!name || $.type(name) !== 'string') {
                instance.error('name attribute is missing.')
            }

        }

        return name;

    };

    exports.validateValue = function (instance, value) {

        var type = $.type(value);

        if (type === 'number') {
            value = '' + value;
        }
        else if (type !== 'string') {
            value = exports.prop(instance, 'value') || '';
        }

        return value;

    };

});
/**
 * @file 模拟 select
 * @author musicode
 */
define('cc/form/Select',['require','exports','module','../ui/ComboBox','../util/life','./common'],function (require, exports, module) {

    'use strict';

    /**
     * select 和 input 不同
     *
     * 不要在页面写一堆 <select>，然后再替换，这样会产生没必要的开销
     *
     * 使用约定如下：
     *
     * 菜单项 value: data-value="1"
     * 菜单项 text:  date-text="xxx" 或 innerHTML，优先使用 data-text
     *
     */

    var ComboBox = require('../ui/ComboBox');
    var lifeUtil = require('../util/life');
    var common = require('./common');

    /**
     * 下拉菜单
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery=} options.mainElement 主元素，结构必须完整
     *
     * @property {string=} options.name
     * @property {string=} options.value 当前选中的值
     *
     * @property {Array=} options.data 下拉菜单的数据
     *
     * @property {string=} options.buttonSelector 点击触发下拉菜单显示的元素
     * @property {string=} options.labelSelector 按钮上显示文本的元素
     * @property {string=} options.menuSelector 下拉菜单元素
     * @property {string=} options.menuTemplate 下拉菜单模板
     *
     * @property {string=} options.itemActiveClass 菜单项选中状态的 class，可提升用户体验
     * @property {string=} options.menuActiveClass 菜单展开状态的 class
     *
     * @property {string=} options.showMenuTrigger 显示的触发方式
     * @property {number=} options.showMenuDelay 显示延时
     * @property {Function=} options.showMenuAnimation 显示动画
     *
     * @property {string=} options.hideMenuTrigger 隐藏的触发方式
     * @property {number=} options.hideMenuDelay 隐藏延时
     * @property {Function=} options.hideMenuAnimation 隐藏动画
     */
    function Select(options) {
        lifeUtil.init(this, options);
    }

    var proto = Select.prototype;

    proto.type = 'Select';

    proto.init = function () {

        var me = this;

        me.initStruct();

        var mainElement = me.option('mainElement');

        var combobox = new ComboBox({
            mainElement: mainElement,
            data: me.option('data'),
            value: me.option('value'),
            defaultText: me.option('defaultText'),
            buttonElement: mainElement.find(me.option('buttonSelector')),
            menuElement: mainElement.find(me.option('menuSelector')),
            menuTemplate: me.option('menuTemplate'),
            renderSelector: me.option('renderSelector'),
            renderTemplate: me.option('renderTemplate'),
            showMenuTrigger: me.option('showMenuTrigger'),
            showMenuDelay: me.option('showMenuDelay'),
            hideMenuTrigger: me.option('hideMenuTrigger'),
            hideMenuDelay: me.option('hideMenuDelay'),
            itemSelector: me.option('itemSelector'),
            itemActiveClass: me.option('itemActiveClass'),
            menuActiveClass: me.option('menuActiveClass'),
            textAttribute: me.option('textAttribute'),
            valueAttribute: me.option('valueAttribute'),
            showMenuAnimation: function (options) {
                me.execute('showMenuAnimation', options);
            },
            hideMenuAnimation: function (options) {
                me.execute('hideMenuAnimation', options);
            },
            render: function (data, tpl) {
                return me.execute('render', [ data, tpl ]);
            },
            setText: function (options) {
                var labelSelector = me.option('labelSelector');
                mainElement.find(labelSelector).html(options.text);
            }
        });

        me.once('aftersync', function () {

            combobox.option(
                'watchSync',
                {
                    value: function (value) {
                        me.set('value', value);
                    },
                    opened: function (opened) {
                        me.state('opened', opened);
                    }
                }
            );

            combobox.set('value', me.get('value'));
            me.state('opened', combobox.is('opened'));

        });


        var nativeElement = common.findNative(me, 'input[type="hidden"]');

        combobox
        .on('dispatch', function (e, data) {

            var event = e.originalEvent;

            // 模拟 focus/blur，便于表单验证
            switch (event.type) {
                case 'afteropen':
                    nativeElement.trigger('focusin');
                    break;
                case 'afterclose':
                    nativeElement.trigger('focusout');
                    break;
            }

            me.dispatch(
                me.emit(event, data),
                data
            );

        });

        me.inner({
            main: mainElement,
            native: nativeElement,
            combobox: combobox
        });

        me.set({
            data: me.option('data'),
            name: me.option('name'),
            value: me.option('value')
        });

    };


    proto.open = function () {
        this.state('opened', true);
    };

    proto.close = function () {
        this.state('opened', false);
    };

    proto.dispose = function () {
        lifeUtil.dispose(this);
        this.inner('combobox').dispose();
    };

    lifeUtil.extend(proto, [ 'open', 'close' ]);

    Select.propertyUpdater = {

        name: function (name) {
            common.prop(this, 'name', name);
        }

    };

    Select.propertyUpdater.data =
    Select.propertyUpdater.value = function (newValue, oldValue, change) {

        var me = this;

        var properties = { };

        var valueChange = change.value;
        if (valueChange) {
            var value = valueChange.newValue;
            common.prop(me, 'value', value);
            properties.value = value;
        }

        var dataChange = change.data;
        if (dataChange) {
            properties.data = dataChange.newValue;
        }

        me.inner('combobox').set(properties);

        return false;

    };

    Select.propertyValidator = {

        name: function (name) {
            return common.validateName(this, name);
        },

        value: function (value) {
            return common.validateValue(this, value);
        }

    };

    Select.stateUpdater = {
        opened: function (opened) {
            var combobox = this.inner('combobox');
            if (opened) {
                combobox.open();
            }
            else {
                combobox.close();
            }
        }
    };


    return Select;

});

define('cc-config/form/Select',['require','exports','module','cc/form/Select'],function (require, exports, module) {

    'use strict';

    var Select = require('cc/form/Select');

    Select.defaultOptions = {

        buttonSelector: '> .button',
        menuSelector: '> .menu',
        labelSelector: '> .button > .text',

        itemSelector: 'li',
        itemActiveClass: 'active',

        textAttribute: 'data-text',
        valueAttribute: 'data-value',

        defaultText: '- 请选择 -',
        menuActiveClass: 'opened',

        showMenuTrigger: 'click',
        hideMenuTrigger: 'click',
        showMenuAnimation: function (options) {
            options.menuElement.show();
        },
        hideMenuAnimation: function (options) {
            options.menuElement.hide();
        },

        render: function (data) {

            var html = [ ];

            $.each(
                data,
                function (index, item) {

                    var data = [ ];

                    $.each(
                        item,
                        function (key, value) {
                            if (key !== 'text' && value != null) {
                                data.push(
                                    'data-' + key + '="' + value + '"'
                                );
                            }
                        }
                    );

                    var attr = data.join(' ');
                    if (attr) {
                        attr = ' ' + attr;
                    }

                    html.push(
                        '<li class="item"' + attr + '>' + item.text + '</li>'
                    );
                }
            );

            return html.join('');

        }
    };

    return Select;

});
/**
 * @fileOverview 百度分享的指令
 * @author hurry
 *
 * usage:
 *
 * <dropdown></dropdown>
 */

define('common/ngDirective/dropdown/directive',['require','cc-config/form/Select','cc/form/Select'],function (require) {
    'use strict';
    require('cc-config/form/Select');
    var Select = require('cc/form/Select');
    // var Select = require('cobble/form/Select');
    angular.module('Manage.directives')
        .directive('dropdown', ['$rootScope',
            function ($rootScope) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 选项
                     * @param {Object} options
                     * @property {jQuery=} options.element 主元素
                     * @property {string} options.defaultValue 默认选中值
                     * @property {string} options.valName 对应value的名称
                     * @property {string} options.txtName 对应text的名称
                     * @property {string} options.assignedValue 选中的值
                     * @property {Array<Object>} options.dataSource 主元素
                     * @property {string} options.dataSource.value value
                     * @property {string} options.dataSource.text 显示值
                     * @property {function(data)} options.onSelected 显示值
                     * @property {function(data.text)} options.onSelected 显示值
                     * @property {function(data.value)} options.onSelected 显示值
                     */
                    options: '=',
                    /**
                     * 用户自定义数据
                     * @type {String}
                     */
                    userDefData: '@'
                },
                templateUrl: 'app/common/ngDirective/dropdown/tpl.html',
                // replace: true,
                link: function($scope, iElm) {
                    var vm = $scope;
                    var select;
                    vm.defaultText = vm.options && vm.options.defaultText;
                    var defaultOption = {
                        // value: vm.defaultText,
                        mainElement: $(iElm).find('.dropdown'),
                        menuSelector: '.menu',
                        labelSelector: '.selected-value',
                        onselect: function (e) {
                            var target = $(e.target);
                            var value = target.data('value');
                            if (value !== '' && $.isFunction(vm.options.onSelected)) {
                                $rootScope.safeApply(function () {
                                    var data = {
                                        text: target.text(),
                                        value: value
                                    };
                                    vm.options.onSelected(tranDtToUserDt(data), vm.userDefData);
                                    vm.options.assignedValue = value;
                                });
                            }
                            // return false;
                        }
                    };
                    function tranDtToUserDt(dt) {
                        var options = vm.options;
                        var newDt = dt;
                        if (options.valName || options.txtName) {
                            newDt = {};
                            options.valName = options.valName || 'value';
                            options.txtName = options.txtName || 'text';
                            newDt[options.valName] = dt.value;
                            newDt[options.txtName] = dt.text;
                        }
                        return newDt;
                    }
                    function formatArrData() {
                        var options = vm.options;
                        // datasource有值，需要转换
                        if (
                            options.dataSource && options.dataSource.length
                            && (options.valName || options.txtName)
                        ) {
                            var newData = [];
                            options.valName = options.valName || 'value';
                            options.txtName = options.txtName || 'text';
                            $.each(options.dataSource, function (i, v) {
                                newData.push({
                                    text: v[options.txtName],
                                    value: v[options.valName]
                                });
                            });
                            options.data = newData;
                            return;
                        }
                        if (options.dataSource && options.dataSource.length) {
                            options.data = options.dataSource;
                            return;
                        }
                        options.data = getEmpty();
                    }
                    function init() {
                        formatArrData();
                        var opt = $.extend(
                                { value: vm.options.defaultValue },
                                defaultOption,
                                vm.options
                            );
                        // opt.defaultText = opt.defaultText;
                        select = new Select(opt);
                        // if (opt.defaultText) {
                        //     select.setValue(opt.defaultText);
                        // }
                    }

                    function getEmpty() {
                        return [{
                            text: '暂无数据',
                            value: ''
                        }];
                    }
                    // init();
                    function main() {
                        // if (vm.options) {
                        vm.$watch('options.dataSource', function (newVal) {
                            if (newVal && newVal.length) {
                                if (select) {
                                    select.set({
                                        data: newVal
                                    });
                                    return;
                                }
                                init();
                            }
                            else if (vm.options) {
                                if (select) {
                                    select.set({
                                        data: getEmpty()
                                    });
                                    return;
                                }
                                init();
                            }
                        });
                        vm.$watch('options.defaultValue', function (newVal) {
                            if (newVal && select) {
                                select.set({
                                    value: newVal
                                });
                            }
                        });
                        //用户指定选中下拉框的值
                        vm.$watch('options.assignedValue', function (newVal) {
                            if (newVal && select) {
                                select.set({
                                    value: newVal
                                });
                            }
                        });
                        vm.$on('$destroy', function () {
                            if (select) {
                                select.dispose();
                            }
                        });
                        // }
                    }
                    main();
                }
            };
        }]);
});
/**
 * @file Pager
 * @author musicode
 */
define('cc/ui/Pager',['require','exports','module','../function/toNumber','../util/life'],function (require, exports, module) {

    'use strict';

    var toNumber = require('../function/toNumber');
    var lifeUtil = require('../util/life');

    /**
     * 约定翻页开始页码为 1，好处如下：
     *
     * 1. 节省代码
     * 2. 代码清晰易懂（不用加 1 减 1 什么的，这个巨恶心）
     * 3. 符合人类直觉
     *
     * 如果非要翻页为 0，那初始化和刷新时，+ 1 处理吧
     *
     */

    /**
     * 分页
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.mainElement 分页元素，比如 `$('.pagination')`
     * @property {number} options.page 从 `1` 开始计数
     * @property {number} options.count 总页数
     * @property {number} options.showCount 中间显示的页码数量
     * @property {number=} options.startCount 省略号前面的页码数量
     * @property {number=} options.endCount 省略号后面的页码数量
     *
     * @property {boolean=} options.hideOnSingle 当总页数只有一页时，是否自动隐藏组件
     *
     * @property {string=} options.pageSelector 页码元素选择器，如果是静态链接`<a href="xx">`可不传
     * @property {string=} options.pageAttribute 页码取值的属性名称，如果是静态链接`<a href="xx">`可不传
     *
     * @property {string} options.pageTemplate 页码元素模板
     * @property {string=} options.prevTemplate 上一页元素模板
     * @property {string=} options.nextTemplate 下一页元素模板
     * @property {string=} options.ellipsisTemplate 省略号元素模板
     *
     * @property {Function} options.render 渲染方法
     *
     */
    function Pager(options) {
        lifeUtil.init(this, options);
    }

    var proto = Pager.prototype;

    proto.type = 'Pager';

    proto.init = function () {

        var me = this;

        me.initStruct();

        var mainElement = me.option('mainElement');

        var pageSelector = me.option('pageSelector');
        var pageAttribute = me.option('pageAttribute');
        if (pageSelector && pageAttribute) {
            mainElement
            .on(
                'click' + me.namespace(),
                pageSelector,
                function (e) {
                    var page = $(this).attr(pageAttribute);
                    if (page >= FIRST_PAGE) {

                        me.set('page', page);

                        var event = $.Event(e.originalEvent);
                        event.type = 'select';

                        me.dispatch(
                            me.emit(event)
                        );

                    }
                }
            );
        }

        me.inner({
            main: mainElement
        });

        me.set({
            page: me.option('page'),
            count: me.option('count')
        });

    };

    proto.render = function () {

        var me = this;

        var count = me.get('count');

        if (count < 2 && me.option('hideOnSingle')) {
            me.state('hidden', true);
            return;
        }

        var page = Math.min(me.get('page'), count);

        var showCount = me.option('showCount');
        var startCount = me.option('startCount');
        var endCount = me.option('endCount');

        var pageTemplate = me.option('pageTemplate');
        var prevTemplate = me.option('prevTemplate');
        var nextTemplate = me.option('nextTemplate');
        var ellipsisTemplate = me.option('ellipsisTemplate');



        var datasource = [ ];




        // 以当前选中的页码为界，先处理左边的，再处理右边的
        var start = Math.max(FIRST_PAGE, page - Math.ceil(showCount / 2));
        var end = Math.min(count, start + showCount - 1);

        if (end === count && end - start < showCount) {
            start = Math.max(FIRST_PAGE, end - showCount + 1);
        }

        datasource.push({
            range: [ start, end ],
            tpl: pageTemplate
        });

        // startCount
        var offset;

        if (startCount > 0 && start > FIRST_PAGE) {

            offset = start - startCount;

            if (offset > 1) {
                datasource.unshift(
                    {
                        range: [ FIRST_PAGE, startCount ],
                        tpl: pageTemplate
                    },
                    {
                        tpl: ellipsisTemplate
                    }
                );
            }
            else {
                datasource.unshift({
                    range: [ FIRST_PAGE, start - 1 ],
                    tpl: pageTemplate
                });
            }

        }

        if (endCount > 0 && end < count) {

            offset = count - end - endCount;

            if (offset > 1) {
                datasource.push(
                    {
                        tpl: ellipsisTemplate
                    },
                    {
                        range: [ count - endCount + 1, count ],
                        tpl: pageTemplate
                    }
                );
            }
            else {
                datasource.push({
                    range: [ end + 1, count ],
                    tpl: pageTemplate
                });
            }

        }




        // 上一页
        datasource.unshift({
            tpl: prevTemplate
        });

        // 下一页
        datasource.push({
            tpl: nextTemplate
        });



        var html = $.map(
            datasource,
            function (item) {

                var tpl = item.tpl;
                if (!tpl) {
                    return;
                }

                var html = '';

                var data = {
                    first: FIRST_PAGE,
                    last: count,
                    active: page
                };
                var append = function () {
                    html += me.execute(
                        'render',
                        [ data, tpl ]
                    );
                };

                var range = item.range;
                if (range) {
                    for (var i = range[0], end = range[1]; i <= end; i++) {
                        data.page = i;
                        append();
                    }
                }
                else {
                    append();
                }

                return html;

            }
        ).join('');

        me.renderWith(html);

        me.state('hidden', false);

    };


    proto.prev = function () {

        this.set(
            'page',
            this.get('page') - 1
        );

    };

    proto._prev = function () {

        if (this.get('page') > FIRST_PAGE) {}
        else {
            return false;
        }

    };


    proto.next = function () {

        this.set(
            'page',
            this.get('page') + 1
        );

    };

    proto._next = function () {

        if (this.get('page') < this.get('count')) {}
        else {
            return false;
        }

    };


    proto.show = function () {
        this.state('hidden', false);
    };

    proto._show = function () {
        if (!this.is('hidden')) {
            return false;
        }
    };


    proto.hide = function () {
        this.state('hidden', true);
    };

    proto._hide = function () {
        if (this.is('hidden')) {
            return false;
        }
    };


    proto.dispose = function () {

        var me = this;

        lifeUtil.dispose(me);

        me.inner('main').off(
            me.namespace()
        );

    };

    lifeUtil.extend(proto);

    Pager.propertyUpdater = { };

    Pager.propertyUpdater.page =
    Pager.propertyUpdater.count = function () {
        this.render();
        return false;
    };

    Pager.propertyValidator = {

        page: function (page) {
            return toNumber(page, 0);
        },

        count: function (count) {
            return toNumber(count, 0);
        }

    };

    Pager.stateUpdater = {

        hidden: function (hidden) {
            this.execute(
                hidden ? 'hideAnimation' : 'showAnimation',
                {
                    mainElement: this.inner('main')
                }
            );
        }

    };

    var FIRST_PAGE = 1;


    return Pager;

});

define('cc-config/ui/Pager',['require','exports','module','cc/ui/Pager','cc/util/etpl'],function (require, exports, module) {

    'use strict';

    var Pager = require('cc/ui/Pager');
    var etpl = require('cc/util/etpl');

    var tplRender = { };

    Pager.defaultOptions = {

        hideOnSingle: true,

        showCount: 6,
        startCount: 1,
        endCount: 2,

        pageAttribute: 'data-page',
        pageSelector: '[data-page]',

        prevTemplate: '<li class="item button'

                    + '<!-- if: ${active} === ${first} -->'
                    +     ' disabled"'
                    + '<!-- else -->'
                    +     '<!-- var: prev = ${active} - 1 -->'
                    +     '"data-page="${prev}"'
                    + '<!-- /if -->'

                    + '>'
                    +     '<i class="icon icon-chevron-left"></i>'
                    + '</li>',

        nextTemplate: '<li class="item button'

                    + '<!-- if: ${active} === ${last} -->'
                    +     ' disabled"'
                    + '<!-- else -->'
                    +     '<!-- var: next = ${active} + 1 -->'
                    +     '" data-page="${next}"'
                    + '<!-- /if -->'

                    + '>'
                    +     '<i class="icon icon-chevron-right"></i>'
                    + '</li>',

        pageTemplate: '<li class="item button'
                    + '<!-- if: ${active} === ${page} -->'
                    +     ' checked'
                    + '<!-- /if -->'
                    + '" data-page="${page}">'
                    +     '${page}'
                    + '</li>',

        ellipsisTemplate: '<li class="item ellipsis">'
                        +     '...'
                        + '</li>',

        render: function (data, tpl) {

            var render = tplRender[ tpl ];
            if (!render) {
                render = tplRender[ tpl ] = etpl.compile(tpl);
            }

            return render(data);

        },

        showAnimation: function (options) {
            options.mainElement.show();
        },

        hideAnimation: function (options) {
            options.mainElement.hide();
        }
    };

    return Pager;

});
/**
 * @file 分页指令
 *
 * @author hurry
 */

define('common/ngDirective/pager/directive',['require','common/config/common','cc-config/ui/Pager','cc/ui/Pager'],function (require) {
    'use strict';
    var config = require('common/config/common');
    require('cc-config/ui/Pager');
    var Pager = require('cc/ui/Pager');
    // var Pager = require('cobble/ui/Pager');

    angular.module('Manage.directives')
        .directive('pager', function () {

            /**
             * 默认每页显示的条数
             * @type {number}
             */
            var DEFAULT_PAGE_SIZE = 20;

            return {
                restrict: 'EA',
                replace: false,
                scope: {
                    totalCount: '=',
                    page: '=',
                    showCount: '@',
                    pageChangeHandler: '&',
                    pageSize: '@'
                },
                templateUrl: 'app/common/ngDirective/pager/tpl.html',
                link: function ($scope, $element) {
                    var vm = $scope;
                    vm.totalCount = vm.totalCount || 1;
                    var showCount = vm.showCount || 5;
                    var page = vm.page || config.DEFAULT_CURRENT_PAGE;
                    var prePageIndex = page;
                    vm.pageSize = vm.pageSize || config.DEFAULT_PAGE_SZIE;
                    var count = Math.ceil(
                            vm.totalCount / vm.pageSize
                    );
                    var pager = new Pager({
                        mainElement: $($element).find('.page-wrapper'),
                        count: count,
                        showCount: showCount,
                        page: page,
                        onselect: function (e) {
                            vm.page = +$(e.target).data('page');
                            if (vm.page !== prePageIndex && $.isFunction(vm.pageChangeHandler)) {
                                vm.pageChangeHandler({
                                    newVal: vm.page,
                                    oldVal: prePageIndex
                                });
                                prePageIndex = vm.page;
                            }
                        },
                        prevTemplate: ''
                            + '<li class="item button icon-angles-left'
                            + '<!-- if: ${active} === ${first} -->'
                            +     ' disabled"'
                            + '<!-- else -->'
                            +     '<!-- var: prev = ${active} - 1 -->'
                            +     '"data-page="${prev}"'
                            + '<!-- /if -->'

                            + '>'
                            +     '<i class="icon icon-chevron-left" data-page="${prev}"></i>'
                            + '</li>',
                        nextTemplate: ''
                            + '<li class="item button icon-angles-right'
                            + '<!-- if: ${active} === ${last} -->'
                            +     ' disabled"'
                            + '<!-- else -->'
                            +     '<!-- var: next = ${active} + 1 -->'
                            +     '" data-page="${next}"'
                            + '<!-- /if -->'

                            + '>'
                            +     '<i class="icon icon-chevron-right" data-page="${next}"></i>'
                            + '</li>'
                    });

                    vm.$watch('totalCount', function (newValue, oldValue) {
                        var pageSize = vm.pageSize || DEFAULT_PAGE_SIZE;
                        if (newValue !== oldValue) {
                            pager.count = Math.ceil(
                                    newValue / pageSize);
                            pager.page = config.DEFAULT_CURRENT_PAGE;
                            // pager.render();
                            pager.set({
                                page: pager.page,
                                count: pager.count
                            });
                        }
                    });
                    //处理 不通过点击分页  换页的情况
                    // vm.$watch('page', function (newValue, oldValue) {
                    //     if (newValue !== oldValue) {
                    //         pager.set({
                    //             page: newValue
                    //         });
                    //     }
                    // });
                }
            };
        }
    );
});
/**
 * @file subjectList
 * @author hurry
 */

define('common/ngDirective/searchInput/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('searchInput', function (){
            // Runs during compile
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {string} options.placeholder placeholder
                     * @params {Function(string)} options.onSearch 选中回调函数
                     */
                    options: '='
                },
                // replace: true,
                templateUrl: 'app/common/ngDirective/searchInput/tpl.html',
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope, iEle) {
                    var vm = $scope;
                    var opts = vm.options;
                    $(iEle).find('.search-input-wrapper .search-form').on('submit', function () {
                        vm.search();
                    });

                    vm.search = function () {
                        if ($.isFunction(opts.onSearch)) {
                            opts.onSearch(vm.searchKey);
                        }
                    };
                }
            };
        });
});

/**
 * @file 科目查询
 * @author hurry
 */

define('common/ngDirective/searchSubject/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('searchSubject', ['ajaxService', '$rootScope', 'utilService', function (ajaxService, $rootScope, utilService) {
            // Runs during compile
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/searchSubject/tpl.html',
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope, iEle) {
                    var vm = $scope;
                    var opts = vm.options;

                    //watch搜索框内容改变
                    $scope.watchSearchKey = function () {
                        var content = $scope.searchKey;
                        //$scope.$watch('searchKey', function (newVal, oldVal) {
                        if (content && content.trim()) {
                            vm.search();
                        }
                        //});
                    };

                    vm.search = function () {
                        ajaxService
                            .send('/api/subject/searchByName', { name: vm.searchKey })
                            .then(function (res) {
                                if (res.data) {
                                    // vm.isShowResult = true;
                                    var list = res.data.list;
                                    vm.searchResult = list;
                                    vm.isShowEmpty = !list;
                                }
                            });
                    };
                    function onSelected() {
                        $('.search-result').on('click', '.third', function (e) {
                            $rootScope.safeApply(function () {
                                if ($.isFunction(opts.onSelected)) {
                                    var target = $(e.target);
                                    var data = target.data();
                                    vm.searchKey = ''
                                        + data.subject1name
                                        + '>'
                                        + data.subject2name
                                        + '>'
                                        + data.subject3name;
                                    opts.onSelected({
                                        1: {
                                            id: data.subject1id,
                                            name: data.subject1name
                                        },
                                        2: {
                                            id: data.subject2id,
                                            name: data.subject2name
                                        },
                                        3: {
                                            id: data.subject3id,
                                            name: data.subject3name
                                        }
                                    });
                                }
                                vm.searchResult = null;
                            });
                            utilService.stopPropagation(e);
                        });
                    }
                    function bindEvent() {
                        onSelected();
                        //watchSearchKey();

                        $(iEle).find('.search-subject-form').on('submit', function () {
                            vm.search();
                        });
                        $(document.body).on('click', function () {
                            $rootScope.safeApply(function () {
                                vm.searchResult = null;
                                vm.isShowEmpty = false;
                            });
                        });
                    }
                    function main() {
                        bindEvent();
                    }
                    main();
                }
            };
        }]);
});

/**
 * @file subjectList
 * @author hurry
 */

define('common/ngDirective/subjectList/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('subjectList', function (){
            // Runs during compile
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Array<Object>} options.dataList 展现数据
                     * @params {string} options.dataList.remarkName
                     * @params {string} options.dataList.id
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     * @params {string} options.onSelected.id
                     * @params {string} options.onSelected.remarkName
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/subjectList/tpl.html',
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope) {
                    var vm = $scope;
                    var opts = vm.options;
                    vm.onSelected = function (event) {
                        var target = $(event.currentTarget);
                        var classNames = target.attr('class');
                        if (classNames.indexOf('item') > -1) {
                            var id = target.data('id');
                            vm.selectedId = id;
                            var remarkName = target.data('remarkName');
                            if ($.isFunction(opts.onSelected)) {
                                opts.onSelected({
                                    id: id,
                                    remarkName: remarkName
                                });
                            }
                            event.stopPropagation();
                        }
                    };
                    vm.$watch('options.dataList', function () {
                        vm.selectedId = null;
                    });
                }
            };
        });
});

/**
 * @file 科目查询
 * @author hurry
 */

define('common/ngDirective/subjectSelector/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('subjectSelector', ['ajaxService', '$rootScope', function (ajaxService, $rootScope) {
            // Runs during compile
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {string} options.subject1Id
                     * @params {string} options.subject2Id
                     * @params {string} options.subject3Id
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/subjectSelector/tpl.html',
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope) {
                    var vm = $scope;
                    var opts = vm.options;
                    function getSubjects(id) {
                        return ajaxService
                            .send('/api/subject/searchByFid', {
                                isHuikejian: opts.isHuikejian,
                                id: id
                            });
                    }
                    // 科目1
                    vm.subject1SearchOptions = {
                        placeholder: '输入类目名称',
                        onSearch: function (searchKey) {
                            $rootScope.safeApply(function () {
                                vm.subject1ListOptions.dataList = search(vm.subject1AllSource, searchKey);
                                vm.subject2ListOptions.dataList = null;
                                vm.subject3ListOptions.dataList = null;
                            });
                        }
                    };
                    vm.subject1ListOptions = {
                        hasChildren: true,
                        onSelected: function (dt) {
                            vm.selectedSubject1Id = dt.id;
                            vm.selectedSubject1Name = dt.remarkName;
                            getSubjects(dt.id).then(function (res) {
                                var data = res.data;
                                vm.subject2AllSource = data;
                                vm.subject2ListOptions.dataList = data;
                                vm.isShowSearchSubject2 = data && data.length;
                                vm.subject3AllSource = null;
                                vm.subject3ListOptions.dataList = null;
                                vm.isShowSearchSubject3 = false;
                            });
                        }
                    };
                    // 科目2
                    vm.subject2SearchOptions = {
                        placeholder: '输入类目名称',
                        onSearch: function (searchKey) {
                            $rootScope.safeApply(function () {
                                vm.subject2ListOptions.dataList = search(vm.subject2AllSource, searchKey);
                                vm.subject3ListOptions.dataList = null;
                            });
                        }
                    };
                    vm.subject2ListOptions = {
                        hasChildren: true,
                        onSelected: function (dt) {
                            vm.selectedSubject2Id = dt.id;
                            vm.selectedSubject2Name = dt.remarkName;
                            getSubjects(dt.id).then(function (res) {
                                var ds = res.data;
                                vm.subject3AllSource = ds;
                                vm.subject3ListOptions.dataList = ds;
                                vm.isShowSearchSubject3 = ds && ds.length;
                            });
                        }
                    };
                    // 科目3
                    vm.subject3SearchOptions = {
                        placeholder: '输入类目名称',
                        onSearch: function (searchKey) {
                            $rootScope.safeApply(function () {
                                vm.subject3ListOptions.dataList = search(vm.subject3AllSource, searchKey);
                            });
                        }
                    };
                    vm.subject3ListOptions = {
                        hasChildren: false,
                        onSelected: function (dt) {
                            vm.selectedSubject3Id = dt.id;
                            vm.selectedSubject3Name = dt.remarkName;
                            if ($.isFunction(opts.onSelected)) {
                                opts.onSelected({
                                    1: {
                                        id: vm.selectedSubject1Id,
                                        name: vm.selectedSubject1Name
                                    },
                                    2: {
                                        id: vm.selectedSubject2Id,
                                        name: vm.selectedSubject2Name
                                    },
                                    3: {
                                        id: vm.selectedSubject3Id,
                                        name: vm.selectedSubject3Name
                                    }
                                });
                            }
                        }
                    };

                    function search(allSource, searchKey) {
                        if (!searchKey) {
                            return allSource;
                        }
                        var source = [];
                        $.each(allSource, function (i, n) {
                            if (n.remarkName.indexOf(searchKey) !== -1) {
                                source.push(n);
                            }
                        });
                        return source;
                    }
                    function main() {
                        getSubjects().then(function (res) {
                            vm.subject1AllSource = res.data;
                            vm.subject1ListOptions.dataList = vm.subject1AllSource;
                        });
                    }
                    main();
                }
            };
        }]);
});

/**
 * @file 没数据提示
 * @author niejianhui
 */

define('common/ngDirective/emptyData/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('emptyData', ['ajaxService', '$rootScope', function (ajaxService, $rootScope) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/emptyData/tpl.html',
                link: function($scope) {
                    var options = $scope.options;
                    $scope.remindText = options.text || '暂无数据';
                }
            };
        }]);
});

/**
 *  umeditor完整配置项
 *  可以在这里配置整个编辑器的特性
 */
/**************************提示********************************
 * 所有被注释的配置项均为UEditor默认值。
 * 修改默认配置请首先确保已经完全明确该参数的真实用途。
 * 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
 * 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
 **************************提示********************************/


(function () {
    /**
     * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
     * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
     * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/umeditor/"这样的路径。
     * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
     * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
     * window.UMEDITOR_HOME_URL = "/xxxx/xxxx/";
     */

    window.UMEDITOR_HOME_URL = '/dep/umeditor/';

    var URL = window.UMEDITOR_HOME_URL || (function(){

        function PathStack() {

            this.documentURL = self.document.URL || self.location.href;

            this.separator = '/';
            this.separatorPattern = /\\|\//g;
            this.currentDir = './';
            this.currentDirPattern = /^[.]\/]/;

            this.path = this.documentURL;
            this.stack = [];

            this.push( this.documentURL );

        }

        PathStack.isParentPath = function( path ){
            return path === '..';
        };

        PathStack.hasProtocol = function( path ){
            return !!PathStack.getProtocol( path );
        };

        PathStack.getProtocol = function( path ){

            var protocol = /^[^:]*:\/*/.exec( path );

            return protocol ? protocol[0] : null;

        };

        PathStack.prototype = {
            push: function( path ){

                this.path = path;

                update.call( this );
                parse.call( this );

                return this;

            },
            getPath: function(){
                return this + "";
            },
            toString: function(){
                return this.protocol + ( this.stack.concat( [''] ) ).join( this.separator );
            }
        };

        function update() {

            var protocol = PathStack.getProtocol( this.path || '' );

            if( protocol ) {

                //根协议
                this.protocol = protocol;

                //local
                this.localSeparator = /\\|\//.exec( this.path.replace( protocol, '' ) )[0];

                this.stack = [];
            } else {
                protocol = /\\|\//.exec( this.path );
                protocol && (this.localSeparator = protocol[0]);
            }

        }

        function parse(){

            var parsedStack = this.path.replace( this.currentDirPattern, '' );

            if( PathStack.hasProtocol( this.path ) ) {
                parsedStack = parsedStack.replace( this.protocol , '');
            }

            parsedStack = parsedStack.split( this.localSeparator );
            parsedStack.length = parsedStack.length - 1;

            for(var i= 0,tempPath,l=parsedStack.length,root = this.stack;i<l;i++){
                tempPath = parsedStack[i];
                if(tempPath){
                    if( PathStack.isParentPath( tempPath ) ) {
                        root.pop();
                    } else {
                        root.push( tempPath );
                    }
                }

            }


        }

        var currentPath = document.getElementsByTagName('script');

        currentPath = currentPath[ currentPath.length -1 ].src;

        return new PathStack().push( currentPath ) + "";


    })();

    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UMEDITOR_CONFIG = {

        //为编辑器实例添加一个路径，这个不能被注释
        UMEDITOR_HOME_URL : URL

        //图片上传配置区
        ,imageUrl:"/api/tcenter/foundation/storage/upload-image"             //图片上传提交地址
        ,imagePath:''                     //图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
        ,imageFieldName:"attachment"                   //图片数据的key,若此处修改，需要在后台对应文件修改对应参数


        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
        ,toolbar:[
            'undo redo | fontfamily fontsize | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
            'insertorderedlist insertunorderedlist | selectall cleardoc' ,
            '| justifyleft justifycenter justifyright justifyjustify |',
            'link unlink | emotion image',
            '| horizontal print preview fullscreen', 'drafts'
        ]

        //语言配置项,默认是zh-cn。有需要的话也可以使用如下这样的方式来自动多语言切换，当然，前提条件是lang文件夹下存在对应的语言文件：
        //lang值也可以通过自动获取 (navigator.language||navigator.browserLanguage ||navigator.userLanguage).toLowerCase()
        //,lang:"zh-cn"     'link unlink | emotion image video',
        //,langPath:URL +"lang/"

        //ie下的链接自动监测
        //,autourldetectinie:false

        //主题配置项,默认是default。有需要的话也可以使用如下这样的方式来自动多主题切换，当然，前提条件是themes文件夹下存在对应的主题文件：
        //现有如下皮肤:default
        //,theme:'default'
        //,themePath:URL +"themes/"



        //针对getAllHtml方法，会在对应的head标签中增加该编码设置。
        //,charset:"utf-8"

        //常用配置项目
        //,isShow : true    //默认显示编辑器

        //,initialContent:'欢迎使用UMEDITOR!'    //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子

        //,initialFrameWidth:500 //初始化编辑器宽度,默认500
        //,initialFrameHeight:500  //初始化编辑器高度,默认500

        //,autoClearinitialContent:true //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了

        //,textarea:'editorValue' // 提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时可以给容器name属性，会将name给定的值最为每个实例的键值，不用每次实例化的时候都设置这个值

        //,focus:false //初始化时，是否让编辑器获得焦点true或false

        //,autoClearEmptyNode : true //getContent时，是否删除空的inlineElement节点（包括嵌套的情况）

        //,fullscreen : false //是否开启初始化时即全屏，默认关闭

        //,readonly : false //编辑器初始化结束后,编辑区域是否是只读的，默认是false

        //,zIndex : 900     //编辑器层级的基数,默认是900

        //如果自定义，最好给p标签如下的行高，要不输入中文时，会有跳动感
        //注意这里添加的样式，最好放在.edui-editor-body .edui-body-container这两个的下边，防止跟页面上css冲突
        //,initialStyle:'.edui-editor-body .edui-body-container p{line-height:1em}'

        //,autoSyncData:true //自动同步编辑器要提交的数据

        //,emotionLocalization:false //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹

        //,allHtmlEnabled:false //提交到后台的数据是否包含整个html字符串

        //fontfamily
        //字体设置
//        ,'fontfamily':[
//              { name: 'songti', val: '宋体,SimSun'},
//          ]

        //fontsize
        //字号
        //,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36]

        //paragraph
        //段落格式 值留空时支持多语言自动识别，若配置，则以配置值为准
        //,'paragraph':{'p':'', 'h1':'', 'h2':'', 'h3':'', 'h4':'', 'h5':'', 'h6':''}

        //undo
        //可以最多回退的次数,默认20
        //,maxUndoCount:20
        //当输入的字符数超过该值时，保存一次现场
        //,maxInputCount:1

        //imageScaleEnabled
        // 是否允许点击文件拖拽改变大小,默认true
        //,imageScaleEnabled:true

        //dropFileEnabled
        // 是否允许拖放图片到编辑区域，上传并插入,默认true
        //,dropFileEnabled:true

        //pasteImageEnabled
        // 是否允许粘贴QQ截屏，上传并插入,默认true
        //,pasteImageEnabled:true,
        ,pastePlain: true

        //autoHeightEnabled
        // 是否自动长高,默认true
        ,autoHeightEnabled:false

        //autoFloatEnabled
        //是否保持toolbar的位置不动,默认true
        ,autoFloatEnabled:false

        //浮动时工具栏距离浏览器顶部的高度，用于某些具有固定头部的页面
        //,topOffset:30

        //填写过滤规则
        //,filterRules: {}
    };
})();

define("umeditor.config", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.UMEDITOR_CONFIG;
    };
}(this)));

/**
 * @fileOverview UMEDITOR的angular directive 封装
 * @author hurry
 */
define('common/ngDirective/umeditor/directive',['require','umeditor.config','umeditor'],function (require) {
    'use strict';
    var UM_CONFIG = require('umeditor.config');

    var UM = require('umeditor');

    angular.module('Manage.directives')
        .directive('umeditor', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
                return {
                    priority: 10,
                    restrict: 'EAC',
                    require: 'ngModel',
                    link: function ($scope, $element, $attrs, ngModel) {
                        var editor;
                        var createEditor = function () {
                            editor = UM.getEditor($attrs.id, UM_CONFIG);
                            editor.options.imageFieldName = 'attachment';
                            editor.options.autoSyncData = false;
                            // umeditor处理照片的hack标志  为了兼容后端返回的数据和富文本本身的处理问题
                            editor.options.isFormatImageHack = true;
                        };

                        //设置富文本编辑器的内容
                        function setEditorContent(value) {
                            var contentValue = value.replace(/white-space\s*:\s*nowrap/g, '');
                            if (editor.isReady) {
                                editor.setContent(contentValue);
                            }
                            else {
                                editor.removeListener('ready');
                                editor.addListener('ready', function () {
                                    editor.setContent(contentValue);
                                });
                            }
                        }

                        ngModel.$render = function () {
                            if (!editor) {
                                createEditor();
                            }

                            if (ngModel.$viewValue) {
                                if (editor.isReady) {
                                    editor.setContent(ngModel.$viewValue.value.replace(/white-space\s*:\s*nowrap/g, ''));
                                }
                                else {
                                    editor.addListener('ready', function () {
                                        editor.setContent(ngModel.$viewValue.value.replace(/white-space\s*:\s*nowrap/g, ''));
                                    });
                                }
                            }

                            editor.addListener('contentchange', function () {
                                ngModel.$viewValue.value = this.getContent().replace(/white-space\s*:\s*nowrap/g, '');
                                ngModel.$viewValue.modifyStatus = 1;
                                $rootScope.safeApply();
                            });
                        };

                        // var renderModel = function () {

                        //     if (!editor) {
                        //         createEditor();
                        //     }

                        //     if (editor.isReady) {
                        //         editor.setContent(ngModel.$viewValue.value.replace(/white-space\s*:\s*nowrap/g, ''));
                        //         //ngModel.$viewValue.textValue = editor.getContentTxt();


                        //     }
                        //     else {
                        //         editor.addListener('ready', function () {
                        //             editor.setContent(ngModel.$viewValue.value.replace(/white-space\s*:\s*nowrap/g, ''));
                        //             //ngModel.$viewValue.textValue = editor.getContentTxt();

                        //         });
                        //     }


                        //     editor.addListener('contentchange', function () {
                        //         ngModel.$viewValue.value = this.getContent().replace(/white-space\s*:\s*nowrap/g, '');
                        //         ngModel.$viewValue.modifyStatus = 1;
                        //         //ngModel.$viewValue.textValue = this.getContentTxt();

                        //         $scope.$apply();
                        //     });
                        // };

                        var tm;

                        var render = function () {

                            if (tm) {
                                $timeout.cancel(tm);
                            }

                            if (!createEditor) {
                                tm = $timeout(
                                    function () {
                                       render();
                                    },
                                    200
                                );
                            }
                            // else {
                            //     renderModel();
                            // }
                        };

                        render();

                        $scope.$on('$destroy', function () {
                            if (editor && editor.container) {
                                editor.removeListener('ready');
                                editor.removeListener('contentchange');
                                editor.destroy();
                                $('#' + $attrs.id).remove();
                                window.UM.clearCache($attrs.id);
                                editor = null;
                            }
                        });

                        $scope.$on('umeditorcontentchange', function (e, value) {
                            setEditorContent(value);
                        });
                    }
                };
            }
        ]);
});

/**
 * @file 左侧滑动锚点导航
 * @author niejianhui
 *
 * usage:
 *
 * <side-nav></side-nav>
 * options.sideMenus 对象数组 [{text: '', boxClass: ''},{}]
 * options.safeDistance  有时候由于某些DOM没加载出来 所以需要减去安全距离  默认不需配置
 * text  子menu对应的文案  boxClass  子menu锚点对应容器的class
 */
define('common/ngDirective/sideNav/directive',[],function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('sideNav', ['$rootScope',  function ($rootScope) {
        return {
            restrict: 'E',
            replace: false,
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/sideNav/tpl.html',
            link: function ($scope, element) {
                var safeDistance = $scope.options.safeDistance || 0;
                var sideNav = element.find('.side-nav');
                var setFixedHeight = sideNav.offset().top;
                // var availHeight = window.screen.availHeight;

                function getOffsetTop(boxClass) {
                    //减去安全距离
                    return $('.' + boxClass).offset().top;
                }

                function initOptions() {
                    $.each($scope.options.sideMenus, function (index, item) {
                        item.active = !index;
                    });
                }

                function initScroll() {
                    var doScroll = function () {
                        var scrollTop = $(window).scrollTop();
                        if (scrollTop > setFixedHeight + safeDistance) {
                            sideNav.css({
                                position: 'fixed',
                                top: '0'
                            });
                            $scope.sideNavFixed = true;
                        }
                        else {
                            sideNav.css({
                                position: '',
                                left: '',
                                top: ''
                            });
                            $scope.sideNavFixed = false;
                        }

                        $.each($scope.options.sideMenus, function (index, item) {

                            var sideMenus = $scope.options.sideMenus;
                            var menuLength = sideMenus.length;
                            if ((index === menuLength - 1 && scrollTop >= getOffsetTop(item.boxClass))
                                || 
                                (index < menuLength - 1
                                && scrollTop >= getOffsetTop(item.boxClass)
                                && scrollTop < getOffsetTop(sideMenus[index + 1].boxClass))
                                ) {

                                $rootScope.safeApply(function () {
                                    item.active = true;
                                });
                            }
                            else {
                                $rootScope.safeApply(function () {
                                    item.active = false;
                                });
                            }
                        });
                        
                        //没滚动到第一个 默认选中第一个
                        var activeCount = 0;
                        $.each($scope.options.sideMenus, function (index, item) {
                            if (item.active) {
                                activeCount++;
                            }
                        });
                        if (!activeCount) {
                            $rootScope.safeApply(function () {
                                $scope.options.sideMenus[0].active = true;
                            });
                        }
                    };

                    $(window).bind('scroll.sideNav', doScroll);
                }

                function initView() {
                    initOptions();
                    initScroll();
                }

                initView();

                $scope.scrollToItem = function (boxClass) {
                    var height = $('.' + boxClass).offset().top;
                    $('html,body').animate({scrollTop: height + 'px'}, 200);
                };
            }
        };
    }]);
});

/**
 * @file 没数据提示
 * @author niejianhui
 */

define('common/ngDirective/loadingStatus/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('loadingStatus', function () {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/loadingStatus/tpl.html',
                link: function() {
                    
                }
            };
        });
});

/**
 * @file 精简版弹出层
 * @author niejianhui
 *
 * usage:
 *
 * <popup></popup>
 * options.layerClass 弹出层的class
 * options.triggerClass 触发元素class
 */
define('common/ngDirective/popup/directive',['require'],function (require) {
    'use strict';
    // var Popup = require('cc/helper/Popup');
    angular.module('Manage.directives')
        .directive('popup', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'EA',
            replace: false,
            scope : {
                options: '='
            },
            link: function ($scope, element) {
                var options = $scope.options;
                var popupLayer = element.find(options.layerClass);
                var popupTrigger = $(options.triggerClass);
                //加个统一类方便处理样式
                popupTrigger.addClass('popup-trigger');
                popupLayer.addClass('popup-layer');
                
                popupTrigger.on('mouseenter', function () {
                    popupLayer.slideDown(200);
                });
                popupTrigger.on('mouseleave', function () {
                    popupLayer.slideUp(200);
                });
            }
        };
    }]);
});

//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
// 组合 jquery.qrcode 和 qrcode，并改为 AMD 方式加载
define('common/Qrcode/qrcode',['require'],function (require) {

function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}

//---------------------------------------------------------------------
// QR8bitByte
//---------------------------------------------------------------------
function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = toUtf8(data);
}

QR8bitByte.prototype = {

    getLength : function(buffer) {
        return this.data.length;
    },

    write : function(buffer) {
        for (var i = 0; i < this.data.length; i++) {
            // not JIS ...
            buffer.put(this.data.charCodeAt(i), 8);
        }
    }
};

//---------------------------------------------------------------------
// QRCode
//---------------------------------------------------------------------

function QRCode(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = new Array();
}

QRCode.prototype = {

    addData : function(data) {
        var newData = new QR8bitByte(data);
        this.dataList.push(newData);
        this.dataCache = null;
    },

    isDark : function(row, col) {
        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
            throw new Error(row + "," + col);
        }
        return this.modules[row][col];
    },

    getModuleCount : function() {
        return this.moduleCount;
    },

    make : function() {
        // Calculate automatically typeNumber if provided is < 1
        if (this.typeNumber < 1 ){
            var typeNumber = 1;
            for (typeNumber = 1; typeNumber < 40; typeNumber++) {
                var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

                var buffer = new QRBitBuffer();
                var totalDataCount = 0;
                for (var i = 0; i < rsBlocks.length; i++) {
                    totalDataCount += rsBlocks[i].dataCount;
                }

                for (var i = 0; i < this.dataList.length; i++) {
                    var data = this.dataList[i];
                    buffer.put(data.mode, 4);
                    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
                    data.write(buffer);
                }
                if (buffer.getLengthInBits() <= totalDataCount * 8)
                    break;
            }
            this.typeNumber = typeNumber;
        }
        this.makeImpl(false, this.getBestMaskPattern() );
    },

    makeImpl : function(test, maskPattern) {

        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = new Array(this.moduleCount);

        for (var row = 0; row < this.moduleCount; row++) {

            this.modules[row] = new Array(this.moduleCount);

            for (var col = 0; col < this.moduleCount; col++) {
                this.modules[row][col] = null;//(col + row) % 3;
            }
        }

        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);

        if (this.typeNumber >= 7) {
            this.setupTypeNumber(test);
        }

        if (this.dataCache == null) {
            this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
        }

        this.mapData(this.dataCache, maskPattern);
    },

    setupPositionProbePattern : function(row, col)  {

        for (var r = -1; r <= 7; r++) {

            if (row + r <= -1 || this.moduleCount <= row + r) continue;

            for (var c = -1; c <= 7; c++) {

                if (col + c <= -1 || this.moduleCount <= col + c) continue;

                if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
                        || (0 <= c && c <= 6 && (r == 0 || r == 6) )
                        || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
                    this.modules[row + r][col + c] = true;
                } else {
                    this.modules[row + r][col + c] = false;
                }
            }
        }
    },

    getBestMaskPattern : function() {

        var minLostPoint = 0;
        var pattern = 0;

        for (var i = 0; i < 8; i++) {

            this.makeImpl(true, i);

            var lostPoint = QRUtil.getLostPoint(this);

            if (i == 0 || minLostPoint >  lostPoint) {
                minLostPoint = lostPoint;
                pattern = i;
            }
        }

        return pattern;
    },

    createMovieClip : function(target_mc, instance_name, depth) {

        var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
        var cs = 1;

        this.make();

        for (var row = 0; row < this.modules.length; row++) {

            var y = row * cs;

            for (var col = 0; col < this.modules[row].length; col++) {

                var x = col * cs;
                var dark = this.modules[row][col];

                if (dark) {
                    qr_mc.beginFill(0, 100);
                    qr_mc.moveTo(x, y);
                    qr_mc.lineTo(x + cs, y);
                    qr_mc.lineTo(x + cs, y + cs);
                    qr_mc.lineTo(x, y + cs);
                    qr_mc.endFill();
                }
            }
        }

        return qr_mc;
    },

    setupTimingPattern : function() {

        for (var r = 8; r < this.moduleCount - 8; r++) {
            if (this.modules[r][6] != null) {
                continue;
            }
            this.modules[r][6] = (r % 2 == 0);
        }

        for (var c = 8; c < this.moduleCount - 8; c++) {
            if (this.modules[6][c] != null) {
                continue;
            }
            this.modules[6][c] = (c % 2 == 0);
        }
    },

    setupPositionAdjustPattern : function() {

        var pos = QRUtil.getPatternPosition(this.typeNumber);

        for (var i = 0; i < pos.length; i++) {

            for (var j = 0; j < pos.length; j++) {

                var row = pos[i];
                var col = pos[j];

                if (this.modules[row][col] != null) {
                    continue;
                }

                for (var r = -2; r <= 2; r++) {

                    for (var c = -2; c <= 2; c++) {

                        if (r == -2 || r == 2 || c == -2 || c == 2
                                || (r == 0 && c == 0) ) {
                            this.modules[row + r][col + c] = true;
                        } else {
                            this.modules[row + r][col + c] = false;
                        }
                    }
                }
            }
        }
    },

    setupTypeNumber : function(test) {

        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

        for (var i = 0; i < 18; i++) {
            var mod = (!test && ( (bits >> i) & 1) == 1);
            this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        }

        for (var i = 0; i < 18; i++) {
            var mod = (!test && ( (bits >> i) & 1) == 1);
            this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
        }
    },

    setupTypeInfo : function(test, maskPattern) {

        var data = (this.errorCorrectLevel << 3) | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);

        // vertical
        for (var i = 0; i < 15; i++) {

            var mod = (!test && ( (bits >> i) & 1) == 1);

            if (i < 6) {
                this.modules[i][8] = mod;
            } else if (i < 8) {
                this.modules[i + 1][8] = mod;
            } else {
                this.modules[this.moduleCount - 15 + i][8] = mod;
            }
        }

        // horizontal
        for (var i = 0; i < 15; i++) {

            var mod = (!test && ( (bits >> i) & 1) == 1);

            if (i < 8) {
                this.modules[8][this.moduleCount - i - 1] = mod;
            } else if (i < 9) {
                this.modules[8][15 - i - 1 + 1] = mod;
            } else {
                this.modules[8][15 - i - 1] = mod;
            }
        }

        // fixed module
        this.modules[this.moduleCount - 8][8] = (!test);

    },

    mapData : function(data, maskPattern) {

        var inc = -1;
        var row = this.moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;

        for (var col = this.moduleCount - 1; col > 0; col -= 2) {

            if (col == 6) col--;

            while (true) {

                for (var c = 0; c < 2; c++) {

                    if (this.modules[row][col - c] == null) {

                        var dark = false;

                        if (byteIndex < data.length) {
                            dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
                        }

                        var mask = QRUtil.getMask(maskPattern, row, col - c);

                        if (mask) {
                            dark = !dark;
                        }

                        this.modules[row][col - c] = dark;
                        bitIndex--;

                        if (bitIndex == -1) {
                            byteIndex++;
                            bitIndex = 7;
                        }
                    }
                }

                row += inc;

                if (row < 0 || this.moduleCount <= row) {
                    row -= inc;
                    inc = -inc;
                    break;
                }
            }
        }

    }

};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {

    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    var buffer = new QRBitBuffer();

    for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
        data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
        totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. ("
            + buffer.getLengthInBits()
            + ">"
            +  totalDataCount * 8
            + ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
    }

    // padding
    while (true) {

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
        }
        buffer.put(QRCode.PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
        }
        buffer.put(QRCode.PAD1, 8);
    }

    return QRCode.createBytes(buffer, rsBlocks);
}

QRCode.createBytes = function(buffer, rsBlocks) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i++) {
            dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }
        offset += dcCount;

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
            ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
        }

    }

    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
        totalCodeCount += rsBlocks[i].totalCount;
    }

    var data = new Array(totalCodeCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
            if (i < dcdata[r].length) {
                data[index++] = dcdata[r][i];
            }
        }
    }

    for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
            if (i < ecdata[r].length) {
                data[index++] = ecdata[r][i];
            }
        }
    }

    return data;

}

//---------------------------------------------------------------------
// QRMode
//---------------------------------------------------------------------

var QRMode = {
    MODE_NUMBER :       1 << 0,
    MODE_ALPHA_NUM :    1 << 1,
    MODE_8BIT_BYTE :    1 << 2,
    MODE_KANJI :        1 << 3
};

//---------------------------------------------------------------------
// QRErrorCorrectLevel
//---------------------------------------------------------------------

var QRErrorCorrectLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
};

//---------------------------------------------------------------------
// QRMaskPattern
//---------------------------------------------------------------------

var QRMaskPattern = {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
};

//---------------------------------------------------------------------
// QRUtil
//---------------------------------------------------------------------

var QRUtil = {

    PATTERN_POSITION_TABLE : [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)    | (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) );
        }
        return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) );
        }
        return (data << 12) | d;
    },

    getBCHDigit : function(data) {

        var digit = 0;

        while (data != 0) {
            digit++;
            data >>>= 1;
        }

        return digit;
    },

    getPatternPosition : function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {

        switch (maskPattern) {

        case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001 : return i % 2 == 0;
        case QRMaskPattern.PATTERN010 : return j % 3 == 0;
        case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
        case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
        case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;

        default :
            throw new Error("bad maskPattern:" + maskPattern);
        }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

        var a = new QRPolynomial([1], 0);

        for (var i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
        }

        return a;
    },

    getLengthInBits : function(mode, type) {

        if (1 <= type && type < 10) {

            // 1 - 9

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 10;
            case QRMode.MODE_ALPHA_NUM  : return 9;
            case QRMode.MODE_8BIT_BYTE  : return 8;
            case QRMode.MODE_KANJI      : return 8;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 27) {

            // 10 - 26

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 12;
            case QRMode.MODE_ALPHA_NUM  : return 11;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 10;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 41) {

            // 27 - 40

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 14;
            case QRMode.MODE_ALPHA_NUM  : return 13;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 12;
            default :
                throw new Error("mode:" + mode);
            }

        } else {
            throw new Error("type:" + type);
        }
    },

    getLostPoint : function(qrCode) {

        var moduleCount = qrCode.getModuleCount();

        var lostPoint = 0;

        // LEVEL1

        for (var row = 0; row < moduleCount; row++) {

            for (var col = 0; col < moduleCount; col++) {

                var sameCount = 0;
                var dark = qrCode.isDark(row, col);

                for (var r = -1; r <= 1; r++) {

                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }

                    for (var c = -1; c <= 1; c++) {

                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }

                        if (r == 0 && c == 0) {
                            continue;
                        }

                        if (dark == qrCode.isDark(row + r, col + c) ) {
                            sameCount++;
                        }
                    }
                }

                if (sameCount > 5) {
                    lostPoint += (3 + sameCount - 5);
                }
            }
        }

        // LEVEL2

        for (var row = 0; row < moduleCount - 1; row++) {
            for (var col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                if (qrCode.isDark(row,     col    ) ) count++;
                if (qrCode.isDark(row + 1, col    ) ) count++;
                if (qrCode.isDark(row,     col + 1) ) count++;
                if (qrCode.isDark(row + 1, col + 1) ) count++;
                if (count == 0 || count == 4) {
                    lostPoint += 3;
                }
            }
        }

        // LEVEL3

        for (var row = 0; row < moduleCount; row++) {
            for (var col = 0; col < moduleCount - 6; col++) {
                if (qrCode.isDark(row, col)
                        && !qrCode.isDark(row, col + 1)
                        &&  qrCode.isDark(row, col + 2)
                        &&  qrCode.isDark(row, col + 3)
                        &&  qrCode.isDark(row, col + 4)
                        && !qrCode.isDark(row, col + 5)
                        &&  qrCode.isDark(row, col + 6) ) {
                    lostPoint += 40;
                }
            }
        }

        for (var col = 0; col < moduleCount; col++) {
            for (var row = 0; row < moduleCount - 6; row++) {
                if (qrCode.isDark(row, col)
                        && !qrCode.isDark(row + 1, col)
                        &&  qrCode.isDark(row + 2, col)
                        &&  qrCode.isDark(row + 3, col)
                        &&  qrCode.isDark(row + 4, col)
                        && !qrCode.isDark(row + 5, col)
                        &&  qrCode.isDark(row + 6, col) ) {
                    lostPoint += 40;
                }
            }
        }

        // LEVEL4

        var darkCount = 0;

        for (var col = 0; col < moduleCount; col++) {
            for (var row = 0; row < moduleCount; row++) {
                if (qrCode.isDark(row, col) ) {
                    darkCount++;
                }
            }
        }

        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;

        return lostPoint;
    }

};


//---------------------------------------------------------------------
// QRMath
//---------------------------------------------------------------------

var QRMath = {

    glog : function(n) {

        if (n < 1) {
            throw new Error("glog(" + n + ")");
        }

        return QRMath.LOG_TABLE[n];
    },

    gexp : function(n) {

        while (n < 0) {
            n += 255;
        }

        while (n >= 256) {
            n -= 255;
        }

        return QRMath.EXP_TABLE[n];
    },

    EXP_TABLE : new Array(256),

    LOG_TABLE : new Array(256)

};

for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
        ^ QRMath.EXP_TABLE[i - 5]
        ^ QRMath.EXP_TABLE[i - 6]
        ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

//---------------------------------------------------------------------
// QRPolynomial
//---------------------------------------------------------------------

function QRPolynomial(num, shift) {

    if (num.length == undefined) {
        throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
        offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
        this.num[i] = num[i + offset];
    }
}

QRPolynomial.prototype = {

    get : function(index) {
        return this.num[index];
    },

    getLength : function() {
        return this.num.length;
    },

    multiply : function(e) {

        var num = new Array(this.getLength() + e.getLength() - 1);

        for (var i = 0; i < this.getLength(); i++) {
            for (var j = 0; j < e.getLength(); j++) {
                num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
            }
        }

        return new QRPolynomial(num, 0);
    },

    mod : function(e) {

        if (this.getLength() - e.getLength() < 0) {
            return this;
        }

        var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );

        var num = new Array(this.getLength() );

        for (var i = 0; i < this.getLength(); i++) {
            num[i] = this.get(i);
        }

        for (var i = 0; i < e.getLength(); i++) {
            num[i] ^= QRMath.gexp(QRMath.glog(e.get(i) ) + ratio);
        }

        // recursive call
        return new QRPolynomial(num, 0).mod(e);
    }
};

//---------------------------------------------------------------------
// QRRSBlock
//---------------------------------------------------------------------

function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

    // L
    // M
    // Q
    // H

    // 1
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],

    // 2
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],

    // 3
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],

    // 4
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],

    // 5
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],

    // 6
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],

    // 7
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],

    // 8
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],

    // 9
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],

    // 10
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],

    // 11
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],

    // 12
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],

    // 13
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],

    // 14
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],

    // 15
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12],

    // 16
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],

    // 17
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],

    // 18
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],

    // 19
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],

    // 20
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],

    // 21
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],

    // 22
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],

    // 23
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],

    // 24
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],

    // 25
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],

    // 26
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],

    // 27
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],

    // 28
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],

    // 29
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],

    // 30
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],

    // 31
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],

    // 32
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],

    // 33
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],

    // 34
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],

    // 35
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],

    // 36
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],

    // 37
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],

    // 38
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],

    // 39
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],

    // 40
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {

    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }

    var length = rsBlock.length / 3;

    var list = new Array();

    for (var i = 0; i < length; i++) {

        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount  = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j++) {
            list.push(new QRRSBlock(totalCount, dataCount) );
        }
    }

    return list;
}

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

    switch(errorCorrectLevel) {
    case QRErrorCorrectLevel.L :
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
    case QRErrorCorrectLevel.M :
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
    case QRErrorCorrectLevel.Q :
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
    case QRErrorCorrectLevel.H :
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
    default :
        return undefined;
    }
}

//---------------------------------------------------------------------
// QRBitBuffer
//---------------------------------------------------------------------

function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
}

QRBitBuffer.prototype = {

    get : function(index) {
        var bufIndex = Math.floor(index / 8);
        return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    },

    put : function(num, length) {
        for (var i = 0; i < length; i++) {
            this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
        }
    },

    getLengthInBits : function() {
        return this.length;
    },

    putBit : function(bit) {

        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
        }

        if (bit) {
            this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
        }

        this.length++;
    }
};

    return function (options) {

        // if options is string,
        if( typeof options === 'string' ){
            options = { text: options };
        }

        // set default values
        // typeNumber < 1 for automatic calculation
        var canvas = document.createElement('canvas');
        options = $.extend( {}, {
            render      : canvas && canvas.getContext ? "canvas" : "table",
            width       : 256,
            height      : 256,
            typeNumber  : -1,
            correctLevel    : QRErrorCorrectLevel.H,
                        background      : "#ffffff",
                        foreground      : "#000000"
        }, options);

        var createCanvas    = function(){
            // create the qrcode itself
            var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();

            // create canvas element
            var canvas  = document.createElement('canvas');
            canvas.width    = options.width;
            canvas.height   = options.height;
            var ctx     = canvas.getContext('2d');

            // compute tileW/tileH based on options.width/options.height
            var tileW   = options.width  / qrcode.getModuleCount();
            var tileH   = options.height / qrcode.getModuleCount();

            // draw in the canvas
            for( var row = 0; row < qrcode.getModuleCount(); row++ ){
                for( var col = 0; col < qrcode.getModuleCount(); col++ ){
                    ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
                    var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
                    var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
                    ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);
                }
            }
            // return just built canvas
            return canvas;
        }

        // from Jon-Carlos Rivera (https://github.com/imbcmdth)
        var createTable = function(){
            // create the qrcode itself
            var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();

            // create table element
            var $table  = $('<table></table>')
                .css("width", options.width+"px")
                .css("height", options.height+"px")
                .css("border", "0px")
                .css("border-collapse", "collapse")
                .css('background-color', options.background);

            // compute tileS percentage
            var tileW   = options.width / qrcode.getModuleCount();
            var tileH   = options.height / qrcode.getModuleCount();

            // draw in the table
            for(var row = 0; row < qrcode.getModuleCount(); row++ ){
                var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);

                for(var col = 0; col < qrcode.getModuleCount(); col++ ){
                    $('<td></td>')
                        .css('width', tileW+"px")
                        .css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
                        .appendTo($row);
                }
            }
            // return just built canvas
            return $table;
        }

        options.element.each(function(){
            var element = options.render == "canvas" ? createCanvas() : createTable();
            $(element).appendTo(this);
        });
    };

});

/**
 * @file 生成二维码
 * @author niejianhui
 *
 * usage:
 * @options
 * @options.url 生成二维码的链接
 * @options.width 生成二维码的宽度
 * @options.height 生成二维码的高度
 * <qrcode></qrcode>
 */
define('common/ngDirective/qrcode/directive',['require','common/Qrcode/qrcode'],function (require) {
    'use strict';
    var Qrcode = require('common/Qrcode/qrcode');
    angular.module('Manage.directives')
        .directive('qrcode', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'EA',
            replace: false,
            scope : {
                options: '='
            },
            link: function ($scope, element) {
                
                function initView() {
                    var options = $scope.options;
                    var supportCavans = document.createElement('canvas').getContext;
                    var ele = $(element);
                    var qrcode = new Qrcode({
                        element: ele,
                        text: options.url,
                        width: options.width || 80,
                        height:  options.height || 80,
                        render: supportCavans ? 'canvas' : 'table'
                    });
                }

                initView();
            }
        };
    }]);
});

/**
 * @file 网站底部
 * @author niejianhui
 * @options  暂时不需要  保留做扩展用
 * usage
 * <footer></footer>
 */

define('common/ngDirective/footer/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('footer', function () {
            return {
                restrict: 'E',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/footer/tpl.html',
                link: function($scope) {
                    
                }
            };
        });
});

/**
 * @file 网站头部导航
 * @author niejianhui
 * @options  暂时不需要  保留做扩展用
 * usage
 * <site-nav></site-nav>
 */

define('common/ngDirective/siteNav/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('siteNav', ['$rootScope', 'userInfo', 'utilService',
         function ($rootScope, userInfo, utilService) {
            return {
                restrict: 'E',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/siteNav/tpl.html',
                link: function($scope) {
                    //获取用户信息
                    // userInfo()
                    //     .then(function (response) {
                    //         $scope.user = response.data;
                    //     });
                    $scope.user = $rootScope.user;
                    var env = utilService.getEnvName();
                    $scope.logoutUrl = 'http://' + env + '.genshuixue.com/auth/logout?next=/static/login';

                    //平台电话弹窗
                    $scope.showTelephone = function () {
                        utilService.showMessage({
                            skinClass: 'show-telephone-dialog',
                            title: '跟谁学官方客服电话',
                            okBtnText: '好，我知道了',
                            content: ''
                                    + '<div class="phone">'
                                    +       '<i class="icon icon-phone-o"></i>'
                                    +       '<span>4000-910-910</span>'
                                    + '</div>'
                                    + '<div class="text">'
                                    + '无论您是老师、学生还是家长，只要您有问题都可以致电跟谁学，'
                                    + '我们的客服人员将尽快为您解答疑惑~感谢您对跟谁学的支持！'
                                    + '</div>'
                        });
                    };
                }
                
                
            };
        }]);
});

/**
 * @file 网站左导  老师个人中心
 * @author niejianhui
 * @options  暂时不需要  保留做扩展用
 * usage
 * <side-bar></side-bar>
 */

define('common/ngDirective/sideBar/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('sideBar', ['getSideNavAuth', 
        function (getSideNavAuth) {
            return {
                restrict: 'E',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/sideBar/tpl.html',
                link: function($scope) {
                    //获取左导信息
                    getSideNavAuth().then(function (response) {
                        $scope.sidebarConfig = response.data;
                    });
                }
            };
        }]);
});

/**
 * @file 展示当天日期指令
 * @author niejianhui
 * @date 2017/07/31
 */
define('common/ngDirective/todayDate/directive',[],function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('todayDate', ['$interval', function ($interval) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    /**
                     * options 参数配置  支持扩展
                     * options.showFullYear  是否展示年份  默认false
                     * options.showFullDate  是否展示完整日期  默认true
                     * options.showDetailTime 是否展示具体时间 默认true
                     * options.showSeconds 是否展示到秒 默认false
                     * options.showDay        是否展示星期几   默认true
                     */
                    options: '='
                },
                templateUrl: 'app/common/ngDirective/todayDate/tpl.html',
                link: function ($scope) {
                    var defaultOptions = {
                        showFullYear: false,
                        showFullDate: true,
                        showDetailTime: true,
                        showSeconds: false,
                        showDay: true
                    };
                    var opts = $.extend({}, defaultOptions, $scope.options);
                    $scope.opts = opts;

                    var weekDayMap = {
                        '0': '星期日',
                        '1': '星期一',
                        '2': '星期二',
                        '3': '星期三',
                        '4': '星期四',
                        '5': '星期五',
                        '6': '星期六'
                    };

                    function getDatestr(month, day) {
                        if (month < 10) {
                            month = '0' + month;
                        }
                        if (day < 10) {
                            day = '0' + day;
                        }
                        return [month, day].join('-');
                    }

                    function getTimeStr(hours, minutes, seconds, showSeconds) {
                        var arr = [];
                        if (hours < 10) {
                            hours = '0' + hours;
                        }
                        if (minutes < 10) {
                            minutes = '0' + minutes;
                        }
                        if (seconds < 10) {
                            seconds = '0' + seconds;
                        }
                        arr.push(hours);
                        arr.push(minutes);
                        if (showSeconds) {
                             arr.push(seconds);
                        }
                        return arr.join(':');
                    }

                    var intervalTime = 60 * 1000;
                    if (opts.showSeconds) {
                        intervalTime = 1000;
                    }

                    function init() {
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        var hours = date.getHours();
                        var minutes = date.getMinutes();
                        var seconds = date.getSeconds();
                        var weekDay = date.getDay();

                        $scope.dateObj = {
                            fullYear: year,
                            dateStr: getDatestr(month, day),
                            timeStr: getTimeStr(hours, minutes, seconds, opts.showSeconds),
                            weekDayStr: weekDayMap[weekDay]
                        };
                    }
                    
                    init();
                    
                    $interval(function () {
                        init();
                    }, intervalTime);
                }
            };
        }]);
});
/**
 * @file 图片展示  阿里云裁剪
 * @author niejianhui
 * @date 2017/08/01
 */
define('common/ngDirective/cropImage/directive',[],function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('cropImage', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'EA',
            replace: true,
            scope : {
                /**
                 * options.width 图片展示宽度  必选
                 * options.height 图片展示高度  必选
                 * options.imgSrc 图片url   必选
                 * options.cropParams {} 裁剪参数  不传用默认值
                 * options.cropParams.e 缩放优先边 0 长边  1 短边  默认1
                 * 如原图200 * 400（比例1:2），需要缩放为100 * 100（比例1:1）.长边优先时，缩放为50 100；短边优先时(e=1)，缩放为`100 200`
                 * options.cropParams.c 是否进行裁剪  0不裁剪  1裁剪  默认1
                 * options.cropParams.o 是否进行旋转  0不旋转  1先缩略再旋转 2先旋转再缩略 默认0
                 * options.cropParams.Q 决定图片的绝对质量 取值 1-100
                 * 把原图质量压到Q%，如果原图质量小于指定数字，则不压缩。如果原图质量是100%
                 * 如果原图质量是80%，使用“90Q”不会压缩，返回质量80%的原图。
                 * options.cropParams.x 放大倍数 默认1
                 * options.cropParams.i  这个暂时没找到文档  默认0
                 * cropParams一般用默认值就好了
                 */
                options: '=',
                imgUrl: '@'
            },
            templateUrl: 'app/common/ngDirective/cropImage/tpl.html',
            link: function ($scope) {
                var defaultOptions = {
                    cropParams: {
                        e: 1,
                        c: 1,
                        o: 0,
                        Q: 90,
                        x: 1,
                        i: 0
                    }
                };
                var opts = $.extend(true, {}, defaultOptions, $scope.options);

                //是否支持阿里云裁剪
                function isSupportALiYunParams(imgSrc) {
                    return imgSrc.indexOf('gsxservice') !== -1
                           || imgSrc.indexOf('genshuixue') !== -1
                           || imgSrc.indexOf('baijiayun') !== -1;
                }

                $scope.$watch('options', function (newVal, oldVal) {
                    var imgSrc = newVal.imgSrc;
                    if (!isSupportALiYunParams(imgSrc)) {
                        $scope.imgSrc = imgSrc;
                    }
                    else {
                        var arr = imgSrc.split('.');
                        var extendName = arr[arr.length - 1];
                        if (extendName === 'gif') {
                            extendName = 'jpg';
                        }
                        var cropParams = opts.cropParams;
                        $scope.imgSrc = imgSrc
                                    + '@'
                                    + cropParams.e
                                    + 'e_'
                                    + opts.width
                                    + 'w_'
                                    + opts.height
                                    + 'h_'
                                    + cropParams.c
                                    + 'c_'
                                    + cropParams.i
                                    + 'i_'
                                    + cropParams.o
                                    + 'o_'
                                    + cropParams.Q
                                    + 'Q_'
                                    + cropParams.x
                                    + 'x.'
                                    + extendName;
                    }
                }, true);
            }
        };
    }]);
});
/**
 * @file 富文本标题
 * @author niejianhui
 *
 */
define('common/ngDirective/editorComponent/editorTitle/directive',[],function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorTitle', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.placeholder
             * options.maxlength
             * options.text
             */
            scope: {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorTitle/tpl.html',
            link: function ($scope, element) {
                $scope.placeholder = $scope.options.placeholder || '编辑段落标题，最多10个字';
                $scope.maxlength = $scope.options.maxlength || 10;
                var placeholder =  element.find('.placeholder');
                $scope.setInputFocus = function () {
                    element.find('input').focus();
                };

                //监听键盘输入  显示／隐藏placeholder
                element.find('input').on('input propertychange', function (e) {
                    if ($(e.target).val().length) {
                        placeholder.addClass('set-hide');
                    }
                    else {
                        placeholder.removeClass('set-hide');
                    }
                });
            }
        };
    }]);
});

/**
 * @file 富文本正文
 * @author niejianhui
 *
 */
define('common/ngDirective/editorComponent/editorBody/directive',[],function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorBody', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * ptions.placeholder
             * options.text
             * options.fontWeight 'normal' 'bold'
             * options.fontSize  '15px' '17px
             * options.textAlign 'left' 'center'
             * options.color 详见编辑器中的7种颜色 '#000000' 6位RGB色
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorBody/tpl.html',
            link: function ($scope, element) {
                $scope.placeholder = $scope.options.placeholder || '编辑正文';
                var placeholder = element.find('.placeholder');
                //首次进入有文本就下拉
                $scope.originalText = $scope.options.text;
                var $textarea = element.find('textarea');
                var colorClassMap = {
                    '#000000': 'black',
                    '#999999': 'grey',
                    '#FC5C5A': 'pink',
                    '#FF9100': 'yellow',
                    '#0F86E8': 'blue',
                    '#43B244': 'green',
                    '#3D618A': 'brown',
                    '#9900CC': 'purple',
                };
                $scope.colorClassMap = colorClassMap;
                //获得焦点
                $scope.setInputFocus = function () {
                    element.find('textarea').addClass('show').focus();
                };

                //获得焦点时展开
                element.find('textarea')
                    .on('focus', function () {
                        element.find('.style-toolbar').addClass('show');
                    })
                    .on('input propertychange', function (e) {
                        if ($(e.target).val().length) {
                            placeholder.addClass('set-hide');
                        }
                        else {
                            placeholder.removeClass('set-hide');
                        }
                    });

                //变换字体粗细
                $scope.toggleFontWeight = function () {
                    if ($scope.options.fontWeight === 'normal') {
                        $scope.options.fontWeight = 'bold';
                        $textarea.addClass('font-bold');
                    }
                    else {
                        $scope.options.fontWeight = 'normal';
                        $textarea.removeClass('font-bold');
                    }
                };
                //变换字体大小
                $scope.toggleFontSize = function () {
                    if ($scope.options.fontSize === '15px') {
                        $scope.options.fontSize = '17px';
                        $textarea.addClass('font-big');
                    }
                    else {
                        $scope.options.fontSize = '15px';
                        $textarea.removeClass('font-big');
                    }
                };
                //切换左对齐 居中对齐
                $scope.toggleTextAlign = function (type) {
                    if ($scope.options.textAlign !== type) {
                        $scope.options.textAlign = type;
                        if (type === 'center') {
                            $textarea.addClass('align-center');
                        }
                        else {
                            $textarea.removeClass('align-center');
                        }
                    }
                    
                };
                //切换颜色
                $scope.toggleColor = function (color) {
                    if ($scope.options.color !== color) {
                        $textarea.removeClass(colorClassMap[$scope.options.color]);
                        $scope.options.color = color;
                        $textarea.addClass(colorClassMap[color]);
                    }
                };
            }
        };
    }]);
});

/**
 * @file 富文本图片
 * @author niejianhui
 *
 */
define('common/ngDirective/editorComponent/editorPhoto/directive',[],function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorPhoto', ['$rootScope', 'uploaderService', 'utilService', 
        function ($rootScope, uploaderService, utilService) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.storageId 资源存储id
             * options.url   图片地址
             * options.refer_url   图片跳转地址
             * 没有则表示新增项
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorPhoto/tpl.html',
            link: function ($scope) {
                //触发上传状态改变事件
                function emitUploadingEvent(data) {
                    $scope.$emit('uploadingStatusChange', data);
                }

                $scope.imgOptions = {
                    width: 240,
                    height: 136,
                    imgSrc: $scope.options.url
                };
                $scope.uploadImage = function () {
                    $scope.imgUploading = false;
                    var imgUploaderOpt = {
                        type: 'pic',
                        maxSize: 5,
                        data: {}
                    };
                    $scope.imgUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(imgUploaderOpt)
                    .then(function (response) {
                        var res = utilService.JSON.parse(response.responseText);
                        var data = res.data;
                        $scope.options.storageId = data.id;
                        $scope.options.url = data.url;
                        $scope.imgOptions.imgSrc = data.url;
                        $scope.imgUploading = false;
                        emitUploadingEvent(false);
                    }, function (res) {
                        $scope.imgUploading = false;
                        emitUploadingEvent(false);
                        utilService.showMessage(res.message || res.msg);
                    });
                    imgUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.imgUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    imgUploaderOpt.uploader.on('uploadstart', function () {
                        emitUploadingEvent(true);
                        $scope.imgUploading = true;
                    });
                };
            }
        };
    }]);
});

/**
 * @file 富文本视频
 * @author niejianhui
 *
 */
define('common/ngDirective/editorComponent/editorVideo/directive',[],function () {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorVideo', ['$rootScope', 'uploaderService', 'utilService',
        function ($rootScope, uploaderService, utilService) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.videoId 视频ID
             * options.coverUrl   封面图地址
             * 没有则表示新增项
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorVideo/tpl.html',
            link: function ($scope) {
                //触发上传状态改变事件
                function emitUploadingEvent(data) {
                    $scope.$emit('uploadingStatusChange', data);
                }

                $scope.imgOptions = {
                    width: 240,
                    height: 136,
                    imgSrc: $scope.options.coverUrl
                };
                $scope.imgUrl = '';
                $scope.uploadVideo = function () {
                    var videoUploaderOpt = {
                        type: 'commonVideo',
                        maxSize: 250,
                    };
                    $scope.videoUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(videoUploaderOpt)
                    .then(function (res) {
                        // var response = JSON.parse(res.responseText);
                        var videoParams = videoUploaderOpt.uploader.videoParams;
                        $scope.options.videoId = videoParams.id;
                        $scope.options.coverUrl = videoParams.cover;
                        $scope.imgOptions.imgSrc = videoParams.cover;
                        $scope.videoUploading = false;
                        emitUploadingEvent(false);
                    },
                    function (data) {
                        $scope.videoUploading = false;
                        emitUploadingEvent(false);

                        if (data && data.errorType === 'errorBeforeUpload') {
                            // 上传前检测出错误
                        }
                        else {
                            utilService
                            .showMessage({
                                title: '温馨提示',
                                content: '视频上传失败，请重新上传',
                                okBtnText: '确定'
                            });
                        }

                    });
                    videoUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.videoUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    videoUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.videoUploading = true;
                        emitUploadingEvent(true);
                    });
                };
            }
        };
    }]);
});

/**
 * @file 富文本音频
 * @author niejianhui
 *
 */
define('common/ngDirective/editorComponent/editorAudio/directive',['require'],function (require) {
    'use strict';
    angular.module('Manage.directives')
        .directive('editorAudio', ['$rootScope', 'uploaderService', 'utilService',
         function ($rootScope, uploaderService, utilService) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.storageId 资源存储id
             * options.url 音频资源地址
             * 没有则表示新增项
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/editorComponent/editorAudio/tpl.html',
            link: function ($scope, element) {
                //触发上传状态改变事件
                function emitUploadingEvent(data) {
                    $scope.$emit('uploadingStatusChange', data);
                }

                $scope.uploadAudio = function () {
                    $scope.audioUploading = false;
                    var audioUploadParam = {
                        type: 'audio',
                        maxSize: 5,
                        data: {}
                    };
                    $scope.audioUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                        .upload(audioUploadParam)
                        .then(function (response) {
                            var res = utilService.JSON.parse(response.responseText);
                            var data = res.data;
                            $scope.options.storageId = data.id;
                            $scope.options.url = data.url;
                            $scope.audioUploading = false;
                            emitUploadingEvent(false);
                        }, function (res) {
                            $scope.audioUploading = false;
                            emitUploadingEvent(false);
                            utilService.showMessage(res.message || res.msg);
                        });
                    audioUploadParam.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.audioUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    audioUploadParam.uploader.on('uploadstart', function () {
                        emitUploadingEvent(true);
                        $scope.audioUploading = true;
                    });
                };
            }
        };
    }]);
});

/**
 * @file directive引入
 * @author niejianhui
 */
define('common/ngDirective/editorComponent/main',['require','./editorTitle/directive','./editorBody/directive','./editorPhoto/directive','./editorVideo/directive','./editorAudio/directive'],function (require) {
    'use strict';
    require('./editorTitle/directive');
    require('./editorBody/directive');
    require('./editorPhoto/directive');
    require('./editorVideo/directive');
    require('./editorAudio/directive');
});
define('cc-config/helper/Draggable',['require','exports','module','cc/helper/Draggable','cc/util/instance'],function (require, exports, module) {

    'use strict';

    var Draggable = require('cc/helper/Draggable');
    var document = require('cc/util/instance').document;

    Draggable.defaultOptions = {
        dragAnimation: function (options) {
            options.mainElement.css(options.mainStyle);
        },
        init: function (options) {

            var namespace = options.namespace;

            options.mainElement.on(
                'mousedown' + namespace,
                options.mainSelector,
                function (e) {
                    options.downHandler(e);
                    document
                        .off(namespace)
                        .on('mousemove' + namespace, options.moveHandler)
                        .on('mouseup' + namespace, function (e) {
                            options.upHandler(e);
                            document.off(namespace);
                        });
                }
            );

        }
    };

    return Draggable;

});
/**
 * @file 矩形
 * @author musicode
 */
define('cc/util/rect',['require','exports','module'],function (require, exports, module) {

    'use strict';

    /**
     * 元素列表转换为对应的矩形列表
     *
     * @param {jQuery} element
     * @param {jQuery=} relativeContainer
     * @return {Array.<Object>}
     */
    exports.makeRectList = function (element, relativeContainer) {

        var scrollLeft = 0;
        var scrollTop = 0;

        if (relativeContainer) {
            scrollLeft = relativeContainer.scrollLeft();
            scrollTop = relativeContainer.scrollTop();
        }

        return element.map(function () {
            var element = $(this);
            var left;
            var top;
            if (relativeContainer) {
                var position = element.position();
                left = position.left + scrollLeft;
                top = position.top + scrollTop;
            }
            else {
                var offset = element.offset();
                left = offset.left;
                top = offset.top;
            }
            return {
                left: left,
                top: top,
                width: element.outerWidth(),
                height: element.outerHeight()
            };
        });
    };

    /**
     * 获得最大交集的矩形
     *
     * @param {Object} rect
     * @param {Array.<Object>} rectList
     * @return {Array.<Object>}
     */
    exports.sortByIntersectionArea = function (rect, rectList) {

        var areaList = $.map(rectList, function (item, index) {

            // 交集的四角
            var left = Math.max(rect.left, item.left);
            var top = Math.max(rect.top, item.top);
            var right = Math.min(rect.left + rect.width, item.left + item.width);
            var bottom = Math.min(rect.top + rect.height, item.top + item.height);

            // 面积
            var width = right - left;
            var height = bottom - top;

            return {
                index: index,
                area: width > 0 && height > 0
                    ? width * height
                    : 0
            };

        });

        // 降序
        areaList.sort(function (a, b) {
            if (a.area < b.area) {
                return 1;
            }
            else if (a.area > b.area) {
                return -1;
            }
            return 0;
        });

        return areaList;

    };

});
/**
 * @file 预览课程详情 controller
 * @author niejianhui
 * @date 2017/08/18
 */
define('common/ngDirective/richEditor/previewCourseDetailDialog/controller',[],function () {
    'use strict';
    Controller.$inject = ['$scope', 'courseDetail'];
    function Controller($scope, courseDetail) {
        
        function initView () {
            $scope.style = courseDetail.style || 'white';
            $scope.editorList = $.extend(true, {}, courseDetail.editorList);
            $.each($scope.editorList, function (index, item) {
                if (item.type === 'body') {
                    item.options.text = item.options.text.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
                }
            });
        }

        initView();

        $scope.setBgStyle = function (style) {
            $scope.style = style;
            courseDetail.style = style;
        };

        $scope.bodyColorClassMap = {
            '#000000': 'black',
            '#999999': 'grey',
            '#FC5C5A': 'pink',
            '#FF9100': 'yellow',
            '#0F86E8': 'blue',
            '#43B244': 'green',
            '#3D618A': 'brown',
            '#9900CC': 'purple'
        };

    }

    return Controller;
});

/**
 * @file 富文本
 * @author niejianhui
 * @date 2017/08/17
 */
define('common/ngDirective/richEditor/directive',['require','cc-config/helper/Draggable','cc/util/rect','common/ngDirective/richEditor/previewCourseDetailDialog/controller'],function (require) {
    'use strict';
    var Draggable = require('cc-config/helper/Draggable');
    var rectUtil = require('cc/util/rect');

    angular.module('Manage.directives')
        .directive('richEditor', ['utilService', '$timeout', 'dialog', '$rootScope',
        function (utilService, $timeout, dialog, $rootScope) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.style 背景主题
             * options.editorList 富文本列表对象数组 
             * options.editorList[i].type 可以是 title body photo video audio
             * options.editorList[i].options 数组元素具体配置参照对应项的配置参数
             * options.panelList 左侧面板配置 array 如['title', 'body'] 不传默认全部
             * options.notSupportPreview  是否不需要支持预览详情 默认 false(即支持预览)
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/richEditor/tpl.html',
            link: function ($scope, element) {
                $scope.hasUploadingItem = false;
                $scope.$on('uploadingStatusChange', function (e, data) {
                    $scope.hasUploadingItem = data;
                });

                //初始化左侧面板
                var defaultPanelList = ['title', 'body', 'photo', 'video', 'audio'];
                function initPanel() {
                    $scope.panelList = $scope.options.panelList || defaultPanelList;
                    $scope.panelListMap = {
                        'title': '标题',
                        'body': '正文',
                        'photo': '图片',
                        'video': '视频',
                        'audio': '音频',
                    };
                }
                initPanel();
                $scope.notSupportPreview = $scope.options.notSupportPreview || false;

                //滑到刚增加到那项的位置
                function scrollToBottom() {
                    var $editList = element.find('.editor-list')[0];
                    $timeout(function () {
                        $editList.scrollTop = $editList.scrollHeight;
                    }, 30);
                }
                //添加一项插入操作
                function doAddItem(item) {
                    $scope.options.editorList.push(item);
                    scrollToBottom();
                }

                //增加标题
                function addTitle() {
                    var titleItem = {
                        type: 'title',
                        options: {
                            text: ''
                        }
                    };
                    doAddItem(titleItem);
                }
                //增加正文
                function addBody() {
                    var bodyItem = {
                        type: 'body',
                        options: {
                            text: '',
                            fontWeight: 'normal',
                            fontSize: '15px',
                            textAlign: 'left',
                            color: '#000000'
                        }
                    };
                    doAddItem(bodyItem);
                }
                //增加图片
                function addPhoto() {
                    var photoItem = {
                        type: 'photo',
                        options: {
                            storageId: '',
                            url: '',
                            refer_url: ''
                        }
                    };
                    doAddItem(photoItem);
                }
                //增加音频
                function addAudio() {
                    var audioItem = {
                        type: 'audio',
                        options: {
                            storageId: '',
                            url: ''
                        }
                    };
                    doAddItem(audioItem);
                }
                //增加视频
                function addVideo() {
                    var videoItem = {
                        type: 'video',
                        options: {
                            videoId: '',
                            coverUrl: ''
                        }
                    };
                    doAddItem(videoItem);
                }
                //增加一项
                $scope.addItem = function (type) {
                    switch(type) {
                        case 'title':
                            addTitle();
                            break;
                        case 'body':
                            addBody();
                            break;
                        case 'video':
                            addVideo();
                            break;
                        case 'photo':
                            addPhoto();
                            break;
                        case 'audio':
                            addAudio();
                            break;
                    }
                };

                //删除操作
                function doDeleteItem(index) {
                    $scope.options.editorList.splice(index, 1);
                }

                //删除确认弹窗
                function confirmDelete(index) {
                    utilService
                        .showMessage({
                            title: '温馨提示',
                            content: '您确认删除吗？',
                            hideCancel: false,
                            okBtnPosition: 'left',
                            okHandler: function () {
                                doDeleteItem(index);
                            }
                        });
                }

                //删除文本项
                function deleteTextItem(item, index) {
                    if (item.options.text) {
                        confirmDelete(index);
                    }
                    else {
                        doDeleteItem(index);
                    }
                }

                //删除图片或音频项
                function deleteAudioOrPhoto(item, index) {
                    if (item.options.storageId) {
                        confirmDelete(index);
                    }
                    else {
                        doDeleteItem(index);
                    }
                }
                
                //删除视频
                function deleteVideo(item, index) {
                    if (item.options.videoId) {
                        confirmDelete(index);
                    }
                    else {
                        doDeleteItem(index);
                    }
                }
                
                //删除某一项 (删除也可以在每一项里定义 然后emit出来)
                $scope.deleteItem = function (item, index) {
                    switch(item.type) {
                        case 'title':
                        case 'body':
                            deleteTextItem(item, index);
                            break;
                        case 'photo':
                        case 'audio':
                            deleteAudioOrPhoto(item, index);
                            break;
                        case 'video':
                            deleteVideo(item, index);
                            break;
                    }
                };
                $scope.previewCourseDetail = function () {
                    dialog.open({
                        skinClass: 'preview-coursedetail-dialog',
                        width: 780,
                        resolve: {
                            courseDetail: function () {
                                return $scope.options;
                            }
                        },
                        controller: require('common/ngDirective/richEditor/previewCourseDetailDialog/controller'),
                        templateUrl: 'app/common/ngDirective/richEditor/previewCourseDetailDialog/tpl.html'
                    });
                };

                $timeout(function () {
                    //拖动
                    var draggingElement;
    
                    var afterIndex;
                    var beforeIndex;
                    var elementList;
                    var rectList;
                    var containerElement = element.find('.editor-list');
                    
        
                    var activeClass = 'active';
                    var brotherClass = 'brother';
                    var activeParentClass = 'active-parent';
                    var mainSelector = '.editor-box';
    
                    var refreshList = function () {
                        beforeIndex = afterIndex = null;
                        elementList = element.find(mainSelector);
                        rectList = rectUtil.makeRectList(elementList, containerElement);
                    };
                    refreshList();
    
                    var draggable = new Draggable({
                        mainElement: element,
                        mainSelector: mainSelector,
                        containerElement: containerElement,
                        includeSelector: ['.draggable-icon'],
                        draggingClass: 'dragging',
                        onpick: function (e, data) {
                            draggingElement = data.mainElement;
                            draggingElement.addClass(activeClass);
                            draggingElement
                            .width(
                                draggingElement.width()
                            );
    
                            var parentElement = draggingElement.closest('.editor-item');
                            parentElement
                            .addClass(activeParentClass)
                            .height(
                                parentElement.height()
                            );
                            refreshList();
                        },
                        onbeforedrag: function (e, data) {
                            beforeIndex = elementList.index(draggingElement);
                            afterIndex = null;
                        },
                        ondrag: function (e, data) {
                            var rect = {
                                left: data.left,
                                top: data.top,
                                width: rectList[beforeIndex].width,
                                height: rectList[beforeIndex].height
                            };
                            var list = rectUtil.sortByIntersectionArea(rect, rectList);
                            if ($.type(afterIndex) === 'number') {
                                elementList
                                    .eq(afterIndex)
                                    .removeClass(brotherClass);
                            }
        
                            var max = list[0].index !== beforeIndex
                                ? list[0]
                                : list[1];
                            if (max) {
                                var area = rect.width * rect.height;
                                // 随便大于一个阈值就行（比如 0.1）
                                if (area > 0 && max.area / area > 0.1) {
                                    afterIndex = max.index;
                                    elementList
                                        .eq(afterIndex)
                                        .addClass(brotherClass);
                                    return;
                                }
                            }
        
                            afterIndex = null;
                        },
                        onafterdrag: function (e, data) {
                            $rootScope.safeApply(function () {
                                var dragItem = $scope.options.editorList.splice(beforeIndex, 1);
                                $scope.options.editorList.splice(afterIndex, 0, dragItem[0]);
                                refreshList();
                                var staticStyle = {
                                    'position': 'relative',
                                    'top': 0,
                                    'left': 0
                                };
                                elementList.removeClass(brotherClass).css(staticStyle).removeAttr('style');
                            });
                        },
                        ondrop: function (e, data) {
                            draggingElement = data.mainElement;
                            draggingElement.removeClass(activeClass);
                            draggingElement
                            .width(
                                draggingElement.width()
                            );
                            var parentElement = draggingElement.closest('.editor-item');
                            parentElement
                            .removeClass(activeParentClass)
                            .height('');
                        }
                    });
                }, 0);
                
            }   
        };
    }]);
});

/**
 * @file 网站头部导航
 * @author niejianhui
 * usage
 * <language-selector></language-selector>
 */

define('common/ngDirective/languageSelector/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('languageSelector', ['$rootScope', 'utilService',
         function ($rootScope, utilService) {
            return {
                restrict: 'E',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options.defaultValue
                     * @params {Object} options.onSelected
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/languageSelector/tpl.html',
                link: function($scope) {
                    $scope.languageSelectorOptions = {
                        defaultValue: $scope.options.defaultValue,
                        dataSource: [
                            {
                                value: 1,
                                text: '中文_普通话'
                            },
                            {
                                value: 2,
                                text: '中文_方言'
                            },
                            {
                                value: 3,
                                text: '英语'
                            },
                            {
                                value: 4,
                                text: '日语'
                            },
                            {
                                value: 5,
                                text: '法语'
                            },
                            {
                                value: 6,
                                text: '韩语'
                            },
                            {
                                value: 7,
                                text: '德语'
                            },
                            {
                                value: 8,
                                text: '西班牙语'
                            },
                            {
                                value: 9,
                                text: '俄语'
                            },
                            {
                                value: 10,
                                text: '意大利语'
                            },
                            {
                                value: 11,
                                text: '葡萄牙语'
                            }
                        ],
                        onSelected: function (data) {
                            $scope.options.onSelected(data.value);
                        }
                    };
                    $scope.$watch('options.defaultValue', function (newValue) {
                        if (newValue) {
                            $scope.languageSelectorOptions.assignedValue = newValue;
                        }
                    });
                }
                
                
            };
        }]);
});

/**
 * @file 科目选择
 * @author niejianhui
 */

define('common/ngDirective/selectSubject/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('selectSubject', ['ajaxService', '$rootScope', function (ajaxService, $rootScope) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Object} options.subjectId 选中的科目ID
                     * @params {Object} options.subjectName 选中的科目第三级名称
                     * @params {Object} options.pathCrumbs  已选中的科目名称
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/selectSubject/tpl.html',
                link: function($scope) {
                    //阻止事件冒泡
                    $('.select-subject-wrappers').click(function (e) {
                        e.stopPropagation();
                    });
                    //初始化历史科目参数
                    $scope.historySubjectsOpts = {
                        onSelected: $scope.options.onSelected
                    };

                    //初始化三级下拉科目参数
                    $scope.tribbleSubjectOpts = {
                        onSelected: $scope.options.onSelected
                    };

                    //添加watch
                    $scope.$watch('options', function (newVal) {
                        if (newVal.subjectId) {
                            $scope.historySubjectsOpts.subjectId = newVal.subjectId;
                            $scope.tribbleSubjectOpts.subjectId = newVal.subjectId;
                            $scope.tribbleSubjectOpts.subjectName = newVal.subjectName;
                            $scope.tribbleSubjectOpts.pathCrumbs = newVal.pathCrumbs;
                        }
                    }, true);
                }
            };
        }]);
});

/**
 * @file 历史科目选择
 * @author niejianhui
 */

define('common/ngDirective/historySubjects/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('historySubjects', ['ajaxService', '$rootScope', '$timeout', function (ajaxService, $rootScope, $timeout) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Object} options.subjectId  已选中的科目id
                     * @params {Object} options.pathCrumbs  已选中的科目名称
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/historySubjects/tpl.html',
                link: function($scope) {

                    function setItemActive(id) {
                        $.each($scope.historySubjects, function (index, item) {
                            if (item.id === id) {
                                item.active = true;
                            }
                            else {
                                item.active = false;
                            }
                        }); 
                    }

                    
                    //获取历史科目数据 并初始化
                    function initHistorySubjectList() {
                        ajaxService
                            .send('/api/subject/searchHistorySubject', {data:{}, method: 'GET'})
                            .then(function (response) {
                                $scope.historySubjects = response.data;
                                if ($scope.options.subjectId) {
                                    setItemActive($scope.options.subjectId);
                                }
                            });
                    }

                    initHistorySubjectList();

                    //选择历史科目
                    $scope.selectHistorySubject = function (item) {
                        setItemActive(item.id);
                        var data = {
                            id: item.id,
                            pathCrumbs: item.path_crumbs,
                            pathMark: item.path_mark
                            // eventName: 'selectHistorySubject'
                        };
                        $scope.options.onSelected(data);
                    };

                    // //监听选中三级下拉科目
                    // $scope.$on('selectTribbleSubject', function (e, data) {
                    //     setItemActive(data.id);
                    // });

                    //添加watch
                    $scope.$watch('options.subjectId', function (newVal) {
                        if (newVal && $scope.historySubjects) {
                            setItemActive(newVal);
                        }
                    });

                }
            };
        }]);
});

/**
 * @file 三级科目下拉菜单
 * @author niejianhui
 */

define('common/ngDirective/tribbleSubject/directive',[],function () {
    'use strict';

    angular.module('Manage.directives')
        .directive('tribbleSubject', ['ajaxService', '$rootScope', '$timeout', 
            function (ajaxService, $rootScope, $timeout) {
            return {
                restrict: 'EA',
                scope: {
                    /**
                     * 配置信息
                     * @params {Object} options
                     * @params {Object} options.subjectId 选中的科目ID
                     * @params {Object} options.subjectName 选中的科目第三级名称
                     * @params {Object} options.pathCrumbs  已选中的科目名称
                     * @params {Function(Object)} options.onSelected 选中回调函数
                     */
                    options: '='
                },
                replace: true,
                templateUrl: 'app/common/ngDirective/tribbleSubject/tpl.html',
                link: function($scope) {
                    //设置选中态
                    function setSubjectActive(subjectList, id) {
                        $.each(subjectList, function (index, item) {
                            if (item.id === id) {
                                item.active = true;
                            }
                            else {
                                item.active = false;
                            }
                        });
                    }

                    //向后端发送请求获取科目列表promise
                    function getSearchResultPromise(params) {
                        return ajaxService.send('/api/tcenter/subjects/list', {data: params || {}, method: 'GET'});
                    }

                    //根据科目找选中的科目ID 和当前级别所在的索引  方便下次查找
                    function findSubject(subjects, subjectName) {
                        var obj = {};
                        $.each(subjects, function (index, item) {
                            if (item.name === subjectName) {
                                obj.subjectId = item.id;
                                obj.index = index;
                                obj.name = item.name;
                                return false;
                            }
                        });
                        return obj;
                    }

                    //设置选中的三级科目菜单
                    function setTribbleActiveSubject(pathCrumbs, subjectId) {
                        var arr = pathCrumbs.split('>');
                        var level1Obj = findSubject($scope.level1Subjects, arr[0]);
                        if (level1Obj.name) {
                            $scope.level1SubjectName = level1Obj.name;
                            $scope.level1SubjectId = level1Obj.subjectId;
                            setSubjectActive($scope.level1Subjects, level1Obj.subjectId);
    
                            $scope.level2Subjects  = $scope.level1Subjects[level1Obj.index].children;
                            var level2Obj = findSubject($scope.level2Subjects, arr[1]);
                            if (level2Obj.name) {
                                $scope.level2SubjectName = level2Obj.name;
                                $scope.level2SubjectId = level2Obj.subjectId;
                                setSubjectActive($scope.level2Subjects, level2Obj.subjectId);
        
                                $scope.level3Subjects  = $scope.level2Subjects[level2Obj.index].children;
                                $scope.level3SubjectName = $scope.options.subjectName;
                                setSubjectActive($scope.level3Subjects, subjectId);
                            }
                            else {
                                $scope.toLevel3Subject($scope.level2Subjects[0]);
                            }
                        }
                        else {
                            $scope.toLevel2Subject($scope.level1Subjects[0]);
                        }
                    }

                    //获取科目列表并初始化
                    function getSearchResult(searchKey, isFromSearch) {
                        getSearchResultPromise({
                            keyword: searchKey
                        })
                        .then(function (response) {
                            if (response.data.length) {
                                $scope.level1Subjects = response.data;
                                var pathCrumbs = $scope.options.pathCrumbs;
                                if (pathCrumbs) {
                                    setTribbleActiveSubject(pathCrumbs, $scope.options.subjectId);
                                }
                                else if (isFromSearch) {
                                    $scope.toLevel2Subject($scope.level1Subjects[0]);
                                }
                            }
                            else {
                                $scope.level1Subjects = [];
                            }
                        });
                    }

                    //由一级科目ID获取二级科目
                    function getLevel2Subjects(level1SubjectId) {
                        $.each($scope.level1Subjects, function (index, item) {
                            if (item.id === level1SubjectId) {
                                $scope.level2Subjects = item.children;
                                return false;
                            }
                        });
                    }

                     //由二级科目ID获取三级科目
                     function getLevel3Subjects(level2SubjectId) {
                        $.each($scope.level2Subjects, function (index, item) {
                            if (item.id === level2SubjectId) {
                                $scope.level3Subjects = item.children;
                                return false;
                            }
                        });
                        setSubjectActive($scope.level3Subjects, '');
                    }

                    getSearchResult('', false);
                    $scope.searchKey = '';

                    //选一级科目到二级科目 + 三级科目
                    $scope.toLevel2Subject = function (level1Subject) {
                        $scope.level1SubjectName = level1Subject.name;
                        var level1SubjectId =  level1Subject.id;
                        $scope.level1SubjectId = level1SubjectId;
                        setSubjectActive($scope.level1Subjects, level1SubjectId);
                        getLevel2Subjects(level1SubjectId);
                        //默认选中二级第一个到三级
                        var level2SubjectId =  $scope.level2Subjects[0].id;
                        $scope.level2SubjectName = $scope.level2Subjects[0].name;
                        $scope.level2SubjectId = $scope.level2Subjects[0].id;
                        setSubjectActive($scope.level2Subjects, level2SubjectId);
                        getLevel3Subjects(level2SubjectId);
                    };

                    //选二级科目到三级科目
                    $scope.toLevel3Subject = function (level2Subject) {
                        $scope.level2SubjectName = level2Subject.name;
                        var level2SubjectId = level2Subject.id;
                        $scope.level2SubjectId = level2SubjectId;
                        setSubjectActive($scope.level2Subjects, level2SubjectId);
                        getLevel3Subjects(level2SubjectId);
                    };

                    //选完三级科目
                    $scope.finishSelectSubject = function (level3Subject) {
                        $scope.level3SubjectName = level3Subject.name;
                        var level3SubjectId = level3Subject.id;
                        $scope.level3SubjectId = level3SubjectId;
                        setSubjectActive($scope.level3Subjects, level3SubjectId);
                        var arr = [];
                        arr.push($scope.level1SubjectName);
                        arr.push($scope.level2SubjectName);
                        arr.push($scope.level3SubjectName);

                        var idsArr = [];
                        idsArr.push($scope.level1SubjectId);
                        idsArr.push($scope.level2SubjectId);
                        idsArr.push($scope.level3SubjectId);

                        $scope.options.onSelected({
                            id: level3SubjectId,
                            pathCrumbs:  arr.join('>'),
                            pathMark:  idsArr.join(',') + ',' + arr.join(',')
                            // eventName: 'selectTribbleSubject'
                        });
                    };
                    
                    //搜索
                    $scope.doSearch = function () {
                        if ($scope.searchKey) {
                            getSearchResult($scope.searchKey, true);
                            $scope.searchKey = '';
                        }
                    };

                    //搜索全部类目
                    $scope.searchAll = function () {
                        getSearchResult('', true);
                    };

                    // //监听选中历史科目
                    // $scope.$on('selectHistorySubject', function (e, data) {
                    //     setTribbleActiveSubject(data.pathCrumbs, data.id);
                    // });

                    //添加watch
                    $scope.$watch('options.subjectId', function (newVal) {
                        if (newVal && $scope.level1Subjects) {
                            setTribbleActiveSubject($scope.options.pathCrumbs, newVal);
                        }
                    });

                }
            };
        }]);
});

/**
 * @file service引入
 * @author hurry
 */
define('common/ngDirective/main',['require','./module','./backTop/directive','./baiduShare/directive','./daterangepicker/directive','./datetimepicker/directive','./tooltip/directive','./dropdown/directive','./pager/directive','./searchInput/directive','./searchSubject/directive','./subjectList/directive','./subjectSelector/directive','./emptyData/directive','./umeditor/directive','./sideNav/directive','./loadingStatus/directive','./popup/directive','./qrcode/directive','./footer/directive','./siteNav/directive','./sideBar/directive','./todayDate/directive','./cropImage/directive','./editorComponent/main','./richEditor/directive','./languageSelector/directive','./selectSubject/directive','./historySubjects/directive','./tribbleSubject/directive'],function (require) {
    'use strict';
    require('./module');
	require('./backTop/directive');
    require('./baiduShare/directive');
    require('./daterangepicker/directive');
    require('./datetimepicker/directive');
    require('./tooltip/directive');
    require('./dropdown/directive');
    require('./pager/directive');
    require('./searchInput/directive');
    require('./searchSubject/directive');
    require('./subjectList/directive');
    require('./subjectSelector/directive');
    require('./emptyData/directive');
    require('./umeditor/directive');
    require('./sideNav/directive');
    require('./loadingStatus/directive');
    require('./popup/directive');
    require('./qrcode/directive');
    require('./footer/directive');
    require('./siteNav/directive');
    require('./sideBar/directive');
    require('./todayDate/directive');
    require('./cropImage/directive');
    require('./editorComponent/main');
    require('./richEditor/directive');
    require('./languageSelector/directive');
    require('./selectSubject/directive');
    require('./historySubjects/directive');
    require('./tribbleSubject/directive');
});
/**
 * filter的定义
 */
define('common/ngFilter/module',[],function () {
    'use strict';
    
    return angular.module('Manage.filters', ['ngSanitize']);
});

/**
 * @fileOverview  将html字符串转为受信任的html文本
 * @author niejianhui
 */

define('common/ngFilter/trustHtml',['require'],function (require) {

    'use strict';


    angular.module('Manage.filters')
        .filter('trustHtml',
            function ($sce) {
                return function (string) {
                    return $sce.trustAsHtml(string);
                };
            }
        );
});
/**
 * @fileOverview  将url字符串转为受信任的url
 * @author niejianhui
 */

define('common/ngFilter/trustUrl',['require'],function (require) {

    'use strict';


    angular.module('Manage.filters')
        .filter('trustUrl',
            function ($sce) {
                return function (string) {
                    return $sce.trustAsResourceUrl(string);
                };
            }
        );
});
/**
 * @fileOverview filter的引入集合
 */
define('common/ngFilter/main',['require','./module','./trustHtml','./trustUrl'],function (require) {
    'use strict';
    require('./module');
    require('./trustHtml');
    require('./trustUrl');
});

/**
 * @file demo
 * @author hurry
 */

define('module/main/demo/service/services',[],function () {
    'use strict';
    angular
        .module('Manage.demo.service.services', [
            'Manage.services'
        ])
        .factory('demoService', ['ajaxService',
        	function (ajaxService) {
                return {
                	demo1: function (params) {
		                return ajaxService.send('demo/demo/index.do', params || {});
	                }
                };
            }
        ]);
});
/**
 * @file 日期
 * @author hurry
 */
define('module/main/demo/service/ajaxService/index',[],function () {
    'use strict';
    function Controller($scope, demoService) {
        var vm = $scope;
        
        function init() {
            demoService
                .demo1()
                .then(function (res) {
                    console.log(res.data);
                    vm.data = res.data;
                });
        }
        init();
    }

    Controller.$inject = [
        '$scope', 'demoService'
    ];
    return Controller;
});

/**
 * @file 找回密码 controller
 * @author yanlingling
 */
define('module/main/demo/service/dialog/dialog/controller',[],function () {
    'use strict';
    function Controller($scope) {
        var wrapper = $('.demo-dialog-wrapper');
        /**
         * 去绑定
         */
        $scope.bindHandler = function () {
            console.log(wrapper);
            $scope.dialog.close();
        };
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});

/**
 * @file dialog
 * @author hurry
 */
define('module/main/demo/service/dialog/controller',['require','./dialog/controller'],function (require) {
    'use strict';
    function Controller($scope, dialog) {
        dialog.open({
            title: '获取语音验证码<span style="margin-left:5px;color:#acacac;font-size:10px;">hello world!</span>',
            controller: require('./dialog/controller'),
            width: 370,
            templateUrl: 'app/module/main/demo/service/dialog/dialog/tpl.html',
        });
    }

    Controller.$inject = [
        '$scope', 'dialog'
    ];
    return Controller;
});

/**
 * @file 日期
 * @author hurry
 */
define('module/main/demo/service/alert/controller',[],function () {
    'use strict';
    function Controller($scope, utilService) {
        var vm = $scope;
        vm.name = 'hurry';
        function init() {
            utilService
                .showMessage('test')
                .then(function (res) {
                    // ok
                    console.log(res);
                }, function (res) {
                    // cancel or close
                    console.log(res);
                });
        }
        init();
    }

    Controller.$inject = [
        '$scope', 'utilService'
    ];
    return Controller;
});

/**
 * @file 日期
 * @author hurry
 */
define('module/main/demo/service/confirm/controller',[],function () {
    'use strict';
    function Controller($scope, utilService) {
        var vm = $scope;
        vm.name = 'hurry';
        function init() {
            utilService
                .showMessage({
                    title: '错误提示',
                    content: '<div style="color:red">hello world</div>',
                    okBtnText: 'hi',
                    cancelBtnText: 'hurry',
                    hideCancel: false,
                    okHandler: function () {
                        return false;
                    },
                    cancelHandler: function () {
                        return false;
                    }
                })
                .then(function (res) {
                    // ok
                    console.log(res);
                }, function (res) {
                    // cancel or close
                    console.log(res);
                });
        }
        init();
    }

    Controller.$inject = [
        '$scope', 'utilService'
    ];
    return Controller;
});

/**
 * @file dialog
 * @author hurry
 */
define('module/main/demo/service/uploader/controller',[],function () {
    'use strict';
    function Controller($scope, uploaderService) {
        var vm = $scope;
        vm.upload = function () {
            uploaderService.upload({
                type: 'pic'
            });
        };
    }

    Controller.$inject = [
        '$scope', 'uploaderService'
    ];
    return Controller;
});

/**
 * @file dialog
 * @author hurry
 */
define('module/main/demo/service/tips/controller',[],function () {
    'use strict';
    function Controller($scope, tipsService) {
        // var vm = $scope;
        // tipsService.show({
        //     element: '.container',
        //     content: 'hello world!'
        // });
        // $timeout(function () {
            tipsService.show('hi, hurry!');
        // }, 2000);
    }

    Controller.$inject = [
        '$scope', 'tipsService'
    ];
    return Controller;
});

/**
 * @file dialog
 * @author hurry
 */
define('module/main/demo/service/utilService/controller',[],function () {
    'use strict';
    function Controller($scope, utilService) {
        var vm = $scope;
        var subjects = {
            1: {
                id: 1,
                name: 'hurry'
            },
            2: {
                id: 2,
                name: 'hello'
            },
            3: {
                id: 3,
                name: 'world'
            }
        };
        var str = utilService.JSON.stringify(subjects);
        console.log(str);
        vm.subjects = utilService.JSON.parse(str);
    }

    Controller.$inject = [
        '$scope', 'utilService'
    ];
    return Controller;
});

/**
 * @file demo
 * @author hurry
 */

define('module/main/demo/service/app',['require','./services','./ajaxService/index','./dialog/controller','./alert/controller','./confirm/controller','./uploader/controller','./tips/controller','./utilService/controller'],function (require) {
    'use strict';
    require('./services');
    // require('./controllers');
    angular.module('Manage.demo.services', [
            'ui.router',
            'Manage.demo.service.services'
            // 'Manage.demo.service.controllers'
        ])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.demo.services', {
                        url: '/services',
                        abstract: true,
                        controller: function () {},
                        template: '<div ui-view></div>'
                    })
                    .state('Manage.demo.services.ajax', {
                        url: '/ajax',
                        controller: require('./ajaxService/index'),
                        templateUrl: 'app/module/main/demo/service/ajaxService/tpl.html'
                    })
                    .state('Manage.demo.services.dialog', {
                        url: '/dialog',
                        controller: require('./dialog/controller'),
                        templateUrl: 'app/module/main/demo/service/dialog/tpl.html'
                    })
                    .state('Manage.demo.services.alert', {
                        url: '/alert',
                        controller: require('./alert/controller'),
                        template: '<div></div>'
                    })
                    .state('Manage.demo.services.confirm', {
                        url: '/confirm',
                        controller: require('./confirm/controller'),
                        template: '<div></div>'
                    })
                    .state('Manage.demo.services.uploader', {
                        url: '/uploader',
                        controller: require('./uploader/controller'),
                        templateUrl: 'app/module/main/demo/service/uploader/tpl.html'
                    })
                    .state('Manage.demo.services.tips', {
                        url: '/tips',
                        controller: require('./tips/controller'),
                        templateUrl: 'app/module/main/demo/service/tips/tpl.html'
                    })
                    .state('Manage.demo.services.utilService', {
                        url: '/utilService',
                        controller: require('./utilService/controller'),
                        templateUrl: 'app/module/main/demo/service/utilService/tpl.html'
                    });
            }
        ]);

});
/**
 * @file 日期
 * @author hurry
 */
define('module/main/demo/filters/trustUrl/controller',[],function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        function init() {
            vm.testUrl = 'http://img4.duitang.com/uploads/item/201611/03/20161103224830_YGisc.thumb.700_0.jpeg';
        }
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});

/**
 * @file demo
 * @author hurry
 */

define('module/main/demo/filters/app',['require','./trustUrl/controller'],function (require) {
    'use strict';

    angular.module('Manage.demo.filters', [
            'ui.router',
            'Manage.filters'
        ])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.demo.filters', {
                        url: '/filters',
                        abstract: true,
                        controller: function () {},
                        template: '<div ui-view></div>'
                    })
                    .state('Manage.demo.filters.trustUrl', {
                        url: '/trustUrl',
                        controller: require('./trustUrl/controller'),
                        templateUrl: 'app/module/main/demo/filters/trustUrl/tpl.html'
                    });
            }
        ]);

});
/**
 * @file 找回密码 controller
 * @author hurry
 */
define('module/main/demo/directive/pager/controller',[],function () {
    'use strict';
    function Controller($scope, $timeout) {
        var vm = $scope;
        function init() {
            vm.totalCount = 200;
            vm.currentPage = 1;
            vm.pageSize = 20;
            vm.changePage = function (newVal, oldVal) {
                console.log(newVal);
                console.log(oldVal);
            };

            $timeout(function () {
                vm.totalCount = Math.ceil(Math.random() * 200);
            }, 2000);
        }
        init();
    }

    Controller.$inject = [
        '$scope', '$timeout'
    ];
    return Controller;
});

/**
 * @file 日期
 * @author hurry
 */
define('module/main/demo/directive/datetimepicker/controller',[],function () {
    'use strict';
    function Controller($scope, $timeout) {
        var vm = $scope;

        function init() {
            vm.selectedDate1 = '2011-11-11';
            vm.options1 = {
                selectedDate: '2011-1-2',
                selectableBegin: '2011-1-1',
                selectableEnd: new Date(),
                onDateSelect: function () {}
            };

            vm.$watch('selectedDate1', function (newVal) {
                console.log(newVal);
            });
            
            $timeout(function () {
                vm.selectedDate2 = '2011-11-11';
                vm.options2 = {
                    // isDefaultSelected: false,
                    selectableBegin: '1985-1-1',
                    selectableEnd: '2020-11-11',
                    onDateSelect: function () {}
                };
            }, 1000);
        }
        init();
    }

    Controller.$inject = [
        '$scope', '$timeout'
    ];
    return Controller;
});

/**
 * @file 日期
 * @author hurry
 */
define('module/main/demo/directive/daterangepicker/controller',[],function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        
        function init() {
            vm.selectedDate1 = {};
            vm.options1 = {
                isDefaultSelected: false,
                selectableBegin: '2011-1-1',
                selectableEnd: new Date(),
                onDateSelect: function () {}
            };

            vm.$watch('selectedDate1', function (newVal) {
                console.log(newVal);
            });
            // vm.selectedDate2 = {
            //     begin: new Date('2011-1-11').getTime(),
            //     end: new Date('2016-1-11').getTime()
            // };
            // vm.options2 = {
            //     isDefaultSelected: false,
            //     selectableBegin: '1985-1-1',
            //     selectableEnd: new Date(),
            //     onDateSelect: function () {}
            // };
        }
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});

/**
 * @file 找回密码 controller
 * @author hurry
 */
define('module/main/demo/directive/dropdown/controller',[],function () {
    'use strict';
    function Controller($scope, $timeout) {
        var vm = $scope;
        
        $timeout(function () {
            vm.options = {
                // defaultValue: 1,
                onSelected: function (data) {
                    console.log(data);
                }
            };
            vm.options.defaultValue = 2;
            vm.options.dataSource = [
                {
                    text: 'hello',
                    value: 1
                },
                {
                    text: 'world',
                    value: 2
                }
            ];
        }, 1000);

        $timeout(function () {
            vm.options.dataSource = [];
        }, 2000);
    }

    Controller.$inject = [
        '$scope', '$timeout'
    ];
    return Controller;
});

/**
 * @file 找回密码 controller
 * @author hurry
 */
define('module/main/demo/directive/searchSubject/controller',[],function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        
        function init() {
            vm.options = {
                onSelected: function () {
                    
                }
            };
        }
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});

/**
 * @file 日期
 * @author hurry
 */
define('module/main/demo/directive/tooltip/controller',[],function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        function init() {
            vm.options = {
                position: 'bottom',
                content: 'hello world'
            };
        }
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});

/**
 * @file 日期
 * @author hurry
 */
define('module/main/demo/directive/umeditor/controller',[],function () {
    'use strict';
    function Controller($scope) {
        var vm = $scope;
        function init() {
            vm.editor = {
                value: ''
            };
        }
        vm.$watch('editor', function (newVal) {
            console.log(newVal);
        });
        init();
    }

    Controller.$inject = [
        '$scope'
    ];
    return Controller;
});

/**
 * @file demo
 * @author hurry
 */

define('module/main/demo/directive/app',['require','./pager/controller','./datetimepicker/controller','./daterangepicker/controller','./dropdown/controller','./searchSubject/controller','./tooltip/controller','./umeditor/controller'],function (require) {
    'use strict';

    angular.module('Manage.demo.directives', [
            'ui.router',
            'Manage.directives'
        ])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.demo.directives', {
                        url: '/directive',
                        abstract: true,
                        controller: function () {},
                        template: '<div ui-view></div>'
                    })
                    .state('Manage.demo.directives.pager', {
                        url: '/pager',
                        controller: require('./pager/controller'),
                        templateUrl: 'app/module/main/demo/directive/pager/tpl.html'
                    })
                    .state('Manage.demo.directives.datetimepicker', {
                        url: '/datetimepicker',
                        controller: require('./datetimepicker/controller'),
                        templateUrl: 'app/module/main/demo/directive/datetimepicker/tpl.html'
                    })
                    .state('Manage.demo.directives.daterangepicker', {
                        url: '/daterangepicker',
                        controller: require('./daterangepicker/controller'),
                        templateUrl: 'app/module/main/demo/directive/daterangepicker/tpl.html'
                    })
                    .state('Manage.demo.directives.dropdown', {
                        url: '/dropdown',
                        controller: require('./dropdown/controller'),
                        templateUrl: 'app/module/main/demo/directive/dropdown/tpl.html'
                    })
                    .state('Manage.demo.directives.searchSubject', {
                        url: '/searchSubject',
                        controller: require('./searchSubject/controller'),
                        templateUrl: 'app/module/main/demo/directive/searchSubject/tpl.html'
                    })
                    .state('Manage.demo.directives.tooltip', {
                        url: '/tooltip',
                        controller: require('./tooltip/controller'),
                        templateUrl: 'app/module/main/demo/directive/tooltip/tpl.html'
                    })
                    .state('Manage.demo.directives.umeditor', {
                        url: '/umeditor',
                        controller: require('./umeditor/controller'),
                        templateUrl: 'app/module/main/demo/directive/umeditor/tpl.html'
                    });
            }
        ]);

});
/**
 * @file demo
 * @author hurry
 */

define('module/main/demo/app',['require','./service/app','./filters/app','./directive/app'],function (require) {
    'use strict';

    require('./service/app');
    require('./filters/app');
    require('./directive/app');

    angular.module('Manage.demo', [
            'ui.router',
            'Manage.demo.services',
            'Manage.demo.filters',
            'Manage.demo.directives'
        ])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.demo', {
                        url: 'demo',
                        abstract: true,
                        controller: function () {},
                        template: '<div ui-view></div>'
                    });
                    // .state('Manage.demo2', {
                    //     url: 'demo2',
                    //     controller: 'demo2',
                    //     templateUrl: 'app/module/main/demo/demo2/tpl.html'
                    // })
                    // .state('Manage.pager', {
                    //     url: 'pager',
                    //     controller: require('./pager/controller'),
                    //     templateUrl: 'app/module/main/demo/pager/tpl.html'
                    // })
                    // .state('Manage.datetimepicker', {
                    //     url: 'datetimepicker',
                    //     controller: require('./datetimepicker/controller'),
                    //     templateUrl: 'app/module/main/demo/datetimepicker/tpl.html'
                    // });
            }
        ]);

});
/**
 * @file storageSpace
 * @author niejianhui
 */

define('module/main/storageSpace/services',[],function () {
    'use strict';
    angular.module('Manage.storageSpace.services', ['Manage.services'])
        .factory('storageSpaceService', ['ajaxService',
            function (ajaxService) {
                return {
                    //获取用户信息
                    getUserInfo: function (params) {
                        return ajaxService.send('/api/user/basicInfo', params || {});
                    },
                    //获取用户存储空间信息
                    getManageInfo: function (params) {
                        return ajaxService.send('/api/storage/usage', params || {});
                    },
                    //获取存储空间商品列表
                    getProductList: function (params) {
                        return ajaxService.send('/api/goods/list', params || {});
                    },
                    //创建订单
                    createOrder: function (params) {
                        return ajaxService.send('/api/payment/create-order', params || {});
                    },
                    //获取购买历史纪录
                    gitHistoryRecord: function (params) {
                        return ajaxService.send('/api/payment/history', params || {});
                    }
                };
            }
        ]);
});
/**
 * 配置文件
 * @author  niejianhui
 */
define('module/main/storageSpace/config',[],function() {
    'use strict';
    return {
        /**
         * 会员状态类映射map
         * @type {Object}
         */
        VIP_STATUS_MAP: {
            '0': 'novip',
            '1': 'vip',
            '2': 'highvip',
            '3': 'supervip',
        }
    };
});
/**
 * @file storageSpace
 * @author niejianhui
 */
define('module/main/storageSpace/controller',['require','./services','./config','cc/function/divide'],function (require) {
    'use strict';
    require('./services');
    var selfConfig = require('./config');
    var divide = require('cc/function/divide');

    
    angular.module('Manage.storageSpace.controller', [
            'Manage.services',
            'Manage.storageSpace.services'
        ])
        .controller('ManageSpaceCtrl', ['$scope', 'storageSpaceService', '$window', '$sce', 'utilService',
            function ($scope, storageSpaceService, $window, $sce, utilService) {

                function initView() {
                    $scope.showPurchase = true;
                    $scope.selectedIndex = 0;
                    $scope.payMoney = null;
                    $scope.vipStatusMap = selfConfig.VIP_STATUS_MAP;

                    storageSpaceService
                        .getUserInfo()
                        .then(function (response) {
                            $scope.vipLevel = response.data.vip_level;
                        });

                    storageSpaceService
                        .getManageInfo()
                        .then(function (response) {
                            $scope.totalSpace = utilService.formatFileSize(response.data.max_size);
                            $scope.usedSpace = utilService.formatFileSize(response.data.used_size);
                        });

                    storageSpaceService
                        .getProductList()
                        .then(function (response) {
                            $scope.beginDate = response.data.begin_date;
                            $scope.endDate = response.data.end_date;
                            $scope.productList = response.data.goods;
                        });

                    storageSpaceService
                        .gitHistoryRecord()
                        .then(function (response) {
                            $scope.historyRecords = response.data;
                        });
                }

                initView();

                $scope.buy = function (product) {
                    $scope.showPurchase = true;
                    $scope.selectedId = product.id;
                    $scope.payMoney = product.price_list[$scope.vipLevel].price;
                };

                $scope.select = function (product) {
                    $scope.selectSpace = true;
                    $scope.selectedId = product.id;
                    $scope.payMoney = product.price_list[$scope.vipLevel].price;
                };

                $scope.confirmBuy = function () {
                    storageSpaceService
                        .createOrder({
                            good_id: $scope.selectedId
                        })
                        .then(function (response) {
                            var jumpUrl = 'api/middleware/redirect?redirect=';
                            jumpUrl += encodeURIComponent(response.data.redirect);
                            $window.open($sce.trustAsResourceUrl(jumpUrl));
                        });
                };
                $scope.jumpVipCenter = function () {

                    var currentUrl = location.href;
                    var url = '';

                    if (currentUrl.indexOf('ctest') > 0) {
                       url += 'test.genshuixue.com';
                    }
                    else if (currentUrl.indexOf('beta') > 0) {
                        url += 'beta.genshuixue.com';
                    }
                    else {
                        url += 'www.genshuixue.com';
                    }

                    url = 'http://' + url + '/teacher_center/vip_center';
                    $window.open($sce.trustAsResourceUrl(url));
                };

                $scope.goBack = function (product) {
                    $scope.showPurchase = true;
                };
            }
        ]);
});
/**
 * @file storageSpace
 * @author niejianhui
 */

define('module/main/storageSpace/app',['require','./controller'],function (require) {
    'use strict';
    require('./controller');

    angular.module('Manage.storageSpace', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.storageSpace.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.storageSpace', {
                        url: 'storageSpace',
                        controller: 'ManageSpaceCtrl',
                        templateUrl: 'app/module/main/storageSpace/tpl.html'
                    });
            }
        ]);

});
/**
 * @file paySuccess
 * @author niejianhui
 */
define('module/main/paySuccess/controller',['require'],function (require) {
    'use strict';
    
    angular.module('Manage.paySuccess.controller', [
            'Manage.services'
        ])
        .controller('PaySuccessCtrl', ['$scope', '$window', '$sce',
            function ($scope, $window, $sce) {

                $scope.jumpNetdisk = function () {

                    var currentUrl = location.href;
                    var url = '';

                    if (currentUrl.indexOf('test') > 0) {
                       url += 'test-ziliao.genshuixue.com';
                    }
                    else if (currentUrl.indexOf('beta') > 0) {
                        url += 'beta-ziao.genshuixue.com';
                    }
                    else {
                        url += 'ziliao.genshuixue.com';
                    }

                    url = 'http://' + url + '/main.html#/uploadFile';
                    $window.open($sce.trustAsResourceUrl(url));
                };
            }
        ]);
});
/**
 * @file paySuccess
 * @author niejianhui
 */

define('module/main/paySuccess/app',['require','./controller'],function (require) {
    'use strict';
    require('./controller');

    angular.module('Manage.paySuccess', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.paySuccess.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.paySuccess', {
                        url: 'paySuccess',
                        controller: 'PaySuccessCtrl',
                        templateUrl: 'app/module/main/paySuccess/tpl.html'
                    });
            }
        ]);

});
/**
* @file ziliaoku
* @author huangshiming
*/

define('module/main/uploadFile/services',[],function () {
    'use strict';
    angular.module('Manage.uploadFile.services', ['Manage.services'])
        .factory('uploadFileService', ['ajaxService',
            function (ajaxService) {
                return {
                    //获取资料库文件夹列表
                    getInfoList: function (params) {
                        return ajaxService.send('/api/disk/browse', params || {});
                    },
                    // 获取下载的地址
                    getDownLoadUrl: function (params) {
                        return ajaxService.send('/api/disk/download', params || {});
                    },
                    // 删除操作
                    deleteInfo: function (params) {
                        return ajaxService.send('/api/disk/delete', params || {});
                    },

                    // 重命名
                    renameInfo: function (params) {
                        return ajaxService.send('/api/disk/rename', params || {});
                    },

                    // 移动
                    moveInfo: function (params) {
                        return ajaxService.send('/api/disk/move', params || {});
                    },

                    // 创建文件夹
                    createDir: function (params) {
                        return ajaxService.send('/api/disk/create-dir', params || {});
                    },

                    // 获取左边面包屑
                    getIndexList: function (params) {
                        return ajaxService.send('/api/disk/index', params || {});
                    },

                    // 获取内存空间
                    getStorageSpace: function (params) {
                        return ajaxService.send('/api/storage/usage', params || {});
                    },

                    // 视频上传成功以后给后端的回调
                    getVideoUploadCallBack: function (params) {
                        return ajaxService.send('/api/disk/video-upload-callback', params || {});
                    },

                    // 检查按钮状态
                    getOptionCheck: function (params) {
                        return ajaxService.send('/api/disk/optionCheck', params || {});
                    }
                };
            }
        ]);
});
/**
*@file removeFile
*@author huangshiming
*/

define('module/main/uploadFile/removeDialog/controller',[],function () {
    'use strict';

    function Controller($scope, uploadFileService, it, $rootScope) {
        $scope.newfileName = '';
        $scope.currentPath = '/personal/';
        $scope.personlExpand = false;

        // 展示第一个文件夹
        $scope.expendFirstDir = function () {
            $scope.personlExpand = !$scope.personlExpand;
            initView();
        };

        // 初始化列表
        function initView() {
            $scope.getDetailInfos = {};
            $scope.getDetailInfos.moveToPath = '/personal/';
            $scope.getDetailInfos.showCreateFolderButton = false;
            uploadFileService
                .getInfoList({
                    dir: $scope.currentPath,
                    dir_only: true
                })
                .then(function (response) {
                    $scope.getDetailInfos.list = response.data.list;
                    $scope.currentPath = response.data.current_path;
                    $.each($scope.getDetailInfos.list, function (index, item) {
                        if (!item.level) {
                            item.level = 0;
                        }
                    });
                });
        }

        // 取消新建文件夹
        $scope.cancelNewFolder = function () {
            $scope.newfileName = '';
            $scope.showeEdit = false;
        };

        // 是否展示新建文件夹
        $scope.showCreateFolder = function () {
            $scope.showeEdit = true;
        };

        // 关闭弹窗
        $scope.closeDialog = function () {
            $scope.dialog.close();
        };

        // 选择完路径以后
        $scope.sendPath = function () {
            uploadFileService
                .moveInfo({
                    paths: it.paths,
                    move_to: $scope.getDetailInfos.moveToPath
                })
                .then(function () {
                    //$scope.dialog.close();
                    $scope.currentPath = it.currentPath;
                    // 成功以后刷新页面
                    uploadFileService
                        .getInfoList({
                            dir: $scope.currentPath,
                            dir_only: false
                        })
                        .then(function (response) {
                            $scope.dialog.dismiss(response.data.list);
                        });

                });
        };

        // 多叉树遍历
        var parseDirList =  function (treeNodes, currentList) {
            if(!treeNodes || !treeNodes.length) {
                return;
            }
            for(var i = 0 , len = treeNodes.length; i < len; i++) {
                var list = treeNodes[i].list;
                if (treeNodes[i].path === $scope.getDetailInfos.moveToPath) {
                    $rootScope.safeApply(function () {
                        treeNodes[i].list = currentList;
                    });
                    return;
                }
                if (list && list.length) {
                    parseDirList(list, currentList);
                }
            }
        };

        // 确定新建文件夹
        $scope.confirmNewFolder = function () {
            if (!$scope.newfileName) {
                return;
            }

            uploadFileService
                .createDir({
                    dir: $scope.getDetailInfos.moveToPath,
                    name: $scope.newfileName
                })
                .then(function () {
                    uploadFileService
                        .getInfoList({
                            dir: $scope.getDetailInfos.moveToPath,
                            dir_only: true
                        })
                        .then(function (response) {
                            var currentList = {};
                            currentList = response.data.list;
                            parseDirList($scope.getDetailInfos.list, currentList);
                            $scope.newfileName = '';
                            $scope.showeEdit = false;
                        });
                });
        };
    }

    Controller.$inject = [
        '$scope', 'uploadFileService', 'it', '$rootScope'
    ];
    return Controller;
});
/**
*@file uploadFile
*@author huangshiming
*/

define('module/main/uploadFile/controller',['require','./services','common/config/common','./removeDialog/controller'],function (require) {
    'use strict';
    require('./services');

    var config = require('common/config/common');
    angular.module('Manage.uploadFile.controller', [
        'Manage.services',
        'Manage.uploadFile.services'
        ])
        .controller('UploadFileCtrl',
            ['$rootScope', '$scope', 'uploadFileService','$window',
             '$sce', 'utilService', 'dialog', 'uploaderService',
            function ($rootScope, $scope, uploadFileService, $window, $sce, utilService, dialog, uploaderService) {
                $scope.currentPath = '/personal/';
                $scope.showNewFolder = false;
                $scope.newfileName = '';
                $scope.insertIndex = 0;
                $scope.fileTypeClassMap = config.FILE_TYPE_CLASS_MAP;
                $scope.queryContent = '';
                $scope.canUploader = true;
                $scope.canNew = false;
                $scope.canUpload = false;
                var needSearch = false;

                // 获取列表
                function initView() {
                    $scope.allSelected = false;
                    $scope.showMenuButtons = false;
                    var params = {
                        dir: $scope.currentPath,
                        dir_only: false
                    };
                    if ($scope.queryContent && needSearch) {
                        params.query = $scope.queryContent;
                    }
                    uploadFileService
                        .getInfoList(params)
                        .then(function (response) {
                            $scope.getDetailInfos = response.data.list;
                            $scope.getCrumbList = response.data.crumb;
                            $scope.currentPath = response.data.current_path;
                            $scope.canNew = response.data.current_path_option.can_new;
                            $scope.canUpload = response.data.current_path_option.can_upload;
                            $scope.queryContent = '';
                            $scope.canUploader = true;
                            $scope.showNewFolder = false;
                            $.each($scope.getDetailInfos, function (index, item) {
                                item.selected = false;
                                item.showEditName = false;
                                item.isShowIcons = false;
                                item.uploadStatus = 'uploaded';
                                if (item.size) {
                                     item.size = utilService.formatFileSize(item.size);
                                }
                                if (!item.level) {
                                    item.level = 0;
                                }
                                if (!$scope.fileTypeClassMap[item.file_type] && item.type === 'file') {
                                    item.file_type = 'unknown';
                                }

                            });
                        });
                }

                // 初始化左边面包屑导航
                var getIndexList = function () {
                    uploadFileService
                        .getIndexList()
                        .then(function (response) {
                            $scope.getIndex = response.data.path_list;
                        });
                };

                // 初始化左边内存空间
                var getStorageSpace = function () {
                    uploadFileService
                        .getStorageSpace()
                        .then(function (response) {
                            $scope.usedSize = utilService.formatFileSize(response.data.used_size);
                            $scope.sizeRate = (response.data.used_size / response.data.max_size);
                            if ($scope.sizeRate > 1) {
                                $scope.sizeRate = 1;
                            }
                            $scope.maxSize = utilService.formatFileSize(response.data.max_size);
                        });
                };

                initView();
                getIndexList();
                getStorageSpace();

                // 勾选全选
                $scope.chooseAllBox = function () {
                    var flag = $scope.allSelected;
                    $scope.showMenuButtons = flag;
                    $.each($scope.getDetailInfos, function (index, item) {
                        item.selected = flag;
                    });
                };

                // 下载的相关操作
                var getDownload = function (array) {
                    uploadFileService
                        .getDownLoadUrl({
                            paths: array
                        })
                        .then(function (res) {
                            var downloadUrl = res.data.download_url;
                            $window.open(downloadUrl);
                        });
                };
                // 下载单个文件
                $scope.dowloadSingle = function (path) {
                    var pathArray = [];
                    pathArray.push(path);

                    getDownload(pathArray);
                };

                // 下载多个文件
                $scope.downloadAll = function () {
                    var downArray = [];
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.selected && item.type === 'file') {
                            downArray.push(item.path);
                        }
                    });
                    if (downArray.length > 0) {
                        getDownload(downArray);
                    } else {
                        utilService
                            .showMessage({
                                title: '温馨提示',
                                content: '文件夹不支持下载，请选择文件下载',
                                okBtnText: '确定',
                                hideCancel: true
                            });
                    }
                };

                // 删除操作
                var getDetele = function (arrays) {
                    utilService
                        .showMessage({
                            title: '提示',
                            content: '确认删除',
                            okBtnText: '确定',
                            cancelBtnText: '取消',
                            hideCancel: false,
                            }).then(function () {
                                uploadFileService
                                    .deleteInfo({
                                        paths: arrays
                                    })
                                    .then(function () {
                                        uploadFileService
                                            .getInfoList({
                                                dir: $scope.currentPath,
                                                dir_only: false
                                            })
                                            .then(function (response) {
                                                $scope.getDetailInfos = response.data.list;
                                                $.each($scope.getDetailInfos, function (index, item) {
                                                    item.selected = false;
                                                    item.showEditName = false;
                                                    item.isShowIcons = false;
                                                    item.uploadStatus = 'uploaded';
                                                    if (item.size) {
                                                        item.size = utilService.formatFileSize(item.size);
                                                    }
                                                    if (!item.level) {
                                                        item.level = 0;
                                                    }
                                                    if (!$scope.fileTypeClassMap[item.file_type] && item.type === 'file') {
                                                        item.file_type = 'unknown';
                                                    }

                                                });
                                                $scope.showMenuButtons = false;
                                                getStorageSpace();
                                            });
                                    });
                        });
                };

                // 删除多个（全部）
                $scope.deteleAll = function () {
                    var deleteArray = [];
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.selected) {
                            deleteArray.push(item.path);
                        }
                    });

                    if (deleteArray.length > 0) {
                        getDetele(deleteArray);
                    } else {
                        utilService
                            .showMessage({
                                title: '温馨提示',
                                content: '请选择要删除的文件夹或文件',
                                okBtnText: '确定',
                                hideCancel: true
                            });
                    }
                };

                // 删除单个
                $scope.deleteSingle =  function (index) {
                    var deleteArray = [];
                    deleteArray.push($scope.getDetailInfos[index].path);
                    $scope.getDetailInfos[index].selected = true;
                    getDetele(deleteArray);
                };

                // 是否展示重命名
                $scope.showEditName = function (it, $event) {
                    $.each($scope.getDetailInfos, function (index, item) {
                        item.showEditName = false;
                    });
                    var currentInput = $($event.target).parent().parent().find('.file-name-edit');
                    it.showEditName = true;
                    currentInput.focus();
                    currentInput.select();
                    // it.selected = true;
                };

                // 重命名的ajax
                var renameInfoAjax = function (it) {
                    uploadFileService
                        .renameInfo({
                            path: it.path,
                            name: it.name
                        })
                        .then(function () {
                            // it.name = it.fileName;
                            it.showEditName = false;
                            // it.fileName = '';
                        });
                };

                // 失去焦点的时候重命名操作
                $scope.renameInfo = function (it) {
                    // var keycode = window.event ? e.keyCode : e.which;
                    // if (keycode === 13) {
                    //     return;
                    // }
                    //renameInfoAjax(it);
                    it.showEditName = false;
                    it.fileName = '';
                    // it.selected = true;
                };

                $scope.renameContent = function (it) {
                    renameInfoAjax(it);
                }

                //按下键盘的操作
                $scope.keyPress = function (e, it) {
                    var keycode = window.event ? e.keyCode : e.which;
                    if (keycode === 13) {
                        renameInfoAjax(it);
                    }
                };

                //获取列表更新
                $scope.refreshList = function (it) {
                    $scope.currentPath = it.path;
                    needSearch = false;
                    initView();
                };

                // 移动的的弹窗
                var removeDialog = function (it) {
                    var dialogInstance = dialog.open({
                        title: '移动到',
                        controller: require('./removeDialog/controller'),
                        width: 600,
                        skinClass: 'view-remove-content',
                        templateUrl: 'app/module/main/uploadFile/removeDialog/tpl.html',
                        resolve: {
                            it: function () {
                                return it;
                            }
                        }
                    });

                    dialogInstance.then(
                        function (param) {
                            console.log(param);
                            $scope.getDetailInfos = param;
                            $.each($scope.getDetailInfos, function (index, item) {
                                item.selected = false;
                                item.showEditName = false;
                                item.isShowIcons = false;
                                item.uploadStatus = 'uploaded';
                                if (item.size) {
                                     item.size = utilService.formatFileSize(item.size);
                                }
                                if (!item.level) {
                                    item.level = 0;
                                }
                            });
                        }
                    );
                };

                // 移动单个文件
                $scope.removeInfo = function (it) {
                    var needToMovePaths = [];
                    needToMovePaths.push(it.path);
                    var param = {};
                    param.paths = needToMovePaths;
                    param.currentPath = $scope.currentPath;
                    removeDialog(param);
                };

                // 移动多个文件
                $scope.removeSomeInfo = function () {
                    var needToMovePaths = [];
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.selected) {
                            needToMovePaths.push(item.path);
                        }
                    });
                    var param = {};
                    param.paths = needToMovePaths;
                    param.currentPath = $scope.currentPath;
                    if (needToMovePaths.length > 0) {
                        removeDialog(param);
                    } else {
                        utilService
                            .showMessage({
                                title: '温馨提示',
                                content: '请选择要移动的文件夹或文件',
                                okBtnText: '确定',
                                hideCancel: true
                            });
                    }
                };

                // 是否展示每一行的那些icons
                $scope.showIcons = function (it) {
                    it.isShowIcons = true;
                };

                // 隐藏icons
                $scope.hideIcons = function (it) {
                    it.isShowIcons = false;
                };

                // 选中单个item
                $scope.chooseSingleBox = function () {
                    $scope.showMenuButtons = false;
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.selected) {
                            $scope.showMenuButtons = true;
                            return;
                        }
                    });
                };

                // 返回上一级
                $scope.goBack = function () {
                    var path = $scope.currentPath;
                    var pathArray = path.split('/');
                    pathArray.pop();
                    pathArray.pop();
                    pathArray.push('');
                    $scope.currentPath = pathArray.join('/');
                    if ($scope.currentPath === '/') {
                        $scope.currentPath = '/personal/';
                    }
                    needSearch = false;
                    initView();
                };

                // 新建文件夹
                $scope.makeNewFolder = function () {
                    $scope.showNewFolder = true;
                };

                // 新建文件夹失去焦点的操作
                $scope.makeNewFolderOnBlur = function () {
                    if (!$scope.newfileName) {
                        $scope.showNewFolder = false;
                        return;
                    }
                    uploadFileService
                        .createDir({
                            dir: $scope.currentPath,
                            name: $scope.newfileName
                        })
                        .then(function () {
                            $scope.newfileName = '';
                            $scope.showNewFolder = false;
                            needSearch = false;
                            initView();
                         }, function () {
                            $scope.newfileName = '';
                            $scope.showNewFolder = false;
                         });
                };

                // 新建文件夹按下回车的操作
                $scope.keyPressMakeNewFolder = function (e) {
                    //var keycode = window.event ? e.keyCode : e.which;
                    var keycode = e.keyCode;
                    if (keycode === 13) {
                        $scope.makeNewFolderOnBlur();
                    }
                };

                // 取消新建文件夹
                $scope.cancelMakeNewFolder = function () {
                    $scope.newfileName = '';
                    $scope.showNewFolder = false;
                }

                //获取插入索引
                function getInsertIndex() {
                    $.each($scope.getDetailInfos, function (index, item) {
                        if (item.type === 'file') {
                            $scope.insertIndex = index;
                            return false;
                        }
                    });
                }

                // 搜索
                $scope.queryParam = function () {
                    if ($scope.queryContent) {
                        needSearch = true;
                        initView();
                    }
                };

                // 按键搜索
                $scope.keyPressQueryParam = function (e) {
                    var keycode = e.keyCode;
                    if (keycode === 13) {
                        $scope.queryParam();
                    }
                }

                // 进入下一个文件夹
                $scope.goToNextPage = function ($event, it) {
                    var dom = event.target;
                    dom = $(dom);
                    if(!dom.hasClass('selectedSingle')
                        && !dom.hasClass('icon-ic_move2')
                        && !dom.hasClass('icon-ic_down')
                        && !dom.hasClass('icon-ic_edit')
                        && !dom.hasClass('icon-ic_delete2')
                        && !dom.hasClass('file-name-edit')
                        && !dom.hasClass('icon-ic_finish')
                        && !dom.hasClass('icon-ic_cancel2')
                        && (it.type === 'dir')) {
                        $scope.currentPath = it.path;
                        needSearch = false;
                        initView();
                    }
                };

                // 上传
                $scope.upLoadFile = function () {

                    var options = {
                        isCheckType: true,
                        path: $scope.currentPath,
                    };
                    var newFileItem = {
                        type: 'file',
                        file_type: null,
                        name: null,
                        fid: null,
                        size: 0,
                        path: $scope.currentPath,
                        time: null,
                        uploadStatus: 'uploading',
                        fileItem: null
                    };
                    var firstEnter = true;
                    var currentItem;

                    if ($scope.canUploader) {
                        // $scope.canUploader = false;
                        uploaderService
                            .upload(options)
                            .then(function (response) {
                                var res = utilService.JSON.parse(response.responseText);
                                if ((res.code === 0)
                                    || (res.code === 1 && res.msg === 'success') ) {

                                    if (res.code === 1 && res.msg === 'success') {
                                        uploadFileService
                                            .getVideoUploadCallBack({
                                                dir: $scope.currentPath,
                                                video_id: res.fid
                                            })
                                            .then(function () {
                                                return;
                                            });
                                    }

                                    currentItem.fid = res.fid;
                                    currentItem.selected = true;
                                    currentItem.uploadStatus = 'uploaded';
                                    getStorageSpace();
                                    setTimeout(function () {
                                        $scope.canUploader = true;
                                        needSearch = false;
                                        initView();
                                    }, 1000);
                                } else {
                                    setTimeout(function () {
                                        $scope.canUploader = true;
                                        needSearch = false;
                                        initView();
                                    }, 1000);
                                    utilService
                                        .showMessage({
                                            title: '温馨提示',
                                            content: res.message,
                                            okBtnText: '确定',
                                            hideCancel: true
                                        });
                                }

                            }, function () {
                                setTimeout(function () {
                                    $scope.canUploader = true;
                                    needSearch = false;
                                    initView();
                                }, 1000);
                                // utilService
                                //     .showMessage({
                                //         title: '温馨提示',
                                //         content: response.message,
                                //         okBtnText: '确定',
                                //         hideCancel: true
                                //     });
                                currentItem.uploadStatus = 'uploadFail';
                            });
                    }
                    options.uploader.on('uploadprogress', function (e, data) {
                        if (firstEnter) {
                            var file = data.fileItem.file;
                            newFileItem.fileItem = data.fileItem;
                            newFileItem.name = file.name;
                            newFileItem.uploadRate = data.percent;
                            newFileItem.file_type = file.type;
                            newFileItem.size = utilService.formatFileSize(file.size);
                            $rootScope.safeApply(function () {
                                 $scope.getDetailInfos.splice($scope.insertIndex, 0, newFileItem);
                            });
                            getInsertIndex();
                            currentItem = $scope.getDetailInfos[$scope.insertIndex];
                            firstEnter = false;
                        }
                        else {
                            $rootScope.safeApply(function () {
                                currentItem.uploadRate = data.percent;
                            });
                        }
                        if (data.percent === '100.00%') {
                            $rootScope.safeApply(function () {
                                currentItem.isNew = false;
                            });
                        }
                        console.log(data.percent);
                    });
                    options.uploader.on('uploadstart', function () {
                        $scope.canUploader = false;
                    })
                };
            }

        ]);
});
define('module/main/uploadFile/ngDirective/module',[],function () {
    'use strict';
    return angular.module('Manage.uploadFile.directives', []);
});
/**
 * @file 获取子文件夹
 * @author huangshiming
 *
 * usage:
 *
 * <dir-loop></dir-loop>
 *
 */
define('module/main/uploadFile/ngDirective/getDirLoop/directive',['require','common/config/common','cc/form/Validator'],function (require) {
    'use strict';
    var config = require('common/config/common');
    var Validator = require('cc/form/Validator');

    angular.module('Manage.uploadFile.directives')
        .directive('dirLoop',
            ['uploadFileService',
            function (uploadFileService) {
                return {
                    restrict: 'E',
                    replace: false,
                    scope: {
                        options: '=options'
                    },
                    templateUrl: 'app/module/main/uploadFile/ngDirective/getDirLoop/tpl.html',
                    link: function ($scope) {
                        $scope.isExpend = {};
                        $scope.levelArray = {};
                        var currentPath = '/personal/';
                        var currentItem = {};

                        // 获取列表
                        var getList = function (item) {
                            uploadFileService
                                .getInfoList({
                                    dir: item.path,
                                    dir_only: true
                                })
                                .then(function (res) {
                                    item.list = res.data.list;
                                    currentPath = item.path;
                                    currentItem = item;
                                    $scope.options.moveToPath = currentPath;
                                    if (item.level > 0) {
                                        $scope.options.showCreateFolderButton = true;
                                    }
                                    $scope.isExpend[item.did] = true;
                                    $scope.levelArray[item.did] = item.level;
                                });
                        }

                        // 点击展示
                        $scope.itemExpended = function (item) {
                            if (!$scope.isExpend[item.did]) {

                                $.each($scope.isExpend, function (index, it) {
                                    if ($scope.levelArray[index] >= item.level) {
                                        $scope.isExpend[index] = false;
                                    }
                                });

                                getList(item);
                            } else {
                                $scope.isExpend[item.did] = false;
                                $scope.options.moveToPath = currentPath;
                            }
                        }
                    }
                };
            }
        ]);
});

define('module/main/uploadFile/ngDirective/main',['require','./module','./getDirLoop/directive'],function (require) {
    'use strict';
    require('./module');
    require('./getDirLoop/directive');
});
/**
*@file uploadFile
*@author huangshiming
*/

define('module/main/uploadFile/app',['require','./controller','./ngDirective/main'],function (require) {
    'use strict';
    require('./controller');
    require('./ngDirective/main');

    angular.module('Manage.uploadFile', [
        'ui.router',
        'pasvaz.bindonce',
        'Manage.uploadFile.controller',
        'Manage.uploadFile.directives'
    ])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('Manage.uploadFile', {
                    url: 'uploadFile',
                    controller: 'UploadFileCtrl',
                    templateUrl: 'app/module/main/uploadFile/tpl.html'
                });
        }
    ]);
});
/**
 * @file 优选一对一
 * @author niejianhui
 */

define('module/main/one2oneEdit/services',[],function () {
    'use strict';
    angular.module('Manage.one2oneEdit.services', ['Manage.services'])
        .factory('one2oneEditService', ['ajaxService',
            function (ajaxService) {
                return {
                    //获取视频列表
                    getVideoList: function (params) {
                        return ajaxService.send('/api/tcenter/album/video/list', params || {});
                    },
                    //获取相册列表
                    getPhotoList: function (params) {
                        return ajaxService.send('/api/tcenter/album/photo/list', params || {});
                    },
                    //获取成功案例列表
                    getCaseList: function (params) {
                        return ajaxService.send('/api/tcenter/success-case/list', params || {});
                    },
                    //获取常用地址
                    getDefaultAddress: function (params) {
                        return ajaxService.send('/api/tcenter/addresses/default-address', params || {});
                    },
                    //获取教学科目
                    getSubjects: function (params) {
                        return ajaxService.send('/api/tcenter/courses/one-on-one-course/subjects', params || {});
                    },
                    //发布课程
                    saveCourse: function (params) {
                        return ajaxService.send('/api/tcenter/courses/one-on-one-course/save', params || {});
                    },
                    //获取课程信息
                    getCourse: function (params) {
                        return ajaxService.send('/api/tcenter/courses/one-on-one-course/get', params || {});
                    }
                };
            }
        ]);
});
/**
 * @file 选择照片弹窗 controller
 * @author niejianhui
 */
define('module/main/one2oneEdit/selectPicsDialog/controller',[],function () {
    'use strict';

    SelectPicsDialogCtrl.$inject = ['$scope', '$state', 'one2oneEditService', 
    'coursePicsParams', '$sce', 'utilService'];
    function SelectPicsDialogCtrl($scope, $state, one2oneEditService, 
        coursePicsParams, $sce, utilService) {

        function initView () {
            $scope.photoParam = '@1e_172w_96h_1c_0i_1o_90Q_1x';
            $scope.length = coursePicsParams.length;
            $scope.selectedCount = 0;
            $scope.isLoading = true;
            one2oneEditService
                .getPhotoList()
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.photos = response.data.query_multimedia_photos;
                    // angular.forEach($scope.photos, function (item) {
                    //     item.url = $sce.trustAsResourceUrl(item.url);
                    // });
                });
        }

        initView();

        $scope.selectPic = function (photo) {
            if (photo.selected) {
                $scope.selectedCount--;
                photo.selected = false;
            }
            else {
                if (($scope.length + $scope.selectedCount) === 4) {
                    utilService.showMessage('照片数已超出限制');
                }
                else {
                    photo.selected = true;
                    $scope.selectedCount++;
                }
            }
        };

        $scope.confirmSelect = function () {
            $.each($scope.photos, function (index, item) {
                if (item.selected) {
                    coursePicsParams.push({
                        storage_id: item.storage_id,
                        image_url: item.url,
                        title: item.title || ''
                    });
                }
            });
            $scope.dialog.close();
        };

    }

    return SelectPicsDialogCtrl;
});

/**
 * @file 选择视频弹窗 controller
 * @author niejianhui
 */
define('module/main/one2oneEdit/selectVideoDialog/controller',[],function () {
    'use strict';

    SelectVideoDialogCtrl.$inject = ['$scope', '$state', 'one2oneEditService', 'courseVideoParams', '$sce'];

    function SelectVideoDialogCtrl($scope, $state, one2oneEditService, courseVideoParams, $sce) {

        function initView () {
            $scope.photoParam = '@1e_172w_96h_1c_0i_1o_90Q_1x';
            $scope.selectedVideo = {
                index: null
            };
            $scope.isLoading = true;
            one2oneEditService
                .getVideoList()
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.videos = response.data.query_multimedia_videos;
                    // angular.forEach($scope.videos, function (item) {
                    //     item.cover = $sce.trustAsResourceUrl(item.cover);
                    // });
                });
        }

        initView();

        $scope.confirmSelect = function () {
            var index = $scope.selectedVideo.index;
            var video = $scope.videos[index];
            courseVideoParams.push({
                media_id: video.id,
                title: video.title || '',
                cover_url: video.cover_url
            });
            $scope.dialog.close();
        };

    }

    return SelectVideoDialogCtrl;
});

/**
 * @file 选择成功案例 controller
 * @author niejianhui
 */
define('module/main/one2oneEdit/selectCasesDialog/controller',[],function () {
    'use strict';

    SelectCasesDialogCtrl.$inject = ['$scope', '$state', 'one2oneEditService', 
    'courseCasesParams', '$sce', 'utilService'];

    function SelectCasesDialogCtrl($scope, $state, one2oneEditService, 
        courseCasesParams, $sce, utilService) {

        function initView () {
            $scope.length = courseCasesParams.length;
            $scope.selectedCount = 0;
            $scope.isLoading = true;
            one2oneEditService
                .getCaseList()
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.cases = response.data.query_success_cases;
                    $.each($scope.cases, function (index, item) {
                        var date = item.date;
                        item.isNew = false;
                        item.editing = false;
                        item.displayDate = utilService.formatDateString(date);
                        item.timeStamp = new Date(date).getTime();
                    });
                });
        }

        initView();

        $scope.selectCase = function (caseItem) {
            if (caseItem.selected) {
                $scope.selectedCount--;
                caseItem.selected = false;
            }
            else {
                if (($scope.length + $scope.selectedCount) === 3) {
                    utilService.showMessage('案例数已超出限制');
                }
                else {
                    caseItem.selected = true;
                    $scope.selectedCount++;
                }
            }
        };

        $scope.confirmSelect = function () {
            $.each($scope.cases, function (index, item) {
                if (item.selected) {
                    courseCasesParams.push({
                        title: item.title || '',
                        date: item.date,
                        displayDate: item.displayDate,
                        timeStamp: item.timeStamp,
                        content: item.content,
                        // id: item.id,
                        editing: item.editing,
                        isNew: item.isNew
                    });
                }
            });
            $scope.dialog.close();
        };

    }

    return SelectCasesDialogCtrl;
});

/**
 * @file 优选一对一
 * @author niejianhui
 */
define('module/main/one2oneEdit/controller',['require','./services','cc-config/form/Validator','module/main/one2oneEdit/selectPicsDialog/controller','module/main/one2oneEdit/selectPicsDialog/controller','module/main/one2oneEdit/selectVideoDialog/controller','module/main/one2oneEdit/selectCasesDialog/controller'],function (require) {
    'use strict';
    require('./services');
    var Validator = require('cc-config/form/Validator');
    //文件大小单位 M
    var M = 1024 * 1024;
    //秒的转换
    var S = 1000;

    angular.module('Manage.one2oneEdit.controller', [
            'Manage.services',
            'Manage.one2oneEdit.services'
        ])
        .controller('One2oneEditCtrl', ['$rootScope', '$scope', 'one2oneEditService', 'uploaderService',
            'utilService', 'dialog', '$sce', '$stateParams', '$state',
            function ($rootScope, $scope, one2oneEditService, uploaderService,
                utilService, dialog, $sce, $stateParams, $state) {
                //获取常用地址
                function getDefaultAddress() {
                    one2oneEditService
                        .getDefaultAddress()
                        .then(function (response) {
                            $scope.addressDefault = response.data.address_default;
                        });
                }

                //格式化dropDown数据
                function initDataSource(objArray) {
                    var dataSource = [];
                    $.each(objArray, function(index, item){
                        dataSource.push({
                            text: item.name,
                            value: item.id
                        });
                    });
                    return dataSource;
                }

                //特殊处理'全部'
                function pushSpecialCag() {
                    $scope.categories.push({
                        name: '全部',
                        selected: true,
                        isSpecial: true,
                        type: 'CUSTOM',
                        price_teacher : '',
                        price_student : '',
                        price_online : '',
                    });
                    $scope.cagCount++;
                }

                //初始化三级科目下拉菜单和课程类型
                function initCategories(obj) {
                    $scope.cagCount = 0;
                    if (obj.children.length) {
                        $scope.level3SubjectList = obj.children;
                        $scope.level3Id = +obj.children[0].id;
                        initLevel3Subject();
                        $scope.showLevel3Dropdown = true;
                        $scope.categories = [];
                        pushSpecialCag();
                        $scope.subjectId = $scope.level3Id;
                        $scope.subjectLevel = 3;
                    }
                    else if (obj.categories.length){
                        $scope.categories = obj.categories;
                        //‘全部’的索引
                        var specialCagIndex;
                        $.each($scope.categories, function (index, item) {
                            item.selected = false;
                            item.type = 'SUBJECT';
                            item.price_teacher = '';
                            item.price_student = '';
                            item.price_online = '';
                            item.subject_id = +item.id;
                            if (item.name === '全部') {
                                specialCagIndex = index;
                            }
                        });
                        //摘除全部
                        if (specialCagIndex !== undefined) {
                            $scope.categories.splice(specialCagIndex, 1);
                        }
                        //如果3级科目只有一个全部
                        if (!$scope.categories.length) {
                            pushSpecialCag();
                        }
                        $scope.showLevel3Dropdown = false;
                        $scope.subjectId = $scope.level2Id;
                        $scope.subjectLevel = 2;
                    }
                    else {
                        $scope.categories = [];
                        pushSpecialCag();
                        $scope.showLevel3Dropdown = false;
                        $scope.subjectId = $scope.level2Id;
                        $scope.subjectLevel = 2;
                    }
                }

                //初始化一级科目下拉菜单
                function initLevel1Subject() {
                    $scope.level1SubjectOptions = {
                        defaultValue: $scope.level1Id,
                        onSelected: function(data) {
                            var level1Id = data.value;
                            $scope.level1Id = level1Id;
                            $.each($scope.level1SubjectList, function(index, item) {
                                if (+item.id === level1Id) {
                                    $scope.level2SubjectList = item.children;
                                    $scope.level2Id = +item.children[0].id;
                                }
                            });
                            initLevel2Subject();

                            $.each($scope.level2SubjectList, function(index, item) {
                                if (+item.id === $scope.level2Id) {
                                    initCategories(item);
                                }
                            });

                        }
                    };
                    $scope.level1SubjectOptions.dataSource = initDataSource($scope.level1SubjectList);
                }

                //初始化二级科目下拉菜单
                function initLevel2Subject() {
                    $scope.level2SubjectOptions = {
                        defaultValue: $scope.level2Id,
                        onSelected: function(data) {
                            var level2Id = data.value;
                            $scope.level2Id = level2Id;
                            $.each($scope.level2SubjectList, function(index, item) {
                                if (+item.id === level2Id) {
                                    initCategories(item);
                                }
                            });

                        }
                    };
                    $scope.level2SubjectOptions.dataSource = initDataSource($scope.level2SubjectList);
                }

                //初始化三级科目下拉菜单
                function initLevel3Subject() {
                    $scope.level3SubjectOptions = {
                        defaultValue: $scope.level3Id,
                        onSelected: function(data) {
                            var level3Id = data.value;
                            $scope.level3Id = level3Id;
                            $scope.subjectId = level3Id;
                        }
                    };
                    $scope.categories = [];
                    $scope.cagCount = 0;
                    $scope.level3SubjectOptions.dataSource = initDataSource($scope.level3SubjectList);
                }

                //获取教学科目并初始化
                function getSubjects() {
                    one2oneEditService
                        .getSubjects()
                        .then(function (response) {
                            $scope.level1SubjectList = response.data.query_one_on_one_course_subjects;
                            var level1Subjects = $scope.level1SubjectList[0];
                            $scope.level1Id = +level1Subjects.id;
                            $scope.level2SubjectList = level1Subjects.children;
                            var level2Subjects = $scope.level2SubjectList[0];
                            $scope.level2Id = +level2Subjects.id;

                            initLevel1Subject();
                            initLevel2Subject();
                            initCategories(level2Subjects);
                        });
                }

                //初始化 清空编辑态的案例
                function initEditingCase() {
                    $scope.editingCase = {
                        title: '',
                        timeStamp: new Date().getTime(),
                        content: ''
                    };
                }

                //初始化 清空编辑态的课程类型
                function initEditingCag() {
                    $scope.cagEditFlag = false;
                    $scope.editingCag = {
                        name: '',
                        type: 'CUSTOM',
                        selected: false,
                        price_teacher: '',
                        price_student: '',
                        price_online: ''
                    };
                }

                //初始化各条编辑态
                function initEditStatus() {
                    $.each($scope.successCases, function (index, item) {
                        item.editing = false;
                    });
                }

                //初始化成功案例信息
                function initSuccessCases() {
                    $.each($scope.successCases, function (index, item) {
                        var date = item.date;
                        item.timeStamp = new Date(date).getTime();
                        item.displayDate = utilService.formatDateString(date);
                    });
                }

                //初始化上课方式信息
                function initLessonWayMap(wayArray) {
                    $.each($scope.lessonWayMap, function (index, item) {
                        if (wayArray.indexOf(item.value) > -1) {
                            item.selected = true;
                            $scope.lessonWayCount++;
                        }
                    });
                }

                //找一级科目ID
                function getLevel1Id(obj) {
                    $.each(obj, function (index, item) {
                        if (+item.id === $scope.level2Id) {
                            $scope.level1Id = +item.parent_id;
                            return false;
                        }
                    });
                }

                //找二级科目ID
                function getLevel2Id(obj) {
                    $.each(obj, function (index, item) {
                        if (+item.id === $scope.level3Id) {
                            $scope.level2Id = +item.parent_id;
                            return false;
                        }
                    });
                }

                //找一级科目名
                function getLevel1SubjectName() {
                    $.each($scope.level1SubjectList, function (index, item) {
                        if (+item.id === $scope.level1Id) {
                            $scope.level1Subject = item.name;
                            $scope.level2SubjectList = item.children;
                            return false;
                        }
                    });
                }

                //找二级科目名
                function getLevel2SubjectName() {
                    $.each($scope.level2SubjectList, function (index, item) {
                        if (+item.id === $scope.level2Id) {
                            $scope.level2Subject = item.name;
                            if (item.children.length) {
                                $scope.level3SubjectList = item.children;
                                $scope.categories = $scope.selectedCags;
                            }
                            else if (item.categories.length) {
                                $scope.categories = item.categories;
                                var specialCagIndex;
                                $.each($scope.categories, function (index, item) {
                                    //初始化某些特殊字段
                                    item.type = 'SUBJECT';
                                    item.price_teacher = '';
                                    item.price_student = '';
                                    item.price_online = '';
                                    item.subject_id = +item.id;
                                    if (item.name === '全部') {
                                        specialCagIndex = index;
                                    }
                                    $.each($scope.selectedCags, function (index1, item1) {
                                        if (+item1.subject_id === +item.id) {
                                            item.selected = true;
                                            item.price_online = item1.price_online;
                                            item.price_teacher = item1.price_teacher;
                                            item.price_student = item1.price_student;
                                            // item.type = 'SUBJECT';
                                            // item.subject_id = +item.id;
                                        }
                                    });
                                });
                                //摘除'全部'
                                if (specialCagIndex !== undefined) {
                                    $scope.categories.splice(specialCagIndex, 1);
                                }
                                //3级科目只有一个全部
                                if (!$scope.categories.length) {
                                    $scope.categories = $scope.selectedCags;
                                }
                            }
                            else {
                                $scope.categories = $scope.selectedCags;
                            }
                            return false;
                        }
                    });
                }

                //找三级科目名
                function getLevel3SubjectName() {
                    $.each($scope.level3SubjectList, function (index, item) {
                        if (+item.id === $scope.level3Id) {
                            $scope.level3Subject = item.name;
                            return false;
                        }
                    });
                }
                //初始化课程类型价格
                function initCagPrices() {
                    $.each($scope.categories, function (index, item) {
                        item.selected = item.selected || false;
                        item.price_online = item.price_online ? +item.price_online : '';
                        item.price_teacher = item.price_teacher ? +item.price_teacher : '';
                        item.price_student = item.price_student ? +item.price_student : '';
                    });
                }

                //根据后端返的末级科目ID找科目名称
                function findSubjects() {
                    one2oneEditService
                        .getSubjects()
                        .then(function (response) {
                            var level1SubjectList = response.data.query_one_on_one_course_subjects;
                            $scope.level1SubjectList = response.data.query_one_on_one_course_subjects;
                            if ($scope.subjectLevel === 2) {
                                $scope.level2Id = $scope.subjectId;
                                $.each(level1SubjectList, function (index, item) {
                                    getLevel1Id(item.children);
                                });
                                getLevel1SubjectName();
                                getLevel2SubjectName();
                            }
                            else {
                                $scope.level3Id = $scope.subjectId;
                                $.each(level1SubjectList, function (index, item) {
                                    $.each(item.children, function (index1, item1) {
                                        getLevel2Id(item1.children);
                                    });
                                });
                                $.each(level1SubjectList, function (index, item) {
                                    getLevel1Id(item.children);
                                });
                                getLevel1SubjectName();
                                getLevel2SubjectName();
                                getLevel3SubjectName();
                            }
                            initCagPrices();

                        });
                }

                //初始化后端返的课程类型 默认选中
                function initSelectedCags() {
                    $.each($scope.selectedCags, function (index, item) {
                        item.selected = true;
                    });
                }

                function initView() {
                    $scope.lessonWayArrayMap = {
                        'TEACHER': '老师上门',
                        'STUDENT': '学生上门',
                        'ONLINE': '在线授课',
                    };
                    $scope.photoParam = '@1e_244w_138h_1c_0i_1o_90Q_1x';
                    $scope.courseNumber = +$stateParams.courseNumber;
                    $scope.showUpdateAddressBtn = false;
                    $scope.savingCourse = false;
                    $scope.courseListUrl = location.origin + '/detail.html#/courseList/one2one';
                    var env = utilService.getEnvName();
                    $scope.modifyAddressUrl = 'http://' + env + '.genshuixue.com/tcenter/addresses/list';
                    $scope.caseExampleIndex = 0;
                    //初始化左侧锚点导航
                    $scope.sideNavOptions = {
                        sideMenus: [
                            {
                                text: '基础信息',
                                boxClass: 'basic-info',
                            },
                            {
                                text: '课程相关介绍',
                                boxClass: 'about-course'
                            }
                        ]
                    };
                    //初始化帮助信息
                    var priveHelpContent = ''
                                        + '<ul>'
                                        +     '<li>1.为了赢得更多生源，建议在不影响实际收入的前提下，尽量设定有吸引力的价格。</li>'
                                        +     '<li>2.根据上课的成本和便利性，建议“老师上门”的价格最高，之后是“在线授课”和“学生上门”。</li>'
                                        +     '<li>3.为了增加上课机会，建议设置多种上课方式，让学生有更多选择。</li>'
                                        + '</ul>';
                    $scope.priceHelpOptions = {
                        position: 'bottom',
                        content: priveHelpContent,
                        width: 750
                    };
                    $scope.introPicHelpOptions = {
                        position: 'bottom',
                        content: '上传课程相关的图片介绍（最多4张），仅支持 .jpg、.png、.jpeg 格式照片，图片内容清晰可见，大小不超过10M',
                        width: 750
                    };
                    $scope.honorPicHelpOptions = {
                        position: 'bottom',
                        content: '上传科目相关荣誉奖励（最多4张），仅支持 .jpg、.png、.jpeg 格式照片，图片内容清晰可见，大小不超过10M',
                        width: 750
                    };
                    $scope.videoHelpOptions = {
                        position: 'bottom',
                        content: '上传一个课程相关的视频介绍，请确保视频的清晰度，不能包含推广信息（广告、联系方式、网站链接等）',
                        width: 750
                    };
                    $scope.caseHelpOptions = {
                        position: 'bottom',
                        content: '请选择科目相关成功案例（最多3个）',
                        width: 750
                    };
                    $scope.priceArrayMap = {
                        'TEACHER': 'price_teacher',
                        'STUDENT': 'price_student',
                        'ONLINE': 'price_online',
                    };
                    //自定义课程类型
                    initEditingCag();
                    //添加成功案例
                    $scope.caseEditFlag = false;
                    //日期选择参数
                    $scope.dateTimeOptions = {
                        isDefaultSelected: true,
                        selectedDate: new Date(),
                        selectableBegin: '2014-1-1',
                        selectableEnd: new Date(),
                        onDateSelect: function () {

                        }
                    };
                    //添加案例
                    initEditingCase();
                    $scope.cagCount = 0;
                    $scope.lessonWayCount = 0;
                    //初始化上课方式
                    $scope.lessonWayMap = [
                        {
                            text: '在线授课',
                            value: 'ONLINE',
                            selected: false
                        },
                        {
                            text: '学生上门',
                            value: 'STUDENT',
                            selected: false
                        },
                        {
                            text: '老师上门',
                            value: 'TEACHER',
                            selected: false
                        }
                    ];

                    if (!$scope.courseNumber) {
                        $scope.successCases = [];
                        $scope.introPics = [];
                        $scope.honorPics = [];
                        $scope.introVideos = [];
                        // getDefaultAddress();
                        getSubjects();
                    }
                    else {
                        one2oneEditService
                            .getCourse({
                                data: {
                                    number: $scope.courseNumber
                                },
                                method: 'GET'
                            })
                            .then(function (response) {
                                var data = response.data.query_one_on_one_course_from_shadow;
                                var subject = data.subject;
                                $scope.subjectId = +subject.id;
                                $scope.subjectLevel = +subject.level;
                                $scope.selectedCags = data.categories;
                                initSelectedCags();
                                $scope.cagCount = data.categories.length;
                                if (data.address) {
                                     $scope.addressDefault = data.address;
                                }
                                else {
                                    // getDefaultAddress();
                                }
                                findSubjects();

                                $scope.successCases = data.success_cases;
                                initSuccessCases();
                                initLessonWayMap(data.lesson_ways);
                                $scope.introPics = data.photos;
                                $scope.honorPics = data.honors;
                                $scope.introVideos = data.videos;
                                $scope.verifyStatus = data.verify_status;
                                if ($scope.verifyStatus === 'FAILED') {
                                    var content = '';
                                    var verifyReasons = data.verify_outer_reasons.children;
                                    $scope.failedItems = '';
                                    $.each(verifyReasons, function (index, item) {
                                        content += '<div>' + item.name + ':</div>'
                                                +  '<ul>';
                                        $scope.failedItems += item.name + ' ';
                                        $.each(item.reasons, function (index1, item1) {
                                            content += '<li>'
                                                    +  (index1 + 1)
                                                    +  '.'
                                                    +  item1;
                                        });
                                        content += '</ul>';
                                    });
                                    $scope.verifyReasonsOpt = {
                                        position: 'bottom',
                                        content: content,
                                        width: 500
                                    };
                                }
                            });
                    }

                }

                initView();

                $scope.updateAddress = function () {
                    one2oneEditService
                        .getDefaultAddress()
                        .then(function (response) {
                            if (+$scope.addressDefault.id === +response.data.address_default.id) {
                                utilService.showMessage('您没有更新常用地址');
                            }
                            else {
                                $scope.addressDefault = response.data.address_default;
                            }
                             $scope.showUpdateAddressBtn = false;
                        });
                };
                $scope.toChangeAddress = function () {
                    $scope.showUpdateAddressBtn = true;
                };

                //选择上课方式
                $scope.selectWay = function (way) {
                    if (way.selected) {
                        $scope.lessonWayCount--;
                    }
                    else {
                        $scope.lessonWayCount++;
                        if (way.value === 'STUDENT' && !$scope.addressDefault) {
                            getDefaultAddress();
                        }
                    }
                    way.selected = !way.selected;
                };

                //自定义课程类型
                $scope.editCategory = function () {
                    $scope.cagEditFlag = true;
                };

                //选择课程类型
                $scope.selectCategory = function (cag) {
                    if (cag.name === '全部') {
                        return false;
                    }
                    if (cag.selected) {
                        $scope.cagCount--;
                    }
                    else {
                        $scope.cagCount++;
                    }
                    cag.selected = cag.selected ? false : true;
                };

                //保存课程类型编辑
                $scope.saveEditCag = function () {
                    var cagValidateOptions = {
                        mainElement: $('.category-edit-form'),
                        validateOnBlur: false,
                        fields: {
                            category: {
                                rules: {
                                    required: true,
                                    maxlength: 10
                                },
                                errors: {
                                    required: '请填写课程类型',
                                    maxlength: '最大长度为10个字'
                                }
                            }
                        }
                    };
                    var validator = new Validator(cagValidateOptions);
                    if (validator.validate()) {
                        if ($scope.categories[0].name === '全部') {
                            $scope.categories.splice(0,1);
                            $scope.cagCount--;
                        }
                        $scope.categories.push({
                            name: $scope.editingCag.name,
                            type: 'CUSTOM',
                            selected: true,
                            price_teacher: '',
                            price_student: '' ,
                            price_online: ''
                        });
                        $scope.cagCount++;
                        initEditingCag();
                    }
                };

                //取消课程类型编辑
                $scope.cancelEditCag = function () {
                    initEditingCag();
                };

                //删除一项课程类型
                $scope.deleteCategory = function (index) {
                    if ($scope.categories[index].selected) {
                        $scope.cagCount--;
                    }
                    $scope.categories.splice(index, 1);
                    if (!$scope.categories.length) {
                        pushSpecialCag();
                    }
                };

                //封装抽取的提示方法
                function doShowMessage(options) {
                    utilService.showMessage({
                        content: '请选择上传来源',
                        cancelBtnText: options.cancelBtnText || '本地上传',
                        skinClass: 'choose-source',
                        okBtnText: options.okBtnText,
                        hideCancel: false,
                        okHandler: options.okHandler,
                        cancelHandler: options.cancelHandler
                    });
                }

                //选择介绍照片
                function doSelectIntroPics() {
                    dialog.open({
                        title: '选择图片介绍',
                        controller: require('module/main/one2oneEdit/selectPicsDialog/controller'),
                        width: 835,
                        resolve: {
                            coursePicsParams: function () {
                                return $scope.introPics;
                            }
                        },
                        skinClass: 'select-pics-dialog',
                        templateUrl: 'app/module/main/one2oneEdit/selectPicsDialog/tpl.html'
                    });
                }

                //选择荣誉照片
                function doSelectHonorPics() {
                    dialog.open({
                        title: '选择图片介绍',
                        controller: require('module/main/one2oneEdit/selectPicsDialog/controller'),
                        width: 835,
                        resolve: {
                            coursePicsParams: function () {
                                return $scope.honorPics;
                            }
                        },
                        skinClass: 'select-pics-dialog',
                        templateUrl: 'app/module/main/one2oneEdit/selectPicsDialog/tpl.html'
                    });
                }

                //选择我的视频
                function doSelectVideo() {
                    dialog.open({
                        title: '选择视频介绍',
                        controller: require('module/main/one2oneEdit/selectVideoDialog/controller'),
                        width: 835,
                        resolve: {
                            courseVideoParams: function () {
                                return $scope.introVideos;
                            }
                        },
                        skinClass: 'select-video-dialog',
                        templateUrl: 'app/module/main/one2oneEdit/selectVideoDialog/tpl.html'
                    });
                }

                //选择成功案例
                function doSelectCases() {
                    dialog.open({
                        title: '选择科目相关的成功案例',
                        controller: require('module/main/one2oneEdit/selectCasesDialog/controller'),
                        width: 835,
                        resolve: {
                            courseCasesParams: function () {
                                return $scope.successCases;
                            }
                        },
                        skinClass: 'select-cases-dialog',
                        templateUrl: 'app/module/main/one2oneEdit/selectCasesDialog/tpl.html'
                    });
                }

                //上传介绍照片
                function doUploadIntroPics() {
                    var introPicUploaderOpt = {
                        type: 'pic',
                        data: {
                            watermark: 1
                        }
                    };
                    $scope.introPicUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(introPicUploaderOpt)
                    .then(function (response) {
                        var res = utilService.JSON.parse(response.responseText);
                        var data = res.data;
                        $scope.introPics.push({
                            storage_id: data.id,
                            title: '',
                            image_url: data.url
                        });
                        $scope.introPicUploading = false;

                    }, function (res) {
                        utilService.showMessage(res.message || res.msg);
                        $scope.introPicUploading = false;
                    });
                    introPicUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.introPicUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    introPicUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.introPicUploading = true;
                    });
                }

                //上传荣誉照片
                function doUploadHonorPics() {
                    var honorPicUploaderOpt = {
                        type: 'pic',
                        data: {
                            watermark: 1
                        }
                    };
                    $scope.honorPicUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(honorPicUploaderOpt)
                    .then(function (response) {
                        var res = utilService.JSON.parse(response.responseText);
                        var data = res.data;
                        $scope.honorPics.push({
                            storage_id: data.id,
                            title: '',
                            image_url: data.url
                        });
                        $scope.honorPicUploading = false;

                    }, function (res) {
                        utilService.showMessage(res.message || res.msg);
                        $scope.honorPicUploading = false;
                    });
                    honorPicUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.honorPicUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    honorPicUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.honorPicUploading = true;
                    });
                }

                //上传视频
                function doUploadVideo() {
                    var videoUploaderOpt = {
                        type: 'commonVideo'
                    };
                    $scope.videoUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(videoUploaderOpt)
                    .then(function (res) {
                        var response = JSON.parse(res.responseText);
                        var videoParams = videoUploaderOpt.uploader.videoParams;
                        $scope.introVideos.push({
                            media_id: videoParams.id,
                            title: '',
                            cover_url: videoParams.cover
                        });
                        $scope.videoUploading = false;
                    },
                    function (data) {
                        if (data && data.errorType === 'errorBeforeUpload') {
                            // 上传前检测出错误
                        }
                        else {
                            utilService
                            .showMessage({
                                title: '温馨提示',
                                content: '视频上传失败，请重新上传',
                                okBtnText: '确定'
                            });
                        }

                        $scope.videoUploading = false;
                    });
                    videoUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.videoUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    videoUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.videoUploading = true;
                    });
                }

                //添加新案例
                function doAddNewCase() {
                    initEditStatus();
                    initEditingCase();
                    $scope.caseEditFlag = true;
                    $scope.successCases.push({
                        title: '',
                        date: '',
                        displayDate: '',
                        timeStamp: '',
                        content: '',
                        editing: true,
                        isNew: true
                    });
                }

                //将上课方式转换为value数组
                function convertLessonways() {
                    $scope.selectedLessonways = [];
                    $.each($scope.lessonWayMap, function (index, item) {
                        if (item.selected) {
                            $scope.selectedLessonways.push(item.value);
                        }
                    });
                }

                //获取传给后端的科目信息
                function convertSubject() {
                    return {
                        id: +$scope.subjectId,
                        level: +$scope.subjectLevel
                    };
                }
                //获取传给后端的课程类型信息
                function converCategories() {
                    $scope.selectedCags = [];
                    $.each($scope.categories, function (index, item) {
                        if (item.selected) {
                            var tempItem = {
                                name: item.name,
                                type: item.type
                            };
                            if (item.type === 'SUBJECT' && item.subject_id) {
                                tempItem.subject_id = +item.subject_id;
                            }
                            else if (item.type === 'CUSTOM' && item.id){
                                tempItem.id = +item.id;
                            }
                            // if (item.level) {
                            //     tempItem.level = item.level;
                            // }
                            $.each($scope.selectedLessonways, function (index1, item1) {
                                tempItem[$scope.priceArrayMap[item1]]
                                = item[$scope.priceArrayMap[item1]];
                            });
                            $scope.selectedCags.push(tempItem);
                        }
                    });
                }
                //检查课程价格
                function validateCagPrice() {
                    var validateFlag = true;
                    $.each($scope.selectedCags, function (idnex, item) {
                        $.each($scope.selectedLessonways, function (index1, item1) {
                            var price = item[$scope.priceArrayMap[item1]];
                            if (!price && price !== 0) {
                                $scope.cagErrorInfo = {
                                    category: item.name,
                                    lessonway: $scope.lessonWayArrayMap[item1]
                                };
                                if (price === undefined) {
                                    $scope.cagErrorInfo.errMsg = '格式有误';
                                }
                                else {
                                    $scope.cagErrorInfo.errMsg = '未填写';
                                }
                                validateFlag = false;
                                return false;
                            }
                        });
                    });
                    return validateFlag;
                }
                //检查介绍照片描述
                function validateIntroPicTitle() {
                    var validateFlag = true;
                    $.each($scope.introPics, function (index, item) {
                        if (!item.title) {
                            validateFlag = false;
                            $scope.introErrorIndex = index;
                            return false;
                        }
                    });
                    return validateFlag;
                }
                //检查荣誉照片描述
                function validateHonorPicTitle() {
                    var validateFlag = true;
                    $.each($scope.honorPics, function (index, item) {
                        if (!item.title) {
                            validateFlag = false;
                            $scope.honorErrorIndex = index;
                            return false;
                        }
                    });
                    return validateFlag;
                }

                //获取传给后端的地址信息
                function convertAddress() {
                    var obj = {
                        id: +$scope.addressDefault.id
                    };
                    return obj;
                }
                //获取传给后端的介绍照片信息
                function convertIntroPics() {
                    var arr = [];
                    if ($scope.introPics.length) {
                        $.each($scope.introPics, function (index, item) {
                            var tempItem = {
                                storage_id: +item.storage_id,
                                title: item.title
                            };
                            if (item.id) {
                                tempItem.id = item.id;
                            }
                            arr.push(tempItem);
                        });
                    }
                    return arr;
                }
                //获取传给后端的荣誉照片信息
                function convertHonorPics() {
                    var arr = [];
                    if ($scope.honorPics.length) {
                        $.each($scope.honorPics, function (index, item) {
                            var tempItem = {
                                storage_id: +item.storage_id,
                                title: item.title
                            };
                            if (item.id) {
                                tempItem.id = item.id;
                            }
                            arr.push(tempItem);
                        });
                    }
                    return arr;
                }
                //获取传给后端的介绍视频信息
                function convertIntroVideos() {
                    var arr = [];
                    if ($scope.introVideos.length) {
                        $.each($scope.introVideos, function (index, item) {
                            var tempItem = {
                                media_id: +item.media_id,
                                title: item.title
                            };
                            if (item.id) {
                                tempItem.id = item.id;
                            }
                            arr.push(tempItem);
                        });
                    }
                    return arr;
                }
                //获取传给后端的成功案例信息
                function convertSuccessCases() {
                    var arr = [];
                    $.each($scope.successCases, function (index, item) {
                        var tempItem = {
                            title: item.title,
                            date: item.date,
                            content: item.content
                        };
                        if (item.id) {
                            tempItem.id = item.id;
                        }
                        arr.push(tempItem);
                    });
                    return arr;
                }
                //上传介绍图片
                $scope.uploadIntroPic = function () {
                    if ($scope.introPicUploading) {
                        return ;
                    }
                    doShowMessage({
                        okHandler: doSelectIntroPics,
                        cancelHandler: doUploadIntroPics,
                        okBtnText: '我的照片'
                    });
                };

                //删除介绍照片
                $scope.deleteIntroPic = function (index) {
                    $scope.introPics.splice(index, 1);
                };

                //上传荣誉图片
                $scope.uploadHonorPic = function () {
                    if ($scope.honorPicUploading) {
                        return ;
                    }
                    doShowMessage({
                        okHandler: doSelectHonorPics,
                        cancelHandler: doUploadHonorPics,
                        okBtnText: '我的照片'
                    });
                };

                //删除荣誉照片
                $scope.deleteHonorPic = function (index) {
                    $scope.honorPics.splice(index, 1);
                };

                //上传视频
                $scope.uploadVideo = function () {
                    if ($scope.videoUploading) {
                        return ;
                    }
                    doShowMessage({
                        okHandler: doSelectVideo,
                        cancelHandler: doUploadVideo,
                        okBtnText: '我的视频'
                    });
                };

                //删除介绍视频
                $scope.deleteIntroVideo = function (index) {
                    $scope.introVideos.splice(index, 1);
                };

                //保存案例编辑
                $scope.saveCase = function (caseItem) {
                    var caseValidateOptions = {
                        mainElement: $('.case-edit-form'),
                        validateOnBlur: false,
                        fields: {
                            caseTitle: {
                                rules: {
                                    required: true,
                                    maxlength: 30
                                },
                                errors: {
                                    required: '请填写案例标题',
                                    maxlength: '最大长度为30个字'
                                }
                            },
                            caseDate: {
                                rules: {
                                    required: true
                                },
                                errors: {
                                    required: '请选择时间'
                                }
                            },
                            caseContent: {
                                rules: {
                                    required: true,
                                    maxlength: 300,
                                    minlength: 50
                                },
                                errors: {
                                    required: '请填写背景介绍',
                                    maxlength: '最大长度为300个字',
                                    minlength: '最小长度为50个字'
                                }
                            }
                        }
                    };
                    var validator = new Validator(caseValidateOptions);
                    if (validator.validate()) {
                        var editingCase = $scope.editingCase;
                        var timeStamp = editingCase.timeStamp;
                        caseItem.title = editingCase.title;
                        caseItem.timeStamp = timeStamp;
                        caseItem.date = utilService.formatDateString(timeStamp, '-');
                        caseItem.displayDate = utilService.formatDateString(timeStamp);
                        caseItem.content = editingCase.content;
                        caseItem.editing = false;
                        caseItem.isNew = false;
                        initEditingCase();
                        $scope.caseEditFlag = false;
                        $scope.caseExampleIndex = 0;
                    }
                };

                //取消案例编辑
                $scope.cancelEditCase = function (caseItem, index) {
                    caseItem.editing = false;
                    if (caseItem.isNew) {
                        $scope.successCases.splice(index, 1);
                    }
                    initEditingCase();
                    $scope.caseEditFlag = false;
                    $scope.caseExampleIndex = 0;
                };

                //重新编辑案例
                $scope.editCase = function (caseItem) {
                    $scope.caseEditFlag = true;
                    $.each($scope.successCases, function (index, item) {
                        if (item.isNew) {
                            $scope.successCases.splice(index, 1);
                        }
                    });
                    initEditStatus();
                    caseItem.editing = true;
                    $scope.editingCase = {
                        title: caseItem.title,
                        timeStamp: caseItem.timeStamp,
                        content: caseItem.content
                    };
                };

                //删除案例
                $scope.deleteCase = function (index) {
                    $scope.successCases.splice(index, 1);
                };

                //添加成功案例
                $scope.addSuccessCases = function () {
                    doShowMessage({
                        okHandler: doSelectCases,
                        cancelHandler: doAddNewCase,
                        okBtnText: '我的成功案例',
                        cancelBtnText: '本地添加'
                    });
                };

                //更换示例案例
                $scope.switchCaseExample = function () {
                    $scope.caseExampleIndex = ($scope.caseExampleIndex + 1) % 3;
                };

                //发布课程
                function doReleaseCourse() {
                    var saveParams = {
                        subject: convertSubject(),
                        lesson_ways: $scope.selectedLessonways,
                        categories: $scope.selectedCags,
                        photos: convertIntroPics(),
                        honors: convertHonorPics(),
                        videos: convertIntroVideos(),
                        success_cases: convertSuccessCases()
                    };
                    //选择了学生上门才有常用授课地址
                    if ($scope.addressDefault) {
                        saveParams.address = convertAddress();
                    }
                    if ($scope.courseNumber) {
                        saveParams.number = +$scope.courseNumber;
                    }

                    $scope.savingCourse = true;
                    one2oneEditService
                        .saveCourse(saveParams)
                        .then(function (response) {
                            var courseNumber = response.data.mutation_save_one_on_one_course.number;
                            $state.go('Manage.releaseSuccess', {
                                courseNumber: courseNumber
                            });
                            $(window).unbind('scroll.sideNav');
                        }, function () {
                             $scope.savingCourse = false;
                        });
                }
                //校验用户填写的信息是否符合要求
                function validateSaveData() {
                    if (!$scope.cagCount) {
                        utilService.showMessage('请选择或自定义课程类型');
                        return ;
                    }
                    if (!$scope.lessonWayCount) {
                        utilService.showMessage('请选择授课方式');
                        return ;
                    }

                    convertLessonways();
                    converCategories();
                    if (!validateCagPrice()) {
                        var cagErrorInfo = $scope.cagErrorInfo;
                        utilService.showMessage(cagErrorInfo.category + cagErrorInfo.lessonway + '的价格' + cagErrorInfo.errMsg);
                        return false;
                    }

                    // if (!$scope.introPics.length) {
                    //     utilService.showMessage('请上传介绍照片');
                    //     return false;
                    // }
                    // if ($scope.introPics.length < 4) {
                    //     utilService.showMessage('请上传4张介绍照片');
                    //     return false;
                    // }
                    if ($scope.introPics.length && !validateIntroPicTitle()) {
                        utilService.showMessage('第' +  ($scope.introErrorIndex + 1) + '张介绍照片的描述未填写');
                        return false;
                    }
                    // if (!$scope.honorPics.length) {
                    //     utilService.showMessage('请上传荣誉照片');
                    //     return false;
                    // }
                    if ($scope.honorPics.length && !validateHonorPicTitle()) {
                        utilService.showMessage('第' +  ($scope.honorErrorIndex + 1) + '张荣誉照片的描述未填写');
                        return false;
                    }
                    // if (!$scope.introVideos.length) {
                    //     utilService.showMessage('请上传介绍视频');
                    //     return false;
                    // }
                    if ($scope.introVideos.length && !$scope.introVideos[0].title) {
                        utilService.showMessage('请填写介绍视频的描述');
                        return false;
                    }
                    if (!$scope.successCases.length) {
                        utilService.showMessage('请填写成功案例');
                        return false;
                    }
                    doReleaseCourse();
                }
                //发布课程时校验有无正在编辑态的内容
                $scope.releaseCourse = function() {
                    if ($scope.cagEditFlag) {
                        utilService.showMessage('您正在编辑课程类型，请完成编辑后再提交');
                        return false;
                    }
                    if ($scope.introPicUploading) {
                        utilService.showMessage('您正在上传介绍照片，请上传成功之后再提交');
                        return false;
                    }
                    if ($scope.honorPicUploading) {
                        utilService.showMessage('您正在上传荣誉照片，请上传成功之后再提交');
                        return false;
                    }
                    if ($scope.videoUploading) {
                        utilService.showMessage('您正在上传介绍视频，请上传成功之后再提交');
                        return false;
                    }
                    if ($scope.caseEditFlag) {
                        utilService.showMessage('您正在编辑优秀教学案例，请完成编辑后再提交');
                        return false;
                    }
                    validateSaveData();
                };
            }
        ]);
});
/**
 * @file 优选一对一
 * @author niejianhui
 */

define('module/main/one2oneEdit/app',['require','./controller'],function (require) {
    'use strict';
    require('./controller');

    angular.module('Manage.one2oneEdit', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.one2oneEdit.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.one2oneEdit', {
                        url: 'one2oneEdit/:courseNumber',
                        controller: 'One2oneEditCtrl',
                        templateUrl: 'app/module/main/one2oneEdit/tpl.html'
                    });
            }
        ]);

});
/**
 * @file releaseSuccess
 * @author niejianhui
 */
define('module/main/releaseSuccess/controller',['require'],function (require) {
    'use strict';
    
    angular.module('Manage.releaseSuccess.controller', [
            'Manage.services'
        ])
        .controller('ReleaseSuccessCtrl', ['$scope', '$window', '$sce', 
            '$stateParams', '$state', 'utilService',
            function ($scope, $window, $sce, $stateParams, $state, utilService) {
                //解绑编辑页的scroll事件
                $(window).unbind('scroll.sideNav');
                $('html,body').animate({scrollTop: '0px'}, 200);
                $scope.courseNumber = $stateParams.courseNumber;
                $scope.courseListUrl = location.origin + '/detail.html#/courseList/one2one';
                
                // $scope.openNewCourse = function () {
                //     $state.go('Manage.one2oneEdit', {
                //         courseNumber: 0
                //     })
                // };

                var env = utilService.getEnvName();
                var detailUrl;
                var str = $scope.courseNumber + '&preview=1';
                if (env === 'test') {
                    detailUrl = 'https://test-m.genshuixue.com/one-on-one-course/get?number=' + str;
                }
                else if (env === 'beta') {
                    detailUrl = 'https://beta-m.genshuixue.com/one-on-one-course/get?number=' + str;
                }
                else {
                    detailUrl = 'https://m.genshuixue.com/one-on-one-course/get?number=' + str;
                }
                //二维码配置
                $scope.detailPageQrcodeOpt = {
                    url: detailUrl,
                    width: 150,
                    height: 150,
                };

            }
        ]);
});
/**
 * @file releaseSuccess
 * @author niejianhui
 */

define('module/main/releaseSuccess/app',['require','./controller'],function (require) {
    'use strict';
    require('./controller');

    angular.module('Manage.releaseSuccess', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.releaseSuccess.controller'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.releaseSuccess', {
                        url: 'releaseSuccess',
                        params: {
                            courseNumber: ''
                        },
                        controller: 'ReleaseSuccessCtrl',
                        templateUrl: 'app/module/main/releaseSuccess/tpl.html'
                    });
            }
        ]);

});
/**
 * @file videoCourseEdit
 * @author niejianhui
 * @date 2017/08/15
 */

define('module/main/videoCourseEdit/service',[],function () {
    'use strict';
    angular.module('Manage.videoCourseEdit.service', ['Manage.services'])
        .factory('videoCourseEditService', ['ajaxService',
            function (ajaxService) {
                return {
                    //开课获取课程信息
                    getCourseInfo: function (params) {
                        return ajaxService.send('/api/tcenter/courses/video-courses/form', params || {});
                    },
                    //发布课程
                    saveVideoCourse: function (params) {
                        return ajaxService.send('/api/tcenter/courses/video-courses/save', params || {});
                    },
                    // 获取课程分组
                    getClassGroup: function () {
                        return ajaxService.send('/api/org/org_class_group/search');
                    },
                    // 获取课程分组ById
                    getClassGroupById: function (params) {
                        return ajaxService.send('/api/org/org_class_group/searchById', params);
                    },
                    // 保存课程分组
                    saveClassGroup: function (params) {
                        return ajaxService.send('/api/org/org_class_group/save', params);
                    },
                    // 删除课程分组
                    deleteClassGroup: function (params) {
                        return ajaxService.send('/api/org/org_class_group/delete', params);
                    },
                    // 上传视频成功后回调
                    uploadVideoCallback: function (params) {
                        return ajaxService.send('/api/tcenter/foundation/storage/upload-video-callback', params);
                    },
                };
            }
        ]);
});
/**
 * @file 新建分组弹窗
 * @author niejianhui
 */
define('module/main/videoCourseEdit/addGroupDialog/controller',['require','cc/form/Validator'],function (require) {
    'use strict';
    var Validator = require('cc/form/Validator');

    function Controller($scope, videoCourseEditService, utilService , tipsService) {
        var formContainer = $('.new-group-form');
        $scope.groupName = null;

        //新建分组保存
        $scope.save  = function () {
            if (formContainer.validator.validate()) {
                if($scope.groupName !== '默认分组') {
                    videoCourseEditService
                        .saveClassGroup({
                            name: $scope.groupName
                        })
                        .then(function (response) {
                            tipsService.show({
                                type: 'success',
                                content: '保存成功'
                            });
                            $scope.dialog.dismiss(response.data.id);
                        });
                }
                else {
                    utilService
                        .showMessage({
                            title: '',
                            content: '分组名称不能为‘默认分组’',
                            okBtnText: '确定',
                            hideCancel: true
                        });
                }
            }
        };

        //取消新建
        $scope.cancel = function () {
            if ($scope.groupName) {
                utilService
                    .showMessage({
                        title: '',
                        content: '是否确定放弃新增课程分组？',
                        okBtnText: '确定',
                        cancelBtnText: '取消',
                        hideCancel: false,
                        okHandler: function () {
                            $scope.dialog.close();
                        }
                    });
            }
            else {
                $scope.dialog.close();
            }
        };

        //form校验init
        var initForm = function (container) {
            var validateOptions = {
                realtime: true,
                mainElement: container,
                validateOnBlur: true,
                fields: {
                    name: {
                        rules: {
                            required: true,
                            maxlength: 10
                        },
                        errors: {
                            required: '请输入分组名称',
                            maxlength: '最大长度长为 10 字'
                        }
                    }
                }
            };
            // 初始化表单校验
            var validator =  new Validator(validateOptions);
            container.validator = validator;
        };

        initForm(formContainer);
    }

    Controller.$inject = [
        '$scope', 'videoCourseEditService', 'utilService', 'tipsService'
    ];
    return Controller;
});

/**
 * @file 选择课程分组弹窗
 * @author niejianhui
 */
define('module/main/videoCourseEdit/chooseGroupDialog/controller',['require','module/main/videoCourseEdit/addGroupDialog/controller'],function (require) {
    'use strict';
    function Controller($scope, videoCourseEditService,
                        utilService, dialog, tipsService, groupId) {

        $scope.groupInfo = {
            groupId: groupId || null,
            groupList: null,
            defaultGroupId: null //默认分组id
        };

        //获取班级分组列表
        var getGroups = function () {
            videoCourseEditService
                .getClassGroup()
                .then (function (response) {
                    $scope.groupInfo.groupList = response.data;
                    $scope.groupInfo.defaultGroupId = response.data[0].id;
                    $scope.groupInfo.groupId = $scope.groupInfo.groupId || response.data[0].id;
                });
        };

        //根据id获取分组详情
        var getGroup = function (id) {
            videoCourseEditService
                .getClassGroupById({
                    id: id
                })
                .then (function (response) {
                    passGroupInfo($scope.groupInfo.groupId, response.data.name);
                });
        };

        //删除分组
        $scope.deleteGroup = function (id) {
            utilService
                .showMessage({
                    title: '',
                    content: '确定删除此分组吗？',
                    okBtnText: '删除',
                    cancelBtnText: '取消',
                    hideCancel: false,
                    okHandler: function () {
                        videoCourseEditService
                            .deleteClassGroup({
                                id: id
                            })
                            .then (function () {
                                getGroups();
                                tipsService.show({
                                    type: 'success',
                                    content: '删除成功'
                                });
                            });
                    }
                });
        };

        //新建分组
        $scope.addGroup = function () {
            dialog.open({
                title: '请输入新的分组名称',
                controller: require('module/main/videoCourseEdit/addGroupDialog/controller'),
                width: 313,
                skinClass: 'add-group-dialog',
                templateUrl: 'app/module/main/videoCourseEdit/addGroupDialog/tpl.html'
            })
            .then(function (newGroupId) {
                getGroups();
                $scope.groupInfo.groupId = newGroupId;
            });
        };

        //往父亲传分组id和name
        var passGroupInfo = function (id, name) {
            var param = {
                groupId: id,
                name: name
            };
            $scope.dialog.dismiss(param);
        };

        //取消分组
        $scope.cancel = function () {
            $scope.dialog.close();
        };

        //完成分组选择
        $scope.done = function () {
            getGroup($scope.groupInfo.groupId);
        };
        getGroups();
    }

    Controller.$inject = [
        '$scope', 'videoCourseEditService', 'utilService',
        'dialog', 'tipsService', 'groupId'
    ];
    return Controller;
});

/**
 * @file 选择删除弹窗
 * @author niejianhui
 */
define('module/main/videoCourseEdit/selectDeleteDialog/controller',[],function () {
    'use strict';
    function Controller($rootScope, $scope, params, dialog, utilService) {
        
        function initView() {
            $scope.courseMode = params.courseMode;
            $scope.courseNumber = params.courseNumber;
            $scope.chapterSections = $.extend(true, [], params.chapterSections);
            $scope.sectionList = $.extend(true, [], params.sectionList);
        }

        initView();

        //上报函数
        function reportDeleteActions(params) {
            var typeArryMap = {
                'chapter': 'course_video_chapter_mode',
                'multiple': 'course_video_section_mode'
            };
            var defaultParams = {
                user_number: $rootScope.user.user_number,
                course_number: $scope.courseNumber || '',
                type: typeArryMap[$scope.courseMode]
            };
            var data = $.extend({}, defaultParams, params);
            WAT.send('http://click.genshuixue.com/gs.gif', data);
        }

        //处理章下的课节
        function toggleSedctionsSelected(chapter) {
            $.each(chapter.sectionList, function (index, item) {
                item.selected = chapter.selected;
            });
        }

        //处理节所属的章
        function toggleChapterSelected(selected, chapter) {
            if (chapter.selected !== selected) {
                var count = 0;
                $.each(chapter.sectionList, function (index, item) {
                    if (item.selected === selected) {
                        count++;
                    }
                });
                if (selected && count === chapter.sectionList.length) {
                    chapter.selected = true;
                }
                else if (!selected) {
                    chapter.selected = false;
                }
            }
        }

        //切换选中态
        $scope.toggleSelect = function (item, chapter) {
            item.selected = !item.selected;
            if (item.chapterIndex !== undefined) {
                toggleSedctionsSelected(item);
            }
            else if (chapter !== undefined) {
                toggleChapterSelected(item.selected, chapter);
            }
            reportDeleteActions({stype: 'batch_delete_select'});
        };

        //挑选未被选中的节
        function chooseSectionList(sectionList) {
            var newSectionList = [];
            $.each(sectionList, function (index, item) {
                if (!item.selected) {
                    newSectionList.push(item);
                }
            });
            return newSectionList;
        }

        //是否选中了课节
        function hasSelectedSection(sectionList) {
            var hasSelectedItem = false;
            $.each(sectionList, function (index, item) {
                if (item.selected) {
                    hasSelectedItem = true;
                    return false;
                }
            });
           return hasSelectedItem;
        }

        //是否选中了章节
        function hasSelectedChapterSection() {
            var hasSelectedItem = false;
            $.each($scope.chapterSections, function (index, chapter) {
                if (hasSelectedSection(chapter.sectionList)) {
                    hasSelectedItem = true;
                    return false;
                }
            });
           return hasSelectedItem;
        }

        //创建弹窗成功关闭的回调数据
        function createDialogDismissData() {
            if ($scope.chapterSections.length) {
                var chapterSections = [];
                $.each($scope.chapterSections, function (index, chapter) {
                    if (!chapter.selected) {
                        var chapterItem = {
                            chapterId: chapter.chapterId,
                            chapterIndex: chapter.chapterIndex,
                            isEditing: false,
                            showSectionList: false,
                            name: chapter.name,
                            selected: false,
                            sectionList: chooseSectionList(chapter.sectionList)
                        };
                        chapterSections.push(chapterItem);
                    }
                });
                $scope.dialog.dismiss(chapterSections);
            }
            else {
                $scope.dialog.dismiss(chooseSectionList($scope.sectionList));
            }
        }

        //执行删除操作
        function doDelete() {
            utilService
            .showMessage({
                title: '温馨提示',
                content: '删除后，课节及其视频将同步删除，确定删除所选课节吗？',
                hideCancel: false,
                okHandler: function () {
                    createDialogDismissData();
                    reportDeleteActions({stype: 'batch_delete_select_yes'});
                }
            });
        }

        //确认删除
        $scope.confirmDelete = function () {
            if ($scope.courseMode === 'multiple') {
                if (!hasSelectedSection($scope.sectionList)) {
                    utilService.showMessage('未选中要删除的课节');
                    return;
                }
            }
            else {
                if (!hasSelectedChapterSection()) {
                    utilService.showMessage('未选中要删除的章节');
                    return;
                }
            }
            doDelete();
        };

        //取消删除
        $scope.cancelDelete = function () {
            $scope.dialog.close();
            reportDeleteActions({stype: 'batch_delete_select_no'});
        };
    }

    Controller.$inject = [
        '$rootScope', '$scope', 'params', 'dialog', 'utilService'
    ];

    return Controller;
});

/**
 * @file 选择要移动到的课节索引 controller
 * @author niejianhui
 */
define('module/main/videoCourseEdit/removeIndexDialog/controller',[],function () {
    'use strict';
    Controller.$inject = ['$scope', 'params', 'utilService', 'tipsService'];
    function Controller($scope, params, utilService, tipsService) {
        var validateOptions, validator;
        function initView () {
            $scope.currentIndex = params.currentIndex;
            $scope.sectionsCount = params.sectionsCount;
        }

        initView();

        $scope.confirmUpdate = function  () {
            var removeIndex = $scope.removeIndex;
            var sectionsCount = $scope.sectionsCount;
            if (removeIndex < 1 || removeIndex > sectionsCount) {
                utilService.showMessage('请输入1-' + sectionsCount + '的有效数字');
            }
            else {
                //这里减一转换成索引
                $scope.dialog.dismiss({
                    removeIndex: removeIndex - 1
                });
            }
        };

        $scope.cancelUpdate = function () {
            setTimeout(function () {
                $scope.dialog.close();
            }, 200);
        };
    }

    return Controller;
});

/**
 * @file 整体排序弹窗
 * @author niejianhui
 */
define('module/main/videoCourseEdit/sortAllDialog/controller',['require','cc-config/helper/Draggable','cc/util/rect','module/main/videoCourseEdit/removeIndexDialog/controller'],function (require) {
    'use strict';
    var Draggable = require('cc-config/helper/Draggable');
    var rectUtil = require('cc/util/rect');

    function Controller($rootScope, $scope, params, dialog, utilService, $timeout) {

        var chapterSectionsCountArr;

        //更新章节统计的数组
        function refreshChapterSectionsCount() {
            chapterSectionsCountArr = [];
            if ($scope.chapterSections.length) {
                $.each($scope.chapterSections, function (index, item) {
                    chapterSectionsCountArr.push(item.sectionList.length);
                });
            }
        }

        //上报函数
        function reportSortActions(params) {
            var typeArryMap = {
                'chapter': 'course_video_chapter_mode',
                'multiple': 'course_video_section_mode'
            };
            var defaultParams = {
                user_number: $rootScope.user.user_number,
                course_number: $scope.courseNumber || '',
                type: typeArryMap[$scope.courseMode]
            };
            var data = $.extend({}, defaultParams, params);
            WAT.send('http://click.genshuixue.com/gs.gif', data);
        }

        function initView() {
            $scope.courseMode = params.courseMode;
            $scope.courseNumber = params.courseNumber;
            $scope.chapterSections = $.extend(true, [], params.chapterSections);
            $scope.sectionList = $.extend(true, [], params.sectionList);
            refreshChapterSectionsCount();
        }

        initView();

        // 累加前几项
        function sumSections(end) {
            var sum  = 0;
            for (var i = 0; i <= end; i++) {
                sum += chapterSectionsCountArr[i];
            }
            return sum;
        }

        // 计算章的索引
        function calculateChapterIndex(index) {
            var chapterIndex = 0;
            while (index > sumSections(chapterIndex)) {
                chapterIndex++;
            }
            return chapterIndex;
        }

        // 计算节的索引
        function calculateSectionIndex(chapterIndex, index) {
            return index - sumSections(chapterIndex - 1);
        }

        /*
        $timeout(function () {
            //拖动
            var draggingElement;

            var afterIndex;
            var beforeIndex;
            var elementList;
            var rectList;
            var element = $('.sortall-dialog').find('.content');
            var containerElement = element.find('.list-container');

            var activeClass = 'active';
            var brotherClass = 'brother';
            var activeParentClass = 'active-parent';
            var mainSelector = '.section-box';

            var refreshList = function () {
                beforeIndex = afterIndex = null;
                elementList = element.find(mainSelector);
                rectList = rectUtil.makeRectList(elementList, containerElement);
            };
            refreshList();

            var draggable = new Draggable({
                mainElement: element,
                mainSelector: mainSelector,
                containerElement: containerElement,
                includeSelector: ['.icon-ic_move'],
                draggingClass: 'dragging',
                onpick: function (e, data) {
                    draggingElement = data.mainElement;
                    draggingElement.addClass(activeClass);
                    draggingElement
                    .width(
                        draggingElement.width()
                    );

                    var parentElement = draggingElement.closest('.section-item');
                    parentElement
                    .addClass(activeParentClass)
                    .height(
                        parentElement.height()
                    );
                    refreshList();
                },
                onbeforedrag: function (e, data) {
                    beforeIndex = elementList.index(draggingElement);
                    afterIndex = null;
                },
                ondrag: function (e, data) {
                    var rect = {
                        left: data.left,
                        top: data.top,
                        width: rectList[beforeIndex].width,
                        height: rectList[beforeIndex].height
                    };
                    var list = rectUtil.sortByIntersectionArea(rect, rectList);
                    if ($.type(afterIndex) === 'number') {
                        elementList
                            .eq(afterIndex)
                            .removeClass(brotherClass);
                    }

                    var max = list[0].index !== beforeIndex
                        ? list[0]
                        : list[1];
                    if (max) {
                        var area = rect.width * rect.height;
                        // 随便大于一个阈值就行（比如 0.1）
                        if (area > 0 && max.area / area > 0.1) {
                            afterIndex = max.index;
                            elementList
                                .eq(afterIndex)
                                .addClass(brotherClass);
                            return;
                        }
                    }

                    afterIndex = null;
                },
                onafterdrag: function (e, data) {
                    if (afterIndex === null) {
                        afterIndex = beforeIndex;
                    }
                    $rootScope.safeApply(function () {
                        //多节模式下的拖动
                        if ($scope.courseMode === 'multiple') {
                            var dragItem = $scope.sectionList.splice(beforeIndex, 1);
                            $scope.sectionList.splice(afterIndex, 0, dragItem[0]);
                        }
                        else {
                            //计算拖动前后章节的索引
                            var beforeChapterIndex, beforeSectionIndex, afterChapterIndex, afterSectionsIndex, currentItem;
                            beforeChapterIndex = calculateChapterIndex(beforeIndex + 1);
                            afterChapterIndex = calculateChapterIndex(afterIndex + 1);
                            beforeSectionIndex = calculateSectionIndex(beforeChapterIndex, beforeIndex);
                            afterSectionsIndex = calculateSectionIndex(afterChapterIndex, afterIndex);
                            //章内拖动   排序
                            if (beforeChapterIndex === afterChapterIndex) {
                                currentItem = $scope.chapterSections[beforeChapterIndex].sectionList.splice(beforeSectionIndex, 1);
                                $scope.chapterSections[beforeChapterIndex].sectionList.splice(afterSectionsIndex, 0, currentItem[0]);
                            }
                            //章之间拖动  移动
                            else {
                                currentItem = $scope.chapterSections[beforeChapterIndex].sectionList.splice(beforeSectionIndex, 1);
                                $scope.chapterSections[afterChapterIndex].sectionList.splice(afterSectionsIndex, 0, currentItem[0]);
                            }
                        }

                        refreshChapterSectionsCount();
                        refreshList();
                        var staticStyle = {
                            'position': 'relative',
                            'top': 0,
                            'left': 0
                        };
                        elementList.removeClass(brotherClass).css(staticStyle).removeAttr('style');
                    });
                },
                ondrop: function (e, data) {
                    draggingElement = data.mainElement;
                    draggingElement.removeClass(activeClass);
                    draggingElement
                    .width(
                        draggingElement.width()
                    );
                    var parentElement = draggingElement.closest('.section-item');
                    parentElement
                    .removeClass(activeParentClass)
                    .height('');
                    reportSortActions({stype: 'batch_sort_drag'});
                }
            });
        });
        */

        /*
         * 下移
         *
         * @param {number} sectionIndex 移动项的节索引
         * @param {number=} chapterIndex 移动项的章索引 - 仅支持章内移动
         */
        $scope.moveDown = function (sectionIndex, chapterIndex) {
            if ($scope.courseMode === 'multiple') {
                var moveItem = $scope.sectionList.splice(sectionIndex, 1);
                $scope.sectionList.splice((sectionIndex + 1), 0, moveItem[0]);
            }
            else {
                var moveItem = $scope.chapterSections[chapterIndex].sectionList.splice(sectionIndex, 1);
                $scope.chapterSections[chapterIndex].sectionList.splice((sectionIndex + 1), 0, moveItem[0]);
            }
        };

        /*
         * 下移
         *
         * @param {number} sectionIndex 移动项的节索引
         * @param {number=} chapterIndex 移动项的章索引 - 仅支持章内移动
         */
        $scope.moveUp = function (sectionIndex, chapterIndex) {
            if ($scope.courseMode === 'multiple') {
                var moveItem = $scope.sectionList.splice(sectionIndex, 1);
                $scope.sectionList.splice((sectionIndex - 1), 0, moveItem[0]);
            }
            else {
                var moveItem = $scope.chapterSections[chapterIndex].sectionList.splice(sectionIndex, 1);
                $scope.chapterSections[chapterIndex].sectionList.splice((sectionIndex - 1), 0, moveItem[0]);
            }
        };

        // 默认不展示章列表
        $scope.showChapterList = false;
        $scope.toggleChapterList = function () {
            $scope.showChapterList = true;
        };

        /*
         * 多选课节 - checkbox框
         *
         * @param {number} chapterIndex 选中课节对应章索引
         * @param {number} sectionIndex 选中课节的索引
         */
        $scope.selectedSection = {};
        $scope.toggleSelectedSection = function (chapterIndex, sectionIndex) {

            if ($scope.selectedSection[chapterIndex]) {
                var exist = $scope.selectedSection[chapterIndex].indexOf(sectionIndex);
                if (exist === -1) {
                    $scope.selectedSection[chapterIndex].push(sectionIndex);
                }
                else {
                    $scope.selectedSection[chapterIndex].splice(exist, 1);
                }
            }
            else {
                $scope.selectedSection[chapterIndex] = [sectionIndex];
            }
        };

        /*
         * 跨章移动课节
         *
         * @param {number} targetChapter 目标章索引
         */
        $scope.throughChapterMove = function (targetChapter) {
            if ($.isEmptyObject($scope.selectedSection)) {
                utilService
                .showMessage({
                    title: '温馨提示',
                    content: '请选择要移动的课节'
                });
            }
            else {
                // 遍历已选课节列表 - 章
                for (var chapterIndex in $scope.selectedSection) {
                    if (+chapterIndex === +targetChapter) {
                        // 目标章内课节不予移动
                        continue;
                    }
                    else {
                        // 为忽略用户点选顺序，对已选课节重排序
                        var tempSectionList = $scope.selectedSection[chapterIndex].sort();

                        // 遍历章内课节
                        for (var i = 0, len = tempSectionList.length; i < len; i++) {
                            // 提示：被移动之后索引会变更
                            var moveItem = $scope.chapterSections[chapterIndex].sectionList.splice(tempSectionList[i] - i, 1);
                            $scope.chapterSections[targetChapter].sectionList.push(moveItem[0]);
                        }
                    }
                }
                // 清空已存储准备移动的项目
                $scope.selectedSection = {};
            }
            $scope.showChapterList = false;
            // 移动完成后，清空所有选中状态
            $.each($scope.chapterSections, function (index, chapter) {
                $.each(chapter.sectionList, function (i, section) {
                    section.checkedInput = false;
                });
            });
        };

        // 保存排序
        $scope.saveSort = function () {
            // 清空已存储准备移动的项目
            $.each($scope.chapterSections, function (index, chapter) {
                $.each(chapter.sectionList, function (i, section) {
                    section.checkedInput = false;
                });
            });

            if ($scope.courseMode === 'multiple') {
                $scope.dialog.dismiss($scope.sectionList);
            }
            else {
                $scope.dialog.dismiss($scope.chapterSections);
            }
            reportSortActions({stype: 'batch_sort_drag_save'});
        };

        // 取消排序
        $scope.cancelSort = function () {
            // 清空已存储准备移动的项目
            $.each($scope.chapterSections, function (index, chapter) {
                $.each(chapter.sectionList, function (i, section) {
                    section.checkedInput = false;
                });
            });

            $scope.dialog.close();
            reportSortActions({stype: 'batch_sort_drag_cancel'});
        };

        //移动到第几节
        $scope.moveTo = function (index, chapterIndex) {
            var sectionsCount = $scope.sectionList.length;
            if (chapterIndex !== undefined) {
                sectionsCount = $scope.chapterSections[chapterIndex].sectionList.length;
            }
            dialog.open({
                controller: require('module/main/videoCourseEdit/removeIndexDialog/controller'),
                width: 300,
                resolve: {
                    params: function () {
                        return {
                            sectionsCount: sectionsCount,
                            currentIndex: index
                        };
                    }
                },
                skinClass: 'remove-index-dialog',
                templateUrl: 'app/module/main/videoCourseEdit/removeIndexDialog/tpl.html'
            })
            .then(function (param) {
                var removeIndex = param.removeIndex;
                var moveItem;
                if ((index === removeIndex) || (index - removeIndex === 1)) {
                    //和当前课节重复 不移动
                    return false;
                }
                else if (index - removeIndex > 1) {
                    //移动到当前课节之后 由于移除的课节在后 要加一
                    removeIndex++;
                }
                //章节模式和多节模式分别处理
                if (chapterIndex !== undefined) {
                    moveItem = $scope.chapterSections[chapterIndex].sectionList.splice(index, 1)[0];
                    $scope.chapterSections[chapterIndex].sectionList.splice(removeIndex, 0, moveItem);
                }
                else {
                    moveItem = $scope.sectionList.splice(index, 1)[0];
                    $scope.sectionList.splice(removeIndex, 0, moveItem);
                }
            });
        };

    }

    Controller.$inject = [
        '$rootScope', '$scope', 'params', 'dialog', 'utilService', '$timeout'
    ];

    return Controller;
});

/**
 * @file videoCourseEdit controller
 * @author niejianhui
 * @date 2017/08/15
 */

define('module/main/videoCourseEdit/controller',['require','./service','cc-config/form/Validator','cc/util/localStorage','module/main/videoCourseEdit/chooseGroupDialog/controller','module/main/videoCourseEdit/selectDeleteDialog/controller','module/main/videoCourseEdit/sortAllDialog/controller'],function (require) {
    'use strict';
    require('./service');
    var Validator = require('cc-config/form/Validator');
    var localStorage = require('cc/util/localStorage');

    angular.module('Manage.videoCourseEdit.controller', [
            'Manage.services',
            'Manage.videoCourseEdit.service'
        ])
        .controller('VideoCourseEditCtrl', ['$rootScope', '$scope', 'videoCourseEditService',
        'utilService', '$stateParams', 'dialog', 'uploaderService', '$interval', 'userInfo',
            function ($rootScope, $scope, videoCourseEditService,
                utilService, $stateParams, dialog, uploaderService, $interval, userInfo) {
                // if (location.host.indexOf('8108') < 0) {
                //     document.domain = 'genshuixue.com';
                // }

                var validator;
                var cacheCourseKey = 'editVideoCourse';
                //是否第一次切换课程模式
                var isFirstToggleMode = true;
                //前一次的模式 防止重复触发事件
                var preMode = '';
                //监听删除草稿的postMessage
                window.addEventListener('message', function (event) {
                    if ((event.origin.indexOf('genshuixue.com') < 0)
                        && (event.origin.indexOf('baijiahulian.com') < 0)
                        && (event.origin.indexOf('8108') < 0)) {
                        return;
                    }
                    var data = JSON.parse(event.data);
                    if (data && data.action === 'deleteCacheCourse') {
                        localStorage.remove(cacheCourseKey);
                    }
                    else if (data && data.action === 'getCacheCourse') {
                        var cacheVideoCourse = localStorage.get(cacheCourseKey);
                        window.parent.postMessage(cacheVideoCourse || '', '*');
                    }
                });

                // 获取视频课列表页的url
                function getVideoCourseListUrl() {
                    var env = utilService.getEnvName();
                    var orgUrlStr = '.genshuixue.com/main.html#/courses/videoCourseList';
                    var skipUrl;
                    if (+$scope.user.user_role === 6) {
                        if (env === 'www') {
                            skipUrl = 'http://i' + orgUrlStr;
                        }
                        else if (env === 'beta') {
                            skipUrl = 'http://beta-i' + orgUrlStr;
                        }
                        else {
                            skipUrl = 'http://test-i.ctest' + orgUrlStr;
                        }
                    }
                    else {
                        skipUrl = '/detail.html#/courseList/videocourse';
                    }
                    return skipUrl;
                }

                // 获取自动保存时间字符串
                function getAutoSaveTimeStr() {
                    var date = new Date();
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    if (hours < 10) {
                        hours = '0' + hours;
                    }
                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }
                    $scope.autoSaveTime = hours + ':' + minutes;
                }

                // 上报函数
                function doReport(params) {
                    var typeArryMap = {
                        'chapter': 'course_video_chapter_mode',
                        'multiple': 'course_video_section_mode'
                    };
                    var defaultParams = {
                        user_number: $scope.user.user_number,
                        course_number: $scope.courseNumber || '',
                        type: typeArryMap[$scope.courseMode]
                    };
                    var data = $.extend({}, defaultParams, params);
                    WAT.send('http://click.genshuixue.com/gs.gif', data);
                }

                // 初始化左侧锚点导航
                function initSideNav() {
                    $scope.sideNavOptions = {
                        sideMenus: [
                            {
                                text: '基础信息',
                                boxClass: 'basic-info',
                            },
                            {
                                text: '课程封面',
                                boxClass: 'photo-upload'
                            },
                            {
                                text: '图文详情',
                                boxClass: 'detail-intro'
                            },
                            {
                                text: '视频上传',
                                boxClass: 'videos-upload'
                            }
                        ],
                        safeDistance: 70
                    };
                }

                // 初始化表单验证
                function initValidator() {
                    var validateOptions = {
                        mainElement: $('.info-box'),
                        validateOnBlur: true,
                        fields: {
                            courseName: {
                                rules: {
                                    required: true,
                                    maxlength: 26
                                },
                                errors: {
                                    required: '请填写课程名称',
                                    maxlength: '最大长度为26个字'
                                }
                            },
                            courseSubject: {
                                validateOnBlur: false,
                                rules: {
                                    required: true
                                },
                                errors: {
                                    required: '请选择课程所属科目',
                                }
                            },
                            coursePrice: {
                                rules: {
                                    required: true,
                                    // pattern: /^(\d)+(\.)?(\d)?(\d)?$/,
                                    pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
                                    min: 0,
                                    max: 999999.99
                                },
                                errors: {
                                    required: '请填写课程价格',
                                    pattern: '仅支持0-999999的两位小数哦',
                                    min: '最低 0 元',
                                    max: '最高 999999 元'
                                }
                            },
                            expireDays: {
                                rules: {
                                    required: true,
                                    pattern: /(^[1-9])[0-9]*$/,
                                    // min: 1,
                                    max: 730,
                                },
                                errors: {
                                    required: '请填写视频观看期限',
                                    pattern: '请输入1-730的有效的数字',
                                    // min: '有效期最短为1天',
                                    max: '有效期最长为730天',

                                }
                            },
                            definedNumber: {
                                rules: {
                                    pattern: /^[a-zA-Z\d]*$/
                                },
                                errors: {
                                    pattern: '编码只支持字母和数字'
                                }
                            }
                        }
                    };
                    validator = new Validator(validateOptions);
                }

                // 添加标题项
                function addTitleItem(item) {
                    var titleItem = {
                        type: 'title',
                        options: {
                            text: item.text
                        }
                    };
                    $scope.richEditorOptions.editorList.push(titleItem);
                }

                // 添加正文项
                function addBodyItem(item) {
                    var bodyItem = {
                        type: 'body',
                        options: {
                            text: item.text,
                            fontWeight: item.font_weight,
                            fontSize: item.font_size,
                            textAlign: item.text_align,
                            color: item.color,
                        }
                    };
                    $scope.richEditorOptions.editorList.push(bodyItem);
                }

                // 添加图片
                function addPhotoItem(item) {
                    var photoItem = {
                        type: item.type,
                        options: {
                            storageId: item.storage_id,
                            url: item.url,
                            refer_url: item.refer_url || ''
                        }
                    };
                    $scope.richEditorOptions.editorList.push(photoItem);
                }
                // 添加音频
                function addAudioItem(item) {
                    var audioItem = {
                        type: item.type,
                        options: {
                            storageId: item.storage_id,
                            url: item.url,
                        }
                    };
                    $scope.richEditorOptions.editorList.push(audioItem);
                }

                // 添加视频项
                function addVideoItem(item) {
                    var videoItem = {
                        type: 'video',
                        options: {
                            videoId: item.video_id,
                            coverUrl: item.cover_url,
                        }
                    };
                    $scope.richEditorOptions.editorList.push(videoItem);
                }

                // 初始化富文本编辑器信息
                function initRichEditorOpts(intro) {
                    $scope.richEditorOptions.style = intro.style;
                    $scope.richEditorOptions.editorList = [];
                    $.each(intro.items, function (index, item) {
                        switch(item.type) {
                            case 'title':
                                addTitleItem(item);
                                break;
                            case 'body':
                                addBodyItem(item);
                                break;
                            case 'video':
                                addVideoItem(item);
                                break;
                            case 'photo':
                                addPhotoItem(item);
                                break;
                            case 'audio':
                                addAudioItem(item);
                                break;
                        }
                    });
                }

                // 初始化课节
                function initSectionList(sectionList) {
                    var sectionListArr = [];
                    $.each(sectionList, function (index, item) {
                        var sectionItem = {
                            isEditing: false,
                            selected: false,
                            name: item.name,
                            videoName: item.video_name,
                            enableTrial: item.enable_trial ? 'enable' : 'disable',
                            trialMinutes: item.trial_minutes,
                            sectionId: item.section_id,
                            videoId: item.video_id
                        };
                        sectionListArr.push(sectionItem);
                    });
                    return sectionListArr;
                }

                // 初始化章节
                function initChapterSections(chapterSections) {
                    $.each(chapterSections, function (index, chapter) {
                        var chapterItem = {
                            isEditing: false,
                            selected: false,
                            name: chapter.name,
                            chapterIndex: index,
                            chapterId: chapter.chapter_id,
                            sectionList: initSectionList(chapter.section_list)
                        };
                        $scope.chapterSections.push(chapterItem);
                    });
                }

                // 初始化视频课信息
                function initVideoCourses(data) {
                    if (data.course.course_mode === 'multiple') {
                        var chapter0 = data.chapter_sections[0];
                        if (chapter0 && chapter0.section_list.length) {
                            $scope.sectionList = initSectionList(chapter0.section_list);
                            $scope.chapter0Name = chapter0.name;
                            $scope.chapter0Id = chapter0.chapter_id;
                        }
                    }
                    else if (data.chapter_sections.length) {
                        initChapterSections(data.chapter_sections);
                    }
                }

                // 初始化帮助信息
                function initHelpInfo() {
                     //基础信息提示信息
                     $scope.baseInfoHelpOptions = {
                        content: '1. 课程名称：准确的课程标题可以让学生迅速了解您的课程。比如 “水彩画零基础速成” 比 “画画” 更容易吸引学员<br/>'
                                  + '2. 科目：使用搜索功能可以帮你更快地找到目标科目，建议选择主营科目，更好的发挥个人优势<br/>'
                                  + '3. 课程价格：指的是课程售价，适当的价格可以促进课程的销售。免费课请直接设置价格为0元<br/>'
                                  + '4. 授课语言：您授课所使用的语言，便于给学生提供参考',
                        width: 760,
                        position: 'bottom'
                    };
                    //图片介绍提示信息
                    $scope.introPicHelpOptions = {
                        content: '1. 您可以上传展示教学场地、作品或其他能体现课程特色的高质量照片，这有助于给学生留下良好印象<br/>'
                                  + '2. 精美的封面图片会获得包括聚惠学在内的更多展示机会<br/>'
                                  + '3. 请上传不超过5M、格式为jpg、jpeg、png的图片，最多上传12张封面，注意不能出现广告信息和水印哦<br/>'
                                  + '<div>参考示例</div>'
                                  + '<img src="http://img.gsxservice.com/0cms/d/file/content/2016/07/578c45f5b34e0.png@1e_173w_98h_1c_0i_1o_90Q_1x.jpeg">'
                                  + '<img src="http://img.gsxservice.com/0cms/d/file/content/2016/07/578c45f5d834a.png@1e_173w_98h_1c_0i_1o_90Q_1x.jpeg">',
                        width: 760,
                        position: 'bottom'
                    };
                    //视频上传提示信息
                    $scope.videoUploadHelpOptions = {
                        content: '1. 课程模式：请根据实际课程需要选择课节模式或章节模式<br/>'
                                  + '2. 视频上传：请上传清晰度较好的视频，大小不要超过2G<br/>'
                                  + '3. 课节名称：清晰明了的课节名称可以帮助学生更好的了解课程结构<br/>'
                                  + '4. 试听选择：收费课程可根据实际情况选择1到2节试听课，帮助您吸引更多学生上课',
                        width: 760,
                        position: 'bottom'
                    };
                    //图文详情提示信息
                    $scope.detailIntroHelpOptions = {
                        content: '1. 您可以简要地描述课程的适学人群、课程规划及特点等。适当的使用短视频、图片、音频将使课程详情更加富有吸引力，提高学生对教学质量的信任程度<br/>'
                                  + '2. 仅支持5M以内的jpg、png、jpeg格式图片，宽度最好不要超过760像素<br/>'
                                  + '3. 视频最大支持250MB，上传后需要最多3个小时左右进行转码，请您耐心等待<br/>'
                                  + '4. 请不要在内容中出现电话、QQ和个人网址哦',
                        width: 760,
                        position: 'bottom'
                    };
                }

                // 初始化授课语言下拉框
                function initLanguageDropdown(defaultValue) {
                    $scope.languageOptions = {
                        defaultValue: defaultValue,
                        onSelected: function (value) {
                            $scope.baseInfo.language = value;
                        }
                    };
                }

                // 格式化老师下拉框数据
                function formatOrgTeachers(orgTeachers) {
                    var arr = [];
                    $.each(orgTeachers, function(index, item) {
                        arr.push({
                            text: item.realname,
                            value: item.id
                        });
                    });
                    return arr;
                }

                // 初始化基础信息
                function initBaseInfo(course) {
                    $scope.baseInfo = {
                        courseName: course.name || '',
                        coursePrice: course.price || '',
                        expireDays: course.expire_days || 365,
                        language: course.language || 1,
                        teacherName: course.teacher_name || '',
                        teacherId: course.teacher_id || '',
                        groupName: course.group_name || '',
                        groupId: course.group_id || '',
                        definedNumber: course.defined_number || '',
                        modifyReasons: course.modify_reasons || ''
                    };
                }

                // 初始化老师选择下拉框
                function initTeacherSelectorOptions(defaultValue, orgTeachers) {
                    $scope.teacherSelectorOptions = {
                        defaultValue: defaultValue,
                        dataSource: formatOrgTeachers(orgTeachers),
                        onSelected: function (data) {
                            $scope.baseInfo.teacherId = data.value;
                            $scope.baseInfo.teacherName = data.text;
                        }
                    };
                }

                // 创建缓存课程的数据
                function createCacheData() {
                    var cacheCourse = {
                        baseInfo: $scope.baseInfo,
                        selectSubjectOpts: $scope.selectSubjectOpts,
                        chapterSections: $scope.chapterSections,
                        sectionList: $scope.sectionList,
                        richEditorOptions: $scope.richEditorOptions,
                        courseMode: $scope.courseMode,
                        covers: $scope.covers,
                        pathMark: $scope.pathMark
                    };
                    return cacheCourse;
                }

                // 每隔一分钟保存本地草稿
                function autoSaveCourse() {
                    var cacheData  = JSON.stringify(createCacheData());
                    localStorage.set(cacheCourseKey, cacheData);
                    getAutoSaveTimeStr();
                }

                // 初始化科目选择参数
                function initSelectSubjectOpts(subject) {
                    $scope.selectSubjectOpts.subjectId = subject.id || '';
                    $scope.selectSubjectOpts.subjectName = subject.name || '';
                    $scope.selectSubjectOpts.pathCrumbs = subject.path_crumbs || '';
                }

                // 初始化视频课节审核信息
                function initVideoCourseVerifyReasons(reasons) {
                    var str = '';
                    $.each(reasons, function (index, item) {
                        str +=  item.name + ':<br/>';
                        $.each(item.reasons, function (index1, item1) {
                            str +=  item1 + '<br/>';
                        });
                    });
                    $scope.videoCourseVerifyReasons = str;
                }

                // 初始化视频课图文详情的审核信息
                function initCourseDetailVerifyReasons(reasons) {
                    var str = '';
                    $.each(reasons, function (index, item) {
                        str +=  item + '<br/>';
                    });
                    $scope.courseDetailVerifyReasons = str;
                }

                // 初始化视频封面的审核信息
                function initCoverVerifyReasons(reasons) {
                    var str = '';
                    $.each(reasons, function (index, item) {
                        str +=  item + '<br/>';
                    });
                    $scope.coverVerifyReasons = str;
                }

                // 初始化视频课其他信息的审核信息
                function initCourseInfoVerifyReasons(reasons) {
                    var str = '';
                    $.each(reasons, function (index, item) {
                        if (item.id === 1709) {
                            initCourseDetailVerifyReasons(item.reasons);
                        }
                        else if (item.id === 1701) {
                            initCoverVerifyReasons(item.reasons);
                        }
                        else {
                            str +=  item.name + ':<br/>';
                            $.each(item.reasons, function (index1, item1) {
                                str +=  item1 + '<br/>';
                            });
                        }
                    });
                    $scope.courseInfoVerifyReasons = str;
                }


                // 初始化审核信息
                function  initVerifyReasons(verifyReasons) {
                    $.each(verifyReasons, function (index, item) {
                        switch(item.id) {
                            case 1710:
                                initVideoCourseVerifyReasons(item.children[0].children);
                                break;
                            case 1701:
                                initCourseInfoVerifyReasons(item.children);
                                break;
                        }
                    });
                }

                //初始化视频转码失败提示信息
                function initEncodeInfo(encodeInfo) {
                    $scope.encodeInfo = encodeInfo[0];
                    if (encodeInfo.length > 1) {
                        var str = '';
                        $.each(encodeInfo, function (index, item) {
                            str +=  item + ':<br/>';
                        });
                        $scope.encodeInfoToolTipOpt = {
                            content: str,
                            position: 'bottom',
                            width: 300
                        }
                    }
                }

                // 用后端数据初始化课程信息
                function initCourseInfoFromBackend() {
                    //富文本编辑器组件先初始化  故要先定义这个参数
                    $scope.richEditorOptions = {};
                    $scope.courseDetails = {
                        value: ''
                    };

                    videoCourseEditService
                        .getCourseInfo({
                            data: {
                                number: $scope.courseNumber
                            },
                            method: 'GET'
                        })
                        .then(function (response){
                            var data = response.data;
                            var course = data.course;
                            var subject = course.subject;
                            var orgTeachers = course.org_teachers;
                            var verifyReasons = data.verify_reasons;
                            var encodeInfo = data.encode_info;
                            $scope.verifyPassed = course.verify_passed;
                            $scope.displayStatus = course.display_status;
                            $scope.isNewCourse = course.is_new_course;
                            $scope.isPlaybackCourse = course.is_playback_course;
                            $scope.pathMark = subject.path_mark;

                            initBaseInfo(course);
                            initTeacherSelectorOptions(course.teacher_id, orgTeachers);

                            $scope.languageOptions.defaultValue = course.language;
                            $scope.covers = {
                                storage_id: course.cover.storage_id || '',
                                url: course.cover.url || ''
                            };
                            initSelectSubjectOpts(subject);
                            $scope.courseMode = preMode = course.course_mode;
                            isFirstToggleMode = false;
                            $scope.sectionList = [];
                            $scope.chapterSections = [];
                            if ($scope.isNewCourse) {
                                initRichEditorOpts(data.intro);
                            }
                            else {
                                $scope.courseDetails.value = course.detail || '';
                                $scope.$broadcast('umeditorcontentchange', course.detail || '');
                            }
                            initVideoCourses(data);
                            if (verifyReasons && verifyReasons.detail && verifyReasons.detail.children) {
                                initVerifyReasons(verifyReasons.detail.children);
                            }
                            if (encodeInfo.length > 0) {
                                initEncodeInfo(encodeInfo);
                            }
                        });
                }

                // 用后端数据初始化老师选下拉框
                function initTeacherselectFromBackend(teacherId) {
                    userInfo().then(function (response) {
                        if (+response.data.user_role === 6 ) {
                            //不传参数 这个接口只返回机构老师
                            videoCourseEditService
                                .getCourseInfo({
                                    data: {
                                        number: $scope.courseNumber
                                    },
                                    method: 'GET'
                                })
                                .then(function (response){
                                    var orgTeachers = response.data.course.org_teachers;
                                    initTeacherSelectorOptions(teacherId, orgTeachers);
                                });
                        }
                    });
                }

                // 用缓存草稿初始化课程信息
                function initCourseInfoFromCache(cacheVideoCourse) {
                    $scope.baseInfo = cacheVideoCourse.baseInfo;
                    var subjectOpts = cacheVideoCourse.selectSubjectOpts;
                    var obj = {
                        id: subjectOpts.subjectId,
                        name: subjectOpts.subjectName,
                        path_crumbs: subjectOpts.pathCrumbs,
                    };
                    initSelectSubjectOpts(obj);
                    $scope.covers = cacheVideoCourse.covers;
                    $scope.richEditorOptions = cacheVideoCourse.richEditorOptions;
                    $scope.courseMode = cacheVideoCourse.courseMode;
                    $scope.sectionList = cacheVideoCourse.sectionList;
                    $scope.chapterSections = cacheVideoCourse.chapterSections;
                    $scope.pathMark = cacheVideoCourse.pathMark;
                    initTeacherselectFromBackend($scope.baseInfo.teacherId);

                    if ($scope.courseMode ) {
                        preMode = $scope.course_mode;
                        isFirstToggleMode = false;
                    }
                }

                // 始化课程信息
                function initCourseInfo() {
                    initBaseInfo({});
                    initSelectSubjectOpts({});
                    initTeacherselectFromBackend('');
                    $scope.covers = {};
                    $scope.richEditorOptions = {
                        style: '',
                        editorList: []
                    };
                    $scope.courseMode = '';
                    $scope.sectionList = [];
                    $scope.chapterSections = [];
                    $scope.pathMark = '';
                }

                // 初始化一些参数
                function initView() {
                    $scope.courseNumber = $stateParams.courseNumber;
                    //是否有正在编辑的项
                    $scope.hasEditingItem = false;
                    //是否展示科目下拉
                    $scope.showSubjectMenu = false;
                    $scope.isNewCourse = true;
                    //是否是回放转视频课
                    $scope.isPlaybackCourse = false;
                    initSideNav();
                    initHelpInfo();
                    initLanguageDropdown(1);
                    // 正在上传的视频列表 - 为多视频上传准备
                    $scope.uploadingFiles = [];

                    //加载指令  故要先定义
                    $scope.selectSubjectOpts = {
                        onSelected: function (data) {
                            var pathCrumbs = data.pathCrumbs;
                            var name = pathCrumbs.split('>')[2];
                            $scope.selectSubjectOpts.subjectId = data.id;
                            $scope.selectSubjectOpts.pathCrumbs = pathCrumbs;
                            $scope.selectSubjectOpts.subjectName = name;
                            $scope.pathMark = data.pathMark;
                            $scope.showSubjectMenu = false;
                            // $scope.$broadcast(data.eventName, data);
                        }
                    };

                    //有课程number  请求后端数据 1是为了机构跨域访问localStorage加的特殊参数
                    if ($scope.courseNumber && +$scope.courseNumber !== 1) {
                        initCourseInfoFromBackend();
                    }
                    //没有课程number 初始化数据
                    else {
                        //如果有草稿 取草稿
                        var cacheVideoCourse = localStorage.get(cacheCourseKey);
                        if (cacheVideoCourse) {
                            initCourseInfoFromCache(JSON.parse(cacheVideoCourse));
                        }
                        else {
                            initCourseInfo();
                        }
                        $interval(autoSaveCourse, 60 * 1000);
                    }
                    initValidator();
                }

                initView();

                // 跳到列表页
                $scope.goToListPage = function () {
                    utilService.showMessage({
                        title: '温馨提示',
                        content: '您确定离开当前编辑页面吗?',
                        hideCancel: false,
                        okHandler: function () {
                            location.href = getVideoCourseListUrl();
                        }
                    });
                };

                // 选择课程分组
                $scope.chooseCourseGroup = function () {
                    dialog.open({
                        title: '将课程移动到以下分组：',
                        controller: require('module/main/videoCourseEdit/chooseGroupDialog/controller'),
                        width: 390,
                        resolve: {
                            groupId: function () {
                                return $scope.baseInfo.groupId;
                            }
                        },
                        skinClass: 'choose-group-dialog',
                        templateUrl: 'app/module/main/videoCourseEdit/chooseGroupDialog/tpl.html'
                    })
                    .then(function (param) {
                        $scope.baseInfo.groupId = param.groupId;
                        $scope.baseInfo.groupName = param.name;
                    });
                };

                // 上传课程封面
                $scope.uploadCourseCover = function () {
                    $scope.coverUploading = false;
                    var coverUploaderOpt = {
                        type: 'pic',
                        maxSize: 5,
                        data: {}
                    };
                    $scope.coverUploadParam = {
                        uploadedPercent: '0%'
                    };
                    uploaderService
                    .upload(coverUploaderOpt)
                    .then(function (response) {
                        var res = utilService.JSON.parse(response.responseText);
                        var data = res.data;
                        $scope.covers.storage_id = data.id;
                        $scope.covers.url = data.url;
                        $scope.coverUploading = false;
                    }, function (res) {
                        $scope.coverUploading = false;
                        utilService.showMessage(res.message || res.msg);
                    });
                    coverUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                        $rootScope.safeApply(function () {
                            $scope.coverUploadParam.uploadedPercent = data.percent;
                        });
                    });
                    coverUploaderOpt.uploader.on('uploadstart', function () {
                        $scope.coverUploading = true;
                    });
                };

                // 确认切换课程模式
                function confirmToogleCourseMode(mode) {
                    var content, okHandler, cancelHandler;
                    if (mode === 'multiple') {
                        content = '从章节模式切换为多节模式，默认会将所有章下的课节按顺序转为单课节。确认切换为多节模式？';
                        cancelHandler = function () {
                            $scope.courseMode = 'chapter';
                        };
                        okHandler = function () {
                            preMode = 'multiple';
                            //将章下的所有课节挪出来 清空章
                            $.each($scope.chapterSections, function (index, chapter) {
                                $.each(chapter.sectionList, function (index1, section) {
                                    $scope.sectionList.push(section);
                                });
                            });
                            $scope.chapterSections = [];
                        };
                    }
                    else {
                        content = '从多节模式切换为章节模式，默认会将已编辑的课节全部放在第一章下。确认切换为章节模式？';
                        cancelHandler = function () {
                            $scope.courseMode = 'multiple';
                        };
                        okHandler = function () {
                            preMode = 'chapter';
                            //将所有课节放到第一章下面 清空节
                            $scope.addNewChapter($scope.sectionList);
                            $scope.sectionList = [];
                        };
                    }
                    utilService
                        .showMessage({
                            title: '温馨提示 ',
                            skinClass: 'toggle-coursemode-dialog',
                            content: content,
                            hideCancel: false,
                            okBtnPosition: 'left',
                            okBtnText: '取消',
                            cancelBtnText: '确定',
                            cancelHandler: okHandler,
                            okHandler: cancelHandler
                        });
                }

                // 切换展示／隐藏科目下拉
                $scope.toggleShowSubjectMenu = function (e) {
                    $scope.showSubjectMenu = !$scope.showSubjectMenu;
                    e.stopPropagation();
                };
                // 点击其他区域隐藏
                $('body').click(function () {
                    if ($scope.showSubjectMenu) {
                        $rootScope.safeApply(function () {
                            $scope.showSubjectMenu = false;
                        });
                    }
                });

                // 更新章的索引
                function refreshChapterIndex() {
                    $.each($scope.chapterSections, function (index, item) {
                        item.chapterIndex = index;
                    });
                }

                // 切换课程模式
                $scope.swtichCourseMode = function (mode) {
                    if ($scope.hasEditingItem) {
                        utilService.showMessage('您有正在编辑的章节，请保存后再切换课程模式');
                        $scope.courseMode = preMode;
                        return false;
                    }
                    if (!isFirstToggleMode && preMode !== mode) {
                        confirmToogleCourseMode(mode);
                    }
                    else if (isFirstToggleMode) {
                        preMode = mode;
                        //首次选择课程模式初始化
                        if (mode === 'multiple') {
                            $scope.addNewSection();
                        }
                        else {
                            $scope.addNewChapter();
                        }
                    }
                    isFirstToggleMode = false;
                };

                // 编辑课节
                $scope.editSection = function (section) {
                    if ($scope.hasEditingItem) {
                        utilService.showMessage('您有正在编辑的章节，请完成编辑后再操作');
                        return;
                    }
                    section.isEditing = true;
                    $scope.hasEditingItem = true;
                };

                // 是否有正在编辑的课节
                function hasEditingSection(sectionList) {
                    var hasEditingItem = false;
                    $.each(sectionList, function (index, section) {
                        if (section.isEditing) {
                            hasEditingItem = true;
                            return false;
                        }
                    });
                    return hasEditingItem;
                }

                // 章下面是否有正在编辑的课节
                function hasEDitingChapterSection() {
                    var hasEditingItem = false;
                    $.each($scope.chapterSections, function (index, chapter) {
                        if (hasEditingSection(chapter.sectionList)) {
                            hasEditingItem = true;
                            return false;
                        }
                    });
                    return hasEditingItem;
                }

                // 监听是否展示添加新课节按钮的事件
                $scope.$on('hasEditingItemChange', function (e, data) {
                    //新增章下会有一个编辑态的课节
                    if (data.chapterIndex !== undefined) {
                        var sectionList = $scope.chapterSections[data.chapterIndex].sectionList;
                        $scope.hasEditingItem = hasEditingSection(sectionList);
                    }
                    else {
                        $scope.hasEditingItem = data.hasEditingItem;
                    }
                });

                // 监听是否有富文本编辑项在上传的事件
                $scope.$on('uploadingStatusChange', function (e, data) {
                    $scope.hasUploadingEditorItem = data;
                });

                // 删除单课节
                $scope.deleteSection = function (index, chapterIndex) {
                    utilService
                        .showMessage({
                            title: '温馨提示',
                            content: '您确认删除该课节吗？',
                            hideCancel: false,
                            okBtnText: '确定',
                            cancelBtnText: '取消',
                            okHandler: function () {
                                if (chapterIndex !== undefined) {
                                    $scope.chapterSections[chapterIndex].sectionList.splice(index, 1);
                                }
                                else {
                                    $scope.sectionList.splice(index, 1);
                                }
                            }
                        });
                };

                // 增加新课节
                $scope.addNewSection = function (chapterIndex) {
                    var sectionItem = {
                        isEditing: true,
                        selected: false,
                        name: '',
                        videoName: '',
                        enableTrial: 'disable',
                        trialMinutes: -1,
                        videoId: '',
                        sectionId: ''
                    };
                    if (chapterIndex !== undefined) {
                        $scope.chapterSections[chapterIndex].sectionList.push(sectionItem);
                    }
                    else {
                        $scope.sectionList.push(sectionItem);
                    }
                    $scope.hasEditingItem = true;
                };

                // 显示/隐藏 章下的节
                $scope.toggleShowList = function (chapter) {
                    chapter.showSectionList = !chapter.showSectionList;
                };

                // 编辑章
                $scope.editChapter = function (chapter) {
                    if ($scope.hasEditingItem) {
                        utilService.showMessage('您有正在编辑的章节，请完成编辑后再操作');
                        return;
                    }
                    chapter.showSectionList = false;
                    chapter.isEditing = true;
                    $scope.hasEditingItem = true;
                };

                // 添加章
                $scope.addNewChapter = function (sectionList) {
                    // 默认课节
                    var sectionItem = {
                        isEditing: true,
                        selected: false,
                        name: '',
                        videoName: '',
                        enableTrial: 'disable',
                        trialMinutes: -1,
                        videoId: '',
                        sectionId: ''
                    };
                    var chapterItem = {
                        chapterId: '',
                        selected: false,
                        showSectionList: false,
                        chapterIndex: $scope.chapterSections.length,
                        name: '',
                        isEditing: true,
                        sectionList: sectionList || [sectionItem]
                    };
                    $scope.chapterSections.push(chapterItem);
                    $scope.hasEditingItem = true;
                };

                // 删除章
                $scope.deleteChapter = function (chapterIndex) {
                    utilService
                    .showMessage({
                        title: '温馨提示',
                        content: '确定删除本章节及其所有课节？',
                        hideCancel: false,
                        okBtnText: '确定',
                        cancelBtnText: '取消',
                        okHandler: function () {
                            $scope.chapterSections.splice(chapterIndex, 1);
                            refreshChapterIndex();
                            $scope.hasEditingItem = hasEDitingChapterSection();
                        }
                    });
                };

                // 处理弹窗返回的结果
                function dealDialogDismissData(newList) {
                    if ($scope.courseMode === 'multiple') {
                        $scope.sectionList = newList;
                    }
                    else {
                        $scope.chapterSections = newList;
                        refreshChapterIndex();
                    }
                }

                // 选择删除
                $scope.selectDelete = function () {
                    doReport({stype: 'batch_delete'});
                    dialog.open({
                        title: '选择删除课节',
                        controller: require('module/main/videoCourseEdit/selectDeleteDialog/controller'),
                        width: 607,
                        resolve: {
                            params: function () {
                                return {
                                    courseMode: $scope.courseMode,
                                    courseNumber: $scope.courseNumber,
                                    chapterSections: $scope.chapterSections,
                                    sectionList: $scope.sectionList
                                };
                            }
                        },
                        skinClass: 'select-delete-dialog',
                        templateUrl: 'app/module/main/videoCourseEdit/selectDeleteDialog/tpl.html'
                    })
                    .then(function (newList) {
                        dealDialogDismissData(newList);
                    });
                };

                 // 整体排序
                 $scope.sortAll = function () {
                    doReport({stype: 'batch_sort'});

                    dialog.open({
                        draggable: false,
                        title: '调整课节顺序',
                        controller: require('module/main/videoCourseEdit/sortAllDialog/controller'),
                        width: 607,
                        resolve: {
                            params: function () {
                                return {
                                    courseMode: $scope.courseMode,
                                    courseNumber: $scope.courseNumber,
                                    chapterSections: $scope.chapterSections,
                                    sectionList: $scope.sectionList
                                };
                            }
                        },
                        skinClass: 'sortall-dialog',
                        templateUrl: 'app/module/main/videoCourseEdit/sortAllDialog/tpl.html'
                    })
                    .then(function (newList) {
                        dealDialogDismissData(newList);
                    });
                };

                //展示提示信息
                function showRemindInfo(remindInfo) {
                    utilService
                        .showMessage({
                            title: '温馨提示',
                            content: remindInfo
                        });
                }

                //校验富文本编辑模块
                function validateRichEditor() {
                    var isValidate = true;
                    $.each($scope.richEditorOptions.editorList, function (index, item) {
                        var opts = item.options;
                        switch(item.type) {
                            case 'title':
                            case 'body':
                                if (!opts.text) {
                                    isValidate = false;
                                    return false;
                                }
                                break;
                            case 'video':
                                if (!opts.videoId) {
                                    isValidate = false;
                                    return false;
                                }
                                break;
                            case 'photo':
                            case 'audio':
                                if (!opts.storageId) {
                                    isValidate = false;
                                    return false;
                                }
                                break;
                        }
                    });
                    return isValidate;
                }

                //校验多节模式
                function validateSectionList(sectionList) {
                    var validateInfo = {};
                    var list = sectionList || $scope.sectionList;
                    $.each(list, function (index, item) {
                        if (!item.name) {
                            validateInfo.text =  '第' + (index + 1) + '节标题';
                            validateInfo.action = '填写';
                            return false;
                        }
                        if (item.videoId === '') {
                            validateInfo.text =  '第' + (index + 1) + '节视频文件';
                            validateInfo.action = '上传';
                            return false;
                        }
                        if (!item.videoName) {
                            validateInfo.text =  '第' + (index + 1) + '节视频标题';
                            validateInfo.action = '填写';
                            return false;
                        }
                        if (!item.enableTrial || (item.enableTrial === 'enable' && item.trialMinutes === '')) {
                            validateInfo.text =  '第' + (index + 1) + '节视频试听时长';
                            validateInfo.action = '选择';
                            return false;
                        }
                    });
                    return validateInfo;
                }

                //校验章节模式
                function validateChaptersections() {
                    var validateInfo = {};
                    $.each($scope.chapterSections, function (index, chapter) {
                        if (!chapter.name) {
                            validateInfo.text =  '第' + (index + 1) + '章标题';
                            validateInfo.action = '填写';
                            return false;
                        }
                        if (!chapter.sectionList.length) {
                            validateInfo.text =  '第' + (index + 1) + '章下面';
                            validateInfo.action = '至少上传1节视频到';
                            return false;
                        }
                        var sectionValidateInfo = validateSectionList(chapter.sectionList);
                        if (sectionValidateInfo.text) {
                            validateInfo.text =  '第' + (index + 1) + '章' + sectionValidateInfo.text;
                            validateInfo.action = sectionValidateInfo.action;
                            return false;
                        }
                    });

                    return validateInfo;
                }

                //校验视频课节
                function validateVideoCourse() {
                    var isValidate;
                    if ($scope.courseMode === 'chapter') {
                        isValidate = validateChaptersections();
                    }
                    else {
                        isValidate = validateSectionList();
                    }
                    return isValidate;
                }
                //校验图文详情转向链接url
                function validatePhotoReferUrl() {
                    var list = $scope.richEditorOptions.editorList;
                    var indexFlag = 0;
                    var validateInfo = {};
                    $.each(list, function (index, item) {
                        if (item.type === 'photo') {
                            indexFlag++;
                            var referUrl = item.options.refer_url;
                            if (referUrl && (referUrl.indexOf('genshuixue.com') === -1)) {
                                validateInfo.indexFlag = indexFlag;
                                return false;
                            }
                        }
                    });
                    return validateInfo;
                }

                //给后端格式化基础信息
                function formatBeseInfo() {
                    var baseInfo = $scope.baseInfo;
                    var selectSubjectOpts = $scope.selectSubjectOpts;
                    var course = {
                        name: baseInfo.courseName,
                        number: $scope.courseNumber || '',
                        language: baseInfo.language,
                        price: +baseInfo.coursePrice,
                        expire_days: +baseInfo.expireDays,
                        cover: $scope.covers,
                        course_mode: $scope.courseMode,
                        is_new_course: $scope.isNewCourse,
                        subject: {
                            id: selectSubjectOpts.subjectId,
                            path_crumbs: selectSubjectOpts.pathCrumbs,
                            name: selectSubjectOpts.subjectName,
                            path_mark: $scope.pathMark
                        }
                    };

                    //只有机构课程才有这些参数
                    if (+$scope.user.user_role === 6) {
                        course.teacher_name = baseInfo.teacherName || '';
                        course.teacher_id = baseInfo.teacherId || '';
                        course.group_name = baseInfo.groupName || '';
                        course.group_id = baseInfo.groupId || '';
                        course.defined_number = baseInfo.definedNumber || '';
                    }

                    if ($scope.verifyPassed) {
                        course.modify_reasons = baseInfo.modifyReasons;
                    }
                    if (!$scope.isNewCourse) {
                        course.detail = $scope.courseDetails.value;
                    }

                    return course;
                }

                //处理富文本列表
                function formatEditorList(editorList) {
                    var arr = [];
                    $.each(editorList, function (index, item) {
                        var opts = item.options;
                        switch(item.type) {
                            case 'title':
                                arr.push({
                                    type: item.type,
                                    text: opts.text
                                });
                                break;
                            case 'body':
                                arr.push({
                                    type: item.type,
                                    text: opts.text,
                                    font_weight: opts.fontWeight,
                                    font_size: opts.fontSize,
                                    text_align: opts.textAlign,
                                    color: opts.color
                                });
                                break;
                            case 'video':
                                arr.push({
                                    type: item.type,
                                    video_id: opts.videoId,
                                    cover_url: opts.coverUrl
                                });
                                break;
                            case 'photo':
                                arr.push({
                                    type: item.type,
                                    storage_id: opts.storageId,
                                    url: opts.url,
                                    refer_url: opts.refer_url || ''
                                });
                                break;
                            case 'audio':
                                arr.push({
                                    type: item.type,
                                    storage_id: opts.storageId,
                                    url: opts.url
                                });
                                break;
                        }
                    });
                    return arr;
                }

                //给后端格式化图文详情
                function formatIntro() {
                    var editorOptions = $scope.richEditorOptions;
                    var introList = editorOptions.editorList;
                    var intro = {
                        style: editorOptions.style || 'white',
                        items: formatEditorList(introList)
                    };
                    return intro;
                }

                //给后端格式化多课节
                function formatSectionList(sectionList) {
                    var arr = [];
                    var list = sectionList || $scope.sectionList;
                    $.each(list, function (index, item) {
                        arr.push({
                            index: ++index,
                            name : item.name,
                            video_name: item.videoName,
                            enable_trial: item.enableTrial === 'enable' ? true : false,
                            trial_minutes: item.trialMinutes,
                            video_id: item.videoId,
                            section_id: item.sectionId
                        });
                    });
                    return arr;
                }

                //给后端格式化章节
                function formatChapterSections() {
                    var arr = [];
                    $.each($scope.chapterSections, function (index, chapter) {
                        arr.push({
                            index: ++index,
                            name : chapter.name,
                            chapter_id : chapter.chapterId,
                            section_list: formatSectionList(chapter.sectionList)
                        });
                    });
                    return arr;
                }

                //发布课程
                function doReleaseCourse() {
                    $scope.savingCourse = true;
                    var saveParams = {};
                    saveParams.course = formatBeseInfo();
                    if ($scope.isNewCourse) {
                        saveParams.intro = formatIntro();
                    }
                    if ($scope.courseMode === 'chapter') {
                        saveParams.chapter_sections = formatChapterSections();
                    }
                    else {
                        saveParams.chapter_sections = [{
                            index: 1,
                            name: $scope.chapter0Name || '',
                            chapter_id: $scope.chapter0Id || 0,
                            section_list: formatSectionList()
                        }];
                    }
                    videoCourseEditService
                        .saveVideoCourse({
                            data_info: saveParams
                        })
                        .then(function () {
                            $scope.savingCourse = false;
                            localStorage.remove(cacheCourseKey);
                            location.href = getVideoCourseListUrl();
                        }, function () {
                            $scope.savingCourse = false;
                        });
                }

                //发布课程前校验
                $scope.releaseCourse = function () {

                    if (!validator.validate()) {
                        showRemindInfo('请完善基础信息');
                        return false;
                    }

                    if (!$scope.covers.url) {
                        showRemindInfo('请设置课程封面');
                        return false;
                    }

                    if ($scope.isNewCourse && !$scope.richEditorOptions.editorList.length) {
                        showRemindInfo('请编辑课程图文详情');
                        return false;
                    }

                    if ($scope.isNewCourse && !validateRichEditor()) {
                        showRemindInfo('有未填写的图文详情模块');
                        return false;
                    }
                    if (!$scope.isNewCourse && $scope.courseDetails.value === '') {
                        showRemindInfo('请编辑课程图文详情');
                        return false;
                    }
                    var validatePhotoReferUrlInfo = validatePhotoReferUrl();
                    if (validatePhotoReferUrlInfo.indexFlag) {
                        showRemindInfo('第' + validatePhotoReferUrlInfo.indexFlag + '张图片的转向链接不是跟谁学内部链接');
                        return false;
                    }

                    if (!$scope.sectionList.length && !$scope.chapterSections.length) {
                        showRemindInfo('请至少上传一节视频');
                        return false;
                    }

                    var validateInfo = validateVideoCourse();
                    if (validateInfo.text) {
                        showRemindInfo('请' + validateInfo.action + validateInfo.text);
                        return false;
                    }

                    if ($scope.verifyPassed && !$scope.baseInfo.modifyReasons) {
                        showRemindInfo('请填写修改原因');
                        return false;
                    }
                    doReleaseCourse();
                };

            }
        ]);
});
define('module/main/videoCourseEdit/ngDirective/module',[],function () {
    'use strict';

    return angular.module('Manage.videoCourseEdit.directives', []);
});
/**
 * @file 从资料库选择文件弹窗(机构老师都可以用)   resolve  传fileType参数
 * @author niejianhui
 */
define('module/main/selectFileFromDiskDialog/controller',[],function () {
    'use strict';
    function Controller($rootScope, $scope, $sce, utilService, fileType) {
        function initView() {
            var env = utilService.getEnvName();
            var iframeUrl;
            var user = $rootScope.user;
            var authToken = user.auth_token;

            // 机构走资料库
            var domainName = 'b';
            if (user.user_role === 6) {
                domainName = 'ziliao';
            }
            var str = domainName + '.genshuixue.com/commonPage.html?fileType=' + fileType + '&hideUpload=true&noMultiple=true&hideSettings=true&auth_token=' + authToken + '#/dataBank';
            if (env === 'www') {
                iframeUrl = 'http://' + str;
                //本地调试用
                if (location.host.indexOf('8108') > -1) {
                    iframeUrl = 'http://0.0.0.0:8108/commonPage.html?fileType=' + fileType + '&hideUpload=true&noMultiple=true&hideSettings=true&auth_token=' + authToken + '#/dataBank';
                }
            }
            else {
                iframeUrl = 'http://' + env + '-' + str;
            }
            $scope.iframeUrl = $sce.trustAsResourceUrl(iframeUrl);
        }
        //接收消息
        function receiveMessage(event) {
            if ((event.origin.indexOf('genshuixue.com') < 0)
                && (event.origin.indexOf('baijiahulian.com') < 0)
                && (event.origin.indexOf('8108') < 0)) {
                return;
            }
            if (event.data) {
                var data = JSON.parse(event.data);
                $scope.dialog.dismiss({
                    mediaId: data.mediaIdList[0],
                    fid: data.idList[0],
                    name: data.nameList[0]
                });
            }
        }
        initView();

        window.addEventListener('message', receiveMessage);
    }

    Controller.$inject = [
        '$rootScope', '$scope', '$sce', 'utilService', 'fileType'
    ];
    return Controller;
});

/**
 * @file 编辑单节视频课
 * @author niejianhui
 *
 * usage:
 *
 * <single-videocourse></single-videocourse>
 *
 */
define('module/main/videoCourseEdit/ngDirective/singleVideoCourse/directive',['require','module/main/selectFileFromDiskDialog/controller'],function (require) {
    'use strict';

    angular.module('Manage.videoCourseEdit.directives')
        .directive('singleVideocourse',
            ['$rootScope', 'uploaderService', 'dialog', 'utilService', 'videoCourseEditService',
            function ($rootScope, uploaderService, dialog, utilService, videoCourseEditService) {
                return {
                    restrict: 'E',
                    replace: true,
                    /**
                     * index  第几节
                     * options.name   名称
                     * options.videoName  视频名
                     * options.videoId    视频id
                     * options.enableTrial  是否可试听
                     * options.trialMinutes 试听时长  和后端约定好了 0代表整节试听
                     * options.isEditing  是否是编辑态
                     * courseMode 课程模式
                     * courseNumber 课程number  上报用
                     * courseSchedule 视频课节／章节列表
                     * chapterIndex  章节模式时所属的章索引
                     * isPlaybackcourse  是否是回放转视频课
                     * uploadingFiles 正在上传的视频列表 - 为多视频上传准备
                     */
                    scope: {
                        options: '=',
                        index: '=',
                        courseMode: '@',
                        courseNumber: '@',
                        courseSchedule: '=',
                        chapterIndex: '=',
                        isPlaybackcourse: '=',
                        uploadingFiles: '='
                    },
                    templateUrl: 'app/module/main/videoCourseEdit/ngDirective/singleVideoCourse/tpl.html',
                    link: function ($scope) {

                        // 触发状态改变事件
                        function emitShowAddSectionBtnEvent(data) {
                            $scope.$emit('hasEditingItemChange', data);
                        }

                        //上报函数
                        function reportUploadVideo() {
                            var typeArryMap = {
                                'chapter': 'course_video_chapter_mode',
                                'multiple': 'course_video_section_mode'
                            };
                            var defaultParams = {
                                user_number: $rootScope.user.user_number,
                                course_number: $scope.courseNumber || '',
                                type: typeArryMap[$scope.courseMode],
                                stype: 'course_video_upload'
                            };
                            WAT.send('http://click.genshuixue.com/gs.gif', defaultParams);
                        }

                        //用名称检查课节 checkIndex  是否需要检查索引 多节模式下一定要 章节模式下如果章的索引不一样就不需要
                        function checkSectionListByName(sectionList, name, type, checkIndex) {
                            var checkInfo = '';
                            // 与已有课程对比
                            $.each(sectionList, function (index, item) {

                                if (type === 'name') { // 课节名
                                    if ((checkIndex && item['name'] === name && index !== $scope.index)
                                        || (!checkIndex && item['name'] === name)) {

                                        checkInfo = '第' + (index + 1) + '节同名，请修改!';
                                        return false;
                                    }
                                }
                                else if (type === 'videoName') { // 视频名 & 上传中视频名
                                    if ((checkIndex && (item['videoName'] === name || item['uploadingVideoName'] === name ) && index !== $scope.index)
                                        || (!checkIndex && item['videoName'] === name)) {

                                        checkInfo = '第' + (index + 1) + '节视频重复，请修改!';
                                        return false;
                                    }
                                }

                            });

                            return checkInfo;
                        }

                        //用名称检查章节
                        function checkChapterSectionsByName(name, type) {
                            var checkInfo = '';
                            // 与已有课程对比
                            $.each($scope.courseSchedule, function (index, item) {

                                var sectionCheckInfo1 = checkSectionListByName(item.sectionList, name, type, false);
                                var sectionCheckInfo2 = checkSectionListByName(item.sectionList, name, type, true);

                                if ((item.chapterIndex !== $scope.chapterIndex && sectionCheckInfo1)
                                    || (item.chapterIndex === $scope.chapterIndex && sectionCheckInfo2)) {

                                    checkInfo += '第' + (index + 1) + '章';

                                    if (item.chapterIndex !== $scope.chapterIndex) {
                                        checkInfo += sectionCheckInfo1;
                                    }
                                    else {
                                        checkInfo += sectionCheckInfo2;
                                    }
                                    return false;
                                }
                            });

                            return checkInfo;
                        }

                        //判断是否有重名/重视频的课节  type 取值 name/videoName
                        function hasRepeatedNameItem(name, type) {
                            var checkInfo = '';
                            if ($scope.courseMode === 'multiple') {
                                checkInfo = checkSectionListByName($scope.courseSchedule, name, type, true);
                            }
                            else {
                                checkInfo = checkChapterSectionsByName(name, type);
                            }
                            return checkInfo;
                        }

                        $scope.showChoiceMenu = false;
                        $scope.opts = $.extend({}, $scope.options);

                        //试听时常下拉框配置
                        $scope.trialMinutesOptions = {
                            defaultValue: $scope.opts.trialMinutes,
                            onSelected: function(data) {
                                $scope.opts.trialMinutes = data.value;
                            },
                            dataSource: [
                                {
                                    text: '整节试听',
                                    value: -1
                                }
                                // {
                                //     text: '试听前5分钟',
                                //     value: 5
                                // },
                                // {
                                //     text: '试听前10分钟',
                                //     value: 10
                                // }
                            ]
                        };

                        //视频来源选择菜单
                        $scope.toggleChoiceMenu = function () {
                            $scope.showChoiceMenu = !$scope.showChoiceMenu;
                        };

                        //保存
                        $scope.saveChange = function () {
                            var backupOpts = $scope.opts;
                            var enableTrial = backupOpts.enableTrial;
                            var videoId = backupOpts.videoId;
                            if (!backupOpts.name) {
                                utilService.showMessage('请填写课节名称');
                                return;
                            }
                            if (!enableTrial || (enableTrial === 'enable' && backupOpts.trialMinutes === '')) {
                                utilService.showMessage('请选择试听时长');
                                return;
                            }
                            var nameRemindInfo = hasRepeatedNameItem(backupOpts.name, 'name');
                            if (nameRemindInfo) {
                                utilService.showMessage('与' + nameRemindInfo);
                                return;
                            }
                            if (videoId !== '' && +videoId === 0) {
                                utilService.showMessage('视频id不能为0');
                                return;
                            }
                            $scope.options.name = backupOpts.name;
                            $scope.options.enableTrial = enableTrial;
                            $scope.options.trialMinutes = backupOpts.trialMinutes;
                            $scope.options.isEditing = false;
                            emitShowAddSectionBtnEvent({hasEditingItem:false});
                        };
                        //取消
                        $scope.cancelChange = function () {
                            $scope.options.isEditing = false;
                            emitShowAddSectionBtnEvent({hasEditingItem:false});
                        };

                        //从资料库选视频
                        $scope.selectVideoFromDisk = function () {
                            $scope.showChoiceMenu = false;
                            dialog.open({
                                title: '选择视频',
                                controller: require('module/main/selectFileFromDiskDialog/controller'),
                                width: 830,
                                skinClass: 'select-video-dialog',
                                resolve: {
                                    fileType: function () {
                                        return 'video';
                                    }
                                },
                                templateUrl: 'app/module/main/selectFileFromDiskDialog/tpl.html'
                            })
                            .then(function (data) {
                                var videoNameRemindInfo = hasRepeatedNameItem(data.name, 'videoName');
                                if (videoNameRemindInfo) {
                                    utilService.showMessage('与' + videoNameRemindInfo);
                                    return;
                                }

                                $scope.options.videoId = data.mediaId;
                                $scope.options.videoName = data.name;
                            });
                        };

                        //本地上传
                        $scope.uploadLocalVideo = function () {
                            reportUploadVideo();
                            $scope.showChoiceMenu = false;
                            var videoUploaderOpt = {
                                type: 'commonVideo',
                                from_type: 2,
                                checkStorageSpace: true,
                                validateFile: function (file) {
                                    var videoNameRemindInfo = hasRepeatedNameItem(file.name, 'videoName');
                                    //文件重名校验
                                    if (videoNameRemindInfo) {
                                        utilService
                                            .showMessage('与' + videoNameRemindInfo)
                                            .then(function () {
                                                $scope.options.videoUploading = false;
                                            }, function () {
                                                $scope.options.videoUploading = false;
                                            });
                                        return false;
                                    }
                                    else {
                                        // 正在上传中的视频文件名
                                        $scope.options.uploadingVideoName = file.name;
                                    }
                                    return true;
                                }
                            };
                            /*
                            $scope.videoUploadParam = {
                                uploadedPercent: '0%'
                            };
                            */
                            $scope.options.videoUploadParam = {
                                uploadedPercent: '0%'
                            };

                            uploaderService
                            .upload(videoUploaderOpt)
                            .then(function (res) {

                                var videoParams = videoUploaderOpt.uploader.videoParams;
                                var videoId = videoParams.id;

                                videoCourseEditService
                                    .uploadVideoCallback({
                                        id: videoId
                                    })
                                    .then(function () {
                                        $scope.options.videoUploading = false;
                                        $scope.options.videoId = videoId;
                                        $scope.options.videoName = res.fileItem.file.name;
                                        // 正在上传中的视频文件名
                                        $scope.options.uploadingVideoName = '';
                                    }, function () {
                                        $scope.options.videoUploading = false;
                                        $scope.options.videoUploadFailure = true;
                                        // 正在上传中的视频文件名
                                        $scope.options.uploadingVideoName = '';
                                    });
                            },
                            function (data) {

                                if (data && data.errorType === 'errorBeforeUpload') {
                                    // 上传前检测出错误
                                }
                                else {

                                    utilService
                                    .showMessage({
                                        title: '温馨提示',
                                        content: '视频上传失败，请重新上传',
                                        okBtnText: '确定'
                                    });

                                    $scope.options.videoUploadFailure = true;
                                }

                                $scope.options.videoUploading = false;
                                // 正在上传中的视频文件名
                                $scope.options.uploadingVideoName = '';
                            });

                            videoUploaderOpt.uploader.on('uploadprogress', function (e, data) {
                                $rootScope.safeApply(function () {
                                    $scope.options.videoUploadParam.uploadedPercent = data.percent;
                                    $scope.options.uploadedPercent = data.percent;
                                });
                            });


                            videoUploaderOpt.uploader.on('filechange', function () {
                                $scope.options.videoUploading = true;
                                $scope.options.videoUploadFailure = false;
                            });


                            // videoUploaderOpt.uploader.on('uploadstart', function () {
                            //     // $scope.videoUploading = true;
                            //     $scope.options.videoUploading = true;
                            // });
                        };
                    }
                };
            }
        ]);
});

/**
 * @file 编辑视频课章信息
 * @author niejianhui
 *
 * usage:
 *
 * <edit-chapterinfo></edit-chapterinfo>
 *
 */
define('module/main/videoCourseEdit/ngDirective/editChapterInfo/directive',[],function () {
    'use strict';

    angular.module('Manage.videoCourseEdit.directives')
        .directive('editChapterinfo',
            ['$rootScope', 'utilService', function ($rootScope, utilService) {
                return {
                    restrict: 'E',
                    replace: true,
                    /**
                     * options.name   章的名称
                     * options.isEditing  是否是编辑态
                     * 这里把整个章的信息全传进来了
                     */
                    scope: {
                        options: '='
                    },
                    templateUrl: 'app/module/main/videoCourseEdit/ngDirective/editChapterInfo/tpl.html',
                    link: function ($scope) {

                        //触发状态改变事件
                        function emitShowAddChapterBtnEvent(data) {
                            $scope.$emit('hasEditingItemChange', data);
                        }

                        $scope.opts = $.extend({}, $scope.options);
                        //保存
                        $scope.saveChange = function () {
                            if (!$scope.opts.name) {
                                utilService.showMessage('请填写章名称');
                                return;
                            }
                            $scope.options.name = $scope.opts.name;
                            $scope.options.isEditing = false;
                            $scope.options.showSectionList = true;
                            emitShowAddChapterBtnEvent({
                                hasEditingItem: false,
                                chapterIndex: $scope.opts.chapterIndex
                            });
                        };
                        //取消
                        $scope.cancelChange = function () {
                            $scope.options.showSectionList = true;
                            $scope.options.isEditing = false;
                            emitShowAddChapterBtnEvent({
                                hasEditingItem: false,
                                chapterIndex: $scope.opts.chapterIndex
                            });
                        };

                    }
                };
            }
        ]);
});

define('module/main/videoCourseEdit/ngDirective/main',['require','./module','./singleVideoCourse/directive','./editChapterInfo/directive'],function (require) {
    'use strict';

    require('./module');
    require('./singleVideoCourse/directive');
    require('./editChapterInfo/directive');
});
/**
 * @file videoCourseEdit
 * @author niejianhui
 * @date 2017/08/15
 */

define('module/main/videoCourseEdit/app',['require','./controller','./ngDirective/main'],function (require) {
    'use strict';
    require('./controller');
    require('./ngDirective/main');

    angular.module('Manage.videoCourseEdit', [
            'ui.router',
            'pasvaz.bindonce',
            'Manage.videoCourseEdit.controller',
            'Manage.videoCourseEdit.directives'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('Manage.videoCourseEdit', {
                        url: 'videoCourseEdit/:courseNumber',
                        controller: 'VideoCourseEditCtrl',
                        templateUrl: 'app/module/main/videoCourseEdit/tpl.html'
                    });
            }
        ]);

});
define('module/main/module',['require','bindonce','ng-sanitize','common/ngService/main','common/ngDirective/main','common/ngFilter/main','module/main/demo/app','module/main/storageSpace/app','module/main/paySuccess/app','module/main/uploadFile/app','module/main/one2oneEdit/app','module/main/releaseSuccess/app','module/main/videoCourseEdit/app'],function (require) {
    'use strict';
    require('bindonce');
    require('ng-sanitize');
    require('common/ngService/main');
    require('common/ngDirective/main');
    require('common/ngFilter/main');
    require('module/main/demo/app');
    require('module/main/storageSpace/app');
    require('module/main/paySuccess/app');
    require('module/main/uploadFile/app');
    require('module/main/one2oneEdit/app');
    require('module/main/releaseSuccess/app');
    require('module/main/videoCourseEdit/app');

    var deps = [
        'templates',
        'pasvaz.bindonce',
        'Manage.services',
        'Manage.directives',
        'Manage.filters',
        'Manage.demo',
        'Manage.storageSpace',
        'Manage.paySuccess',
        'Manage.uploadFile',
        'Manage.one2oneEdit',
        'Manage.releaseSuccess',
        'Manage.videoCourseEdit'
    ];

    var app = angular.module('Manage', deps);

    return app;
});
/**
 * @file 应用入口
 * @author hurry
 */
define('module/main/app', ['require','cc-config/form/Validator','../../common/ngService/main','./module'],function (require) {
    'use strict';
    // 公共校验配置
    require('cc-config/form/Validator');
    require('../../common/ngService/main');

    var app = require('./module');
        app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceDelegateProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider) {
                $urlRouterProvider.otherwise('/');
                $sceDelegateProvider.resourceUrlWhitelist([
                    'self', 'http://*.genshuixue.com/**'
                ]);

                //配置状态
                $stateProvider
                    .state('Manage', {
                        url: '/',
                        abstract: true,
                        template: '<div ui-view></div>',
                        controller: ['$rootScope', '$state', 'userInfo',
                            function ($rootScope, $state, userInfo) {
                                // debugger;
                            }
                        ]
                    });
                //$urlRouterProvider.otherwise('/storageSpace');
            }
        ])
        .config( ['$compileProvider',
            function( $compileProvider )
            {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|genshuixue|baijiayun):/);
                // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
            }
        ])
        .run(['$rootScope', '$filter', 'utilService', 'ajaxService', '$sce', 'userInfo',
            function ($rootScope, $filter, utilService, ajaxService, $sce, userInfo) {

                $rootScope.safeApply = function (fn) {
                    var phase = this.$root.$$phase;
                    if (phase === '$apply' || phase === '$digest') {
                        if (fn && (typeof(fn) === 'function')) {
                            fn();
                        }
                    } else {
                        this.$apply(fn);
                    }
                };
                
                userInfo()
                    .then(function (response) {
                        var data = response.data;
                        $rootScope.user = data;
                    });
            }
        ]);

    angular.bootstrap(document, ['Manage']);
});

