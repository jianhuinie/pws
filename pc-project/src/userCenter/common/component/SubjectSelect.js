/**
 * @file 科目选择器
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('common/service');

    function getSubjectListById(id, callback) {
        return service
        .getSubjectList({
            id: id
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = $.map(
                    response.data.list,
                    function (item) {
                        return {
                            text: item.name,
                            value: item.id
                        };
                    }
                );

                callback(data);

            }
        });
    }

    return Ractive.extend({
        template: require('html!./SubjectSelect.html'),
        data: function () {
            return {
                options: {

                    className: '',

                    subject1: {
                        name: '',
                        value: 0,
                        data: null,
                        defaultText: '请选择'
                    },

                    subject2: {
                        name: '',
                        value: 0,
                        data: null,
                        defaultText: '请选择'
                    },

                    subject3: {
                        name: '',
                        value: 0,
                        data: null,
                        defaultText: '请选择'
                    }

                }
            };
        },
        components: {
            Select: require('./Select')
        },
        oninit: function () {

            var me = this;

            me.set('options.subject1.onselect', function () {
                me.set({
                    'options.subject2.value': '',
                    'options.subject3.value': '',
                    'options.subject3.data': [ ]
                });
            });

            me.set('options.subject2.onselect', function () {
                me.set('options.subject3.value', '');
            });

            getSubjectListById(
                null,
                function (data) {
                    me.set('options.subject1.data', data);
                }
            );

        },
        onrender: function () {

            var me = this;

            me.observe(
                'options.subject1.value',
                function (value) {
                    if (value) {
                        getSubjectListById(
                            value,
                            function (data) {
                                me.set('options.subject2.data', data);
                            }
                        );
                    }
                }
            );

            me.observe(
                'options.subject2.value',
                function (value) {
                    if (value) {
                        getSubjectListById(
                            value,
                            function (data) {
                                me.set('options.subject3.data', data);
                            }
                        );
                    }
                }
            );

        }
    });

});