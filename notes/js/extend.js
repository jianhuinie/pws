function extend() {
    function isArray(elems) {
        return Object.prototype.toString.call(elems).indexOf('Array') > -1;
    }
    var target = arguments[0] || {};
    var deep = false;
    var i = 1;
    var length = arguments.length;
    var options, name, src, copy, clone;
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if (typeof target !== 'object'  && typeof target !== 'function') {
        target = {};
    }
    if (length === i) {
        //TODO
    }
    for (; i < length; i++) {
        options = arguments[i];
        if (options) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (src === copy) {
                    continue;
                }
                if (deep && copy &&  (typeof copy === 'object' || isArray(copy))) {
                    if (!isArray(copy)) {
                        clone = src || {}; 
                    }
                    else {
                         clone = src || []; 
                    }
                    target[name] = extend(deep, clone, copy);
                }
                else if (copy){
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}
var obj1 = {
    name: 'niejianhui',
    sex: 'male',
    hobby: {
        1: 'basketball'
    },
    array: [1]
};
var obj2 = {
    name: 'niejianhui',
    age: 12,
    hobby: {
        2: 'swim'
    },
    array: [1, 2]
};
var newObj = extend(true, {}, obj1, obj2);
console.log(obj1);
console.log(newObj);