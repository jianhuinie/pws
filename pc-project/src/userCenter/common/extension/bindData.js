/**
 * @file 绑定 ractive 实例的 data
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return function (instance, map) {
        $.each(map, function (innerName, outerName) {
            instance.set(innerName, instance.get(outerName));
            var names = [innerName, outerName];
            $.each(
                names,
                function (index, name) {
                    instance.observe(name, function (newValue, oldValue) {
                        if (typeof oldValue !== 'undefined') {
                            var data = { };
                            $.each(names, function (index, otherName) {
                                if (otherName !== name) {
                                    data[otherName] = newValue;
                                }
                            });
                            instance.set(data);
                        }
                    });
                }
            );
        });
    };

});