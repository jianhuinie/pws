/**
 * @file 绑定组件的多个属性，联动变化
 * @author zhujialu
 */
define(function () {

    'use strict';

    return function (component, map) {

        $.each(map, function (innerName, outerName) {
            component.set(innerName, component.get(outerName));
            var names = [innerName, outerName];
            $.each(
                names,
                function (index, name) {
                    component.observe(name, function (newValue, oldValue) {
                        if (typeof oldValue !== 'undefined') {
                            var data = { };
                            $.each(names, function (index, otherName) {
                                if (otherName !== name) {
                                    data[otherName] = newValue;
                                }
                            });
                            component.set(data);
                        }
                    });
                }
            );
        });

    };

});