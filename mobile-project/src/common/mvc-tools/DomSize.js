/**
 * Created by xuzheng on 15/4/22.
 */
define(function (require) {
    var observer = require('common/mvc/observer');
    var MVCObject = require('common/mvc/MVCObject');

    var util_base = require('util/base');

    function equals(size1, size2) {
        return size1 && size2 &&
            (size1.width == size2.width) &&
            (size1.height == size2.height);
    }

    function update(instance) {
        var dom = instance.dom;
        var name = instance.get('attrName') || 'client';
        var size = {
            'width': dom[name + 'Width'],
            'height': dom[name + 'Height']
        };
        if (!equals(size, instance.get("size"))) {
            instance.set("size", size);
        }
    }

    /**
     * 计算dom size，可以设置autoResize，也可手动触发dom的resize事件来进行计算
     *
     * params:
     *      dom {DomElement}
     *      options {Object | null}
     *          autoResize {Boolean} 是否自动计算dom尺寸,默认为false
     *          attrName {String} "offset" or "client",默认“client”
     *
     * input: null
     *
     * output:
     *      size {Object} 当dom尺寸发生改变时size会同时改变，{width:100,height:100}
     *
     * @extends {MVCObject}
     * */
    function DomSize(dom, options) {
        var self = this;
        self.dom = dom;
        self._listener = observer.addListener(dom, "resize", function () {
            update(self);
        });
        if (options) {
            this.setValues(options);
        }
        update(self);
    }

    util_base.inherits(DomSize, MVCObject);
    DomSize.prototype.autoResize_changed = DomSize.prototype.duration_changed = function () {
        updateAutoResize(this);
    };

    /**
     *
     * @interface
     * */
    DomSize.prototype.destroy = function () {
        this.set('autoResize', false);
        observer.clearInstanceListeners(this._listener);
        this._listener = null;
        this.dom = null;
        this.unbindAll();
    };

    function updateAutoResize(instance) {
        function resizeHandler() {
            update(instance);
        }

        var isAutoResize = instance.get("autoResize");
        if (instance.timer) {
            window.clearInterval(instance.timer);
            instance.timer = null;
        }
        if (isAutoResize) {
            var duration = instance.get('duration');
            if (!util_base.isNumber(duration)) {
                duration = 500;
            }
            instance.timer = window.setInterval(resizeHandler, duration);
        }
    }

    return DomSize;
});